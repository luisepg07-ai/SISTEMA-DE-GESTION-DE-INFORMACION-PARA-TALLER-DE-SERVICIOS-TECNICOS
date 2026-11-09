import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrosService } from './registros.service';
import { RegistrosController } from './registros.controller';
import { Registro, RegistroSchema } from './registro.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Registro.name, schema: RegistroSchema }])],
  controllers: [RegistrosController],
  providers: [RegistrosService],
})
export class RegistrosModule {}
