import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import FAQ from "../../components/faq/FAQ"; // the display component
import FaqForm from "../../components/faqForm/FaqForm"; //the creation component
import * as ReactBootStrap from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [faqList, setFaqList] = useState([]); // State to hold the list of FAQs
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleFeature_basic = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE_BASIC",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleFeature_standard = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE_STANDARD",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleFeature_premium = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE_PREMIUM",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      toast.success('Upload successful!');

    } catch (err) {
      console.log(err);    
      toast.error(err);
    }
  };


  const handleAddFAQ = (faq) => {
    dispatch({ type: "ADD_FAQ", payload: faq });
  };

  const handleRemoveFAQ = (faq) => {
    dispatch({ type: "REMOVE_FAQ", payload: faq });
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Gigs"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     mutation.mutate(state);
      console.log('Server response:', response.status);     
       
        //toast.success("Successfully created gig")     
   
    } catch (err) {
      setLoading(false)
      console.log(err);
      toast.error(err.message);    
    } 
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option >Select</option>
              <option value="Web Development">Web Development</option>
              <option value="Web Design">Web Design</option>
              <option value="Software">Software</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="SEO Services">SEO Services</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="Advertising">Advertising</option>
              <option value="Business">Business</option>
              <option value="music">Blog Articles Writing</option>
              <option value="Transcription">Transcription</option>
              <option value="Translation">Translation</option>
              <option value="Art & Illustration">Art & Illustration</option>
              <option value="Translation">Translation</option>
              <option value="Logo & Identity Branding">Logo & Identity Branding</option>
              <option value="Print Design">Print Design</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>

            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="100"
              rows="6"
              onChange={handleChange}
            ></textarea>
           {/* //I removed button from here */}
          </div>
          <div className="packages" >
          <div className="details">
            <label htmlFor=""> Basic Package Title</label>
            <input
              type="text"
              name="shortTitle_basic"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc_basic"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="26"
              rows="6"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime_basic" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber_basic"
              onChange={handleChange}
            />
            <label htmlFor="">Add Basic Features</label>
            <form action="" className="add" onSubmit={handleFeature_basic}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features_basic?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE_BASIC", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Basic Price</label>
            <input type="number" onChange={handleChange} name="price_basic" />
          </div>
          <div className="details">
            <label htmlFor="">Standard Package Title</label>
            <input
              type="text"
              name="shortTitle_standard"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc_standard"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="26"
              rows="6"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime_standard" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber_standard"
              onChange={handleChange}
            />
            <label htmlFor="">Add Standard Features</label>
            <form action="" className="add" onSubmit={handleFeature_standard}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features_standard?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE_STANDARD", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
          <div className="details">
            <label htmlFor="">Premium Service Title</label>
            <input
              type="text"
              name="shortTitle_premium"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc_premium"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="26"
              rows="6"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime_premium" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber_premium"
              onChange={handleChange}
            />

            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature_premium}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            
            <div className="addedFeatures">
              {state?.features_premium?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE_PREMIUM", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
          </div>

          <div className="faq-section">
          <h2>Add FAQs</h2>

          {state.faqs.length > 0 && (
            <div className="faq-list">
              {state.faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                  <button onClick={() => handleRemoveFAQ(faq)} className="button-faq">
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          <FaqForm onSubmit={handleAddFAQ} />

         
        </div>
          


     <button onClick={handleSubmit} className="createbutton">Create {loading && <ReactBootStrap.Spinner animation="border" />} </button>
        </div>
      </div>
    </div>
  );
};

export default Add;