import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public objetoUnico:any={};
  constructor () { }

  ngOnInit():void{
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
