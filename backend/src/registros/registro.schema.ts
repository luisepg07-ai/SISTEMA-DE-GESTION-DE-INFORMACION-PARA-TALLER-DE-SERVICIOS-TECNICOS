import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistroDocument = Registro & Document;

@Schema()
export class Registro {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  dano: string;

  @Prop({ required: true })
  reparacion: string;

  @Prop({ required: true })
  saldoPagar: number; 

  @Prop({ required: true })
  telefono: string;

  @Prop()
  nota?: string;

  @Prop({ required: true })
  estado: string;

  @Prop({ required: true })
  dispositivo: string;

  @Prop({ required: true })
  modelo: string;

  @Prop({ required: false })
  patron?: number[];

  @Prop({ type: [{ type: Object }], required: false })
  componentesUsados?: any[];
}

export const RegistroSchema = SchemaFactory.createForClass(Registro);
