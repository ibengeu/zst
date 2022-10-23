export interface IListing {
    label: string;
    host: string;
    imgs: string[];
    availableDates: string;
    costPerNight: string;
    rating: string;
    tag: string[];
}

// @types.todo.ts
export interface IListingFilter {
    label: string;
    img: string;
}

export type IListingContextType = {
    listing: IListing[];
    setFilter: (todo: IListing) => void;
};

// An interface for our actions
export type ListingActionTypes = {
    type: 'SET_TAG' | 'CLEAR_TAG';
    payload?: string;
};



