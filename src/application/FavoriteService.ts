import { FavoritePort, CreateFavoriteDto } from "../domain/FavoritePort.js";
import { Favorite } from "../infraestructure/entities/Favorite.js";

// Define la estructura del DTO de respuesta para favoritos.
export interface FavoriteResponseDto {
    id: number;
    barrio: {
        id: number;
        nombre: string;
    };
}

// Realiza la lógica de negocio para los Favoritos.
export class FavoriteService {
    // Constructor para inyectar la dependencia del puerto.
    constructor(private readonly favoritePort: FavoritePort) {}

    // Método privado para transformar la entidad Favorite a nuestro DTO de respuesta.
    private mapFavoriteToResponse(favorite: Favorite): FavoriteResponseDto {
        return {
            id: favorite.id,
            barrio: {
                id: favorite.barrio.id,
                nombre: favorite.barrio.nam_bar,
            },
        };
    }
    // Crea un nuevo favorito asociado al usuario y devuelve el DTO de respuesta.
    async createFavorite(userId: number, data: CreateFavoriteDto): Promise<FavoriteResponseDto> {
        const newFullFavorite = await this.favoritePort.createFavorite(userId, data.barrioId);
        return this.mapFavoriteToResponse(newFullFavorite);
    }
    // Obtiene todos los favoritos de un usuario específico y los transforma a DTO de respuesta.
    async getFavoritesByUserId(userId: number): Promise<FavoriteResponseDto[]> {
        const favorites = await this.favoritePort.getFavoritesByUserId(userId);
        return favorites.map(this.mapFavoriteToResponse);
    }
    // Elimina un favorito asegurando que el usuario tiene permiso para hacerlo.
    async deleteFavorite(userId: number, favoriteId: number): Promise<boolean> {
        // Obtenemos el favorito que se quiere borrar.
        const favorite = await this.favoritePort.getFavoriteById(favoriteId);

        //Si no existe, o si el ID del usuario del favorito NO es el mismo que el del usuario logueado...
        if (!favorite || favorite.user.id !== userId) {
            //lanzamos un error. Esto evita que un usuario borre los favoritos de otro.
            throw new Error("No tienes permiso para eliminar este favorito o no existe.");
        }

        //Si la validación pasa, procedemos a borrar.
        return this.favoritePort.deleteFavorite(favoriteId);
    }

    //No hay Update ya que al gestionar favoritos es mas comun que un usuario borre y despuesa añada, a que que los actualice.
}