import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { Categoria } from 'src/app/models/categoria';
import { PresentacionProducto } from 'src/app/models/presentacion-producto';
import { ProductoDto } from 'src/app/models/productoDto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html'
})
export class FormProductoComponent implements OnInit {

  public producto: ProductoDto = new ProductoDto();
  public usuario: Usuario;
  public categorias: Categoria[];
  public presentacionProducto: PresentacionProducto[];
  public submitted = false;
  public fotoSeleccionada: File;
  public errores: string[];

  form: FormGroup = new FormGroup({
    nombreProducto: new FormControl(''),
    precio: new FormControl(''),
    categoria: new FormControl(''),
    presentacion: new FormControl(''),
    descripcion: new FormControl(''),
    infoProduccion: new FormControl(''),
    imagen: new FormControl('')
  })

  constructor(private productoService: ProductoService,
    private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.productoService.getCategorias().subscribe(categorias =>{
      this.categorias = categorias as Categoria[];
    });
    
    this.productoService.getPresentacionProductos().subscribe(presentacion =>{
      this.presentacionProducto = presentacion as PresentacionProducto[];
    });

    this.activatedRoute.paramMap.subscribe(params =>{
      let usuarioId = +params.get('usuarioId');
      this.usuarioService.getUsuario(usuarioId).subscribe(response =>{
        this.producto.usuario = response.usuario.idUsuario;
      })
    })

    this.form = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      precio: ['', Validators.required],
      categoria: ['', Validators.required],
      presentacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      infoProduccion: ['', Validators.required],
      imagen: ['', Validators.required]
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
    this.productoService.crearProducto(this.producto).subscribe({
      next: (producto) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errores = err.error.errors as string[]
      }
    });
  }
}
