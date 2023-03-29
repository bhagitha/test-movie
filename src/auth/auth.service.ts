import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user._doc.username, id: user._doc._id, role: user._doc.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getProfile(userdata: any) {
        console.log(userdata)
        const user = await this.usersService.findOne_byid(userdata.userid);
        return {
            user
        };
    }

}