const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
require('dotenv').config();
app.use(bodyParser.json());
 
app.get('/api/opcoes', (req, res) => {
  fs.readFile('opcoes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao ler o arquivo JSON.');
      return;
    }

    res.json(JSON.parse(data));
  });
});

app.get('/api/arquivo/:nome', (req, res) => {
  const nome = req.params.nome;
  const caminho =  path.join(__dirname, '/Logs', nome);
  fs.readFile(caminho, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      res.status(500).json({ erro: 'Erro ao ler o arquivo' });
      return;
    }
    res.json(data);
  });
});


app.post('/api/arquivos', (req, res) => {

  const erroString = req.body.erro;
  const dias = req.body.dias;

  const pastaArquivos =  path.join( __dirname, '/Logs');
  fs.readdir(pastaArquivos, (err, arquivos) => {
    if (err) {
      console.error('Erro ao ler a pasta de arquivos:', err);
      res.status(500).json({ erro: 'Erro ao ler a pasta de arquivos' });
      return;
    }

    const arquivosComErros = [];

    arquivos.forEach((arquivo) => {
      const caminhoCompleto = path.join(pastaArquivos, arquivo);
      const stats = fs.statSync(caminhoCompleto);
      const dataCriacao = stats.ctime;

      const diasAtras = new Date();
      diasAtras.setDate(diasAtras.getDate() - dias);
    
      if (dias == -1 || dataCriacao >= diasAtras) {
        const linhas = fs.readFileSync(caminhoCompleto, 'utf8').split('\n');
        const erros = [];

        linhas.forEach((linha, index) => {
          erroString.forEach((erro) => {
            if (linha.toUpperCase().includes(erro.toUpperCase())) {
              erros.push({ linha: index + 1, conteudo: linha });
            }
          });
        });
        arquivosComErros.push({ nomeDoArquivo: arquivo, dataCriacao, erros });
      }
    });
    const listaOrdenada = arquivosComErros.sort((a, b) => {
      const quantidadeErrosA = a.erros.length;
      const quantidadeErrosB = b.erros.length;

      if (quantidadeErrosA < quantidadeErrosB) {
        return 1;
      }
      if (quantidadeErrosA > quantidadeErrosB) {
        return -1;
      }
      return 0;
    });



    res.json(listaOrdenada);
  });
});




app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});