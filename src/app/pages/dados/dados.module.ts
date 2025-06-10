import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadosPageRoutingModule } from './dados-routing.module';

import { DadosPage } from './dados.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DadosPage]
})
export class DadosPageModule {}
