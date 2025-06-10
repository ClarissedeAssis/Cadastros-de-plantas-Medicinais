import { Component, OnInit } from '@angular/core';
import { Planta } from 'src/app/model/planta';
import { PlantaService } from 'src/app/services/planta.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service'; 
import { Usuario } from 'src/app/model/usuario'; 
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],

})
export class ConsultaPage implements OnInit {

  plantas: Planta[] = []; 
  plantasItems: Planta[] = []; // Lista para exibição
  nomeUsuario: string = 'Usuário';
  searchTerm: string = ''; 
  filteredPlants: Planta[] = []; // Plantas filtradas

  constructor(
    private toastController: ToastController, 
    public plantaService: PlantaService, 
    private loadingController: LoadingController,
    public usuarioService: UsuarioService,
    private actionSheetCtrl: ActionSheetController

  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.carregarLista();
    this.carregarUsuario();
  }

  carregarUsuario() {
    let usuario: Usuario | null = this.usuarioService.recuperarAutenticacao(); 
    if (usuario) {
      this.nomeUsuario = usuario.nome; // Define o nome do usuário autenticado
    }
  }

  async carregarLista() {
    try {
      const loading = await this.loadingController.create({
        message: 'Carregando plantas...'
      });
      await loading.present();
      
      this.plantas = await this.plantaService.consultar();  
      this.plantasItems = [...this.plantas]; // Garante que o vetor certo será usado na exibição
      this.filteredPlants = this.plantasItems; // Inicializa com todas as plantas

      await loading.dismiss();
    } catch (error) {
      console.error('Erro ao carregar a lista de plantas', error);
      const toast = await this.toastController.create({
        message: 'Erro ao carregar a lista de plantas',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  // Função de filtro
filterPlants() {
  // Se não houver termo de pesquisa, exibe todas as plantas
  if (this.searchTerm.trim() === '') {
    this.filteredPlants = [...this.plantasItems]; // Exibe todas as plantas
  } else {
    // Converte o termo de pesquisa para minúsculo
    const searchTermLower = this.searchTerm.toLowerCase();

    // Filtra as plantas com base no termo de pesquisa em qualquer atributo
    this.filteredPlants = this.plantasItems.filter(planta => {
      return (
        this.containsWord(planta.nomePopular, searchTermLower) ||
        this.containsWord(planta.nomeCientifico, searchTermLower) ||
        this.containsWord(planta.aplicacoesMedicinais, searchTermLower) ||
        this.containsWord(planta.origem, searchTermLower)
      );
    });
  }
}

// Função auxiliar para verificar se uma palavra do termo de pesquisa está presente
containssWord(field: string, searchTerm: string): boolean {
  if (!field) return false;

  // Divide o campo em palavras e verifica se alguma delas contém o termo de pesquisa
  return field.toLowerCase().split(/\s+/).some(word => word.includes(searchTerm));
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
          this.filteredPlants = [...this.plantasItems]; // Volta tudo
        }
      },
    ]
  });

  await actionSheet.present();
}

 // === FILTRAGEM POR PESQUISA ===
 filterrPlants() {
  if (this.searchTerm.trim() === '') {
    this.filteredPlants = [...this.plantasItems];
  } else {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.filteredPlants = this.plantasItems.filter(planta => {
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
  this.filteredPlants = [...this.plantasItems].sort((a, b) =>
    a.nomePopular.localeCompare(b.nomePopular)
  );
}

ordenarZA() {
  this.filteredPlants = [...this.plantasItems].sort((a, b) =>
    b.nomePopular.localeCompare(a.nomePopular)
  );
}

filtrarPorEstrelas(estrelas: number) {
  this.filteredPlants = this.plantasItems.filter(planta => {
    const nota = planta.avaliacaoGeral;
    
    if (estrelas === 5) {
      return nota === 5;  // 5 Estrelas só pega plantas com avaliação 5
    } else {
      // Para as demais estrelas, pega a faixa de 1.0 a 1.9, 2.0 a 2.9, etc.
      return nota >= estrelas && nota < estrelas + 1;
    }
  });
}


}
