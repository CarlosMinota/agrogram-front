import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { PresentacionProducto } from 'src/app/models/presentacion-producto';
import { ProductoDto } from 'src/app/models/productoDto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormProductoComponent implements OnInit {

  public producto: ProductoDto = new ProductoDto();
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
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.productoService.getCategorias().subscribe(categorias =>{
      this.categorias = categorias as Categoria[];
    });
    
    this.productoService.getPresentacionProductos().subscribe(presentacion =>{
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
}
