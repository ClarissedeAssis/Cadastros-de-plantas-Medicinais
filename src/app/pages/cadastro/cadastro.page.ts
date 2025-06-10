import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController, ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario: Usuario;
  formGroup: FormGroup;
  loginInvalido: boolean;
  controle: boolean;
  senhaDigitada: string = '';
  imagemPreview: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastController: ToastController,
    private navController: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController
  ) {
    this.loginInvalido = false;
    this.usuario = new Usuario();
    this.controle = false;

    this.formGroup = this.formBuilder.group({
      'nome': [this.usuario.nome, Validators.required],
      'email': [this.usuario.email, Validators.required],
      'senha': ['', Validators.required],
      'confirmarSenha': ['', Validators.required]
    }, { validators: this.compararSenhas });
  }

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.usuario.arquivoFotoUsuario = reader.result as string;
        this.imagemPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSenhaInput(event: any) {
    this.senhaDigitada = event.detail.value || '';
  }

  compararSenhas(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  async salvar() {
    if (this.formGroup.invalid) {
      if (this.formGroup.errors?.['senhasDiferentes']) {
        this.presentAlert('Ops! Algo deu errado com a confirmação de senha.');
      } else {
        this.presentAlert('Insira os dados corretamente para criar sua conta.');
      }
      return;
    }

    this.usuario.nome = this.formGroup.value.nome;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;

    this.usuarioService.verificarLogin(this.usuario.email)
      .then((json) => {
        this.loginInvalido = <boolean>json;
        if (!this.loginInvalido) {
          this.usuarioService.salvar(this.usuario)
            .then((json) => {
              this.usuario = <Usuario>json;
              if (this.usuario) {
                this.usuarioService.registrarAutenticacao(this.usuario);
                this.exibirMensagem('Registro salvo com sucesso!');
                this.navController.navigateForward(`/upload?id=${this.usuario.id}`);
              }
            })
            .catch((erro) => {
              this.exibirMensagem('Erro ao salvar o registro! Erro: ' + erro['mensage']);
            });
        } else {
          this.presentAlert('Este e-mail já está cadastrado. Tente usar outro.');
        }
      })
      .catch((erro) => {
        this.exibirMensagem('Erro ao verificar login! Erro: ' + erro['mensage']);
      });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

  async presentAlert(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: mensagem,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-primary'
        }
      ]
    });
    await alert.present();
  }
}
