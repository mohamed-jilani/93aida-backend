import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = [];

  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    this.users = [
      { id: 1, email: 'admin@example.com', password: hashedPassword, role: 'admin' },
    ];
  }

  async findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
