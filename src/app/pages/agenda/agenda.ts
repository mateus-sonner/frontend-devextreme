import { Component, ViewChild } from '@angular/core';
import {
  DxButtonComponent,
  DxFormModule,
  DxListModule,
  DxPopupComponent,
  DxTemplateModule,
  DxValidationGroupComponent,
  DxValidatorModule,
  DxFormComponent,
} from 'devextreme-angular';
import { Container } from '../../shared/components/container/container';
import { Cabecalho } from '../../shared/components/cabecalho/cabecalho';
import { FormsModule } from '@angular/forms';
import { AgendaService } from '../../shared/services/agenda.service';

@Component({
  selector: 'app-agenda',
  imports: [
    Container,
    Cabecalho,
    DxListModule,
    FormsModule,
    DxButtonComponent,
    DxPopupComponent,
    DxValidationGroupComponent,
    DxFormModule,
    DxTemplateModule,
    DxValidatorModule,
  ],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export class Agenda {
  /*variavel que ira receber os contatos*/
  contatos: any = [];

  /*injeta o service no componente e chama carregarContatos logo ao iniciar a aplicacao*/
  constructor(private agendaService: AgendaService) {
    this.carregarContatos();
  }

  /*busca contatos e agrupa por letra inicial*/
  carregarContatos() {
    this.agendaService.obterContatos().subscribe((contatos) => {
      this.contatos = this.agendaService.obterDadosAgrupados(contatos);
    });
  }

  /*indica que a popup esta fechada*/
  popupVisivel = false;

  /*abre a popup chamada pelo html (onClick)="abrirPopup()*/
  abrirPopup() {
    /*novo contato*/
    this.modoEdicao = false;
    /*reseta os dados do formulario*/
    this.novoContato = {
      id: 0,
      nome: '',
      telefone: '',
    };
    /*indica que a popup esta aberta*/
    this.popupVisivel = true;
  }

  /*objeto responsavel por receber os dados a serem cadastrados ligado ao formulario*/
  novoContato = {
    id: 0,
    nome: '',
    telefone: '',
  };
  /*captura o formulario do html e permite acessar as informacoes do mesmo*/
  @ViewChild(DxFormComponent) form!: DxFormComponent;

  /*responsavel por chamar o metodo que ira salvar/atualizar contato*/
  salvarContato() {
    /*executa as validacoes obrigatorias*/
    const resultado = this.form.instance.validate();
    /*se invalido interrompe e nao salva nada*/
    if (!resultado.isValid) {
      return;
    }

    /*Verifica se esta no modo edicao*/
    if (this.modoEdicao) {
      /*atualiza o contato*/
      this.agendaService.atualizarContato(this.novoContato).subscribe(() => {
        /*recarrega a lista de contatos*/
        this.carregarContatos();
        /*fecha a popup*/
        this.popupVisivel = false;
        /*desativa o modo de edicao*/
        this.modoEdicao = false;
        /*limpa os dados do formulario*/
        this.novoContato = {
          id: 0,
          nome: '',
          telefone: '',
        };
      });

      return;
    }

    /*Se nao estiver no modo de edicao ou seja modo de cadastro*/
    this.agendaService.obterContatos().subscribe((contatos) => {
      /*busca o maior id existente*/
      const maiorId = Math.max(0, ...contatos.map((contato) => Number(contato.id)));
      /*gera o proximo id e copia o nome e telefone*/
      const contato = {
        ...this.novoContato,
        id: maiorId + 1,
      };
      /*salva o novo contato*/
      this.agendaService.salvarContato(contato).subscribe(() => {
        /*atualiza a lista de contatos*/
        this.carregarContatos();
        /*fecha a popup*/
        this.popupVisivel = false;
        /*reseta o formulario*/
        this.novoContato = {
          id: 0,
          nome: '',
          telefone: '',
        };
      });
    });
  }

  /*seta que nao esta sendo editado contato*/
  modoEdicao = false;
  /*edita os dados do contato*/
  editarContato(contato: any) {
    /*ativa modo edicao*/
    this.modoEdicao = true;
    /*copia os dados do contato para o formulario*/
    this.novoContato = {
      id: contato.id,
      nome: contato.nome,
      telefone: contato.telefone,
    };
    /*abre popup para alteracao*/
    this.popupVisivel = true;
  }
  /*responsavel por chamar o metodo que ira excluir contato*/
  excluirContato(contato: any) {
    /*mensagem de confirmacao para excluir contato*/
    const confirmou = confirm(`Deseja excluir o contato ${contato.nome}?`);
    /*se nao confirmar nao excluir o contato*/
    if (!confirmou) {
      return;
    }
    /*se confirmar excluir o contato*/
    this.agendaService.excluirContato(contato).subscribe(() => {
      /*recarrega os contatos*/
      this.carregarContatos();
    })
  }
}
