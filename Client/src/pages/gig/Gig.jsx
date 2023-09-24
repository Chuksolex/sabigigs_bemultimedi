import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useQuery} from "@tanstack/react-query";
import "./Gig.scss";
import PricingTab from '../../components/pricingTab/PricingTab';
import { Link, useNavigate, useParams } from "react-router-dom";
import newRequest from '../../utils/newRequest';
import Reviews from '../../components/reviews/Reviews';
import FAQ from '../../components/faq/FAQ';
import PackageComparisonTable from '../../components/packageComparisom/PackageComparisonTable';
import Slide from '../../components/slide/Slide';
import BrowsingHistoryCard from '../../components/browsingHistoryCard/BrowsingHistoryCard';
import GigCard from '../../components/gigCard/GigCard';
import Recommendations from '../recommendations/Recommendations';
import CreateConversation from '../../components/createConversation/createConversation';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const GigOptionsModal = ({ gigId, onDelete, onEdit }) => {
  return (
    <div className="gig-options-modal">
      <button className='btn btn-primary fs-4' onClick={() => onDelete(gigId)}>Delete</button>
      <button className='btn btn-primary ms-1 fs-4' onClick={() => onEdit(gigId)}>Edit</button>
    </div>
  );
};


function Gig () {


   const params  = useParams();
   const gigId=params.id;
   console.log("useParams Id:", gigId);
   const [browsingHistory, setBrowsingHistory] = useState([]); //managing the state of the browsing 
   const [showCreateConversationModal, setShowCreateConversationModal] = useState(false);
   const [existingConversationId, setExistingConversationId] = useState(null);
   const [popularGigs, setPopularGigs] = useState([]);
   const [currencyCode, setCurrencyCode] = useState('');
   const navigate=useNavigate();
   const [showModal, setShowModal] = useState(false);

   
 
   

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["gig"],
  //   queryFn: () =>
  //     newRequest.get(`/gigs/singlegig/${id}`).then((res) => {
  //       return res.data;// we are now getting two things here data.gig and data.currencyCode
    

  //     }),
  // });

 
  const  data  =useSelector(state => state.gigsSlice.data.data);

  console.log("data at gig:" , data);
  const gigAlone =  data?.gigs.find(gig => gig._id === gigId);// data.gigs.gigs?.find(gig => gig._id === gigId);
  const currencyInfo= data?.currencyCode;
    console.log("gigAlone:", gigAlone);    

    // const userId = data?.gig.userId; // this is owner of the gig;
    const userId = gigAlone.userId;
     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
     
    

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn:  () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
     enabled: !!userId,
  });

  

  useEffect(() => {
    // Load browsing history from local storage
    const storedHistory = localStorage.getItem('browsingHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setBrowsingHistory(parsedHistory);
    }
  }, []);

  




  const { isLoading: isLoadingPopularGigs, error: errorPopularGigs, data: dataPopularGigs } = useQuery({//leave this with api for now
    queryKey: ["gigs"],
    queryFn: () =>
       newRequest.get(`/gigs`).then((res) => {
       //const response = res.dataPopularGigs.gigs //&& res.dataPopularGigs.currencyCode;// we are now getting two things here data.gig and data.currencyCode
        const popularGigs= res.data.gigs.filter((gig) => gig.sales > 0);
        setPopularGigs(popularGigs);
        const currencyCode= res.data.currencyCode;
        setCurrencyCode(currencyCode)

      }),
  });

  const handleContact = async ()=>{
    if (!currentUser) {
      localStorage.setItem("wantedGigInfo", JSON.stringify(gigAlone));

      toast.info('Please Login to contact seller', {
        position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
      });

      setTimeout(() => {
       navigate("/login");
       
      }, 2000);
    }else{
      try {
         
        // Create a new conversation
        const response = await newRequest.post("/conversations", {
          to: sellerId,
                       
          fromEmail: currentUser.email,
        }); 
        const newConversationId = await response.data._id; // Assuming your response contains the new conversation's ID
  
        // Redirect the user to the new conversation page
        navigate(`/message/${newConversationId}`);
      } catch (error) {
        // Handle any errors that may occur during the process
        console.error('Error initiating conversation:', error);
      }
    }
  }
  
  



  const handleConversationCreated = async () => {
    if (existingConversationId) {
      // Redirect to the messaging page for the existing conversation
      navigate(`/message/${existingConversationId}`);
    } else {
      try {
        const response = await newRequest.get("/conversations");
        const existingConversation = response.data.find(conversation => {
          // Check if the conversation involves the recipient
          return (
            (conversation.sellerId === userId && conversation.buyerId === currentUser._id) ||
            (conversation.sellerId === currentUser._id && conversation.buyerId === userId)
          );
        });
        
        if (existingConversation) {
          setExistingConversationId(existingConversation.id); // Set the existing conversation ID

        }
        if (response.status === 201) {
          setShowCreateConversationModal(false); // Close the modal
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
      
      setShowCreateConversationModal(true);
    }
  };

  const handleEdit = ()=>{
    navigate(`/add/${gigAlone._id}`);
  }
 
  const handleDelete = async (gigId) => {
    
    try {
      // Call your delete API here
      const response = await  newRequest.delete(`gigs/deletegig/${gigAlone._id}`);
      // After successful deletion, you can perform any necessary actions
      if (response.status===200){
        console.log("delete sucess", response.status);

              toast.success('succesfully deleted gig', {
           position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
         });

         setTimeout(() => {
          navigate("/gigs");
          
         }, 2000);

      }    

      // Close the modal
      setShowModal(false);
    } catch (error) {
      toast.error('succesfully deleted gig', error, {
        position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
      });
    }
  };

  

  

 

  return (
    <div className="gig">
    
      
      {/* {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : ( */}
       <div className="container">
        <div className='upperSide'>
        <div className="left">
          
            <span className='breadcrumbs'>Phaxnetgigs › {gigAlone.cat} ›</span>
            {( gigAlone.userId === currentUser?._id) &&   <svg onClick={() => setShowModal(!showModal)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e36b09" class="bi bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>}

            {showModal && (
            <GigOptionsModal gigId={gigAlone._id} onDelete={handleDelete} onEdit={handleEdit} />
             )}
          

            <h1 className='title'> {gigAlone.title}</h1>
            

            {isLoadingUser? "Loading.." : 
              errorUser? "Something went wrong!" :
             <div className="user">
           
             <img
              className="pp"
              src={dataUser.img}
              alt=""
             />
              <span>{dataUser.username}</span>
              {!isNaN(gigAlone.totalStars / gigAlone.starNumber) && (
                 <div className="stars">
                   {Array(Math.round(gigAlone.totalStars / gigAlone.starNumber)).fill().map((item, i) =>(
                                    <img src="/img/star.png" key={i} alt="" />

                   ))}
                
                   <span>{Math.round(gigAlone.totalStars / gigAlone.starNumber)}</span>

                 </div>
                 )}
                          
            </div>}
            <div className='background-images container-sm'>
            <Slide slidesToShow={1} isAuto={true} slidesToScroll={1}>
            {gigAlone.images.map((imag, i) => (
            <img key={i} src={imag} />
             ))}
            </Slide>
          </div> 
           
            <h2>About This Gig</h2>
            <p>  {gigAlone.desc}    </p>

            {isLoadingUser? "Loading.." : 
              errorUser? "Something went wrong!" :
            <div className="seller">
               <h2>About The Seller</h2>
              
              <div className="user">
               <img
                src={dataUser.img || "/img/noavatar.jpg"}
                alt=""
                />
                <div className="info">
                  <span>{dataUser.username}</span>
                  {!isNaN(gigAlone?.totalStars / gigAlone?.starNumber) && (
                 <div className="stars">
                   {Array(Math.round(gigAlone.totalStars / gigAlone.starNumber)).fill().map((item, i) =>(
                                    <img src="/img/star.png" key={i} alt="" />

                   ))}
                
                   <span>{Math.round(gigAlone.totalStars / gigAlone.starNumber)}</span>

                 </div> )}
                 <button className='btn btn-primary' onClick={() => handleContact()}>Contact Seller</button>
                  {showCreateConversationModal && (
                                    <CreateConversation 
                                        onConversationCreated={handleConversationCreated} 
                      existingConversationId={existingConversationId} />
                  )}
                
                   
                </div>
                
               
              
              </div>
              <div className="box">
            <div className="items">
              <div className="item">
                <span className="title">From</span>
                <span className="desc">{dataUser.country}</span>

              </div>
              <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>

            </div>
            <hr />
            <p> {dataUser.desc}</p>
          </div>

            </div>}

          

          
          
          
        </div>

        
        <div className="right">
          <div className='pricingTab'>
              <PricingTab currencyCode={currencyInfo} key={gigAlone.gigId} item={gigAlone} currentUser={currentUser}/>

          </div>
         

            <div className='comparePackage'>
              <h3>Compare Package</h3>

              <PackageComparisonTable currencyCode={currencyInfo} key={gigAlone._id} item={gigAlone} />

            </div>

          
        </div>
       </div>

          
       <div  className='frequently-asked' > 
          <h2 className='sub-head'>Frequently Asked Questions FAQs</h2>

       <div className='faq'>
          <FAQ faqData={gigAlone.faqs} />
        </div>
       </div>
         
          
          <div  className='recommended-services' > 
          <h2 className='sub-head'>Recommended Services</h2>

          <div className='popular'>
            {popularGigs.map((gig) => (
             
              <GigCard  currencyCode={currencyCode} key={gig._id} item={gig} />
             
            ))}
         </div>
         </div>
        
       
       

        <div className='browsing-history '>
          <h2 className='sub-head'>Your Browsing History</h2>
          <div  className='history' >

          {browsingHistory.map((gighistory) => (
                 <GigCard  item={gighistory}  key={gighistory._id}/>
          )
          )}
       
       </div>
        </div>  

     
          <Reviews gigId={gigId} />
      
       

       
        
      
      </div>
    </div>
  )
}

export default Gig;
