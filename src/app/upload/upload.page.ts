import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],

})
export class UploadPage implements OnInit {

  formGroup!: FormGroup;
  usuario: Usuario = new Usuario();
  imagemPreview: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.usuarioService.buscarPorId(id).then(u => this.usuario = u);
  
    this.formGroup = this.formBuilder.group({
      imagem: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
        this.usuario.arquivoFotoUsuario = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async enviar() {
    try {
      const caminhoFoto = await this.usuarioService.enviar(this.usuario.arquivoFotoUsuario!, this.usuario.id);
      this.usuario.arquivoFotoUsuario = caminhoFoto;
      await this.usuarioService.salvar(this.usuario); // só pra garantir que atualizou no banco também
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Erro ao enviar a foto:", error);
    }
  }
  
}
