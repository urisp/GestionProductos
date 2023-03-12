import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { SouterPermisosService } from './services/souter-permisos-service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent,canActivate:[SouterPermisosService] },
  { path: 'formulario/:id', component: FormularioComponent, canActivate: [SouterPermisosService] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, ProductosComponent, FormularioComponent]