import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPlantaPageRoutingModule } from './categoria-planta-routing.module';

import { CategoriaPlantaPage } from './categoria-planta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPlantaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriaPlantaPage]
})
export class CategoriaPlantaPageModule {}
