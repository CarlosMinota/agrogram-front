import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioRoutes } from './usuarios.routing';
import { RegisterClienteComponent } from './register-cliente/register-cliente.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsuarioRoutes)
  ]
})
export class UsuarioModule { }
