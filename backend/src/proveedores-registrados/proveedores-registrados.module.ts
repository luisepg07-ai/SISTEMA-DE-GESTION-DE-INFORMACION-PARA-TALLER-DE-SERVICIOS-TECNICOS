import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedoresRegistradosService } from './proveedores-registrados.service';
import { ProveedoresRegistradosController } from './proveedores-registrados.controller';
import { ProveedorRegistrado, ProveedorRegistradoSchema } from './proveedor-registrado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProveedorRegistrado.name, schema: ProveedorRegistradoSchema }]),
  ],
  controllers: [ProveedoresRegistradosController],
  providers: [ProveedoresRegistradosService],
  exports: [ProveedoresRegistradosService],
})
export class ProveedoresRegistradosModule {}
