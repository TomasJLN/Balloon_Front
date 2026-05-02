import { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const [searchCat, setSearchCat] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [toSearchTit, setToSearchTit] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(null);

  return (
    <FilterContext.Provider
      value={{
        searchCat,
        setSearchCat,
        toSearch,
        setToSearch,
        toSearchTit,
        setToSearchTit,
        isFilterOn,
        setIsFilterOn,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
