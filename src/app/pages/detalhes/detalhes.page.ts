import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planta } from 'src/app/model/planta';
import { Usuario } from 'src/app/model/usuario';
import { PlantaService } from 'src/app/services/planta.service';
import { LoadingController, IonModal, ToastController } from '@ionic/angular';
import { PlantaUsuarioService } from 'src/app/services/plantaUsuario.service';
import { PlantaUsuario } from 'src/app/model/plantaUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaPlanta } from 'src/app/model/categoria-planta';
import { CategoriaPlantaService } from 'src/app/services/categoria-planta.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss']
})
export class DetalhesPage implements OnInit {
  planta: Planta = {} as Planta;
  usuario!: Usuario;
  id: number = 0;
  formGroup: FormGroup;
  verMais: boolean = false;

  
  // Comentários
  comentarios: PlantaUsuario[] = [];
  comentario: PlantaUsuario;
  novoComentario: string = '';
  nota: number = 0;
  estrelas: number[] = [1, 2, 3, 4, 5];
  comentarioExistente: boolean = false;

  // Categorias
  exibirCategorias: boolean = false;
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  plantaSalva: boolean = false;
  categoriaSelecionadas: number = 0;
  termoPesquisa: string = '';

  // Modal
  @ViewChild('modalComentarios') modalComentarios!: IonModal;
  @ViewChild('modalCategorias') modalCategorias!: IonModal;

  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    public plantaService: PlantaService,
    public usuarioService: UsuarioService,
    private plantaUsuarioService: PlantaUsuarioService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private categoriaService: CategoriaService,
    private categoriaPlantaService: CategoriaPlantaService,
  ) {
    this.formGroup = this.formBuilder.group({
      'novoComentario': [this.novoComentario, Validators.compose([Validators.required])],
      'avaliacao': [this.nota, Validators.required],
    });
    this.comentario = new PlantaUsuario();
  }

  abrirModalComentarios() {
    this.modalComentarios.present();
  }

  abrirModalCategorias() {
    this.modalCategorias.present();
    this.carregarCategorias();
  }

  alternaVerMais() {
    this.verMais = !this.verMais;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
   
  }

  async ionViewWillEnter() {
    await this.carregarUsuario();
    await this.carregarPlantas();
    await this.carregarComentarios();
  }

  async carregarUsuario() {
    this.usuario = this.usuarioService.recuperarAutenticacao();
    if (!this.usuario || !this.usuario.id) {
      await this.exibirToast('Usuário não autenticado.', 'danger');
      throw new Error('Usuário não autenticado');
    }
  }
  

  async carregarPlantas() {
    try {
      const loading = await this.loadingController.create({ message: 'Carregando plantas...' });
      await loading.present();

      this.planta = await this.plantaService.consultarPlanta(this.id);
      await loading.dismiss();
    } catch (error) {
      console.error('Erro ao carregar a planta', error);
      await this.exibirToast('Erro ao carregar a planta', 'danger');
    }
  }

  async carregarComentarios() {
    try {
      this.comentarios = await this.plantaUsuarioService.listarPorPlanta(this.id);
      this.comentarioExistente = this.comentarios.some(c => c.idUsuario === this.usuario.id);

      for (let comentario of this.comentarios) {
        const usuario = await this.usuarioService.buscarPorId(comentario.idUsuario);
        comentario.nomeUsuario = usuario.nome;
        comentario.arquivoFotoUsuario = usuario.arquivoFotoUsuario;
        console.log('Foto do usuário:', comentario.arquivoFotoUsuario);
      }
      

      this.calcularMediaAvaliacao();
    } catch (error) {
      console.error('Erro ao carregar os comentários', error);
      await this.exibirToast('Erro ao carregar comentários', 'danger');
    }
  }

  avaliar(nota: number) {
    this.nota = nota;
    this.formGroup.get('avaliacao')?.setValue(nota);
  }



  async adicionarComentario() {
    if (this.formGroup.invalid) {
      await this.exibirToast('Por favor, preencha o campo de comentário e a avaliação.', 'warning');
      return;
    }

    this.comentario.descricao = this.formGroup.value.novoComentario;
    this.comentario.idPlanta = this.id;
    this.usuario = this.usuarioService.recuperarAutenticacao();
    this.comentario.idUsuario = this.usuario.id;
    this.comentario.avaliacao = this.formGroup.value.avaliacao;
    this.comentario.arquivoFotoUsuario = this.usuario.arquivoFotoUsuario;

    try {
      await this.plantaUsuarioService.adicionarComentario(this.comentario);
      this.formGroup.get('novoComentario')?.reset();
      this.formGroup.get('avaliacao')?.reset();
      this.comentarioExistente = true;
      this.carregarComentarios();
      
    } catch (error) {
      await this.exibirToast('Erro ao adicionar comentário.', 'danger');
    }
  }

  async excluirComentario(idComentario: number): Promise<void> {
    try {
      await this.plantaUsuarioService.excluirComentario(idComentario);
      await this.exibirToast('Comentário excluído com sucesso.', 'success');
      this.comentarioExistente = false;
      this.carregarComentarios();
    } catch (error) {
      await this.exibirToast('Erro ao excluir comentário.', 'danger');
    }
  }

  getCorEstrela(index: number): string {
    const nota = this.formGroup.get('avaliacao')?.value;
    return nota >= index + 1 ? 'warning' : 'medium';
  }

  calcularMediaAvaliacao() {
    if (this.comentarios.length === 0) {
      this.planta.avaliacaoGeral = 0;
      return;
    }
    const soma = this.comentarios.reduce((acc, c) => acc + (c.avaliacao || 0), 0);
    this.planta.avaliacaoGeral = soma / this.comentarios.length;
  }

  async carregarCategorias() {
    this.exibirCategorias = true;

    try {
      this.usuario = this.usuarioService.recuperarAutenticacao();
      const todasCategorias = await this.categoriaService.getCategoriasByUsuario(this.usuario.id).toPromise() || [];
      const categoriasAssociadas = await this.categoriaPlantaService.getCategoriasPorPlanta(this.id).toPromise() || [];

      this.categorias = todasCategorias.filter(categoria =>
        !categoriasAssociadas.some(ja => ja.id === categoria.id)
      );

      this.categoriasFiltradas = [...this.categorias]; // Inicializa filtradas

    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  filtrarCategorias(event: any) {
    const termo = event.detail.value.toLowerCase();
    this.termoPesquisa = termo;
    this.categoriasFiltradas = this.categorias.filter(c =>
      c.descricao.toLowerCase().includes(termo)
    );
  }

  async salvarCategoriasSelecionadas() {
    if (!this.categoriaSelecionadas) {
      await this.exibirToast('Selecione uma categoria.', 'warning');
      return;
    }

    const associacao: CategoriaPlanta = {
      idCategoria: this.categoriaSelecionadas,
      idPlanta: [this.id]
    };

    try {
      await this.httpClient.post(
        'http://localhost:8080/api/v1/categoria-planta/associar',
        associacao,
        { responseType: 'text' }
      ).toPromise();

      await this.exibirToast('Planta salva na categoria com sucesso!', 'success');
      this.exibirCategorias = false;
      this.plantaSalva = true;
      this.categoriaSelecionadas = 0;
    } catch (error: any) {
      console.error('Erro ao salvar planta na categoria:', error);
      await this.exibirToast('Erro ao salvar planta na categoria.', 'danger');
    }
  }

  async exibirToast(mensagem: string, cor: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    await toast.present();
  }
}
