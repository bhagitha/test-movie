import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/schema/user.schema';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector,private userService: UserService) { }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const { userid } = request.user;
      const user = await this.userService.findOne_byid(userid);

      return requiredRoles.includes(user.role)
    }
    return false;
  }

//   if (!request.headers.authorization) {
//     return false;
//   }
//   const accessToken = request.headers.authorization.replace('Bearer ', '');
//   if (!accessToken) {
//     return false;
//   }
//   const truth = (await verifyToken(accessToken, 'accessToken')) as any;
//   if (!truth) {
//     return false;
//   }
//   const user = {
//     roles: truth.role, // eg : [a,b,c]
//     email: truth.email,
//   };
//   console.log(`Log => ~ file: role.guard.ts ~ line 33 ~ RolesGuard ~ canActivate ~ user`, user);
//   if (user.roles.some((r: Role) => roles.includes(r))) {
//     return true;
//   }
//   return false;
// }
}