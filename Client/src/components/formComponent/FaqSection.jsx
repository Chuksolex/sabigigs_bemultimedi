import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import FaqForm from "../faqForm/FaqForm";

const FaqSection = ({state, handleAddFAQ, handleRemoveFAQ, }) => {
    //const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    
  // const handleAddFAQ = (faq) => {
  //   dispatch({ type: "ADD_FAQ", payload: faq });
  // };

  // const handleRemoveFAQ = (faq) => {
  //   dispatch({ type: "REMOVE_FAQ", payload: faq });
  // };

    return(
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
          


    )
}
export default FaqSection