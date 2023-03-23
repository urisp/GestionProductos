import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SouterPermisos } from 'src/app/services/souter-autenticacion-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  cards:any[]=[];
  public objetoUnico:any={};
  constructor (private aut:SouterPermisos,private router:Router,private http:HttpClient) { }

  public cerrarSesion(){
    this.aut.limpiarToken();
    this.router.navigateByUrl("/login");
  }

  ngOnInit():void{
    this.http.get<any[]>('http://www.souter.somee.com/api/calculoAcero').subscribe(cards => {
      this.cards = cards;
    });
    let token=sessionStorage.getItem("token") as string;
    this.objetoUnico=this.decodificarJWT(token);
  }
  private decodificarJWT(token:string):any
  {
    var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        // document.location.href="/productos";
    }).join(''));
    return JSON.parse(jsonPayload);  
  }
}

