"use client";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { Switch } from "@/components/ui/switch";
import { enqueueSnackbar } from "notistack";

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

type RowUser = { id: string; Email: string; IsProfileVerified: boolean; RollNumber: string }
type ReceivedUser = { ID: string; Email: string; IsProfileVerified: boolean; RollNumber: string }

const AdminStudent = () => {
  const [rows, setRows] = useState<Array<RowUser>>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/admin/student-list`);
      console.log(res.data.users);
      const users = await res.data.users
      setRows(users.map((user:ReceivedUser) => {return { id: user.ID, Email: user.Email, IsProfileVerified: user.IsProfileVerified, RollNumber: user.RollNumber }}))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    return (() => {
    })
  }, []);

  const ChangeProfileVerificationStatus = (data: RowUser) => {
      authInstance.post(`/admin/change-profile-verification`, { id: data.id })
      .then((res) => {
        enqueueSnackbar(res.data.message, {variant: "success"})
        fetchData();
      }).catch((err) => {
        enqueueSnackbar(err.response?.data?.message || err.message, {variant: "error"})
        console.log(err)
      })
    }

  const columns = [
    { field: "Email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "RollNumber", headerName: "Roll Number", minWidth: 100, flex: 1},
    {
      field: "actions",
      headerName: "Verify Profile",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowUser }) => {
        return (
          <div>
            <Switch
              id="admin-access-mode"
              checked={params.row.IsProfileVerified}
              className="data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
              onClick={() => {
                ChangeProfileVerificationStatus(params.row);
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
            marginX:"10px",
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

export default AdminStudent