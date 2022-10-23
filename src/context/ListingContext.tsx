// import { useGetUserSetting } from "@hooks/settings/settings.hook";
import React, { useReducer } from 'react';
import { ListingActionTypes } from '../types/types';
import { reducer } from './utils';

// Get QueryClient from the context

export const FilterContext = React.createContext<{
    state: string;
    dispatch: React.Dispatch<ListingActionTypes>;
}>({
    state: "all",
    dispatch: () => {}
});

const initialState: string = 'all';

export default function FilterContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
    );
}

export const useFilterContext = () => {
    const context = React.useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilterContext must be used within a FilterContextProvider');
    }
    return context;
};
