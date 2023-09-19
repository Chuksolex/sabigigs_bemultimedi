export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  faqs: [],
  desc: "",
  discountOffer: 0,
  shortTitle_basic: "",
  shortTitle_standard: "",
  shortTitle_premium: "",
  shortDesc_basic: "",
  shortDesc_standard: "",
  shortDesc_premium: "",
  deliveryTime_basic: 0,
  deliveryTime_standard: 0,
  deliveryTime_premium: 0,
  revisionNumber_basic: 0,
  revisionNumber_standard: 0,
  revisionNumber_premium: 0,
  features_basic: [],
  features_standard: [],
  features_premium: [],
  price_basic: 0,
  price_standard: 0,
  price_premium: 0,
  addons: [],


};

export const SET_GIG_DATA = "SET_GIG_DATA";


export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE_BASIC":
      return {
        ...state,
        features_basic: [...state.features_basic, action.payload],
      };
      case "ADD_FEATURE_STANDARD":
        return {
          ...state,
          features_standard: [...state.features_standard, action.payload],
        };
        case "ADD_FEATURE_PREMIUM":
          return {
            ...state,
            features_premium: [...state.features_premium, action.payload],
          };
    case "REMOVE_FEATURE_BASIC":
      return {
        ...state,
        features_basic: state.features_basic.filter(
          (feature_basic) => feature_basic !== action.payload
        ),
      };
      case "REMOVE_FEATURE_STANDARD":
      return {
        ...state,
        features_standard: state.features_standard.filter(
          (feature_standard) => feature_standard !== action.payload
        ),
      };
      case "REMOVE_FEATURE_PREMIUM":
        return {
          ...state,
          features_premium: state.features_premium.filter(
            (feature_premium) => feature_premium !== action.payload
          ),
        };
        case "ADD_FAQ":
          return {
          ...state,
          faqs: [...state.faqs, action.payload],
      };

    // Add a new case for removing a FAQ
    case "REMOVE_FAQ":
      return {
        ...state,
        faqs: state.faqs.filter((faq) => faq !== action.payload),
      };
      case "ADD_ADDON":
        return {
          ...state,
          addons: [...state.addons, action.payload],
        };
  
      // Add a new case to handle removing an addon
      case "REMOVE_ADDON":
        return {
          ...state,
          addons: state.addons.filter((addon) => addon !== action.payload),
        };
        case SET_GIG_DATA:
      // Use the action payload to set the gig data
      console.log("gigreducer state data:", action.payload);
      return {
        ...state,
        userId: action.payload.userId || state.userId,
        title: action.payload.title || state.title,
        cat: action.payload.cat || state.cat,
        cover: action.payload.cover || state.cover,
        images: action.payload.images || state.images,
        faqs: action.payload.faqs || state.faqs,
        desc: action.payload.desc || state.desc,
        discountOffer: action.payload.discount || state.discount,
        shortTitle_basic: action.payload.shortTitle_basic || state.shortTitle_basic,
        shortTitle_standard: action.payload.shortTitle_standard || state.shortTitle_standard,
        shortTitle_premium: action.payload.shortTitle_premium || state.shortTitle_premium,
        shortDesc_basic: action.payload.shortDesc_basic || state.shortDesc_basic,
        shortDesc_standard: action.payload.shortDesc_standard || state.shortDesc_standard,
        shortDesc_premium: action.payload.shortDesc_premium || state.shortDesc_premium,
        deliveryTime_basic: action.payload.deliveryTime_basic || state.deliveryTime_basic,
        deliveryTime_standard: action.payload.deliveryTime_standard || state.deliveryTime_standard,
        deliveryTime_premium: action.payload.deliveryTime_premium || state.deliveryTime_premium,
        revisionNumber_basic: action.payload.revisionNumber_basic || state.revisionNumber_basic,
        revisionNumber_standard: action.payload.revisionNumber_standard || state.revisionNumber_standard,
        revisionNumber_premium: action.payload.revisionNumber_premium || state.revisionNumber_premium,
        features_basic: action.payload.features_basic || state.features_basic,
        features_standard: action.payload.features_standard || state.features_standard,
        features_premium: action.payload.features_premium || state.features_premium,
        price_basic: action.payload.price_basic || state.price_basic,
        price_standard: action.payload.price_standard || state.price_standard,
        price_premium: action.payload.price_premium || state.price_premium,
        addons: action.payload.addons || state.addons,
      };

    default:
      return state;
  }
};