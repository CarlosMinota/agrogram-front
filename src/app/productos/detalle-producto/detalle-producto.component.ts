import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/app/environments/environment';
import { ImagenProducto } from 'src/app/models/imagen-producto';
import { Productos } from 'src/app/models/productos';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbCarouselModule, ReactiveFormsModule, FormsModule],
  providers: [DecimalPipe, NgbCarousel]
})
export class DetalleProductoComponent {

  public producto: Productos;
  public urlImagen = environment.urlImagenProducto;
  public noImagen = environment.urlNoImagenProducto;
  public fotoSeleccionada: File;
  public imagenProducto: ImagenProducto = new ImagenProducto();

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    public decimalPipe: DecimalPipe){}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let idProducto = +params.get('id');
      this.productoService.getProducto(idProducto).subscribe(response =>{
        this.producto = response.producto as Productos;
      })
    })
  }

  public seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      this.fotoSeleccionada = null;
    }
  }

  public subirFoto() {
    console.log(this.fotoSeleccionada);
    console.log(this.producto.idProducto);
    if (!this.fotoSeleccionada) {

    } else {
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.idProducto).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          console.log(response.producto);
        }
        });
    }
  }
}
