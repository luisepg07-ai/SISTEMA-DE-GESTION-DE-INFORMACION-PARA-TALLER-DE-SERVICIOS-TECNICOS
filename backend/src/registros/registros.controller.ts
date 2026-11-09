import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { Registro } from './registro.schema';

@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) {}

  @Get()
  findAll() {
    return this.registrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrosService.findOne(id);
  }

  @Post()
  create(@Body() createDto: Partial<Registro>) {
    return this.registrosService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<Registro>) {
    return this.registrosService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrosService.remove(id);
  }
}
