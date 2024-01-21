const bcrypt = require('bcrypt');
const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhajwt');

const cadastrarUsuario = async (req, res) => {
const { nome, senha , email } = req.body;


try {
       const emailExiste = await pool.query('select * from usuarios where email = $1', [email])

    if (emailExiste.rowCount > 0)  {
        return res.status(400).json({mensagem: 'Email ja existe'});
    }

    const sennhaCriptografada = await bcrypt.hash(senha, 10)

    const query = `insert into usuarios (nome, email,senha)
    values ($1,$2,$3) returning * 
 
    `
const {rows} = await pool.query(query, [nome, email, sennhaCriptografada])

const { senha: _ , ...usuario} = rows[0];


return res.status(201).json({usuario, sennhaCriptografada})

} catch (error) {
    return res.status(500).json({mensagem: 'Erro servidor'});
}

}


const loginUsuario = async (req, res) => {
const {email, senha} = req.body;

    try {
        const { rows, rowCount } = await pool.query(`select * from usuarios where email = $1`, [email])
         
        if (rowCount === 0)  {
            return res.status(400).json({mensagem: 'Email e senha invalido'});
        }

         const {senha: senhaUsuario, ...usuario} = rows[0]

        const senhaCorreta = bcrypt.compare(senha, senhaUsuario);

        if(!senhaCorreta) {
            return res.status(400).json({mensagem: 'Email e senha invalido'});
        }

        const token = jwt.sign({id: usuario.id}, senhaJwt, {expiresIn: '8h'} );

        return res.json({
            usuario, 
            token,
        })

    } catch (error) {
        return res.status(500).json({mensagem: 'Erro servidor'});
    }
}

module.exports = {
    
    cadastrarUsuario,
    loginUsuario

}