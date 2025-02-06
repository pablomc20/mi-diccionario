export const retrieveFavoritesStorage = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const reloadFavoritesStorge = (wordId) => {
    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (updatedFavorites.includes(wordId)) {
        // Si ya está en favoritos, lo quitamos
        updatedFavorites = updatedFavorites.filter(id => id !== wordId);
    } else {
        // Si no está en favoritos, lo agregamos
        updatedFavorites.push(wordId);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    return updatedFavorites;
}