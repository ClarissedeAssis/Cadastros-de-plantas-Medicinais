import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';

import { DetalhesPageRoutingModule } from './detalhes-routing.module';
import { DetalhesPage } from './detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetalhesPageRoutingModule,
    NgClass
  ],
  declarations: [DetalhesPage]
})
export class DetalhesPageModule {}
