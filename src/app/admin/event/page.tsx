"use client";

import { EventContextType } from "@/contexts/eventContext";
import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EventContext } from "@/contexts/eventContext";
import { EventType, EventDefault } from "@/types/custom_types";

import { DataGrid } from "@mui/x-data-grid";
import { dataGridTheme } from "@/theme";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { parseISO, format, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { enqueueSnackbar } from "notistack";

type RowEvent = {
  id: string;
  Title: string;
  IsActive: boolean;
  StartDate: string;
  AcademicYear: string;
};
type ReceivedEvent = {
  ID: string;
  Title: string;
  IsActive: boolean;
  StartDate: string;
  AcademicYear: string;
};

function formatTime(dateString: string): string {
  const date = parseISO(dateString);
  
  if (!isValid(date)) {
    return "Invalid Date"; 
  }
  
  return format(date, "dd-MM-yyyy");
}

const AdminEvent = () => {
  const [rows, setRows] = useState<Array<RowEvent>>([]);
  const eventContext = useContext(EventContext) as EventContextType | null;
  const router = useRouter();
  const setEvent: React.Dispatch<React.SetStateAction<EventType>> = eventContext
    ? eventContext.setEvent
    : () => {};
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/events`
        );
        // console.log(res.data.events);
        const events = await res.data.events;
        const formattedEvents = events.map((event: ReceivedEvent) => ({
          id: event.ID,
          Title: event.Title,
          IsActive: event.IsActive,
          StartDate: formatTime(event.StartDate),
          AcademicYear: event.AcademicYear,
        }));
        setRows(formattedEvents);
      } catch (err) {
        console.log(err);
      }
    };
  useEffect(() => {
    fetchData();
    return () => {
    };
  }, []);
  const handleEventChange = (row: RowEvent) => {
    console.log("Event changed");

    const authInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_KEY,
      withCredentials: true,
    });
    authInstance
      .put(`/admin/toggle-event-activation`, {
        id: row.id,
        isActive: !row.IsActive,
      })
      .then((res) => {
        enqueueSnackbar("Event status changed successfully", {
          variant: "success",
        });
        fetchData();
      })
      .catch((err) => {
        enqueueSnackbar("Failed to change event status", { variant: "error" });
        console.error(err);
      });
  };
  const handleEventEnter = (row: RowEvent) => {
    if (typeof setEvent === "function") {
      setEvent(row);
    }
    router.push("/admin/notifications");
  };
  const columns = [
    { field: "Title", headerName: "Title", minWidth: 200, flex: 1 },
    { field: "StartDate", headerName: "Start Date", minWidth: 100, flex: 1 },
    {
      field: "AcademicYear",
      headerName: "Academic Year",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Active",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowEvent }) => {
        return (
          <div>
            <Switch
              id="event-mode"
              checked={params.row.IsActive}
              className=" data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
              onClick={() => {
                handleEventChange(params.row);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "enter",
      headerName: "Enter",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowEvent }) => {
        return (
          <Button
            onClick={() => handleEventEnter(params.row)}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            Enter
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <ThemeProvider theme={dataGridTheme}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            padding: "10px",
            maxWidth: "1200px",
            marginX: "10px",
            margin: "auto",
            backgroundColor: "white",
            "--DataGrid-overlayHeight": "300px",
            marginTop: "4rem",
            minHeight: "calc(100vh - 10rem)",
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default AdminEvent;
