import express from "express";
import createError from "../utils/createError.js";
import axios from "axios";
//import session from "express-session";
import fx from "money";


      

//     // Assuming the currency parameter is passed in the query (e.g., /setcurrency?currency=USD)
// export const setCurrency = async (req, res) => {
//   try {
//     const currency = req.body.currency;

//   // Store the selected currency in the session
//   req.session.selectedCurrency = currency;

//   res.status(200).json({
//     message: 'Currency updated successfully',
//   });
    
//   } catch (error) {
//     console.log(error);
//   }
// };

// // New function to get the user's selected currency from the session
// export const getCurrencyInfo = (req, res) => {
//   const currencyInfo = req.session.selectedCurrency || { switchedCurrency: 'USD', exchangeRate: 1 };
//   res.status(200).json(currencyInfo);
// };





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
  "timestamp": 1718100000,
  "base": "USD",
  "rates": {
    "AED": 3.673005,
    "AFN": 70.142841,
    "ALL": 93.229589,
    "AMD": 386.761339,
    "ANG": 1.797794,
    "AOA": 854.161333,
    "ARS": 901.7626,
    "AUD": 1.5163,
    "AWG": 1.8025,
    "AZN": 1.7,
    "BAM": 1.817025,
    "BBD": 2,
    "BDT": 117.2082,
    "BGN": 1.8188,
    "BHD": 0.376902,
    "BIF": 2891.743761,
    "BMD": 1,
    "BND": 1.350273,
    "BOB": 6.892579,
    "BRL": 5.3549,
    "BSD": 1,
    "BTC": 0.000014912911,
    "BTN": 83.30926,
    "BWP": 13.701544,
    "BYN": 3.263918,
    "BZD": 2.010638,
    "CAD": 1.377466,
    "CDF": 2819.47498,
    "CHF": 0.896837,
    "CLF": 0.033358,
    "CLP": 917.431193,
    "CNH": 7.270052,
    "CNY": 7.1082,
    "COP": 3992.317488,
    "CRC": 528.076047,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 102.441066,
    "CZK": 22.9914,
    "DJF": 177.60541,
    "DKK": 6.937635,
    "DOP": 59.746406,
    "DZD": 134.860606,
    "EGP": 47.6236,
    "ERN": 15,
    "ETB": 56.982684,
    "EUR": 0.930167,
    "FJD": 2.24075,
    "FKP": 0.785292,
    "GBP": 0.785292,
    "GEL": 2.865,
    "GGP": 0.785292,
    "GHS": 14.86285,
    "GIP": 0.785292,
    "GMD": 67.775,
    "GNF": 8589.990006,
    "GTQ": 7.751016,
    "GYD": 208.802694,
    "HKD": 7.808881,
    "HNL": 24.643537,
    "HRK": 7.008228,
    "HTG": 132.314475,
    "HUF": 367.207215,
    "IDR": 16319.108559,
    "ILS": 3.721906,
    "IMP": 0.785292,
    "INR": 83.561104,
    "IQD": 1305.771318,
    "IRR": 42100,
    "ISK": 139.25,
    "JEP": 0.785292,
    "JMD": 155.029626,
    "JOD": 0.7088,
    "JPY": 157.24657143,
    "KES": 129.25,
    "KGS": 87.0104,
    "KHR": 4137.93515,
    "KMF": 452.450119,
    "KPW": 900,
    "KRW": 1378.730245,
    "KWD": 0.306681,
    "KYD": 0.831309,
    "KZT": 447.585739,
    "LAK": 21635.689348,
    "LBP": 89326.00305,
    "LKR": 302.357506,
    "LRD": 193.46417,
    "LSL": 18.708813,
    "LYD": 4.822669,
    "MAD": 9.957496,
    "MDL": 17.754193,
    "MGA": 4502.146233,
    "MKD": 57.232801,
    "MMK": 2097.94,
    "MNT": 3450,
    "MOP": 8.028429,
    "MRU": 39.113836,
    "MUR": 46.57,
    "MVR": 15.4,
    "MWK": 1729.511033,
    "MXN": 18.439152,
    "MYR": 4.7195,
    "MZN": 63.92499,
    "NAD": 18.708813,
    "NGN": 1483.03,
    "NIO": 36.715828,
    "NOK": 10.683416,
    "NPR": 133.272967,
    "NZD": 1.632381,
    "OMR": 0.384955,
    "PAB": 1,
    "PEN": 3.742562,
    "PGK": 3.884334,
    "PHP": 58.7856,
    "PKR": 277.505483,
    "PLN": 4.035271,
    "PYG": 7506.652063,
    "QAR": 3.637209,
    "RON": 4.6292,
    "RSD": 108.901,
    "RUB": 89.248386,
    "RWF": 1308.746862,
    "SAR": 3.75039,
    "SBD": 8.43942,
    "SCR": 13.504503,
    "SDG": 586,
    "SEK": 10.504769,
    "SGD": 1.353025,
    "SHP": 0.785292,
    "SLL": 20969.5,
    "SOS": 570.06128,
    "SRD": 31.6445,
    "SSP": 130.26,
    "STD": 22281.8,
    "STN": 22.761584,
    "SVC": 8.728371,
    "SYP": 2512.53,
    "SZL": 18.699803,
    "THB": 36.74575,
    "TJS": 10.638393,
    "TMT": 3.51,
    "TND": 3.110998,
    "TOP": 2.362582,
    "TRY": 32.3717,
    "TTD": 6.761584,
    "TWD": 32.382998,
    "TZS": 2615,
    "UAH": 40.366971,
    "UGX": 3765.399633,
    "USD": 1,
    "UYU": 38.841331,
    "UZS": 12615.742448,
    "VES": 36.404214,
    "VND": 25445,
    "VUV": 118.722,
    "WST": 2.8,
    "XAF": 610.149409,
    "XAG": 0.0342454,
    "XAU": 0.00043358,
    "XCD": 2.70255,
    "XDR": 0.751968,
    "XOF": 610.149409,
    "XPD": 0.00113044,
    "XPF": 110.998422,
    "XPT": 0.00104656,
    "YER": 250.425029,
    "ZAR": 18.710748,
    "ZMW": 26.383928,
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











