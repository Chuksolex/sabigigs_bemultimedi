import express from "express";
import createError from "../utils/createError.js";
import axios from "axios";
import session from "express-session";
import fx from "money";


      

    // Assuming the currency parameter is passed in the query (e.g., /setcurrency?currency=USD)
export const setCurrency = async (req, res) => {
  try {
    const currency = req.body.currency;

  // Store the selected currency in the session
  req.session.selectedCurrency = currency;

  res.status(200).json({
    message: 'Currency updated successfully',
  });
    
  } catch (error) {
    console.log(error);
  }
};

// New function to get the user's selected currency from the session
export const getCurrencyInfo = (req, res) => {
  const currencyInfo = req.session.selectedCurrency || { switchedCurrency: 'USD', exchangeRate: 1 };
  res.status(200).json(currencyInfo);
};





// // Replace 'YOUR_APP_ID' with your actual Open Exchange Rates API app ID
// const openExchangeRatesAPI = 'https://openexchangerates.org/api/latest.json?app_id=a4842a1b244f4670b2ea2cf80b9f7bec';

// // Function to fetch exchange rates from the Open Exchange Rates API
// export async function getExchangeRates() {
//   try {
//     const response = await axios.get(openExchangeRatesAPI);
//     const rates = response.data.rates;
//     fx.base = response.data.base;
//     fx.rates = rates;
//     console.log('Exchange rates fetched successfully:', rates);
//     return rates;
//   } catch (error) {
//     console.error('Error fetching exchange rates:', error);
//     return null;
//   }
// }


