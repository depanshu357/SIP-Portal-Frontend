import { createContext, useContext } from "react";
export interface EventContextType {
  event: string;
  setEvent: React.Dispatch<React.SetStateAction<string>>;
}

export const EventContext: React.Context<EventContextType> =
  createContext<EventContextType>({ event: "", setEvent: () => {} });
