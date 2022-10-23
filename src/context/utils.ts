import { IListing, ListingActionTypes, IListingFilter } from '../types/types';

const reducer = (state: string, action: ListingActionTypes): string => {
    switch (action.type) {
        case 'SET_TAG':
            return action.payload || "all";
        case 'CLEAR_TAG':
            return "all";

        default:
            return state;
    }
};

export { reducer };
