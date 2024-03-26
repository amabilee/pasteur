function checkUserRole(role) {
    return function(req, res, next) {
        if (req.isAuthenticated() && req.session && req.session.userRole) {
            if (req.session.userRole === role) {
                next();
            } else {
                res.status(403).send('Acesso proibido');
            }
        } else {
            res.status(401).send('Não autorizado');
        }
    };
}