import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SouterCalculoAceroService } from '../services/souter-calculoAcero-service';

  @Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public producto!: FormGroup; // producto corresponde al nombre del formulario
  public listaproductos:any=[]; // listaproductos corresponde al nombre de la lista que se va a mostrar (maneja el json completo)
  public listaNoEstaVacia(): boolean { // listaNoEstaVacia corresponde al nombre de la funcion que se va a utilizar en el html para mostrar la lista
    return this.listaproductos.length > 0;
  }
  constructor(private formulario:FormBuilder,private SouterCalculoAceroService:SouterCalculoAceroService, private route:ActivatedRoute){}

  createForm(){
    this.producto = this.formulario.group({
      fecha: [new Date().toLocaleDateString(),Validators.required], // fecha corresponde al campo fecha que es lo que va a ingresar el ususario
      productos: ["",Validators.required], // productos corresponde al campo producto que es lo que va a ingresar el ususario
      piezas: ["",Validators.required], // piezas corresponde al campo piezas que es lo que va a ingresar el ususario
  });
  }

  resetForm(): void {
    this.producto.reset();
    this.producto.value.id();
  }

  // Con este metodo podemos obtener los valores de la API
  public cargaData()
  {
    this.SouterCalculoAceroService.get(`http://www.souter.somee.com/api/calculoAcero`).subscribe(
      respuesta=>{
        this.listaproductos=respuesta;
        console.log(respuesta);
      }
    )
  }

  ngOnInit(): void {
    this.createForm();
    this.cargaData();
  }
}