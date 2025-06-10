import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaPageRoutingModule } from './consulta-routing.module';

import { ConsultaPage } from './consulta.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConsultaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class ConsultaPageModule {}
