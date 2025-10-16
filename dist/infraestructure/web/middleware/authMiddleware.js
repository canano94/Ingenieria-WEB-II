import jwt from 'jsonwebtoken';
import envs from '../../../infraestructure/config/environment-vars.js';
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado. No se proveyó un token.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, envs.JWT_SECRET);
        req.user = decoded; // Añadimos la info del usuario al objeto request
        next(); // El token es válido, continuamos.
    }
    catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};
//# sourceMappingURL=authMiddleware.js.map