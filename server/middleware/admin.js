// Middleware para verificar se o usuário é administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log("Authorized admin:", req.user); // Log do administrador autorizado
    next(); // Usuário é administrador, prossegue para o próximo middleware
  } else {
    console.log("Access denied. User role:", req.user ? req.user.role : "No user"); // Log de acesso negado
    res.status(403).json({ message: "Acesso negado: apenas administradores." }); // Retorna resposta de acesso negado
  }
};

module.exports = admin; // Exporta o middleware para uso em outras partes da aplicação
