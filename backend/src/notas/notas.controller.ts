import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NotasService } from './notas.service';
import { Nota } from './nota.schema';

@Controller('notas')
export class NotasController {
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notasService.remove(id);
  }
  constructor(private readonly notasService: NotasService) {}

  @Get()
  findAll() {
    return this.notasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notasService.findOne(id);
  }

  @Post()
  create(@Body() createDto: Partial<Nota>) {
    return this.notasService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<Nota>) {
    return this.notasService.update(id, updateDto);
  }
}
