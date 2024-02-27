function authenticationMiddleware({ requiredRoles }) {
  return (req, res, next) => {
    // Verificar se o usuário está autenticado e tem um cargo
    if (!req.user || !req.user.cargo) {
      return res.status(401).json({ message: 'Usuário não autenticado ou sem cargo.' });
    }

    // Verificar se o cargo do usuário corresponde aos cargos necessários
    const userRole = req.user.cargo;
    if (requiredRoles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({ message: 'Acesso negado. Cargo insuficiente.' });
    }
  };
}

export default authenticationMiddleware;

//AUTHENTICATIONMIDDLEWARE.JS