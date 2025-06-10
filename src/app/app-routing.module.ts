import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'detalhes/:id',
    loadChildren: () => import('./pages/detalhes/detalhes.module').then(m => m.DetalhesPageModule)
  },
  {
    path: '',
    redirectTo: 'tabs/consulta',
    pathMatch: 'full',
  },
  
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./pages/visualizar/visualizar.module').then(m => m.VisualizarPageModule)
  },
  {
    path: 'visualizar/:id',
    loadChildren: () => import('./pages/visualizar/visualizar.module').then(m => m.VisualizarPageModule)
  },
  {
    path: 'categoria-planta/:id',
    loadChildren: () => import('./pages/categoria-planta/categoria-planta.module').then(m => m.CategoriaPlantaPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload/upload.module').then(m => m.UploadPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
