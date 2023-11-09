import { Pipe, PipeTransform } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Pipe({
  name: 'productoPipe',
  standalone: true,
})
export class ProductoPipe implements PipeTransform {

  private productosFiltrados: Producto[];
  private productos: Producto[];

  constructor(private productoService: ProductoService) { }

  transform(value: any, ...arg: any): any {
    if (arg != '' || arg == undefined) {
      this.productoService.filtrarProductos(arg).subscribe(response => {
        this.productosFiltrados = response as Producto[];
      });
      return this.productosFiltrados;
    } else {
      this.productoService.getProductos().subscribe(response => {
        this.productos = response as Producto[];
      });
      return this.productos;
    }
  }

}
