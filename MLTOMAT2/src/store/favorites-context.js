import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteAnalysis) => {},
  removeFavorite: (analysisId) => {},
  itemIsFavorite: (analysisId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteAnalysis) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteAnalysis);
    });
  }

  function removeFavoriteHandler(analysisId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((analysis) => analysis.id !== analysisId);
    });
  }

  function itemIsFavoriteHandler(analysisId) {
    return userFavorites.some((analysis) => analysis.id === analysisId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
