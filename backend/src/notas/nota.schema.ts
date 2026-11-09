import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotaDocument = Nota & Document;

@Schema()
export class Nota {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  contenido: string;
}

export const NotaSchema = SchemaFactory.createForClass(Nota);
