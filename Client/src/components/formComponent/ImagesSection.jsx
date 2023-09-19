
import React, {useState} from "react";
import upload from "../../utils/upload";

const ImagesSection = ({
  state,
  dispatch,
  handleUpload,
  uploading,
  setSingleFile,
  setFiles,
  setUploading,
  uploadSuccess,
  uploadError}) => {

    
    return(
        <div className="images-container">
       
          <label htmlFor="">Cover Image:</label>
          {state.cover && <div className="fs-6">Selected Cover Image URL: {state.cover}</div>}
          <input
            type="file"
            onChange={(e) => setSingleFile(e.target.files[0])}
          /> <br/>

          <label htmlFor="">Upload Additional Images At Least 2:</label>
            {state.images.length > 0 && (
              <div>
                Selected Image URLs:
                <ul>
                  {state.images.map((image, index) => (
                    <li key={index} className="fs-6">{image}</li>
                  ))}
                </ul>
              </div>
            )}
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
       
        <button onClick={handleUpload} className="btn btn-primary btn-lg" disabled={uploading || uploadSuccess}>
          {uploading ? "Wait, uploading..." : uploadSuccess ? "Uploaded" : "Upload"}
        </button>
        {uploadError && <p className="fs-4 text text-danger">{uploadError}</p>}
        </div>

    )
}
export default ImagesSection;