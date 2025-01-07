import { useState, useEffect } from "react";
import AnalysisList from "../components/Analysis/AnalysisList";
import { useNavigate } from "react-router-dom";

const { getAllAnayzesByUser } = require("../services/analysis");

function AllAnalysisPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedAnalysisItems, setLoadedAnalysisItems] = useState([]);

  useEffect(() => {
    // verify if the user is logged In
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
    }
    setIsLoading(true);

    async function setList() {
      const data = await getAllAnayzesByUser();

      setLoadedAnalysisItems(data.anaylysis);
    }

    setList();

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Analyzes: </h1>
      <AnalysisList analysisItems={loadedAnalysisItems} />
    </section>
  );
}

export default AllAnalysisPage;
