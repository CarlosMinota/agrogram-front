import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { environment } from 'src/app/environments/environment';
import { FormModule } from 'src/app/form/forms.module';
import { Ciudad } from 'src/app/models/ciudad';
import { Departamento } from 'src/app/models/departamento';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioDto } from 'src/app/models/usuarioDto';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, RouterModule, FormModule, ReactiveFormsModule, NotifierModule]
})
export class PerfilComponent {

  public urlImagen = environment.urlImagenUsuario;
  public urlNoImagenUsuario = environment.urlNoImagenUsuario;
  public urlImagenProducto = environment.urlImagenProducto;
  public urlNoImagenProducto = environment.urlNoImagenProducto;
  public usuario: Usuario;
  public usuarioForm: UsuarioDto;
  public submitted: boolean = false;
  public mensaje: string = 'El campo es requerido';
  public departamentos: Departamento[];
  public ciudades: Ciudad[];
  public mensajeContrasenaMin: string = 'La contraseña debe ser mayor a 5 caracteres';
  public mensajeContrasenaMax: string = 'La contraseña no debe exceder los 16 caracteres';
  public mensajeUsernameMin: string = 'El nombre de usuario debe ser mayor a 3 caracteres';
  public mensajeUsernameMax: string = 'El nombre de usuario no debe exceder los 40 caracteres';
  public idUsuario: number;
  private notifier: NotifierService;
  public fotoSeleccionada: File;

  form: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(''),
    username: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    cedula: new FormControl(''),
    ciudad: new FormControl(''),
    contrasena: new FormControl(''),
  });

  constructor(public authService: AuthService,
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuarioService,
    private fb: UntypedFormBuilder,
    notifier: NotifierService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.notifier = notifier;
    }

  ngOnInit(): void {
    this.usuarioService.getDepartamentos().subscribe(response => {
      this.departamentos = response.departamentos as Departamento[];
    });

    this.activatedRouter.paramMap.subscribe(params => {
      let idUsuario = +params.get('id');
      this.usuarioService.getUsuario(idUsuario).subscribe(response =>{
        this.usuarioForm = response.usuario;
      });
      this.usuarioService.getUsuarioEntidad(idUsuario).subscribe(response =>{
        this.usuario = response.usuario;
      })
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
      cedula: ['', Validators.required],
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
    this.usuarioForm.departamento = valor.target.value;
    this.listarCiudadesDepartamento(valor.target.value);
  }

  public editarUsuario(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.usuarioService.updateUsuario(this.usuarioForm).subscribe(response =>{
      this.showNotification('success', response.mensaje)
    })
  }

  public eliminarUsuario(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar su perfil?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(usuario.idUsuario).subscribe(
          response => {
            this.authService.logout();
            this.router.navigate(['/usuarios']);
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `Su perfil no se ha eliminado`,
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
      this.usuarioService.subirFoto(this.fotoSeleccionada, this.usuario.idUsuario).subscribe(event => {
        this.authService.usuario.imagen = this.fotoSeleccionada.name;
        console.log(this.authService.usuario)
        this.showNotification('success', 'La imagen se ha subido correctamente');
      });
      this.ngOnInit();
    }
  }

  modalOpen(modalBasic: any) {
    this.modalService.open(modalBasic);
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  public compararCiudad(o1: Ciudad, o2: Ciudad): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return (o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idCiudad === o2.idCiudad);
  }

  public compararDepartamento(o1: Departamento, o2: Departamento): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false: o1.idDepartamento === o2.idDepartamento;
  }
}
