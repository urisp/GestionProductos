import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl, FormBuilder } from '@angular/forms';

  @Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public producto!: FormGroup;
  constructor(private formulario:FormBuilder){}

  createForm(){
    this.producto = this.formulario.group({
      fecha: [new Date().toLocaleDateString(),Validators.required],
      productos: ["",Validators.required],
      piezas: ["",Validators.required],
  });
  }

  resetForm(): void {
    this.producto.reset();
    this.producto.value.id();
  }

  ngOnInit(): void {
    this.createForm();
  }
}