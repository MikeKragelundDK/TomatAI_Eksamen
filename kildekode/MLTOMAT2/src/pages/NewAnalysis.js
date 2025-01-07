import { useImage } from "../store/ImageContext";
import { useEffect } from "react";

import NewAnalysisForm from "../components/Analysis/NewAnalysisForm";

import { createAnalyze } from "../services/analysis";

import { useNavigate } from "react-router-dom";

function NewAnalysisPage() {
  //verify that user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
    }
  }, []);

  const { setUploadedImageUrl } = useImage();

  const handleUpload = async (formData) => {
    console.log(formData.has("image"));
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await createAnalyze(formData);
      console.log(response);

      if (response.success) {
        setUploadedImageUrl(response.anaylysis.imgPath);
        alert("analysis request sent successfully.");
        navigate("/");
      } else {
        alert("Error creating analysis request");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <section>
      <h1>Analyse new picture</h1>
      <NewAnalysisForm onAddAnalysis={handleUpload} />
    </section>
  );
}

export default NewAnalysisPage;
