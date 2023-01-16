import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';

const rutas:Routes=[
  {
    path:'', redirectTo:'login', pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'productos', component:ProductosComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
