import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {

  /*injeta o http para que seja possivel fazer requisicoes*/
  constructor(private http: HttpClient) {}

  /*busca os contatos do backend json-server via requisicao http*/
  obterContatos() {
    return this.http.get<any[]>('http://localhost:3000/contatos');
  }

  /*recebe uma lista de contatos e agrupa por letra*/
  obterDadosAgrupados(contatos: any[]) {
    /*cria a estrutura para agrupar a letra juntamente com os contatos*/
    const grupos = new Map<string, any[]>();

    /*percorre cada contato do array*/
    contatos.forEach((contato) => {
      /*retorna a primeira letra do contato*/
      const key = contato.nome[0]
        /*remove acentos e converte para maiscula*/
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
      /*verifica se existe uma lista para a letra, se existir usa a lista senao cria lista vazia*/
      const lista = grupos.get(key) ?? [];
      /*adiciona todas as propriedades do contato juntamente com a key dentro da lista*/
      lista.push({
        ...contato,
        key,
      });
      /*atualiza a key e a lista dentro do grupo*/
      grupos.set(key, lista);
    });
    /*converte map para array para ser agrupado no dx-list*/
    return Array.from(grupos, ([key, items]) => ({
      key,
      items,
    }));
  }

  /*metodo chamado ao clicar no botao de salvar contato da popup*/
  salvarContato(e: any, novoContato: any) {
    /*executa validacao dos campos*/
    const resultado = e.validationGroup.validate();
    /*se nao passou na validacao nao salva dados*/
    if (!resultado.isValid) {
      return null;
    }
      return this.http.post('http://localhost:3000/contatos', novoContato);
  }
}
