// Ubicación: src/application/FavoriteService.ts

import { FavoritePort, CreateFavoriteDto } from "../domain/FavoritePort.js";
import { Favorite } from "../infraestructure/entities/Favorite.js";

// DTO para una respuesta limpia
export interface FavoriteResponseDto {
    id: number;
    barrio: {
        id: number;
        nombre: string;
    };
}

export class FavoriteService {
    constructor(private readonly favoritePort: FavoritePort) {}
    
    private mapFavoriteToResponse(favorite: Favorite): FavoriteResponseDto {
        return {
            id: favorite.id,
            barrio: {
                id: favorite.barrio.id,
                nombre: favorite.barrio.nam_bar,
            },
        };
    }

    async createFavorite(userId: number, data: CreateFavoriteDto): Promise<FavoriteResponseDto> {
        // Ya no necesitamos la lógica compleja de "refrescar".
        // El adaptador ya nos devuelve el favorito con toda la información necesaria.
        const newFullFavorite = await this.favoritePort.createFavorite(userId, data.barrioId);
        return this.mapFavoriteToResponse(newFullFavorite);
    }

    async getFavoritesByUserId(userId: number): Promise<FavoriteResponseDto[]> {
        const favorites = await this.favoritePort.getFavoritesByUserId(userId);
        return favorites.map(this.mapFavoriteToResponse);
    }

    async deleteFavorite(userId: number, favoriteId: number): Promise<boolean> {
        // --- ¡REGLA DE SEGURIDAD! ---
        // 1. Obtenemos el favorito que se quiere borrar.
        const favorite = await this.favoritePort.getFavoriteById(favoriteId);

        // 2. Si no existe, o si el ID del dueño del favorito NO es el mismo que el del usuario logueado...
        if (!favorite || favorite.user.id !== userId) {
            // ...lanzamos un error. Esto evita que un usuario borre los favoritos de otro.
            throw new Error("No tienes permiso para eliminar este favorito o no existe.");
        }

        // 3. Si la validación pasa, procedemos a borrar.
        return this.favoritePort.deleteFavorite(favoriteId);
    }
}