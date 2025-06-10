import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarPageRoutingModule } from './visualizar-routing.module';

import { VisualizarPage } from './visualizar.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarPageRoutingModule,
     ReactiveFormsModule
  ],
  declarations: [VisualizarPage]
})
export class VisualizarPageModule {}
