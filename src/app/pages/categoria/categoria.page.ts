import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  
})
export class CategoriaPage implements OnInit {
  descricao: string = '';
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];
  idUsuario: number = 0;
  searchTerm: string = '';
  nomeUsuario: string = 'Usuário';

  @ViewChild('modal') modal!: IonModal;

  constructor(
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    
    const userId = localStorage.getItem('idUsuario');
    console.log('ID do usuário carregado:', userId); // <-- adiciona esse log
    if (userId) {
      this.idUsuario = parseInt(userId, 10);
      this.loadCategorias();
    } else {
      console.error('ID do usuário não encontrado.');
    }
  }
  

  abrirModal() {
    this.modal.present();
  }

  loadCategorias() {
    this.categoriaService.getCategoriasByUsuario(this.idUsuario).subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
        this.filteredCategorias = [...categorias]; // Atualiza a lista filtrada
      },
      error: (err: any) => {
        console.error('Erro ao carregar categorias:', err);
      },
    });
  }
  async createCategoria() {
    if (!this.descricao.trim()) {
      this.showToast('Por favor, insira um nome para a categoria.', 'danger');
      return;
    }
  
    if (this.idUsuario <= 0) {
      this.showToast('Usuário inválido. Faça login novamente.', 'danger');
      this.router.navigate(['/login']); // Ou mostra um erro
      return;
    }
  
    const categoria = {
      descricao: this.descricao,
      idUsuario: this.idUsuario,
    };
  
    this.categoriaService.createCategoria(categoria).subscribe({
      next: (res) => {
        console.log('Categoria criada:', res);
        this.showToast('Categoria criada com sucesso!', 'success');
        this.descricao = '';
        this.loadCategorias();
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.error('Erro ao criar categoria:', err);
        if (err.status === 400) {
          this.showToast(err.error || 'Usuário não encontrado.', 'danger');
        } else {
          this.showToast('Erro ao criar categoria. Tente novamente.', 'danger');
        }
      },
    });
  }
  
  

  adicionarPlantas(idCategoria: number) {
    this.router.navigate(['/categoria-planta', idCategoria]);
  }

  visualizarCategoria(idCategoria: number) {
    this.router.navigate(['/visualizar', idCategoria]);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  filterCategorias() {
    if (this.searchTerm.trim() === '') {
      this.filteredCategorias = [...this.categorias];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredCategorias = this.categorias.filter(categoria =>
        this.containsWord(categoria.descricao, searchTermLower)
      );
    }
  }

  containsWord(field: string, searchTerm: string): boolean {
    if (!field) return false;
    return field.toLowerCase().split(/\s+/).some(word => word.includes(searchTerm));
  }
}