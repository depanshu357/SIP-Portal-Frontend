"use client";

import {
  DataGrid,
  GridToolbar,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
type Props = {};
const columns = [
  { field: "Email", headerName: "Email", minWidth: 200, flex: 1 },
  { field: "IsVerified", headerName: "IsVerified", minWidth: 100, flex: 1 },
];

function Toolbar() {
  return (
    <div>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </div>
  );
}

const AdminStudent = (props: Props) => {
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/admin/student-list`);
        console.log(res.data.users);
        const users = await res.data.users
        users.forEach((user: { ID: string; Email: string; IsVerified: boolean; }) => {
          setRows((prev: { ID: string; Email: string; IsVerified: boolean;}[]) => [...prev, { id: user.ID, Email: user.Email, IsVerified: user.IsVerified }]);
        });
        // setRows(res.data.users);

      } catch (err) {
        console.log(err);
      }
    };
    
    return (() => {
      fetchData();
    })
  }, []);
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