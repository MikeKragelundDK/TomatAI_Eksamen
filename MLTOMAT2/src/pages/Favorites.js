import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FavoritesContext from "../store/favorites-context";
import AnalysisList from "../components/Analysis/AnalysisList";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  //verify that user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
    }
  }, []);

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = <AnalysisList analysisItems={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
