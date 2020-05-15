import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparaValidator } from '../validators/compara-validador';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  public formCadastro: FormGroup;
  public usuario: Usuario;

  mensagens_validacao = {

    nome: [
      {tipo: 'required', mensagem: 'O campo Nome é obrigatório'},
      {tipo: 'minlenght', mensagem: 'O nome deve ter pelo menos 3 caracteres'}
      ],

      sexo: [
        {tipo: 'required', mensagem: 'O campo Sexo é obrigatório'},
            ],

     cpf: [
      {tipo: 'required', mensagem: 'O campo CPF é obrigatório'},
      {tipo: 'invalido', mensagem: 'CPF Inválido'}
      ], 
      
      email: [
        {tipo: 'required', mensagem: 'O campo E-mail é obrigatório'},
        {tipo: 'email', mensagem: 'Email Inválido'}
        ],
      
        dataNascimento: [
          {tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório'},
          ] ,
     senha: [
      {tipo: 'required', mensagem: 'É obrigatório digitar a senha'},
      {tipo: 'minlenght', mensagem: 'A senha deve ter pelo menos 6 caractéres.'},
      {tipo: 'maxlengh', mensagem: 'A senha deve ter no máximo 8 caractéres'}
    ],

    confirmaSenha: [
      {tipo: 'required', mensagem: 'É obrigatório digitar a senha'},
      {tipo: 'minlenght', mensagem: 'A senha deve ter pelo menos 6 caractéres.'},
      {tipo: 'maxlengh', mensagem: 'A senha deve ter no máximo 8 caractéres'},
      {tipo: 'conparacao', mensagem: 'Deve ser igual a senha'}
    ],
  }
 
   

  constructor(public formBuilder: FormBuilder, 
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public router: Router) {

    this.formCadastro = formBuilder.group({
      // Declara os campos do formulario
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['',Validators.compose([Validators.required, CpfValidator.cpfValido])],
      sexo: ['', Validators.compose([Validators.required])],
      dataNascimento:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.email, Validators.required])],
      senha:['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])],
      confirmaSenha:['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    },
      {
        validator: ComparaValidator('senha', 'confirmaSenha')
      }
    );
   }

  ngOnInit() {
  }
 
  public async salvarUsuario() {
    this.usuario = this.formCadastro.value as Usuario;
    delete this.usuario['confirmaSenha'];

    if (await this.usuarioService.salvar(this.usuario)){
      this.alertCadastro('SUCESSO!!', 'Usuario salvo com sucesso!');
      this.router.navigateByUrl('/home');
    } else {
      this.alertCadastro('ERRO!!', 'Erro ao salvar usuario!');
    };
    
   } 

   async alertCadastro(titulo, msg){
     const alert = await this.alertController.create({
       header: titulo,
       message: msg,
       buttons: ['OK']
     });
   }
  

}
