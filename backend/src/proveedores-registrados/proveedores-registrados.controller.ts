import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProveedoresRegistradosService } from './proveedores-registrados.service';
import { ProveedorRegistrado } from './proveedor-registrado.schema';

@Controller('proveedores-registrados')
export class ProveedoresRegistradosController {
  constructor(private readonly proveedoresService: ProveedoresRegistradosService) {}

  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<ProveedorRegistrado>) {
    return this.proveedoresService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<ProveedorRegistrado>) {
    return this.proveedoresService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedoresService.remove(id);
  }
}
