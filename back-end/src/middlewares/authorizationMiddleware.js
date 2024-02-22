    // AUTHORIZATIONMIddleware.js
    import jwt from 'jsonwebtoken';

    function verifyJwt(req, res, next) {
        const jwtToken = req.header('Authorization');

        if (!jwtToken) {
            return res.status(401).json({ message: 'Token não fornecido!' });
        }

        try {
            jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

            return next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                return res.status(401).json({ unauthorized: `${error.message}` });
            } else {
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    export default verifyJwt;
