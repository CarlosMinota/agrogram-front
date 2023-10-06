import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudad';
import { Departamento } from 'src/app/models/departamento';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports:[FormsModule, ReactiveFormsModule, CommonModule, RouterModule]
})
export class RegisterComponent {

  public usuario: Usuario = new Usuario();
  public errores: string[];
  public departamentos: Departamento[];
  public ciudades: Ciudad[];

  constructor(private usuarioService: UsuarioService,
    private router: Router){}

  ngOnInit(): void {
    this.usuarioService.getDepartamentos().subscribe(response => {
      this.departamentos = response.departamentos;
    });

  }
 
  public listarCiudadesDepartamento(idDepartamento: number): void {
    this.usuarioService.getCiudadesDepartamento(idDepartamento).subscribe(response =>{
      this.ciudades = response.ciudades as Ciudad[];
    })
  }

  selectedOrgMod(valor) {
    this.listarCiudadesDepartamento(valor.target.value);
  }

  public createUsuario(): void {
    this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: (usuario) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errores = err.error.errors as string[]
      }
    })
  }
}
