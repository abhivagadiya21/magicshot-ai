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
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await getUserProfileAPI(token);
      if (res.status === "success") {
        dispatch({
          type: SET_USER,
          payload: {
            user: res.data,
            credits: res.data.credits,
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
