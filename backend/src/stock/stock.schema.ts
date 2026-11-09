import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ required: true })
  componente: string;

  @Prop({ required: false })
  descripcion: string;

  @Prop({ required: true })
  cantidad: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
