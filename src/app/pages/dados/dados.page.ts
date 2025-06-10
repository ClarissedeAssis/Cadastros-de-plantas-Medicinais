import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController, ActionSheetController, ModalController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
 
})
export class DadosPage implements OnInit {
  formGroup: FormGroup;
  usuario: Usuario;
  controle: boolean;
  type: boolean = true; 

  urlFoto: string = '';

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private toastController: ToastController, private navController: NavController, private actionSheetCtrl: ActionSheetController,private http: HttpClient) { 
    this.usuario = new Usuario();    
    this.controle = false;
    this.formGroup = this.formBuilder.group({ 
      'nome': [this.usuario.nome, Validators.compose([Validators.required])],      
      'email': [this.usuario.email, Validators.compose([Validators.required])],
      'senha': [this.usuario.senha, Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.usuario = this.usuarioService.recuperarAutenticacao();
    this.formGroup.get('nome')?.setValue(this.usuario.nome);
    this.formGroup.get('email')?.setValue(this.usuario.email);
    this.formGroup.get('senha')?.setValue(this.usuario.senha);
  
    if (this.usuario.arquivoFotoUsuario) {
      // Remove o prefixo /uploads/fotos/ ao construir a URL
      this.urlFoto = `http://localhost:8080/${this.usuario.arquivoFotoUsuario}`;
      console.log("URL da foto:", this.urlFoto);  // Verifique a URL gerada
    }
  }
  
  
  changeType() {
    this.type = !this.type;
  }

  encerrarAutenticacao(){
    this.usuarioService.encerrarAutenticacao();
    this.navController.navigateRoot('/login');
  }



  selecionarFoto(event: any) {
    const formData = new FormData();
    formData.append('arquivo', event.target.files[0]);
  
    // A URL agora inclui o id do usuário
    const usuarioId = this.usuario.id;  // Certifique-se de que o id do usuário está correto
    this.http.put(`http://localhost:8080/api/v1/usuario/foto/${usuarioId}`, formData).subscribe(
      (response: any) => {
        console.log('Foto atualizada com sucesso', response);
        if (response.arquivoFotoUsuario) {
          this.usuario.arquivoFotoUsuario = response.arquivoFotoUsuario;
          this.urlFoto = `http://localhost:8080/${response.arquivoFotoUsuario}`;
          this.usuarioService.registrarAutenticacao(this.usuario);
        }
      },
    
    );
    
  }
  
  
  
  salvar(){    
    this.usuario.nome = this.formGroup.value.nome;
    this.usuario.senha = this.formGroup.value.senha;

    this.usuarioService.salvar(this.usuario)
    .then((json)=>{
      this.usuario = <Usuario>(json);
      if (this.usuario) {
        this.usuarioService.registrarAutenticacao(this.usuario);
        this.exibirMensagem('Registro salvo com sucesso!!!')
        this.navController.navigateBack('/login')
      }    
    })
    .catch((erro=>{
      this.exibirMensagem('Erro ao salvar o registro! Erro: ' + erro['mensage']);
    }));
        


  }


  
  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

  


}