// Function to convert amount from one currency to another using money.
export const exchangeRates =  {
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "timestamp": 1695578423,
  "base": "USD",
  "rates": {
    "AED": 3.673,
    "AFN": 78.587155,
    "ALL": 99.732966,
    "AMD": 382.911041,
    "ANG": 1.79585,
    "AOA": 831,
    "ARS": 348.778936,
    "AUD": 1.552313,
    "AWG": 1.7975,
    "AZN": 1.7,
    "BAM": 1.832389,
    "BBD": 2,
    "BDT": 109.354941,
    "BGN": 1.838322,
    "BHD": 0.375603,
    "BIF": 2823.907848,
    "BMD": 1,
    "BND": 1.360941,
    "BOB": 6.885277,
    "BRL": 4.9349,
    "BSD": 1,
    "BTC": 0.000037490393,
    "BTN": 82.614505,
    "BWP": 13.575678,
    "BYN": 2.515107,
    "BZD": 2.008526,
    "CAD": 1.34925,
    "CDF": 2472.196173,
    "CHF": 0.90661,
    "CLF": 0.032084,
    "CLP": 885.28599,
    "CNH": 7.3045,
    "CNY": 7.297,
    "COP": 3938.9141,
    "CRC": 534.033481,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 103.307268,
    "CZK": 22.9229,
    "DJF": 177.420717,
    "DKK": 7.0014,
    "DOP": 56.551272,
    "DZD": 137.306,
    "EGP": 30.789994,
    "ERN": 15,
    "ETB": 55.109388,
    "EUR": 0.936979,
    "FJD": 2.263,
    "FKP": 0.81706,
    "GBP": 0.81706,
    "GEL": 2.69,
    "GGP": 0.81706,
    "GHS": 11.483581,
    "GIP": 0.81706,
    "GMD": 64.5,
    "GNF": 8556.658958,
    "GTQ": 7.841851,
    "GYD": 208.46949,
    "HKD": 7.82045,
    "HNL": 24.558955,
    "HRK": 7.078,
    "HTG": 134.520076,
    "HUF": 362.814356,
    "IDR": 15357.05,
    "ILS": 3.793789,
    "IMP": 0.81706,
    "INR": 83.09935,
    "IQD": 1304.913641,
    "IRR": 42240,
    "ISK": 135.991054,
    "JEP": 0.81706,
    "JMD": 154.298011,
    "JOD": 0.7092,
    "JPY": 148.28,
    "KES": 145.210136,
    "KGS": 88.71,
    "KHR": 4099.893048,
    "KMF": 461.549867,
    "KPW": 900,
    "KRW": 1335.655,
    "KWD": 0.307959,
    "KYD": 0.830374,
    "KZT": 473.500098,
    "LAK": 20054.59411,
    "LBP": 14976.706956,
    "LKR": 323.108536,
    "LRD": 186.400019,
    "LSL": 18.749613,
    "LYD": 4.855952,
    "MAD": 10.281726,
    "MDL": 18.129948,
    "MGA": 4524.319021,
    "MKD": 57.727083,
    "MMK": 2092.562776,
    "MNT": 3450,
    "MOP": 8.026608,
    "MRU": 38.233007,
    "MUR": 44.65,
    "MVR": 15.4,
    "MWK": 1079.402182,
    "MXN": 17.2138,
    "MYR": 4.6915,
    "MZN": 63.925012,
    "NAD": 18.89,
    "NGN": 765.16742,
    "NIO": 36.46414,
    "NOK": 10.7807,
    "NPR": 132.183466,
    "NZD": 1.678134,
    "OMR": 0.383567,
    "PAB": 1,
    "PEN": 3.72755,
    "PGK": 3.674521,
    "PHP": 56.842502,
    "PKR": 287.223854,
    "PLN": 4.32345,
    "PYG": 7251.592263,
    "QAR": 3.633485,
    "RON": 4.6658,
    "RSD": 109.870263,
    "RUB": 96.300011,
    "RWF": 1207.853884,
    "SAR": 3.751033,
    "SBD": 8.408143,
    "SCR": 13.009322,
    "SDG": 601.5,
    "SEK": 11.1369,
    "SGD": 1.3659,
    "SHP": 0.81706,
    "SLL": 20969.5,
    "SOS": 569.448067,
    "SRD": 38.386,
    "SSP": 130.26,
    "STD": 22281.8,
    "STN": 22.954045,
    "SVC": 8.71879,
    "SYP": 2512.53,
    "SZL": 18.744555,
    "THB": 35.869209,
    "TJS": 10.945894,
    "TMT": 3.5,
    "TND": 3.152,
    "TOP": 2.3905,
    "TRY": 27.1727,
    "TTD": 6.759732,
    "TWD": 32.154,
    "TZS": 2496.082011,
    "UAH": 36.80264,
    "UGX": 3741.993594,
    "USD": 1,
    "UYU": 38.080052,
    "UZS": 12168.476306,
    "VES": 33.886512,
    "VND": 24372.444148,
    "VUV": 118.722,
    "WST": 2.7185,
    "XAF": 614.618046,
    "XAG": 0.04245564,
    "XAU": 0.00051937,
    "XCD": 2.70255,
    "XDR": 0.75561,
    "XOF": 614.618046,
    "XPD": 0.000797,
    "XPF": 111.811357,
    "XPT": 0.00107331,
    "YER": 250.324978,
    "ZAR": 18.75404,
    "ZMW": 20.850705,
    "ZWL": 322
  }
}


export function convertCurrency(amount, fromCurrency, toCurrency) {

  if (typeof amount !== 'number') {
    console.error('Invalid amount. Currency conversion cannot be performed.');
    return null;
  }

  
  // Set the exchange rates and base currency for the fx library
  fx.rates = exchangeRates.rates;
  fx.base = exchangeRates.base;

  if (!fx.rates[fromCurrency] || !fx.rates[toCurrency]) {
    console.error('Invalid currency codes. Currency conversion cannot be performed.');
    return null;
  }


  const convertedAmount = fx(amount).from(fromCurrency).to(toCurrency);
  console.log('Converted Amount:', convertedAmount);
  return convertedAmount;
}











