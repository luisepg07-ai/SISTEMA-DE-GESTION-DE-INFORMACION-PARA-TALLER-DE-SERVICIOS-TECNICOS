import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { Nota, NotaSchema } from './nota.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Nota.name, schema: NotaSchema }])],
  controllers: [NotasController],
  providers: [NotasService],
})
export class NotasModule {}
