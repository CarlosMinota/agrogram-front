import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/app/environments/environment';
import { FormModule } from 'src/app/form/forms.module';
import { Ciudad } from 'src/app/models/ciudad';
import { Departamento } from 'src/app/models/departamento';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, RouterModule, FormModule, ReactiveFormsModule]
})
export class PerfilComponent {

  public urlImagen = environment.urlImagenUsuario;
  public urlNoImagenUsuario = environment.urlNoImagenUsuario;
  public urlImagenProducto = environment.urlImagenProducto;
  public urlNoImagenProducto = environment.urlNoImagenProducto;
  public usuario: Usuario;
  public submitted: boolean = false;
  public mensaje: string = 'El campo es requerido';
  public departamentos: Departamento[];
  public ciudades: Ciudad[];
  public mensajeContrasenaMin: string = 'La contraseña debe ser mayor a 5 caracteres';
  public mensajeContrasenaMax: string = 'La contraseña no debe exceder los 16 caracteres';
  public mensajeUsernameMin: string = 'El nombre de usuario debe ser mayor a 3 caracteres';
  public mensajeUsernameMax: string = 'El nombre de usuario no debe exceder los 40 caracteres';
  public idUsuario: number;

  form: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(''),
    username: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    cedula: new FormControl(''),
    departamento: new FormControl(''),
    ciudad: new FormControl(''),
    contrasena: new FormControl(''),
  });

  constructor(public authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioService.getDepartamentos().subscribe(response => {
      this.departamentos = response.departamentos as Departamento[];
    });

    this.activatedRouter.paramMap.subscribe(params => {
      let idUsuario = +params.get('id');
      this.idUsuario = +params.get('id');
      // console.log(params)
      // console.log(this.usuario);
    });
    this.usuario = this.prueba();
    console.log(this.usuario , 'Dentro del onInit')

    this.form = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
        ]
      ],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      cedula: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
        ]
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(JSON.stringify(this.form.value, null, 2));
    if (this.form.invalid) {
      return;
    }
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  modalOpenRegiser(modalRegiser: any) {
    this.modalService.open(modalRegiser);
  }

  public listarCiudadesDepartamento(idDepartamento: number): void {
    this.usuarioService.getCiudadesDepartamento(idDepartamento).subscribe(response =>{
      this.ciudades = response.ciudades as Ciudad[];
    })
  }

  selectedOrgMod(valor) {
    this.listarCiudadesDepartamento(valor.target.value);
  }

  public editarUsuario(): void {
    console.log(this.usuario);
  }

  public prueba(): Usuario {
    this.usuarioService.getUsuario(this.idUsuario).subscribe(response => {
      this.usuario = response.usuario as Usuario;
    });
    return this.usuario;
  }
}
