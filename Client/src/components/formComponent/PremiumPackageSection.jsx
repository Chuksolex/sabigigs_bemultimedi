 import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";

const PremiumPackageSection = ({state, dispatch, handleChange, handleFeature_premium}) => {
   //const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  //  const handleChange = (e) => { 
  //   dispatch({
  //     type: "CHANGE_INPUT",
  //     payload: { name: e.target.name, value: e.target.value },
  //   });
  // };

    
  // const handleFeature = (e) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: "ADD_FEATURE",
  //     payload: e.target[0].value,
  //   });
  //   e.target[0].value = "";
  // };

  

  // const handleFeature_premium = (e) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: "ADD_FEATURE_PREMIUM",
  //     payload: e.target[0].value,
  //   });
  //   e.target[0].value = "";
  // };
    return(
        <div className="packages info-container" >
          
         
            <label htmlFor="" className="fw-bold fs-2 mt-6">Premium Service Title</label>
            <input
             className="w-100 fs-4"
              type="text"
              name="shortTitle_premium"
              value={state.shortTitle_premium}
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label htmlFor="" className="fw-bold fs-2">Price</label>
            <input className="w-100 fs-4" type="number" onChange={handleChange} name="price_premium" value={state.price_premium} />

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc_premium"
              value={state.shortDesc_premium}
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="26"
              rows="2"
              className="w-100 fs-4"
            ></textarea>

            <label htmlFor="" className=" fs-2 fw-bold">Delivery Time (e.g. 3 days):</label>
            <input type="number" name="deliveryTime_premium" onChange={handleChange} value={state.deliveryTime_premium}/>

            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              value={state.revisionNumber_premium}
              name="revisionNumber_premium"
              onChange={handleChange}
              className="w-100 fs-4"
            />

            <div className="addedFeatures">
              {state?.features_premium?.map((f) => (
                <div className="item " key={f}>
                  <button className="border-0"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE_PREMIUM", payload: f })
                    }
                  >
                    {f}
                    <span className="ms-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                      </span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="" className="fs-2 fw-bold" >Add Features: </label>
            <form action="" className="" onSubmit={handleFeature_premium}>
              <input className="w-100 fs-4" type="text" placeholder="e.g. page design" />
              <button type="submit" className="btn btn-lg btn-primary">add</button>
            </form>
            
            
            
      
        </div>


    )
}
export default PremiumPackageSection