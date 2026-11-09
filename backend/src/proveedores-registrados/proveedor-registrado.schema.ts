import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProveedorRegistradoDocument = ProveedorRegistrado & Document;

@Schema()
export class ProveedorRegistrado {
  @Prop({ required: true })
  nombreProveedor: string;

  @Prop()
  contactoEmail?: string;

  @Prop()
  telefono?: string;

}

export const ProveedorRegistradoSchema = SchemaFactory.createForClass(ProveedorRegistrado);
