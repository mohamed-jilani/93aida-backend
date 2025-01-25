import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Inscription (registration)
  async register(email: string, password: string, role: string = 'user') {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const user = await this.usersService.createUser(email, password, role);
    return this.generateToken(user);
  }

  // Connexion (login)
  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  // Génération de token
  private generateToken(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
