import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.schema';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() data: Partial<Usuario>) {
    return this.usuariosService.create(data);
  }

  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usuariosService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Usuario>) {
    return this.usuariosService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuariosService.delete(id);
  }
}
