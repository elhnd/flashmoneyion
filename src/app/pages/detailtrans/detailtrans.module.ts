import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IonicModule } from '@ionic/angular';

import { DetailtransPage } from './detailtrans.page';

const routes: Routes = [
  {
    path: '',
    component: DetailtransPage
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
  ],
  declarations: [DetailtransPage]
})
export class DetailtransPageModule {}
