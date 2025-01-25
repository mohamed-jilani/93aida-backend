import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // Créer un utilisateur
  async createUser(email: string, password: string, role: string = 'user'): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe
    const newUser = new this.userModel({ email, password: hashedPassword, role });
    return newUser.save();
  }

  // Trouver un utilisateur par email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Valider un mot de passe
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
