// Ubicación: src/domain/FavoritePort.ts

import { Favorite } from "../infraestructure/entities/Favorite.js";

// DTO para la creación de un favorito
export interface CreateFavoriteDto {
    barrioId: number;
}

export interface FavoritePort {
    createFavorite(userId: number, barrioId: number): Promise<Favorite>;
    getFavoritesByUserId(userId: number): Promise<Favorite[]>;
    getFavoriteById(favoriteId: number): Promise<Favorite | null>;
    deleteFavorite(favoriteId: number): Promise<boolean>;
    // Nota: Un "Update" para un favorito es menos común. Generalmente se borra y se crea uno nuevo.
    // Lo omitiremos por simplicidad, pero se podría añadir si fuera necesario.
}