export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  faqs: [],
  desc: "",
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


};

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

    default:
      return state;
  }
};