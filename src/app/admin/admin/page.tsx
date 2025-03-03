"use client";

import { useSession } from "next-auth/react";
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

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  withCredentials: true,
});


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

type RowUser = { id: string; Email: string; HasAdminAccess: boolean; Role: string; }
type ReceivedUser = { ID: string; Email: string; HasAdminAccess: boolean; Role: string; }
const AdminAdmin = () => {
  const [rows, setRows] = useState<Array<RowUser>>([]);
  const { data: session } = useSession();
  // console.log(session?.user)
  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/admin/admin-list`);
      console.log(res.data.users);
      const users = await res.data.users
      setRows(users.map((user: ReceivedUser) => {return {id: user.ID, Email: user.Email, HasAdminAccess: user.HasAdminAccess, Role: user.Role}}))

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const ChangeAdminAccess = (data: RowUser) => {
    authInstance.post(`/admin/change-admin-access`).then((res)=>{
      enqueueSnackbar(res.data.message, {variant: "success"})
      fetchData();
    }).catch((err)=>{
      // console.log(err.response)
      enqueueSnackbar(err.response?.data?.message || err.message, {variant: "error"})
    })
  }

  const columns = [
    { field: "Email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "actions",
      headerName: "Admin Access",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: RowUser }) => {
        return (
          <div>
            <Switch
              id="admin-access-mode"
              checked={params.row.HasAdminAccess}
              className="data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
              disabled={!params.row.HasAdminAccess || session?.user?.role != 'superadmin' || session?.user?.id == params.row.id}
              onClick={() => {
                ChangeAdminAccess(params.row);
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
  );
};

export default AdminAdmin;
