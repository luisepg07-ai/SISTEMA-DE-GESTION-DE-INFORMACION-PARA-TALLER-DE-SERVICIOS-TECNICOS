import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrosModule } from './registros/registros.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { NotasModule } from './notas/notas.module';
import { StockModule } from './stock/stock.module';
import { ProveedoresRegistradosModule } from './proveedores-registrados/proveedores-registrados.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('CONEXION'),
      }),
    }),
    RegistrosModule,
    ProveedoresModule,
    ProveedoresRegistradosModule,
    UsuariosModule,
    AuthModule,
    NotasModule,
    StockModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
