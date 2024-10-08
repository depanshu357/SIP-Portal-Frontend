export type EventType = {
  id: string;
  Title: string;
  IsActive: boolean;
  StartDate: string;
  AcademicYear: string;
};

export type EventContextType = {
  event: EventType;
  setEvent: React.Dispatch<React.SetStateAction<EventType>>;
};

export const EventDefault: EventType = {
  id: "",
  Title: "",
  IsActive: false,
  StartDate: "",
  AcademicYear: "",
};
