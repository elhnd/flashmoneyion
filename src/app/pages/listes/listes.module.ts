import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IonicModule } from '@ionic/angular';
import { OrderModule } from 'ngx-order-pipe';

import { ListesPage } from './listes.page';

const routes: Routes = [
  {
    path: '',
    component: ListesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    OrderModule
  ],
  declarations: [ListesPage]
})
export class ListesPageModule {}
