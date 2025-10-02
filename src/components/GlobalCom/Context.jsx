import { createContext, useReducer, useContext, useEffect } from "react";
import { getUserProfileAPI } from "../../services/imageBase";

// Action constants
const SET_USER = "SET_USER";
const SET_CREDITS = "SET_CREDITS";
const LOGOUT = "LOGOUT";

// Reducer for credit state management
function creditsReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      if (!action.payload) {
        return { ...state, user: null, credits: 0 };
      }
      return {
        ...state,
        user: action.payload.user,
        credits: action.payload.credits ?? 0,
        name: action.payload.name ?? "",
        email: action.payload.email ?? "",
        // transactions: action.payload.transactions ?? [],
      };

    case SET_CREDITS:
      return { ...state, credits: action.payload };

    case LOGOUT:
      return { user: null, credits: 0 };

    default:
      return state;
  }
}

const CreditContext = createContext();

export function CreditProvider({ children }) {
  const [state, dispatch] = useReducer(creditsReducer, {
    user: null,
    credits: 0,
    name: "",
    email: "",
    // transactions: [],
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await getUserProfileAPI(token);
      if (res.status === "success") {
        const user = res.data.user || res.data;
        console.log("Fetched user:", user);
        dispatch({
          type: SET_USER,
          payload: {
            user: res.data,
            credits: res.data.credits,
            name: res.data.name,
            email: res.data.email,
            // transactions: res.data.transactionsDetails,
          },
        });
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <CreditContext.Provider value={{ state, dispatch, fetchUser }}>
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  return useContext(CreditContext);
}
