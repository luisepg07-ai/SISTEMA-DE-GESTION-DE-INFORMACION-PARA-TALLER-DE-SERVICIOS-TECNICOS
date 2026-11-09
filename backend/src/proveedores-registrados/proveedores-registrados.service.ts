import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProveedorRegistrado, ProveedorRegistradoDocument } from './proveedor-registrado.schema';

@Injectable()
export class ProveedoresRegistradosService {
  constructor(
    @InjectModel(ProveedorRegistrado.name) private proveedorModel: Model<ProveedorRegistradoDocument>,
  ) {}

  async findAll(): Promise<ProveedorRegistrado[]> {
    return this.proveedorModel.find().exec();
  }

  async findOne(id: string): Promise<ProveedorRegistrado> {
    const item = await this.proveedorModel.findById(id).exec();
    if (!item) throw new NotFoundException('Proveedor registrado no encontrado');
    return item;
  }

  async create(data: Partial<ProveedorRegistrado>): Promise<ProveedorRegistrado> {
    const created = new this.proveedorModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<ProveedorRegistrado>): Promise<ProveedorRegistrado> {
    const updated = await this.proveedorModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Proveedor registrado no encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.proveedorModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Proveedor registrado no encontrado');
  }
}
