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
export const exchangeRates =  {//since api calls is costly, we set it manually here until we find free one
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "timestamp": 1690506000,
  "base": "USD",
  "rates": {
    "AED": 3.673,
    "AFN": 87.717616,
    "ALL": 92,
    "AMD": 389.429372,
    "ANG": 1.802742,
    "AOA": 825.290067,
    "ARS": 273.0151,
    "AUD": 1.493049,
    "AWG": 1.8025,
    "AZN": 1.7,
    "BAM": 1.756609,
    "BBD": 2,
    "BDT": 108.55087,
    "BGN": 1.779673,
    "BHD": 0.376975,
    "BIF": 2830.176048,
    "BMD": 1,
    "BND": 1.328049,
    "BOB": 6.916496,
    "BRL": 4.7432,
    "BSD": 1,
    "BTC": 0.000034157503,
    "BTN": 81.946238,
    "BWP": 12.990839,
    "BYN": 2.524879,
    "BZD": 2.016256,
    "CAD": 1.323295,
    "CDF": 2515.873283,
    "CHF": 0.869459,
    "CLF": 0.030004,
    "CLP": 827.89,
    "CNH": 7.169649,
    "CNY": 7.1742,
    "COP": 3999.559764,
    "CRC": 535.617428,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 99.357353,
    "CZK": 21.9158,
    "DJF": 177.5,
    "DKK": 6.78652,
    "DOP": 56.091818,
    "DZD": 135.554426,
    "EGP": 30.9052,
    "ERN": 15,
    "ETB": 54.948923,
    "EUR": 0.910721,
    "FJD": 2.2183,
    "FKP": 0.781818,
    "GBP": 0.781818,
    "GEL": 2.595,
    "GGP": 0.781818,
    "GHS": 11.369592,
    "GIP": 0.781818,
    "GMD": 59.6,
    "GNF": 8621.335437,
    "GTQ": 7.852418,
    "GYD": 209.434774,
    "HKD": 7.80235,
    "HNL": 24.630732,
    "HRK": 6.861942,
    "HTG": 137.542036,
    "HUF": 347.439044,
    "IDR": 15082.3,
    "ILS": 3.714065,
    "IMP": 0.781818,
    "INR": 82.37525,
    "IQD": 1310.237995,
    "IRR": 42262.5,
    "ISK": 132.5,
    "JEP": 0.781818,
    "JMD": 154.454815,
    "JOD": 0.709,
    "JPY": 139.47517647,
    "KES": 142.24,
    "KGS": 87.6,
    "KHR": 4126.768507,
    "KMF": 444.625287,
    "KPW": 900,
    "KRW": 1283.084253,
    "KWD": 0.307224,
    "KYD": 0.833573,
    "KZT": 444.728224,
    "LAK": 19272.520339,
    "LBP": 15181.344333,
    "LKR": 330.598251,
    "LRD": 185.399968,
    "LSL": 17.579036,
    "LYD": 4.769402,
    "MAD": 9.666808,
    "MDL": 17.669492,
    "MGA": 4496.39954,
    "MKD": 55.588882,
    "MMK": 2100.58421,
    "MNT": 3519,
    "MOP": 8.037542,
    "MRU": 34.194676,
    "MUR": 45.649997,
    "MVR": 15.35,
    "MWK": 1052.811717,
    "MXN": 16.879632,
    "MYR": 4.522,
    "MZN": 63.749999,
    "NAD": 17.65,
    "NGN": 790,
    "NIO": 36.579862,
    "NOK": 10.19102,
    "NPR": 131.11673,
    "NZD": 1.619748,
    "OMR": 0.38499,
    "PAB": 1,
    "PEN": 3.600767,
    "PGK": 3.590877,
    "PHP": 54.803002,
    "PKR": 286.855145,
    "PLN": 4.029069,
    "PYG": 7279.550873,
    "QAR": 3.641341,
    "RON": 4.4882,
    "RSD": 106.705,
    "RUB": 90.702967,
    "RWF": 1174.147196,
    "SAR": 3.751462,
    "SBD": 8.382819,
    "SCR": 13.339405,
    "SDG": 601.5,
    "SEK": 10.50674,
    "SGD": 1.331341,
    "SHP": 0.781818,
    "SLL": 17665,
    "SOS": 569.210056,
    "SRD": 38.3815,
    "SSP": 130.26,
    "STD": 22823.990504,
    "STN": 22.268223,
    "SVC": 8.750505,
    "SYP": 2512.53,
    "SZL": 17.562425,
    "THB": 34.530002,
    "TJS": 10.943286,
    "TMT": 3.5,
    "TND": 3.091,
    "TOP": 2.34539,
    "TRY": 26.960101,
    "TTD": 6.78986,
    "TWD": 31.331998,
    "TZS": 2455,
    "UAH": 36.942083,
    "UGX": 3650.372599,
    "USD": 1,
    "UYU": 37.692821,
    "UZS": 11614.255095,
    "VES": 29.277384,
    "VND": 23667.82019,
    "VUV": 118.979,
    "WST": 2.72551,
    "XAF": 597.393792,
    "XAG": 0.04132992,
    "XAU": 0.00051361,
    "XCD": 2.70255,
    "XDR": 0.743219,
    "XOF": 597.393792,
    "XPD": 0.00080993,
    "XPF": 108.677919,
    "XPT": 0.001064,
    "YER": 250.300053,
    "ZAR": 17.844398,
    "ZMW": 19.324787,
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











