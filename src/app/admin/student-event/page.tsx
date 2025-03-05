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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  withCredentials: true,
});

type RowUser = {
  id: string;
  Email: string;
  RollNumber: string;
  ReasonForFreeze: { [key: string]: string };
  VerifiedForEvents: number[];
  FrozenForEvents: number[];
};
type ReceivedUser = {
  ID: string;
  Email: string;
  RollNumber: string;
  ReasonForFreeze: JSON;
  VerifiedForEvents: number[];
  FrozenForEvents: number[];
};

const AdminStudentEvent = () => {
  const [rows, setRows] = useState<Array<RowUser>>([]);
  const [reason, setReason] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<RowUser | undefined>(undefined)
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
            FrozenForEvents: user.FrozenForEvents,
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

  const ToggleFreezeAccount = () => {
    const data: RowUser | undefined = selectedRow ;
    if(!data || !selectedRow) return;
    const reasonForFreeze = {...data.ReasonForFreeze, [eventId.toString()]: reason}
    authInstance
      .post(`/admin/toggle-freezing-for-event`, {
        id: data.id,
        event: event.id,
        reasonForFreeze: reasonForFreeze
      })
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
        enqueueSnackbar(res.data.message, { variant: "success" });
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
           <DialogTrigger asChild> 
          <div>
              <Switch
                id="freeze-student"
                checked={params.row.FrozenForEvents.includes(eventId)}
                disabled={!params.row.VerifiedForEvents.includes(eventId)}
                className="data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
                onClick={() => {
                  setSelectedRow(params.row)
                  setReason(params?.row?.ReasonForFreeze[eventId.toString()])
                  // ToggleFreezeAccount(params.row);
                }}
              />
          </div>
          </DialogTrigger> 
        );
      },
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowUser }) => {
        return (
          <div className="my-1">
            {params?.row?.ReasonForFreeze[eventId.toString()]}
            {/* <Input
              placeholder="Write reason..."
              type="text"
              className="mx-auto border-emerald-200 bg-white"
              value={params?.row?.ReasonForFreeze[params.row.id.toString()]}
              onChange={(e) => setReason({ ...reason, [params.row.id.toString()]: e.target.value })}
            /> */}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Dialog>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Reason</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Reason
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button type="submit" onClick={() => ToggleFreezeAccount()}>Save</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
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
      </Dialog>
    </div>
  );
};

export default AdminStudentEvent;
