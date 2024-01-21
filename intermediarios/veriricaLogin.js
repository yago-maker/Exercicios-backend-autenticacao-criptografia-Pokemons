const jwt = require('jsonwebtoken');
const pool = require('../conexao');
const senhaJwt = require('../senhajwt');

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }

  const token = authorization.split(' ')[1].trim();


  // console.log('Authorization Header:', authorization);
  // console.log('Token:', token);

  try {
    const { id } = jwt.verify(token, senhaJwt);
    //console.log('Token verificado com sucesso:', id);

    const { rows, rowCount } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (rowCount === 0) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;
    next();
  } catch (error) {
    //console.error(error); 
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }
};

module.exports = verificaLogin;
