import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterModule],
  providers: [NgbCarouselConfig]
})
export class ProductosComponent {

  public productos: Producto[];
  public url = environment.urlImagenProducto;
  public noImagen = environment.urlNoImagenProducto;

  constructor(private productoService: ProductoService){}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(response =>{
      this.productos = response as Producto[];
    })
  }
}
