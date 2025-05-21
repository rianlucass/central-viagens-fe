import express from 'express'
const app = express()
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cadastro-passageiro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/cadastroPassageiro.html'));
  });

app.get('/cadastro-motorista', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/cadastroMotorista.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/login.html'));
  });

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/passageiro/home.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/motorista/dashboard.html'));
});

app.listen(3000, ()=>{
    console.log('Servidor rodando em http://localhost:3000')
})