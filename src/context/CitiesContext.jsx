import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/load":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        currentCity: {},
      };
    case "loading/error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "loading/error",
          payload: "There was an error in loading the cities",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/load", payload: data });
    } catch {
      dispatch({
        type: "loading/error",
        payload: "There was an error in loading the cities",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch("http://localhost:9000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "loading/error",
        payload: "There was an error in loading the cities",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "loading/error",
        payload: "There was an error in loading the cities",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("Cities Context was used outside of the Cities Provider");
  return context;
}

export { CitiesProvider, useCities };
