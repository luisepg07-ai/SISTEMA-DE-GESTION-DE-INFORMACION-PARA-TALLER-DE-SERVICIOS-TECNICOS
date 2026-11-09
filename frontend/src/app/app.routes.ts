import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { CrearRegistroComponent } from './layouts/registros/crear-registro/crear-registro.component';
import { MostrarRegistrosComponent } from './layouts/registros/mostrar-registros/mostrar-registros.component';
import { EditarRegistroComponent } from './layouts/registros/editar-registro/editar-registro.component';
import { MostrarProductoComponent } from './layouts/proveedores/mostrar-producto/mostrar-producto.component';
import { MostrarProveedoresComponent } from './layouts/proveedores/mostrar-proveedores/mostrar-proveedores.component';
import { CrearProveedorComponent } from './layouts/proveedores/crear-proveedor/crear-proveedor.component';
import { CrearProductoComponent } from './layouts/proveedores/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './layouts/proveedores/editar-producto/editar-producto.component';
import { EditarProveedorComponent } from './layouts/proveedores/editar-proveedor/editar-proveedor.component';
import { LoginComponent } from './layouts/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { MostrarNotasComponent } from './layouts/notas/mostrar-notas/mostrar-notas.component';
import { CrearNotaComponent } from './layouts/notas/crear-nota/crear-nota.component';
import { EditarNotaComponent } from './layouts/notas/editar-nota/editar-nota.component';
import { MostrarStockComponent } from './layouts/stock/mostrar-stock/mostrar-stock.component';
import { CrearStockComponent } from './layouts/stock/crear-stock/crear-stock.component';
import { EditarStockComponent } from './layouts/stock/editar-stock/editar-stock.component';
import { CrearUsuarioComponent } from './layouts/usuarios/crear-usuario/crear-usuario.component';
import { MostrarUsuariosComponent } from './layouts/usuarios/mostrar-usuarios/mostrar-usuarios.component';
import { EditarUsuarioComponent } from './layouts/usuarios/editar-usuario/editar-usuario.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: '', component: MostrarRegistrosComponent, canActivate: [authGuard] },
  { path: 'crear-registro', component: CrearRegistroComponent, canActivate: [authGuard] },
  { path: 'mostrar-registros', component: MostrarRegistrosComponent, canActivate: [authGuard] },
  { path: 'editar-registro', component: EditarRegistroComponent, canActivate: [authGuard] },
  { path: 'mostrar-productos', component: MostrarProductoComponent, canActivate: [authGuard] },
  { path: 'mostrar-proveedores-registrados', component: MostrarProveedoresComponent, canActivate: [authGuard] },
  { path: 'crear-proveedor', component: CrearProveedorComponent, canActivate: [authGuard] },
  { path: 'editar-proveedor', component: EditarProveedorComponent, canActivate: [authGuard] },
  { path: 'crear-producto', component: CrearProductoComponent, canActivate: [authGuard] },
  { path: 'editar-producto', component: EditarProductoComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'mostrar-notas', component: MostrarNotasComponent, canActivate: [authGuard] },
  { path: 'crear-nota', component: CrearNotaComponent, canActivate: [authGuard] },
  { path: 'editar-nota', component: EditarNotaComponent, canActivate: [authGuard] },
  { path: 'mostrar-stock', component: MostrarStockComponent, canActivate: [authGuard] },
  { path: 'crear-stock', component: CrearStockComponent, canActivate: [authGuard] },
  { path: 'editar-stock', component: EditarStockComponent, canActivate: [authGuard] },
  { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [authGuard] },
  { path: 'mostrar-usuarios', component: MostrarUsuariosComponent, canActivate: [authGuard] },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [authGuard] },
];
