import { Component, OnInit } from '@angular/core';
import { Arquivo } from 'src/app/modals/arquivo';
import { ArquivosService } from 'src/app/services/arquivos.service';

@Component({
  selector: 'app-leitor-arquivos',
  templateUrl: './leitor-arquivos.component.html',
  styleUrls: ['./leitor-arquivos.component.css']
})
export class LeitorArquivosComponent implements OnInit {


  arquivos: Arquivo[] = []
  data: number = 10;
  arquivo: string[] = []
  mensagemFiltro: string = ''
  conteudo: string = '';
  erroNoServidor: boolean = false;
  
  constructor(private serviceA: ArquivosService) {

  }
  ngOnInit(): void {
   this.serviceA.getOpcoes().subscribe(res =>{
    this.mensagemFiltro = this.juntarOpcoes(res);
    
    
   })
  }

  juntarOpcoes(opcoes:string[]):string{
  let s = ''
  for (let i = 0; i < opcoes.length; i++) {
    s += opcoes[i];
    if(i < opcoes.length-1){
      s+= ','
    }
  }
  return s;
}

  verificarArquivo(arquivo: Arquivo) {
    this.erroNoServidor = false;
    this.serviceA.getArquivoPeloNome(arquivo.nomeDoArquivo).subscribe(
      res => {
        this.arquivo = res.split('\n')
      },
      () => this.erroNoServidor = true,
    )
  }

  buscarArquivos() {
    this.erroNoServidor = false;
    this.arquivo = [];
    this.arquivos = [];
    let filtros = this.mensagemFiltro.split(',')

    this.serviceA.getArquivos(this.data, filtros).subscribe(res => {
      this.arquivos = res;
    },
    () => this.erroNoServidor = true);
  }



}



