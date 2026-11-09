import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/usuario.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    private jwtService: JwtService
  ) {}

  async validateUser(nombre: string, contraseña: string): Promise<Usuario | null> {
    const usuario = await this.usuarioModel.findOne({ nombre }).exec();
    if (usuario && await bcrypt.compare(contraseña, usuario.contraseña)) {
      return usuario;
    }
    return null;
  }

  async login(nombre: string, contraseña: string): Promise<{ access_token: string }> {
    const usuario = await this.validateUser(nombre, contraseña);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { sub: usuario._id, nombre: usuario.nombre, permisos: usuario.permisos };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
