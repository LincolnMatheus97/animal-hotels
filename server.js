const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'segredo-super-secreto-123';
const PORT = 3000;

// Middlewares do json-server
server.use(middlewares);
server.use(jsonServer.bodyParser);

// rota de login - autenticacao
server.post('/login', (req, res) => {
    const { email, senha } = req.body;

    //buscar usuario no db.json
    const db = router.db;
    const usuario = db.get('usuarios').find({email, senha}).value();

    if(!usuario){
        return res.status(401).json({erro: "Email ou senha incorretos"});
    }

    //compara senha
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    if(!senhaValida){
        return res.status(401).json({erro: "Email ou senha incorretos"});
    }

    //gerar token jwt
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email},
        SECRET_KEY,
        {expiresIn: '24h'}
    );

    //retorna token
    res.json({
        token,
        usuario : {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    })

});


//middleware de autenticacao
server.use(/^(?!\/login).*$/, (req , res, next) => {
    if ( req.method === 'OPTIONS'){
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({erro: "Token nao fornecido"});
    }

    try {
        const decodificado = jwt.verify(token, SECRET_KEY);
        req.usuario = decodificado;
        next();
    } catch(error){
        return res.status(403).json({erro: "Token Invalido"})
    }
})

// ROTAS do jsonserver - todas as rotas ja sao criadas
server.use(router);


//start server
server.listen(PORT, () => {
    console.log(`💫 Servidor rodando em http://localhost:${PORT}`);
})