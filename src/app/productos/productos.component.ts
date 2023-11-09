import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, flatMap, map } from 'rxjs';
import { ProductoPipe } from '../pipes/producto.pipe';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterModule, FormsModule, ReactiveFormsModule, ProductoPipe],
  providers: [NgbCarouselConfig]
})
export class ProductosComponent {

  public productos: Producto[];
  public productosFiltrados: string;
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
  }
}
