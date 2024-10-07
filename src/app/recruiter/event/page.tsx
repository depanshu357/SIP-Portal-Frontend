"use client";

import { EventContextType } from "@/contexts/eventContext";
import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation"

import {
  DataGrid,
} from "@mui/x-data-grid";
import { dataGridTheme } from "@/theme";

import { EventContext } from "@/contexts/eventContext";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { parseISO, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type RowEvent = {
    id: string;
    Title: string;
    IsActive: boolean;
    StartDate: string;
  };
  type ReceivedEvent = {
    ID: string;
    Title: string;
    IsActive: boolean;
    StartDate: string;
  };

  
  function formatTime(dateString: string): string {
    const date = parseISO(dateString);
    const relativeTime = format(new Date(date).toLocaleString(), "dd-MM-yyyy");
    return relativeTime;
  }
const RecruiterEvent = () => {
    const [rows, setRows] = useState<Array<RowEvent>>([]);
  const eventContext = useContext(EventContext) as EventContextType | null;
  const router = useRouter();
  const setEvent: React.Dispatch<React.SetStateAction<string>> = eventContext
    ? eventContext.setEvent
    : () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/events`
        );
        // console.log(res.data.events);
        const events = await res.data.events;
        events.forEach((user: ReceivedEvent) => {
          setRows((prev: RowEvent[]) => [
            ...prev,
            {
              id: user.ID,
              Title: user.Title,
              IsActive: user.IsActive,
              StartDate: formatTime(user.StartDate),
            },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      fetchData();
    };
  }, []);
  const handleEventChange = (row: RowEvent) => {
    console.log("Event changed");
    setRows((prev: RowEvent[]) =>
      prev.map((event: RowEvent) =>
        event.id === row.id ? { ...event, IsActive: !event.IsActive } : event
      )
    );
  };
  const handleEventEnter = (row: RowEvent) => {
    if (typeof setEvent === "function") {
      setEvent(row.Title);
    }
    router.push("/recruiter/notifications");
  };
  const columns = [
    { field: "Title", headerName: "Title", minWidth: 200, flex: 1 },
    { field: "StartDate", headerName: "Start Date", minWidth: 100, flex: 1 },
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
  )
}

export default RecruiterEvent