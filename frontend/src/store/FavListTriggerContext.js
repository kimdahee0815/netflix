import { createContext } from "react";

export const FavListUpdateContext = createContext({
    favListState: false,
    favListUpdate: () => {},
});

export const FavListUpdateProvider = ({ children, value }) => {
    return <FavListUpdateContext.Provider value={value}>{children}</FavListUpdateContext.Provider>;
};
