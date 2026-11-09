import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from './proveedor.schema';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  async create(@Body() data: Partial<Proveedor>) {
    return this.proveedoresService.create(data);
  }

  @Get()
  async findAll() {
    return this.proveedoresService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.proveedoresService.findById(id);
  }

  @Get(':modelo')
  async findByModelo(@Param('modelo') modelo: string) {
    return this.proveedoresService.findByModel(modelo);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Proveedor>) {
    return this.proveedoresService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.proveedoresService.delete(id);
  }
}
