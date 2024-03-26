import jwt from 'jsonwebtoken';

function authenticationMiddleware(req, res, next) {
    const jwtToken = req.header('TOKEN');

    if (!jwtToken) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    try {
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.user = decodedToken.user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token de autenticação inválido' });
        } else {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default authenticationMiddleware;