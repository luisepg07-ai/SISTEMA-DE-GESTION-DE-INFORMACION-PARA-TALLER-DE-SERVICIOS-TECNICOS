import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProveedorDocument = Proveedor & Document;

@Schema()
export class Proveedor {
  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  precio: number;

  @Prop()
  precioespecial?: number;

  @Prop()
  distribuidor?: string;

}

export const ProveedorSchema = SchemaFactory.createForClass(Proveedor);
