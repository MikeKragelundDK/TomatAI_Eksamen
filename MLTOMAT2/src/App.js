import { Route, Routes } from "react-router-dom";

import AllAnalysisPage from "./pages/AllAnalysis";
import NewAnalysisPage from "./pages/NewAnalysis";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";
import { ImageProvider } from "./store/ImageContext";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Layout>
      <ImageProvider>
        <Routes>
          <Route path="/" exact element={<AllAnalysisPage />} />
          <Route path="/new-analysis" element={<NewAnalysisPage />}></Route>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ImageProvider>
    </Layout>
  );
}

export default App;
