import { useRef } from "react";
import { useState } from "react";

import Card from "../ui/Card";
import classes from "./NewAnalysisForm.module.css";

function NewAnalysisForm(props) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append("title", titleInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);

    props.onAddAnalysis(formData);
  }

  const [selectedFile, setSelectedFile] = useState(null);
  //Image for visual
  const [image, setimage] = useState(null);

  const onChange = (e) => {
    setSelectedFile(e.target.files[0]);

    // Create a URL for the selected file
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setimage(imageUrl);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Analysis Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="3"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          {selectedFile && (
            <>
              <label>Current image</label>
            </>
          )}
          {!selectedFile && (
            <>
              <label htmlFor="UploadedImg">Add Image</label>
              <input
                type="file"
                onChange={onChange}
                required
                id="UploadedImg"
              />
            </>
          )}
          {selectedFile && (
            <img src={image} className={classes.image} alt="Uploaded" />
          )}
        </div>
        <div className={classes.actions}>
          <button>Analyse picture</button>
        </div>
      </form>
    </Card>
  );
}

export default NewAnalysisForm;
