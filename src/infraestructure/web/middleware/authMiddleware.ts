// Se importan los tipos de Express y las librerías necesarias.
import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import envs from '../../../infraestructure/config/environment-vars.js';

// añadimos para que TypeScript no muestre errores cuando guardemos los datos del usuario autenticado.
export interface AuthRequest extends Request {
    user?: { id: number; email: string };
}
//req: la petición del cliente,
//res: la respuesta del servidor,
//next: una función para pasar al siguiente paso si todo está bien.
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Se extrae el token JWT que se envía en el encabezado Authorization como "Bearer
    const authHeader = req.headers.authorization;
    // Si no hay token, devolvemos un error 401 (no autorizado).
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado. No se ingreso un token.' });
    }
    // Extraemos el token del encabezado
    const token = authHeader.split(' ')[1];

    try {
        // Verificamos el token usando la clave secreta
        const decoded = jwt.verify(token, envs.JWT_SECRET) as { id: number, email: string };
        // Añadimos la info del usuario al objeto request
        req.user = decoded; 
        // El token es válido, continuamos.
        next(); 
    } catch (error) {
        // Si el token no es válido o ha expirado, devolvemos un error 403 (prohibido).
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};
