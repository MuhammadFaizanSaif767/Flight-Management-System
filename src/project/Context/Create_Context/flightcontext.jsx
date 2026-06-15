import { createContext, useContext } from "react";

export const AppData = createContext();


export function useAppData() {
    return useContext(AppData);
}