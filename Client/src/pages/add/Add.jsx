import React, { useReducer, useState, useEffect } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import { useSelector } from "react-redux";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";
import FAQ from "../../components/faq/FAQ"; // the display component
import FaqForm from "../../components/faqForm/FaqForm"; //the creation component
import * as ReactBootStrap from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoSection from "../../components/formComponent/InfoSection";
import ImagesSection from "../../components/formComponent/ImagesSection";
import PackageSection from "../../components/formComponent/PremiumPackageSection";
import FaqSection from "../../components/formComponent/FaqSection";
import AddonSection from "../../components/formComponent/AddonSection";
import PremiumPackageSection from "../../components/formComponent/PremiumPackageSection";
import StandardPackageSection from "../../components/formComponent/StandardSection";
import BasicPackageSection from "../../components/formComponent/BasicPackageSection";


const Add = () => {
  const params  = useParams();
  const gigId = params.id;
  const isEdit = !!gigId;
 
 
 
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError]= useState(null);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const [faqList, setFaqList] = useState([]); // State to hold the list of FAQs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Fetch gig data based on gigId
      // const data = useSelector(state => state.gigsSlice.gigs);
      // const gigAlone = data?.gigs.find(gig => gig._id === gigId);
      newRequest.get(`/gigs/singlegig/${gigId}`).then((gigAlone)=>{
        console.log("gigAlone at Add:" ,gigAlone.data.gig);
        dispatch({ type: "SET_GIG_DATA", payload: gigAlone.data.gig });


      })
     
      
   
    }
  }, [isEdit]);


  const [page, setPage] = useState(0);
  const FormTitles = ["Info Section", "Images Section", "Basic Package", "Standard Package", "Premium Package", "FAQ Section", "Addon Section"];

  const SectionToDisplay = () => {
    if(page==0){
      return <InfoSection state={state} handleChange={handleChange} />
    }else if(page==1){
      return <ImagesSection  state={state} handleChange={handleChange}
       uploading={uploading} handleUpload={handleUpload} uploadSuccess={uploadSuccess} 
       setFiles={setFiles} setSingleFile={setSingleFile} uploadError={uploadError}/>
    }else if(page==2){
      return <BasicPackageSection state={state} handleChange={handleChange} handleFeature_basic={handleFeature_basic} dispatch={dispatch} />
    }else if(page==3){
      return <StandardPackageSection state={state} handleChange={handleChange} handleFeature_standard={handleFeature_standard} dispatch={dispatch}/>
    }else if(page==4){
      return <PremiumPackageSection state={state} handleChange={handleChange} handleFeature_premium={handleFeature_premium} dispatch={dispatch}/>
    }else if(page==5){
      return <FaqSection state={state} handleAddFAQ={handleAddFAQ} handleRemoveFAQ={handleRemoveFAQ}/>
    } else {
      return <AddonSection state={state} handleAddAddon={handleAddAddon} handleRemoveAddon={handleRemoveAddon} />
    }
  }

 
  

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
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
      setUploadSuccess(true);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      toast.success('Upload successful!');

    } catch (err) {
      setUploadError(err.message);
      console.log(err);    
      toast.error(err);
      setUploadSuccess(false);
    }finally {
      // Always set uploading state to false, whether success or error
      setUploading(false);
    }
  };


  const handleAddAddon = (e) => {
    e.preventDefault();
    const addon = {
      title: e.target.addonTitle.value,
      shortDesc: e.target.addonShortDesc.value,
      price: parseFloat(e.target.addonPrice.value),
    };
    dispatch({ type: "ADD_ADDON", payload: addon });
    e.target.reset();
  };

  const handleRemoveAddon = (addon) => {
    dispatch({ type: "REMOVE_ADDON", payload: addon });
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
      if (isEdit) {
        // Perform edit operation using PUT or PATCH request
        const response = await newRequest.put(`/gigs/updategig/${gigId}`, state);
        console.log('Server response at gig update:', response.status);
        if (response.data && response.status===200) {
          toast.success("Succesfully updated gig", {
            position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
          });
          setTimeout(() => {
            navigate("/gigs")
            
          }, 2000);
        }
      } else {
        // Perform create operation using POST request
        const response = await mutation.mutateAsync(state);
        console.log('Server response at gig submit:', response.status);
        if (response.data && response.data.message) {
          toast.success(response.data.message); // Display the success message from the backend
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };
  


  return (
   
      <div className="add bg-light">
        
        
       
        <div className="progressbar d-flex aligns-items-center justify-content-center text-center">
            <div style={{height: "10px", width: page === 0 ? "16.67%" : page == 1 ? "33.34%" : page== 2 ? "50.01%" : page== 3 ? "66.68%" : page== 4 ? "83.35%" :"100%" }}></div>
        </div>
       <div className="form text-center">  
          <div className="header fs-1 fw-500 mb-6"> 
            {FormTitles[page]} 
          </div>
          <div className="body text-center d-flex justify-content-center">{SectionToDisplay()}  </div>

          <div className="footer">  

            <button className="btn btn-lg btn-secondary m-4" onClick={()=> setPage((currentPage) => currentPage-1)}
                    disabled={page==0}>PREV</button>

            <button className="btn btn-lg btn-secondary m-4"   onClick={() => {
                  if (page === FormTitles.length - 1) {
                    handleSubmit(event); // Call the function
                    console.log("gig form state:", state);
                  } else {
                    setPage((currPage) => currPage + 1);
                  }
                }}
            > {(page === FormTitles.length - 1) & !isEdit ? "Create Gig" : (page === FormTitles.length - 1) & isEdit? "Update Gig" : "Next"} </button>
               {loading && <ReactBootStrap.Spinner animation="border" 
            />
            }

          </div>

       </div>



    </div>
          
         
        
          


      

      
   
  );
};

export default Add;








