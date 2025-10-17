// Ubicación: src/infraestructure/adapter/FavoriteAdapter.ts

import { AppDataSource } from "../config/database.js";
import { Favorite } from "../entities/Favorite.js";
import { FavoritePort } from "../../domain/FavoritePort.js";
import { User } from "../entities/User.js";
import { Barrio } from "../entities/Barrio.js";

export class FavoriteAdapter implements FavoritePort {
    private favoriteRepository = AppDataSource.getRepository(Favorite);

    async createFavorite(userId: number, barrioId: number): Promise<Favorite> {
        // Primero, creamos y guardamos la relación básica.
        const favoriteToSave = this.favoriteRepository.create({
            user: { id: userId } as User,
            barrio: { id: barrioId } as Barrio,
        });
        const savedFavorite = await this.favoriteRepository.save(favoriteToSave);

        // Segundo, lo buscamos de inmediato por su nuevo ID para cargar las relaciones.
        // Esto nos devuelve el objeto completo con los datos del barrio.
        return this.favoriteRepository.findOneOrFail({
            where: { id: savedFavorite.id },
            relations: ["barrio"],
        });
    }

    async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
        // Buscamos todos los favoritos donde el ID del usuario coincida
        return this.favoriteRepository.find({
            where: { user: { id: userId } },
            relations: ["barrio", "barrio.coordenadas"], // Cargamos la info del barrio y sus coordenadas
        });
    }

    async getFavoriteById(favoriteId: number): Promise<Favorite | null> {
        // Buscamos un favorito por su ID y cargamos la relación con el usuario para la validación
        return this.favoriteRepository.findOne({
            where: { id: favoriteId },
            relations: ["user"],
        });
    }
    
    async deleteFavorite(favoriteId: number): Promise<boolean> {
        const result = await this.favoriteRepository.delete(favoriteId);
        return result.affected !== null && result.affected! > 0;
    }
}