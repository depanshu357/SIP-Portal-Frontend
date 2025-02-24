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


export interface ResumeType  {
  Name: string;
  Category: "master" | "single";
  IsVerified: string;
  ID: number;
}

export interface ResumeTypeForAdmin  {
  Name: string;
  Category: "master" | "single";
  IsVerified: string;
  id: number;
  CreatedAt: string;
}

export interface StudentInfoForResume {
  name: string,
  rollNumber: string,
  program: string,
  department: string,
}

export interface JobDescriptionInput{
  title: string;
  description: string;
  location: string;
  stipend: string;
}