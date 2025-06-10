import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'consulta',
        loadChildren: () =>
          import('../consulta/consulta.module').then(m => m.ConsultaPageModule),
      },
      {
        path: 'categoria',
        loadChildren: () =>
          import('../categoria/categoria.module').then(m => m.CategoriaPageModule),
      },
      {
        path: 'dados',
        loadChildren: () =>
          import('../dados/dados.module').then(m => m.DadosPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/consulta',
        pathMatch: 'full',
      },
    ],
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
