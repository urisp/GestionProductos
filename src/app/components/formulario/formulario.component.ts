import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SouterCalculoAceroService } from '../../services/souter-calculoAcero-service';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  campos: any;
  public producto!: FormGroup; // producto corresponde al nombre del formulario
  resultadoNoBarra$!: Observable<number>;
  resultadoNoBarra!: Observable<number>;
  resultadoKilogramos$!: Observable<number>;
  resultadoPiezasBarra$!: Observable<number>;
  public listaproductos:any=[]; // listaproductos corresponde al nombre de la lista que se va a mostrar (maneja el json completo)
  public listaproducto:any; // listaproducto corresponde al nombre del producto que se va a mostrar (id)
  public listaNoEstaVacia(): boolean { // listaNoEstaVacia corresponde al nombre de la funcion que se va a utilizar en el html para mostrar la lista
    return this.listaproductos.length > 0;
  }
  constructor(private formulario:FormBuilder,private SouterCalculoAceroService:SouterCalculoAceroService, private route:ActivatedRoute){}
  
  createForm(){
    this.producto = this.formulario.group({
      fecha: [new Date().toLocaleDateString(),Validators.required],
      piezas: ["",Validators.required],
      resultadoNoBarra: '',
      resultadoKilogramos: '',
      resultadoPiezasBarra: '',
    });
    this.resultadoNoBarra$ = this.producto.valueChanges.pipe(map(({ piezas }) => piezas / this.campos.longBarra));
    this.resultadoPiezasBarra$ = this.producto.valueChanges.pipe(map(({ piezas }) => piezas / 384));
    this.resultadoKilogramos$ = this.producto.valueChanges.pipe(map(({ piezas }) => piezas / this.campos.pesoTocho));
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
        this.listaproductos=respuesta; // lista productos te trae el json completo
      }
    )
  }

  ngOnInit(): void {
    this.createForm();
    this.cargaData();
    this.route.params.subscribe(params => {
      const id= params['id'];
      this.SouterCalculoAceroService.getCalculoAcero(id).subscribe(data=>{
        this.campos=data;
      });
    });
  }
}
