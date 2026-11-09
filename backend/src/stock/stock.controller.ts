import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './stock.schema';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Post()
  create(@Body() createDto: Partial<Stock>) {
    return this.stockService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<Stock>) {
    return this.stockService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }
}
