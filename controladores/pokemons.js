const pool = require("../conexao");

const cadastroPokemon = async (req, res) => {
  const { nome, apelido, habilidades, imagem } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: 'O campo nome é obrigatório' });
  }

  if (!habilidades) {
    return res.status(400).json({ mensagem: 'O campo habilidades é obrigatório' });
  }

  try {
    const nomeExiste = await pool.query('select * from pokemons where nome = $1', [nome])

    if (nomeExiste.rowCount > 0) {
      return res.status(400).json({ mensagem: 'OPS!!! O nome desse poke já existe' });
    }

    const query = `
      INSERT INTO pokemons (usuario_id, nome, apelido, habilidades, imagem)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `

    const params = [req.usuario.id, nome, apelido, habilidades, imagem];

    const { rows } = await pool.query(query, params);

    return res.status(201).json(rows[0]);
  } catch (error) {
    //console.log(error.message);

    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const atualizarApelidoPokemon = async (req, res) => {
  const { apelido } = req.body;
  const { id } = req.params;

  try {
    const {rowCount} = await pool.query('select * from pokemons where id = $1 and usuario_id = $2', [id, req.usuario.id]);
    console.log('Número de linhas afetadas:', rowCount);

    if (rowCount === 0) {
      return res.status(404).json({ mensagem: 'Pokemon não existe' });
    }

    const queryAtualizaPokemon = 'update pokemons set apelido = $1 where id = $2';

    await pool.query(queryAtualizaPokemon, [apelido, id]);
    

    return res.status(204).send();
  } catch (error) {
  
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

const listarPokemons = async (req, res) => {

try {
  const {rows: pokemons} = await pool.query('select id, nome, habilidades, apelido, imagem from pokemons where usuario_id = $1' ,[req.usuario.id])
 
for (const pokemon of pokemons) {
      pokemon.habilidades = pokemon.habilidades.split(', ')
      pokemon.usuario = req.usuario.nome
}


  return res.json(pokemons)
} catch (error) {
  console.log(error.message);

  return res.status(500).json({ mensagem: 'Erro interno do servidor' });
}
}

const detalharPokemons = async (req, res) => {
       const {id} = req.params
  try {
    const {rows, rowCount} = await pool.query('select id , nome habilidades, apelido , imagem from pokemons where id = $1 and usuario_id = $2', [id, req.usuario.id]);
  
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: 'Pokemon não existe' });
    }

 const pokemon = rows[0]

        pokemon.habilidades = pokemon.habilidades.split(', ')
        pokemon.usuario = req.usuario.nome
  
  
  
    return res.json(pokemon)
  } catch (error) {
    console.log(error.message);
  
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
  }
  

  const excluirPokemon = async (req, res) => {
    const { id } = req.params

    try {
      const { rowCount } = await pool.query('select id, nome, habilidades, apelido, imagem from pokemons where id = $1 and usuario_id = $2', [id, req.usuario.id]);
   

      if (rowCount === 0) {
        return res.status(404).json({ mensagem: 'Pokemon não existe' });
      }
  
      await pool.query('delete from pokemons where id = $1', [id]);
    
      return res.status(204).send();
    } catch (error) {
      console.log(error.message);
    
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  };
  


module.exports = {
  cadastroPokemon,
  atualizarApelidoPokemon,
  listarPokemons,
  detalharPokemons,
  excluirPokemon
};
