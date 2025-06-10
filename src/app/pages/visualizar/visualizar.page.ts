import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaPlantaService } from '../../services/categoria-planta.service';
import { Planta } from '../../model/planta';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import { Router } from '@angular/router';
import { PlantaService } from 'src/app/services/planta.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  idCategoria: number = 0;
  categoria: any;
  plantasAssociadas: Planta[] = [];
  plantasItems: Planta[] = [];
  searchTerm: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private categoriaPlantaService: CategoriaPlantaService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef ,
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private plantaService: PlantaService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idCategoria = parseInt(id, 10);
        this.carregarCategoria();
        this.carregarPlantasAssociadas();
      }
    });
  }


 
  
  carregarCategoria() {
    this.categoriaService.getCategoriaById(this.idCategoria).subscribe(
      (categoria) => {
        this.categoria = categoria;
      },
      () => this.exibirToast('Erro ao carregar categoria!', 'danger')
    );
  }

  carregarPlantasAssociadas() {
    this.categoriaPlantaService.getPlantasPorCategoria(this.idCategoria).subscribe(
      (idsPlantas) => {
        if (idsPlantas.length === 0) {
          this.plantasAssociadas = [];
          return;
        }
  
        this.categoriaPlantaService.getPlantasByIds(idsPlantas).subscribe(
          (plantas) => {
            this.plantasAssociadas = plantas.map(planta => ({
              ...planta,
              arquivoFoto: this.plantaService.getFotoUrl(planta.arquivoFoto) // monta a URL completa
            }));
            
          },
          () => this.exibirToast('Erro ao carregar plantas associadas!', 'danger')
        );
      },
      () => this.exibirToast('Erro ao buscar plantas da categoria!', 'danger')
    );
  }

  async removerPlanta(idPlanta: number) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover esta planta da categoria?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('Remoção cancelada')
        },
        {
          text: 'Remover',
          handler: () => this.confirmarRemocao(idPlanta) // Chama a função que realmente remove
        }
      ]
    });
  
    await alert.present();
  }
  
  confirmarRemocao(idPlanta: number) {
    this.categoriaPlantaService.removerPlantaDaCategoria(this.idCategoria, idPlanta).subscribe({
      next: () => {
        // Remove a planta da lista localmente
        this.plantasAssociadas = this.plantasAssociadas.filter(planta => planta.id !== idPlanta);
        this.cdr.detectChanges(); // Atualiza a interface
  
        this.exibirToast('Planta removida com sucesso!', 'success');
  
        // Aguarda 1.5s e recarrega a página para refletir mudanças
        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      error: () => {
        // Se der erro, não exibe mensagem de erro, apenas mantém a lista atualizada
        this.plantasAssociadas = this.plantasAssociadas.filter(planta => planta.id !== idPlanta);
        this.cdr.detectChanges();
  
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    });
  }
  

  async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: cor,
      position: 'top',
      mode: 'ios',
      cssClass: 'custom-toast',
      animated: true
    });
    await toast.present();
  }

  trackById(index: number, planta: Planta): number {
    return planta.id;
  }

  async abrirOpcoesFiltro() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Filtrar plantas',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Ordem Alfabética (A-Z)',
          icon: 'arrow-down-outline',
          handler: () => {
            this.ordenarAZ();
          }
        },
        {
          text: 'Ordem Alfabética (Z-A)',
          icon: 'arrow-up-outline',
          handler: () => {
            this.ordenarZA();
          }
        },
        {
          text: '5 Estrelas',
          icon: 'star',
          handler: () => {
            this.filtrarPorEstrelas(5);
          }
        },
        {
          text: '4 Estrelas',
          icon: 'star',
          handler: () => {
            this.filtrarPorEstrelas(4);
          }
        },
        {
          text: '3 Estrelas',
          icon: 'star',
          handler: () => {
            this.filtrarPorEstrelas(3);
          }
        },
        {
          text: '2 Estrelas',
          icon: 'star',
          handler: () => {
            this.filtrarPorEstrelas(2);
          }
        },
        {
          text: '1 Estrela',
          icon: 'star',
          handler: () => {
            this.filtrarPorEstrelas(1);
          }
        },
        {
          text: 'Limpar Filtros',
          role: 'destructive',
          icon: 'close',
          handler: () => {
            this.plantasAssociadas = [...this.plantasItems]; // Volta tudo
          }
        },
      ]
    });
  
    await actionSheet.present();
  }
  
   // === FILTRAGEM POR PESQUISA ===
   filterrPlants() {
    if (this.searchTerm.trim() === '') {
      this.plantasAssociadas = [...this.plantasItems];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
  
      this.plantasAssociadas = this.plantasItems.filter(planta => {
        return (
          this.containsWord(planta.nomePopular, searchTermLower) ||
          this.containsWord(planta.nomeCientifico, searchTermLower) ||
          this.containsWord(planta.aplicacoesMedicinais, searchTermLower) ||
          this.containsWord(planta.origem, searchTermLower)
        );
      });
    }
  }
  
  containsWord(field: string, searchTerm: string): boolean {
    if (!field) return false;
    return field.toLowerCase().split(/\s+/).some(word => word.includes(searchTerm));
  }
  
  // === FILTRAGEM POR BOTÕES ===
  
  ordenarAZ() {
    this.plantasAssociadas = [...this.plantasItems].sort((a, b) =>
      a.nomePopular.localeCompare(b.nomePopular)
    );
  }
  
  ordenarZA() {
    this.plantasAssociadas = [...this.plantasItems].sort((a, b) =>
      b.nomePopular.localeCompare(a.nomePopular)
    );
  }
  
  filtrarPorEstrelas(stars: number) {
    this.plantasAssociadas = this.plantasItems.filter(planta => planta.avaliacaoGeral === stars);
  }
  
}
