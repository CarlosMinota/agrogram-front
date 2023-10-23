import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Ciudad } from 'src/app/models/ciudad';
import { Departamento } from 'src/app/models/departamento';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports:[FormsModule, ReactiveFormsModule, CommonModule, RouterModule, NotifierModule, NgScrollbarModule]
})
export class RegisterComponent {

  public usuario: Usuario = new Usuario();
  public errores: string[];
  public departamentos: Departamento[];
  public ciudades: Ciudad[];
  private notifier: NotifierService;
  public submitted: boolean = false;
  public mensaje: string = 'El campo es requerido'
  public mensajeContrasenaMin: string = 'La contraseña debe ser mayor a 5 caracteres';
  public mensajeContrasenaMax: string = 'La contraseña no debe exceder los 16 caracteres';
  public mensajeUsernameMin: string = 'El nombre de usuario debe ser mayor a 3 caracteres';
  public mensajeUsernameMax: string = 'El nombre de usuario no debe exceder los 40 caracteres';

  form: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(''),
    username: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    departamento: new FormControl(''),
    ciudad: new FormControl(''),
    contrasena: new FormControl(''),
  });

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    notifier: NotifierService,
    private formBuilder: FormBuilder){
      this.notifier = notifier;
    }

  ngOnInit(): void {
    this.usuarioService.getDepartamentos().subscribe(response => {
      this.departamentos = response.departamentos;
    });

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
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15)
        ]
      ],
    })
  }
 
  public listarCiudadesDepartamento(idDepartamento: number): void {
    this.usuarioService.getCiudadesDepartamento(idDepartamento).subscribe(response =>{
      this.ciudades = response.ciudades as Ciudad[];
    })
  }

  selectedOrgMod(valor) {
    this.listarCiudadesDepartamento(valor.target.value);
  }

  public validacionesUsuario(): void {
    this.exitsByUsername();
    this.exitsByEmail();
    this.createUsuario();
  }

  public createUsuario(): void {
    this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: (usuario) => {
        this.showNotification('success', 'El registro ha sido exitoso')
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errores = err.error.errors as string[]
      }
    })
  }

  public exitsByUsername(): void {
    this.usuarioService.exitsByUsername(this.usuario.username).subscribe(response => {
      if (response.mensaje) {
        this.showNotification('error', response.mensaje);
      }
    });
  }

  public exitsByEmail(): void {
    this.usuarioService.exitsByEmail(this.usuario.email).subscribe(response => {
      if (response.mensaje) {
        this.showNotification('error', response.mensaje);
      }
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
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
}
