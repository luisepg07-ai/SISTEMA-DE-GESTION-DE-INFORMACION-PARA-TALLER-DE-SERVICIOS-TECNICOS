import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Permiso {
  @Prop({ required: false })
  admin?: boolean;
}

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop({ type: Permiso, default: null })
  permisos?: Permiso;

  
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
