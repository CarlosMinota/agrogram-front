import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { PresentacionProducto } from 'src/app/models/presentacion-producto';
import { Producto } from 'src/app/models/producto';
import { ProductoDto } from 'src/app/models/productoDto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class FormProductoComponent implements OnInit {

  public producto: ProductoDto = new ProductoDto();
  public productoCargar: Producto;
  public usuario: Usuario;
  public categorias: Categoria[];
  public presentacionProducto: PresentacionProducto[];
  public submitted = false;
  public fotoSeleccionada: File;
  public errores: string[];
  public mensaje: string = 'El campo es requerido';

  form: FormGroup = new FormGroup({
    nombreProducto: new FormControl(''),
    precio: new FormControl(''),
    categoria: new FormControl(''),
    presentacion: new FormControl(''),
    descripcion: new FormControl(''),
    infoProduccion: new FormControl(''),
  })

  constructor(private productoService: ProductoService,
    private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private activatetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatetedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id != 0) {
        this.productoService.getProducto(id).subscribe(response => {
          this.producto = response.producto;
        })
      }
    })

    this.productoService.getCategorias().subscribe(categorias => {
      this.categorias = categorias as Categoria[];
    });

    this.productoService.getPresentacionProductos().subscribe(presentacion => {
      this.presentacionProducto = presentacion as PresentacionProducto[];
    });

    this.form = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
      presentacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      infoProduccion: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public createProducto(): void {
    if (this.form.invalid) {
      return;
    }
    this.producto.usuario = this.authService.usuario.idUsuario;
    this.productoService.crearProducto(this.producto).subscribe({
      next: (producto) => {
        this.router.navigate(['/usuarios/detalle-perfil', this.authService.usuario.idUsuario]);
      },
      error: (err) => {
        this.errores = err.error.errors as string[]
      }
    });
  }

  public editarProducto(): void {
    this.producto.usuario = this.authService.usuario.idUsuario;
    console.log(this.producto);
    this.productoService.updateProducto(this.producto).subscribe(response =>{
      console.log(response.producto, ' Dentro del subcribe');
      this.router.navigate(['/productos/detalle-producto', response.producto.idProducto]);
    })
  }

  public compararCategoria(o1: Categoria, o2: Categoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return (o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idCategoria === o2.idCategoria);
  }

  public compararPresentacion(o1: PresentacionProducto, o2: PresentacionProducto): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false: o1.idPresentacion === o2.idPresentacion;
  }
}
