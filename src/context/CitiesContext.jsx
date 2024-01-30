import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error in loading the cities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    const res = await fetch(`http://localhost:9000/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:9000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCities((city) => [...cities, data]);
    } catch {
      alert("There was an error in loading the cities");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
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
