function authenticationMiddleware({ cargo }) {
    return (req, res, next) => {
        const userAccessLevel = parseInt(req.header('access-level')); // Convertendo para número

        console.log('Nível de acesso do usuário:', userAccessLevel);
        console.log('Cargos permitidos para acesso:', cargo);

        if (cargo.includes(userAccessLevel)) {
            next();
        } else {
            console.log('Acesso negado!');
            return res.status(401).json({ message: 'Acesso negado!' });
        }
    };
}

export default authenticationMiddleware;
