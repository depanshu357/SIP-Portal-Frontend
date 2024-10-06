'use client'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const layout = (
  { children }: { children: React.ReactNode },
  session: any
): React.ReactNode => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
    </LocalizationProvider>
  );
};

export default layout;