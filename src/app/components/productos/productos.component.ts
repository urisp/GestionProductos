import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SouterPermisos } from 'src/app/services/souter-autenticacion-service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public objetoUnico:any={};
  constructor (private aut:SouterPermisos,private router:Router) { }

  public cerrarSesion(){
    this.aut.limpiarToken();
    this.router.navigateByUrl("/login");
  }

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

fetch('http://www.souter.somee.com/api/calculoAcero')
  .then(response => response.json())
  .then(data => {
    // Obtener el contenedor de las cards
    const container = document.getElementById('container');
    if (container) {
      // Recorrer los datos y crear las cards
      data.forEach((article: any) => {
        // Crear un nuevo elemento de card
        const card = document.createElement('div');
        card.classList.add('col', 's12', 'm6', 'l4');
        card.innerHTML = `
          <div class="card">
            <div class="card-image">
              <img src="${article.image}">
            </div>
            <div class="card-content">
              <span class="card-title">${article.descripcion}</span>
              <p>${article.codigo}</p>
            </div>
            <div class="card-action">
              <a href="${article.url}" target="_blank">Consultar Reporte</a>
            </div>
          </div>
        `;
        // Agregar la card al contenedor
        container.appendChild(card);
      });
    }
  })
  .catch(error => {
    console.error(error);
  });