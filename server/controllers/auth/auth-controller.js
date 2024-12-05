const bcrypt = require("bcryptjs"); // Importa a biblioteca bcryptjs para hash de senhas
const jwt = require("jsonwebtoken"); // Importa a biblioteca jsonwebtoken para criação e verificação de tokens JWT
const User = require("../../models/User"); // Importa o modelo User

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email }); // Verifica se o usuário já existe
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again", // Usuário já existe com o mesmo email
      });

    const hashPassword = await bcrypt.hash(password, 12); // Cria um hash para a senha com 12 rounds de salt
    const newUser = new User({
      userName,
      email,
      password: hashPassword, // Armazena a senha hash no banco de dados
    });

    await newUser.save(); // Salva o novo usuário no banco de dados
    res.status(200).json({
      success: true,
      message: "Registration successful", // Registro bem-sucedido
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured", // Algum erro ocorreu
    });
  }
};

// Função para fazer login de um usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email }); // Verifica se o usuário existe
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first", // Usuário não existe, precisa registrar-se primeiro
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    ); // Compara a senha fornecida com a senha hash armazenada
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again", // Senha incorreta
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY", // Chave secreta usada para assinar o token
      { expiresIn: "60m" } // Define a expiração do token para 60 minutos
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully", // Login bem-sucedido
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured", // Algum erro ocorreu
    });
  }
};

// Função para fazer logout de um usuário
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!", // Logout bem-sucedido
  });
};

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization.split(' ')[1]; // Obtém o token dos cookies ou do cabeçalho de autorização
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!", // Usuário não autorizado
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Verifica e decodifica o token
    req.user = decoded; // Adiciona os dados decodificados do token ao objeto req
    next(); // Passa para o próximo middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!", // Usuário não autorizado
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware }; // Exporta as funções para uso em outras partes da aplicação
