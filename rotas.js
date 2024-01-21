const express = require('express');
const { cadastroPokemon, atualizarApelidoPokemon, listarPokemons, detalharPokemons, excluirPokemon } = require('./controladores/pokemons')
const { cadastrarUsuario, loginUsuario } = require('./controladores/usuarios');
const verificaLogin = require('./intermediarios/veriricaLogin')


const rotas = express();

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', loginUsuario)

rotas.use(verificaLogin)

rotas.post('/pokemon', cadastroPokemon)
rotas.patch('/pokemon/:id', atualizarApelidoPokemon)
rotas.get('/pokemons', listarPokemons)
rotas.get('/pokemons/:id', detalharPokemons)
rotas.delete('/pokemon/:id', excluirPokemon)

module.exports = rotas