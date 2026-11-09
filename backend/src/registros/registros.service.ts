import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registro, RegistroDocument } from './registro.schema';

@Injectable()
export class RegistrosService {
  constructor(
    @InjectModel(Registro.name) private registroModel: Model<RegistroDocument>,
  ) {}

  async findAll(): Promise<Registro[]> {
    return this.registroModel.find().exec();
  }

  async findOne(id: string): Promise<Registro> {
    const registro = await this.registroModel.findById(id).exec();
    if (!registro) throw new NotFoundException('Registro no encontrado');
    return registro;
  }

  async create(createDto: Partial<Registro>): Promise<Registro> {
    const created = new this.registroModel(createDto);
    return created.save();
  }

  async update(id: string, updateDto: Partial<Registro>): Promise<Registro> {
    const updated = await this.registroModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Registro no encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.registroModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Registro no encontrado');
  }
}
