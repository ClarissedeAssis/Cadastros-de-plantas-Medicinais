import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
