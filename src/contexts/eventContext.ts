import { createContext, useContext } from "react";

type EventType = {
  id: string;
  Title: string;
  IsActive: boolean;
  StartDate: string;
  AcademicYear: string;
};

export interface EventContextType {
  event: EventType;
  setEvent: React.Dispatch<React.SetStateAction<EventType>>;
}

export const EventContext: React.Context<EventContextType> =
  createContext<EventContextType>({ event: {id:"",Title:"",IsActive:false,StartDate:"",AcademicYear:""}, setEvent: () => {} });
