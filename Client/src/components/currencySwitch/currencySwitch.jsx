import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrency } from '../../reducers/currencySlice.js';
import './currencySwitch.scss'; // Import the SCSS file
import newRequest from '../../utils/newRequest';
import { useNavigate, useLocation } from 'react-router-dom';



const CurrencySwitch = () => {

  const storedCurrency = useSelector((state) => state.currencySlice.selectedCurrency);
  const dispatch = useDispatch();

  const handleCurrencyChange = async (event) => {
    const currency = event.target.value;

    try {
      console.log('Dispatching updateCurrency with:', currency);
      await newRequest.post('/currency', { currency });

      dispatch(updateCurrency(currency))

    } catch (error) {
      console.error('Error updating currency:', error);
    }
  };


  return (
    <div className="CurrencySwitch"> {/* Add the class name for the container */}
        <select value={storedCurrency} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="NGN">NGN</option>
      </select>
      <span className="DropdownIcon"></span> {/* Add the down arrow icon */}
    </div>
  );
};

export default CurrencySwitch;
