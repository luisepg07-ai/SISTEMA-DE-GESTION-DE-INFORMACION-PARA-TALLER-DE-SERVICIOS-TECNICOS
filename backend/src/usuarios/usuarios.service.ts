import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

  async create(data: Partial<Usuario>): Promise<Usuario> {
    if (data.contraseña) {
      const salt = await bcrypt.genSalt(10);
      data.contraseña = await bcrypt.hash(data.contraseña, salt);
    }
    const created = new this.usuarioModel(data);
    return created.save();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findById(id: string): Promise<Usuario | null> {
    return this.usuarioModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario | null> {
    if (data.contraseña) {
      const salt = await bcrypt.genSalt(10);
      data.contraseña = await bcrypt.hash(data.contraseña, salt);
    }
    return this.usuarioModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Usuario | null> {
    return this.usuarioModel.findByIdAndDelete(id).exec();
  }
}
