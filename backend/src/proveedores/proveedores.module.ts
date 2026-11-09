import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Proveedor, ProveedorSchema } from './proveedor.schema';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Proveedor.name, schema: ProveedorSchema }])],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [ProveedoresService]
})
export class ProveedoresModule {}
