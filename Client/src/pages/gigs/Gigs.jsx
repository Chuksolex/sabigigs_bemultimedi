import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';
import DiscountModal from '../../components/discountModal/DiscountModal';
import * as ReactBootStrap from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//import useCurrencyInfo from '../../components/useCurrencyInfo/useCurrencyInfo';

const Gigs = () => {
  const  data  =useSelector(state => state.gigsSlice.data.data);
   const [filteredSearch, setFilteredSearch] = useState(undefined);
   console.log("data frm gig:", data);
   const gigsAlone = data?.gigs;
   console.log("gigalone:",gigsAlone);
   const something = gigsAlone.gigs;

   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const searchTerm = searchParams.get("search"); // Retrieve the search term from the URL
   const initialCategoryFilter = searchParams.get("cat"); // retrieve cat from url
  

  
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
 const [min, setMin] = useState(0);
 const [max, setMax] = useState(10000);
  const minRef = useRef();
  const maxRef = useRef();
  const [gigData, setGigData] = useState([]);
  const [catFilter, setCatFilter] = useState(initialCategoryFilter); //category is cat
  const [discountModalIsOpen, setDiscountModalIsOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));




   
 

 
 
 
   const handleCatChange = (e) => {
    setCatFilter(e.target.value);
  };
  
 

  const handleMinChange = (e)=>{
    const value = parseFloat(e.target.value);

    if (isNaN(value) || value < 0) {
      setMin(0);
    } else {
      setMin(value);
    }
  }
  const handleMaxChange = (e)=>{
    const value = e.target.value;
    setMax(value);

  }

  const filteredData = gigsAlone.filter((gig) => {
    const gigTitle = gig.title.toLowerCase();
    const priceCondition = !isNaN(gig.price_basic) >= (min) && !isNaN(gig.price_basic) <= (max);
    const searchTermCondition = !searchTerm || gigTitle.includes(searchTerm.toLowerCase());
    const categoryCondition = !catFilter || gig.cat.toLowerCase() === catFilter.toLowerCase();

    return priceCondition && searchTermCondition && categoryCondition;;
  });


  console.log("filteredData:", filteredData);
  const handleFilter = () => {
    if(filteredData) setFilteredSearch(filteredData);
  }


  const handleSortChange = (newSort) => {
    setSort(newSort);
    setOpen(false);
  };

  // ... other parts of your component ...

  // Sorting logic for the gigs data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === "sales") {
      return b.sales - a.sales;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });


  const openDiscountModal = () => {
    setDiscountModalIsOpen(true);
  };
  
  const closeDiscountModal = () => {
    setDiscountModalIsOpen(false);
  };
  
  // const handleSaveDiscount = async () => {
  //   try {
  //     if (discountType !== 'None' && startDate && validThrough) {
  //       // Create a discount configuration object
  //       const discountConfig = {
  //         discountType,
  //         startDate,
  //         validThrough,
  //       };
  
  //       // Send the discount configuration data to the backend
  //       await newRequest.post('/gigs/configure-discounts', discountConfig);
  //       toast.success('Discount successfully configured', {
  //         position: toast.POSITION.TOP_RIGHT // Customize the position of the toast
  //       });
  
  //       // Display a success message or perform any necessary actions
  //       closeDiscountModal();
  //     } else {
  //       // Handle validation errors or display a message
  //     }
  //   } catch (error) {
  //     // Handle errors
  //   }
  // };
  

    return (
    <div className='gigs'>
      <div className="container">
        <span className="breadcrumbs"> PHAXNETGIGS › GRAPHICS & DESGIN › </span>
        <h1>Gigs</h1>
        { currentUser?.isSeller &&   <svg onClick={openDiscountModal} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e36b09" class="bi bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>}

            <DiscountModal
              isOpen={discountModalIsOpen}
              closeModal={closeDiscountModal}
            />
        <p> Browse the wonders of art and design with Phaxnetgigs</p>

        <div className="menu mr-4">
          <div className="left">
            <span>Budget</span>
            <input value={min} onChange={handleMinChange} ref={minRef} type="number" name='min' placeholder="min" />
            <input value={max} onChange={handleMaxChange} ref={maxRef} type="number" name='max' placeholder="max" />
            <button onClick={handleFilter}>Apply</button> 

          </div>
         
          
          <div className="right">
            <span className='sortBy'>SortBy:</span>
            <span className='sortType'> {sort ==="sales" ? "Best Selling" : "Newest" }</span>
            <img src="./img/down.png" alt="" onClick={()=> setOpen(!open)}/>
            {open && (
                <div className="rightmenu">
                     {sort === "sales"?  ( 
                        <span onClick={()=> handleSortChange("createdAt")}>Newest</span>
                      ) : (
                      <span onClick={()=> handleSortChange("sales")}>Best Selling</span>
                      )}
                      {/* <span onClick={() => handleSortChange("sales")}>Popular</span> */}
              

            </div>)}

          </div>
        </div>
        <div className='center d-flex align-items-center'>
          <p className='ms-4 '>Category:</p>
          <select
           className="form-select form-select-lg mb-3 h-100 w-auto" 
           value={catFilter}
           onChange={handleCatChange}
           name="cat"
          >
          <option value="">Search by Category</option>
          <option value="Graphics & Design">Graphics & Design</option>
          <option value="Web Development">Web Development</option>
          <option value="Web Design">Web Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Programming & Tech">Programming & Tech</option>
          <option value="Business">Business</option>
          <option value="Email Marketing">Email Marketing</option>
          <option value="SEO Services">SEO Services</option>
          <option value="Social Media Marketing">Social Media Marketing</option>
          <option value="Writing & Translation">Writing & Translation     </option>
          <option value="Translation"> Translation</option>
          <option value="Music, Audio & Videos">Music, Audio & Videos</option>
          <option value="Art & Illustration">Art & Illustration</option>
          <option value="Logo & Identity Branding">Logo & Identity Branding</option>
          <option value="Voice-over"> Voice-over</option>
          <option value="Video Editing"> Video Editing</option>
          <option value="2-D Animations"> 2-D Animations</option>
          <option value="3-D Animations"> 3-D Animations</option>
          <option value="Explainer Videos"> Explainer Videos</option>









          
        </select>

          </div>

        
        <div >
          {/* {isLoading? "Loading" : error? "Something went wrong!" : data.gigs.map((gig) =>( */} 
           {/* {data.gigs.gigs.length >= 0 ? <p>Loading...</p>: <p>Error loading gigs...</p>} */}
           <div className='row'>
           {sortedData.map((gigg) => (
           <div key={gigg._id} className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                        <GigCard key={gigg._id} currencyCode={data.currencyCode} item={gigg}/>


            </div>

          ))}
          </div>
        </div>


      </div>
    </div>
  )
}

export default Gigs;




  //   const [sort, setSort] = useState("sales");
    //   const [open, setOpen] = useState(false);
    //   const minRef = useRef();
    //   const maxRef = useRef();
    //const [currencyInfo, setCurrencyInfo] = useState(null);

      // const {search} = useLocation();

    //   console.log(search);

       

      
        // const { isLoading, error, data, refetch } = useQuery({
        //   queryKey: ['gigs'],
        //   queryFn: () =>
        //     newRequest.get(
        //       `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort${sort}`
        //       )
        //     .then(
        //       (res) => {
        //       return res.data;
        //     })
          
        // });
        
        // console.log(data);

    // const reSort = (type) => {
    //       setSort(type)
    //       setOpen(false)
    // };

    // useEffect(() => {
    //   refetch();
    // }, [sort]);
  
    // const apply = () => {
    //   refetch();
    // };
    //const dispatch = useDispatch();
