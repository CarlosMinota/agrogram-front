import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosRoutes } from './productos.routing';

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(ProductosRoutes)],
  declarations: []
})
export class ProductosModule { }
