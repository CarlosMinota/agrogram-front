import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, flatMap, map } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [NgbCarouselConfig]
})
export class ProductosComponent {

  public productos: Producto[];
  public productosFiltrados: Observable<Producto[]>;
  public url = environment.urlImagenProducto;
  public noImagen = environment.urlNoImagenProducto;
  public autoCompleteControl: FormControl
  public form: FormGroup = new FormGroup({
    autoCompleteControl: new FormControl('')
  });

  constructor(private productoService: ProductoService){}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(response =>{
      this.productos = response as Producto[];
    });
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string'? value: value.nombreProducto),
      flatMap(value => value ? this.filter(value): [])
    )
  }

  private filter(nombreProducto: string): Observable<Producto[]> {
    const filtervalue = nombreProducto.toLowerCase();

    return this.productoService.filtrarProductos(filtervalue);
  }
}
