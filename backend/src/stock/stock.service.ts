import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock, StockDocument } from './stock.schema';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
  ) {}

  async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  async findOne(id: string): Promise<Stock> {
    const stock = await this.stockModel.findById(id).exec();
    if (!stock) throw new NotFoundException('Stock no encontrado');
    return stock;
  }

  async create(createDto: Partial<Stock>): Promise<Stock> {
    const created = new this.stockModel(createDto);
    return created.save();
  }

  async update(id: string, updateDto: Partial<Stock>): Promise<Stock> {
    const updated = await this.stockModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Stock no encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.stockModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Stock no encontrado');
  }
}
