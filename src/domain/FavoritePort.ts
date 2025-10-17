import { Favorite } from "../infraestructure/entities/Favorite.js";

//DTO para la creación de un Favorito
export interface CreateFavoriteDto {
    barrioId: number;
}
//DTO para la actualización de un Favorito
export interface FavoritePort {
    // Operaciones CRUD para la entidad Favorito
    createFavorite(userId: number, barrioId: number): Promise<Favorite>;
    getFavoritesByUserId(userId: number): Promise<Favorite[]>;
    getFavoriteById(favoriteId: number): Promise<Favorite | null>;
    deleteFavorite(favoriteId: number): Promise<boolean>;

    //No hay Update ya que al gestionar favoritos es mas comun que un usuario borre y despuesa añada, a que que los actualice.

}