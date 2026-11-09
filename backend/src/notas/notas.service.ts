import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nota, NotaDocument } from './nota.schema';

@Injectable()
export class NotasService {

  constructor(
    @InjectModel(Nota.name) private notaModel: Model<NotaDocument>,
  ) {}

  async remove(id: string): Promise<void> {
    const result = await this.notaModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Nota no encontrada');
  }
  
  async findAll(): Promise<Nota[]> {
    return this.notaModel.find().exec();
  }

  async findOne(id: string): Promise<Nota> {
    const nota = await this.notaModel.findById(id).exec();
    if (!nota) throw new NotFoundException('Nota no encontrada');
    return nota;
  }

  async create(createDto: Partial<Nota>): Promise<Nota> {
    const created = new this.notaModel(createDto);
    return created.save();
  }

  async update(id: string, updateDto: Partial<Nota>): Promise<Nota> {
    const updated = await this.notaModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Nota no encontrada');
    return updated;
  }
}
