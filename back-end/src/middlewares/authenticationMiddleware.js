function authenticationMiddleware({ requiredRole }) {
  return (req, res, next) => {
      const userRole = req.user && req.user.cargo;

      if (userRole !== undefined && userRole === requiredRole) {
          next();
      } else {
          return res.status(403).json({ message: 'Acesso negado. Cargo insuficiente.' });
      }
  };
}

export default authenticationMiddleware;
