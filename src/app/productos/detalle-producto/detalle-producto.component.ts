import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbCarousel, NgbCarouselModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { environment } from 'src/app/environments/environment';
import { ImagenProducto } from 'src/app/models/imagen-producto';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbCarouselModule, ReactiveFormsModule, FormsModule, NotifierModule],
  providers: [DecimalPipe, NgbCarousel]
})
export class DetalleProductoComponent {

  public producto: Producto;
  public urlImagen = environment.urlImagenProducto;
  public noImagen = environment.urlNoImagenProducto;
  public fotoSeleccionada: File;
  public imagenProducto: ImagenProducto = new ImagenProducto();
  private notifier: NotifierService;

  constructor(private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public decimalPipe: DecimalPipe,
    notifier: NotifierService,
    private modalService: NgbModal,
    private router: Router) {
    this.notifier = notifier;
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let idProducto = +params.get('id');
      this.productoService.getProductoEntidad(idProducto).subscribe(response => {
        this.producto = response.producto as Producto;
      })
    })
  }

  public eliminarProducto(producto: Producto): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar el producto ${producto.nombreProducto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(producto.idProducto).subscribe(
          response => {
            this.router.navigate(['/usuarios/detalle-perfil', producto.usuario.idUsuario]);
            swalWithBootstrapButtons.fire(
              'Producto eliminado!',
              `Producto ${producto.nombreProducto} eliminado con éxito.`,
              'success'
            )
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `Producto ${producto.nombreProducto} no se ha eliminado`,
          'error'
        );
      }
    });
  }


  public seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      this.fotoSeleccionada = null;
    }
  }

  public subirFoto() {
    if (!this.fotoSeleccionada) {
      this.showNotification('danger', 'No ha seleccionado ninguna imagen');
    } else {
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.idProducto).subscribe(event => {
        this.showNotification('success', 'La imagen se ha subido correctamente');
      });
    }
  }

  modalOpen(modalBasic: any) {
    this.modalService.open(modalBasic);
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
