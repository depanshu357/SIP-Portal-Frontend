"use client";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";
import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { Switch } from "@/components/ui/switch";
import { enqueueSnackbar } from "notistack";
import { Input } from "@/components/ui/input";

function Toolbar() {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
      <div>
        <GridToolbarQuickFilter />
      </div>
    </div>
  );
}

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  withCredentials: true,
});

type RowUser = {
  id: string;
  Email: string;
  RollNumber: string;
  ReasonForFreeze: string[];
  VerifiedForEvents: number[];
  FrozenForEvents: number[];
};
type ReceivedUser = {
  ID: string;
  Email: string;
  RollNumber: string;
  ReasonForFreeze: string[];
  VerifiedForEvents: number[];
  FrozenForEvents: number[];
};

const AdminStudentEvent = () => {
  const [rows, setRows] = useState<Array<RowUser>>([]);
  const [reason, setReason] = useState<string>("");
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  const eventId = Number(event.id);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}/admin/student-list-for-event`
      );
      console.log(res.data.users);
      const users = await res.data.users;
      setRows(
        users.map((user: ReceivedUser) => {
          return {
            id: user.ID,
            Email: user.Email,
            RollNumber: user.RollNumber,
            VerifiedForEvents: user.VerifiedForEvents,
            ReasonForFreeze: user.ReasonForFreeze,
            FrozenForEvents: user.FrozenForEvents
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ToggleFreezeAccount = (data: RowUser) => {
    authInstance
      .post(`/admin/toggle-freezing-for-event`, { id: data.id, event: event.id })
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        fetchData();
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data?.message || err.message, {
          variant: "error",
        });
        console.log(err);
      });
  };

  const ToggleVerification = (data: RowUser) => {
    authInstance
      .post(`/admin/toggle-verification-for-event`, {
          id: data.id,
          event: event.id,
      })
      .then((res) => {
        // console.log(res.data.message);
        fetchData();
        enqueueSnackbar(res.data.message, {variant: "success"})
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message || err.message, {
          variant: "error",
        });
      });
  };

  const columns = [
    { field: "Email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "RollNumber", headerName: "Roll Number", minWidth: 100, flex: 1 },
    {
      field: "verify",
      headerName: "Verify",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowUser }) => {
        return (
          <div>
            <Switch
              checked={params.row.VerifiedForEvents.includes(eventId)}
              disabled={params.row.FrozenForEvents.includes(eventId)}
              className="data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
              onClick={() => {
                ToggleVerification(params.row);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Freeze",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowUser }) => {
        return (
          <div>
            <Switch
              id="admin-access-mode"
              checked={params.row.FrozenForEvents.includes(eventId)}
              disabled={!params.row.VerifiedForEvents.includes(eventId)}
              className="data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
              onClick={() => {
                ToggleFreezeAccount(params.row);
              }}
            />
          </div>
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
          slots={{ toolbar: Toolbar, noRowsOverlay: CustomNoRowsOverlay }}
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

export default AdminStudentEvent;
