import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { JwtGuard } from './guard/jwt.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent/*, canActivate: [jwtGuard]*/ },
  { path: 'productos', component: ProductosComponent/*, canActivate: [JwtGuard]*/ },
  { path: 'formulario', component: FormularioComponent/*, canActivate: [JwtGuard]*/ },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, ProductosComponent, FormularioComponent]