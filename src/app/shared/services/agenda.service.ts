import { Injectable } from '@angular/core';
import db from '../../../backend/db.json';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {

  contatos = db.contatos;

  obterDadosAgrupados() {
    /*cria a estrutura para agrupar a key juntamente com os contatos*/
    const grupos = new Map<string, any[]>();

    /*percorre cada contato do array*/
    this.contatos.forEach((contato) => {
      /*retorna a primeira letra do contato*/
      const key = contato.nome[0]
        /*remove acentos e converte para maiscula*/
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase();
      /*verifica se existe uma lista para a letra*/
      const lista = grupos.get(key) ?? [];
      /*adiciona todas as propriedades do contato juntamente com a key dentro da lista*/
      lista.push({
        ...contato,
        key,
      });
      /*salva a key e a lista dentro do grupo*/
      grupos.set(key, lista);
    });
    /*converte map para array para ser agrupado no dx-list*/
    return Array.from(grupos, ([key, items]) => ({
      key,
      items,
    }));
  }

  salvarContato(e: any, novoContato: any) {

    const resultado = e.validationGroup.validate();

    if (!resultado.isValid) {
      return false;
    }
    return true;
  }
}
