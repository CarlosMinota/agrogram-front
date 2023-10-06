import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { NotifierModule } from 'angular-notifier';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inicio',
      urls: [
        { title: 'Inicio', url: '/home' }
      ]
    },
    component: LandingComponent
  }
];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NotifierModule
  ]
})
export class LandingModule { }
