import { createContext, useContext, useState } from "react"

const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

const initialFilterState = {
    name: "",
    specialization: "",
    distance: 10,
    status: "idle"
}

export default function SearchWrapper({ children }) {
    const [filterState, setFilterState] = useState(initialFilterState);
    const [doctors, setDoctors] = useState([{ id: "1", username: "matiwos@gmail.com", name: "Matiwos Shimels", lat: "8.8", lng: "38.8" }]);

    const search = (state) => {
        setFilterState({ ...filterState, status: "loading" });
        //here will be an api call,
        setDoctors([{ id: "1", username: "matiwos@gmail.com", name: "Matiwos Shimels", lat: "8.8", lng: "38.8" }]);
        setFilterState({ ...state, status: "idle" });
    }



    return <SearchContext.Provider
        value={{
            doctors,
            filterState,
            search
        }}
    >
        {children}
    </SearchContext.Provider>
}