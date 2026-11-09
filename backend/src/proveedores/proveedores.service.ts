import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proveedor, ProveedorDocument } from './proveedor.schema';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectModel(Proveedor.name) private proveedorModel: Model<ProveedorDocument>
  ) {}

  async create(data: Partial<Proveedor>): Promise<Proveedor> {
    const created = new this.proveedorModel(data);
    return created.save();
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorModel.find().exec();
  }

  async findById(id: string): Promise<Proveedor | null> {
    return this.proveedorModel.findById(id).exec();
  }

  async findByModel(modelo: string): Promise<Proveedor | null> {
    return this.proveedorModel.findOne({modelo}).exec();
  }

  async update(id: string, data: Partial<Proveedor>): Promise<Proveedor | null> {
    return this.proveedorModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Proveedor | null> {
    return this.proveedorModel.findByIdAndDelete(id).exec();
  }
}
