import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SouterCalculoAceroService } from '../../services/souter-calculoAcero-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import pdfMake  from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  campos: any;
  valorNoBarras: number;
  valorPiezasBarra: number;
  valorKilogramos: number;
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
    this.resultadoPiezasBarra$ = this.producto.valueChanges.pipe(map(({}) => Math.floor(( this.campos.longBarra / this.campos.longTocho * 100))));
    this.resultadoNoBarra$ = this.producto.valueChanges.pipe(map(({ piezas }) => Math.ceil(( piezas / this.campos.piezasBarra)))); // this.valorPiezasBarra
    this.resultadoKilogramos$ = this.producto.valueChanges.pipe(map(({}) => Math.ceil((this.valorNoBarras * this.campos.pesoTramo))));
    this.resultadoPiezasBarra$.subscribe(valorPiezasBarra => this.valorPiezasBarra = valorPiezasBarra);
    this.resultadoNoBarra$.subscribe(valorNoBarras => this.valorNoBarras = valorNoBarras);
    this.resultadoKilogramos$.subscribe(valorKilogramos => this.valorKilogramos = valorKilogramos);
  }

  resetForm(): void {
    this.producto.reset();
    this.producto.value.id();
  }

  // Con este metodo podemos obtener los valores de la API
  public cargaData()
  {
    this.SouterCalculoAceroService.get(`https://www.souter.somee.com/api/calculoAcero`).subscribe(
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
  createPdf(){
    const pdfDefinition:any={
      content:[
        {
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU4AAABeCAMAAAB7LA10AAAATlBMVEX///8AsssDtMsQuM7K7/Unv9P4/f7m+PrE7vP8//8au9Bfz95Xzd1w1OKv5+/t+vxCx9jb9fjf9vm87PKJ3Od92OSk5OyY4Op41+NHyNlISS3VAAAMR0lEQVR4nO1diZarKBBt3Pd9/f8fHagqFFw6or4kPcf7zpnOJIp4qR3En5+DyEun7nqOrnbK/OhZD9bIgz4uIotNsKIi7oOH0xMo+zFim4jGvvx07/4W/L6wtrkkMS16/9N9/DNwUvs3LklGU+fT/fwTcJJfBVMR0eQh9BXKeE2mZUUc1sYP8WNEf4PX2Jw8guDLTdouKMvc8/KyDLo2ceHr6RC78T7d5++FU8xUcesY9+WKLK/s40g9qng0fgf9JJqM2Um2G1/mWWJPjDK7f2cf/wzyWFLEyRxeGMVysOej4yewX6EsZnlLq9fHV+ksy8XjkRZwIilsVnqQnDK15DnRY0A1BFLUmFsfP6t25Vl28O/69vdQE5uMpUZ2ME/Jgj58KpCyecJL9/bD5wIl2U3mnjCBDik8ix5/BMglIcUBh75GVcjBeOIljjCRbJ6kI5d8JuG9PftW5E7W8Nx7u0TZSDZPVzB9yWdzuod/B2Ed0wSFPfZrAQxkgHShHuzLgOn/747qAkppdgQlYbdfKCQZTmZfCsQd9O//e/Pp8cyFuWld+nkVNILZRULYklxl166TkYy3J851sgXqoPzOqZN8ZCyaNTwUoqolhCXmiSy9eqWUhuVEtJRsFPrtIg2+zrF5nM1EG2iv1QPEhJT0chHYI6ORmJ+6QSegMEh334KBJ43LMe64D5/Iq6mIcYMLCaiAYt7UHp3MOmM6/h0Ci43hT9Ui+gBZbNgU0ITjTaouAOrOxBUNsUsnY8MdHbsLI4t4nhNMnXNBcjiHNhmAAISTRbf441ykquyEeAKd1pgQxrFwbTnN193Rs3sQYFzN6RzjOE5cHniC1XSmeDuBehC7aXaiBzrNrSfSqSa4Xu60ONUffY+LT7EznE6w6WHLSKtH5oJGlkKY7gsWRQgriDF17kjn8izHBT6/JtHivjYWfzmdGFR6ESvgQ0edb2GO9y7hBPEUDJg6kG06hXIJA/Ut4VJloeVR6RzhQ4m/eGL877KcAjkms6ZR1w6du99/BgGzHPyLyp7zsAkFkfMqDBwM/01uHZFifGPojPZo66G1bwk+M+oip7PgDrOIuJcguXFZ9ANRqcDF9FIF6qdpeLNHZ7DTPd+peSK6v3TXD2r+828qAi0E1S92JKyCTG8kI28pAyXLbeWvQGcItp57ovgYDswieeg+DO3d73QupLPqRzQpVhRnG5T5fWHj3cKEbC96rne8bAuMw2x30Os+pThYXK9qZCPxpGn1rOxxk3IGp47xux7RrzO2sZBrDwdqTijwhvZuj85s/X3eaksl3ZXo9soSX4uLz8gWMZivLba0YvU3GL9m0UhCR3C6MjqIE5kn8+RYBd48w8OP4wCd9Rn7sUdnupJ0Cp4UpJqAioUsKsY8WdAZLFuIFOkHOvtw0YiLPeMymNJB4vZ4VCgrxBnIbfoP6PRx6M282w6dFbSlRnG1FCzLntKmUdFkL5l/p18Lnc6pBTuSLSilSaQzXQ4ZlThijIFkoFRbGIeKH0QsU/wDOqnR4jiXP3t0+tCUmmI4yIUVZ6VfOT1eanKvP1JA2Njx34Nh0tiZTmohGoIq950GJXWe0QY6YcVllGZBkEm7gENa44cp7kyYBZLNrcAAKbYZnYdCFpQPs1B2nWQKj4KOUrlmjnc/LYD0epSvKW+q0cHINL+SSjs1TS1M9lJUK9Uhm5x2Q99UI/w/GpywgCMnOkvKJ2MQBfREJnRGxWtQo0a+COlMW4khjQsSRLUC0q6UG1VXXswDcbXnAQjTBZ3Yglqy7LU0juhUmsA2SS8zsGLBNHMxWFYj5iHAts2FpkOwDEIAxowC+b0CneWqzfigTXpJBAN9MmHoBlVb6xUanWjY9QLioDZKlGjm2lK+iYUqeKWMePmnSiygARlFx86Dr0OwmXVIkIkJI9e+R6e+JqXfahiUkcqN0EyhkeVYKp3QwsIDoMnrVTq1HNmD30l8hbEY9Fi3s8n2NjhygXcIojJ66B/CqA60Wz621UdDxtWt/kiJBJPgrwIBeZKkE2R1WT4EgzCqdA7rFmSkUrr6lEvJ5dXGEUZDbR90Gj7N/B5jU+rfMfxSjbcmenJVTCZgGgZXA2btxbKgXqFzHXgJgJKS69xKw2KVzh9fsFv0ZR6GXpXFtizJy5DmaPVHjL2ojh7k0yhSWroi7osSVwaIUlZQb1fBBdwtaDj4mWV6C2cRncD3yklWcARqQbBxRKpLRwgZkxWB/ePDl0pb7hrdN0rnYTrdg80CtgKlsOopfyFxyjYO+iHxizBe2dAKkGk6CyU1C2oVQQbjhgoLdNp6/T9dNpvPz1e6yjptczoNbOcJOlexFWWMtkLGOp7NpkMKTSsJUOYhOod9m0JjhnTq11jRyRstszZNh95RNds1VXZLavveX8V2nlD2dajqYRCN9rLZ7u2swe58rAIlyVyk4hrwvGBjyDbo3L+JpWjvAm3nRJo1U6h9knwaTb/tVt0dpbi/aRoVc4flxlVE8TY6W1M6rSWfK05nPo2mi/YnMYr5l2abTpROwdemdKrKDnRa9iZwGK7Q2bHdu9jAvnQu/D3CaHp8n040d+DO0XaulD2bZOKl7QRiCn8TSqB0kk4qTR6cipmkky34XJEMME8yN+lUMqFuW5cWnn1pZCC2Jzp3zIWCK3RSCeTgrDD2i62kU6FYkc4zJZCtU5qZTjSSqxrhXGJ+GXf2L43bFTqpQHew0ltpUwLL/yyrI2cKdFt0xrOob+c0SuK4GaWrWdHm1JOGK3SaVXrzyKQCckf5+EemkMgGeu5xcUQ5F3y0YoZ2j0QnHrAUH6dIhj67bjtl0n7QtZfOEaB2mqXs+3Si6aQi0bB1VKuYALgfPTINtIoSXGeZ1adKs5foxM7euyxgo2L4Gnt00lQENYZBqO5rSlvh21mt6KHqu6Qz27BuWguX6MTLn1rNvgsMZg/NKs3Yytm5dmdo3KeCcbIaqRztVae1Mx+QU6lKNk2rADYKzFRFvUTnuTUGvyI0y1wJSIOTz/DpsQjt7qkW3Ez9pZmcaS11SdOoxF4gW5hGiqbCV4TLFi7RKWeGb3wUnQTecNUTpbvRDHuOI5Qn6cgwj7iK2qfFBcoTPGS+7LjPsmbeV2sW/FhrIc9cnYFrdGJocf+SL1Nz/Ev5WHuwUU6lMTdJ45EYt9WLtYuzrViJO3+mogq0kCY0czxL6zU6sRh464JEttGhl9in09LXRYWrFQXaIg6ORouA7c6BP7NZztfXUnT/Gp1w6D9YLmsq7nt0RvHKDnX6mhh9iZFAMM6Ejs66IBz2i/3g1NnSi3Q6tJj7pp2lPFrMbWqM41WBJ4rcpK23ImK/cSe+onirNOC0hctbcFMht/WaoKqdW7CKXr33QFx7sbR9EN8dE5AQd6G66/GIDpfjFaahQr4u8OT7bXhOnyZjEm/TjYfwFrAB8OVLcZEtDF25Oo9Dv3Q+F5xeIkM673nWAB6WZbcuv70M8PVmKe8FyCf/bnk8osGVIneZDmPUQbUSi+G45bsDHT19fcN6/hLnOj/3YJUr9hLW7TamFe/b1M3DfRJOPPm3hHwesfiUcOJ6DT1lxtnkN26ZRc+4Xlf3hlaJfO5BC1BszQ1U7pYn+qeI76FBDsv77NQKWM1Snjenpd9vtT4V1oXhYdgbWvngI5QhLRNqHLGCyA9o7fCbt8/JYHbi/LY/ArD1j4jhPxokUX10XkEE7L57gGO5C9JpG+PJnZg+qOoC9Xqj+/Ht6iKKsCCfZ/lENtk1Ab8F1WIf7Kj/QJwxbUGXnKIjT0DTv2MTOiedMnL7U68KqC1pP0/4o2kLug/GSCq8su6HuO2CS771EjpL7spnvPNE4JIXsr5on4lPo5fyqUzFHEHYyIGw3pfK/QH0khY2GljAcmRSNh82NXQkn+JFBQc9Uj69AuHR9BXqCMMdUWM7El94YvE6LZePvsMLfRXKAulBQl9IaC7JhPdEfEGE9H2g1xoQoYOz65RCZ3DZJMvPSw320EUKoZbbbr3WLQ9g7mo6LHrM5i5ElmZNSixe69ZmTgUzYWGeV07W4gvgZs5XU7MPVNQFW0LM046jG0XrV5Z93Z6QXwevW26XsQu3e9799Bpe9/trCBFW8ZB5EGGQ7rwjUyL6wr10vxl5Frs7Mmq58f6bth7swXP6eN6YFJm03Vh/tPOBCULfqYFUILJ2/EfFN/EfWcWHmQT1Q6wAAAAASUVORK5CYII=',
          width: 100,
          height: 25,
        },
        {
          text: 'Corte de Acero', style: 'header',alignment: 'center'},
        {
          table: {
            body: [
              [{text: 'Fecha', style: 'tableHeader',alignment: 'center'},{text: this.producto.value.fecha, style: 'tableHeader', alignment: 'center',colSpan: 2},{}],
              [{text: 'Producto a cortar', style: 'tableHeader',alignment: 'center'},{text: this.campos.descripcion, style: 'tableHeader', alignment: 'center',colSpan: 2},{}],
              [{text: 'Colada', style: 'tableHeader',alignment: 'center'},{text: this.campos.colada, style: 'tableHeader', alignment: 'center',colSpan: 2},{}],  
              [{text: '', style: 'tableHeader', alignment: 'center'}, {text: 'Teorico', style: 'tableHeader', alignment: 'center'}, {text: 'Practico', style: 'tableHeader', alignment: 'center'}],
              [{text: 'Calidad', style: 'tableHeader',alignment: 'center'},{text: this.campos.calidadAcero, style: 'tableHeader', alignment: 'center',colSpan: 2},{}],
              [{text: 'No.barras', style: 'tableHeader',alignment: 'center'},{text: this.valorNoBarras, style: 'tableHeader', alignment: 'center',colSpan: 2},{}],
              [{text: 'Piezas a cortar', style: 'tableHeader',alignment: 'center'},{text: this.producto.value.piezas, style: 'tableHeader', alignment: 'center',colSpan: 2},{}],
              [{text: 'Kilogramos a cortar', style: 'tableHeader',alignment: 'center'},{text: this.valorKilogramos + ' kgs', style: 'tableHeader', alignment: 'center',colSpan: 2},{}],
              [{text: 'Diametro', style: 'tableHeader', alignment: 'center'}, {text: this.campos.tipoAcero, style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}],
              [{text: 'Largo de barra', style: 'tableHeader', alignment: 'center'}, {text: this.campos.longBarra + ' mts', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}],
              [{text: 'Longitud de tocho', style: 'tableHeader', alignment: 'center'}, {text: this.campos.longTocho +' cm', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}],
              [{text: 'Peso de tocho', style: 'tableHeader', alignment: 'center'}, {text: this.campos.pesoTocho + ' kgs', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}],
              [{text: 'Piezas por barra', style: 'tableHeader', alignment: 'center'}, {text: this.campos.piezasBarra, style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}],
              [{text: 'Almacen', style: 'tableHeader', alignment: 'center'}, {text: 'Operador', style: 'tableHeader', alignment: 'center'}, {text: 'Aseguramiento Calidad', style: 'tableHeader', alignment: 'center'}],
              [{text: '                     ', style: 'tableHeader', alignment: 'center'}, {text: '                     ', style: 'tableHeader', alignment: 'center'}, {text: '                     ', style: 'tableHeader', alignment: 'center'}],					  
            ]
          }
        }
      ]
    }
    const pdf= pdfMake.createPdf(pdfDefinition);
    pdf.open();
	}
}
