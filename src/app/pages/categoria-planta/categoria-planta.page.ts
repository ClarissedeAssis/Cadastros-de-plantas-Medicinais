import { Component, OnInit } from '@angular/core';
import { CategoriaPlantaService } from '../../services/categoria-planta.service';
import { Planta } from '../../model/planta';
import { CategoriaPlanta } from '../../model/categoria-planta';
import { ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categoria-planta',
  templateUrl: './categoria-planta.page.html',
  styleUrls: ['./categoria-planta.page.scss'],
 
})


export class CategoriaPlantaPage implements OnInit {
  plantas: Planta[] = [];
  plantasSelecionadas: number[] = [];
  plantasAssociadas: number[] = [];
  idCategoria: number = 0;
  categoria: any;

  constructor(
    private categoriaPlantaService: CategoriaPlantaService,
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef  // Injeção do ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idCategoria = parseInt(id, 10);
        this.carregarCategoria();
        this.carregarPlantas();
      }
    });
  }

  carregarCategoria() {
    this.categoriaService.getCategoriaById(this.idCategoria).subscribe(
      categoria => this.categoria = categoria,
      () => this.exibirToast('Erro ao carregar categoria!', 'danger')
    );
  }

  carregarPlantas() {
    this.categoriaPlantaService.getAllPlantas().subscribe(
      (data) => {
        this.plantas = data;
        this.carregarPlantasAssociadas(); // Primeiro, busca as plantas associadas
      },
      () => this.exibirToast('Erro ao carregar plantas!', 'danger')
    );
  }
  
  carregarPlantasAssociadas() {
    this.categoriaPlantaService.getPlantasPorCategoria(this.idCategoria).subscribe(
      (idsPlantas) => {
        this.plantasAssociadas = idsPlantas;
     
        this.plantas = this.plantas.filter(planta => !this.plantasAssociadas.includes(planta.id));
  
        this.cdr.detectChanges(); // Forçar atualização da view
      },
      () => this.exibirToast('Erro ao carregar associações!', 'danger')
    );
  }
  

  async alternarSelecao(idPlanta: number) {
    const index = this.plantasSelecionadas.indexOf(idPlanta);
    if (index === -1) {
      this.plantasSelecionadas.push(idPlanta);
    } else {
      if (this.plantasAssociadas.includes(idPlanta)) {
        const alert = await this.alertController.create({
          header: 'Remover planta?',
          message: `Deseja remover a planta desta categoria?`,
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
              handler: () => {
                this.plantasSelecionadas.push(idPlanta);
              }
            },
            {
              text: 'Sim',
              handler: () => {
                this.removerPlanta(idPlanta);  // Chama o método de remoção
              }
            }
          ]
        });
        await alert.present();
      } else {
        this.plantasSelecionadas.splice(index, 1);
      }
    }
  }

  removerPlanta(idPlanta: number) {
    const index = this.plantasAssociadas.indexOf(idPlanta);
    if (index !== -1) {
      this.plantasAssociadas.splice(index, 1);  // Remove a planta da lista
    }
  }

  salvarAssociacao() {
    const novasPlantas = this.plantasSelecionadas.filter(p => !this.plantasAssociadas.includes(p));
  
    if (novasPlantas.length === 0) {
      this.exibirToast('Nenhuma nova planta selecionada!', 'warning');
      return;
    }
  
    const categoriaPlanta: CategoriaPlanta = {
      idCategoria: this.idCategoria,
      idPlanta: novasPlantas,
    };
  
    this.categoriaPlantaService.associarPlantas(categoriaPlanta).subscribe({
      next: () => {
        this.plantasAssociadas.push(...novasPlantas);
        this.plantasSelecionadas = [...this.plantasAssociadas];
  
        this.exibirToast('Plantas associadas com sucesso!', 'success');
  
        // 🔹 Aguarda um momento e redireciona para a página de categorias
        setTimeout(() => {
          window.location.href = '/categoria';  // Redirecionamento
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao associar plantas:', err);  // Exibe erro no console para depuração
        if (err.status === 200 || err.status === 201) {  // 🔹 Se a resposta for de sucesso, mesmo com erro
          this.exibirToast('Plantas associadas com sucesso!', 'success');
          setTimeout(() => {
            window.location.href = '/categoria';
          }, 1500);
        } else {
          this.exibirToast('Erro ao associar plantas!', 'danger');
        }
      }
    });
  }
  
  async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: cor,
      position: 'top',
      mode: 'ios', // Estiliza melhor para acessibilidade
      cssClass: 'custom-toast', // Classe para personalização
      animated: true
    });
    await toast.present();
  }
  
  trackById(index: number, planta: Planta): number {
    return planta.id;
  }
}
