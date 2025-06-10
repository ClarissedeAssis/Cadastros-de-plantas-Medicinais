import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario;
  formGroup: FormGroup; 
  type: boolean = true; 

  constructor(
    private toastController: ToastController, 
    private navController: NavController, 
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {
    this.usuario = new Usuario();
    this.formGroup = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required])],
      'senha': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])]
    });
  }

  ngOnInit() {
    // Exclui no localstorage o usuário autenticado
    this.usuarioService.encerrarAutenticacao();
  }

  changeType() {
    this.type = !this.type;
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
      ],
    });
    await alert.present();
  }

  async autenticar() {
    let email = this.formGroup.value.email;
    let senha = this.formGroup.value.senha;
  
    if (!email || !senha) {
      this.presentAlert('Insira seu email e senha para entrar');
      return;
    }
  
    try {
      let json = await this.usuarioService.autenticar(email, senha);
      this.usuario = <Usuario>json;
  
      if (this.usuario) {
   
        localStorage.setItem('idUsuario', this.usuario.id.toString());
        localStorage.setItem('nomeUsuario', this.usuario.nome); // opcional
        localStorage.setItem('emailUsuario', this.usuario.email); // opcional
  
        this.usuarioService.registrarAutenticacao(this.usuario);
        this.navController.navigateBack(['/tabs/consulta']);
      } else {
        this.presentAlert('Email e/ou senha inválidos.');
      }
    } catch (error) {
      this.exibirMensagem('Erro ao autenticar. Verifique sua conexão.');
      console.error(error);
    }
  }
  
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
