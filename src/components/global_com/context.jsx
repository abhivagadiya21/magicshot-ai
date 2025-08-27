import { createContext, useReducer, useContext, useEffect } from "react";
import { getUserProfileAPI } from '../../services/imageBase';

// Reducer for state updates
function creditsReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user, credits: action.payload.credits };
    case "SET_CREDITS":
      return { ...state, credits: action.payload };
    case "LOGOUT":
      return { user: null, credits: 0 };
    default:
      return state;
  }
}

const CreditContext = createContext();

export function CreditProvider({ children }) {
  const [state, dispatch] = useReducer(creditsReducer, { credits: 0, user: null });

  // Fetch user profile from backend
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await getUserProfileAPI(token);
      if (res.status === "success") {
        dispatch({
          type: "SET_USER",
          payload: {
            user: res.data,
            credits: res.data.credits,
          },
        });
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  // Load user profile on mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <CreditContext.Provider value={{ state, dispatch, fetchUser }}>
      {children}
    </CreditContext.Provider>
  );
}

// Custom hook to use credits globally
export function useCredits() {
  return useContext(CreditContext);
}
