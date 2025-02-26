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
const columns = [
  { field: "Company", headerName: "Company", minWidth: 100, flex: 1 },
  { field: "Email", headerName: "Email", minWidth: 200, flex: 1 },
  { field: "IsVerified", headerName: "IsVerified", minWidth: 100, flex: 1 },
];

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

type ReceivedUser = {
  ID: "",
  Email: "",
  IsVerified: false,
  Role?: "",
  Company?: "",
};

type RowUser = {
  id: string;
  Email: string;
  IsVerified: boolean;
  Company?: string;
};

const RecruiterList = () => {
  const [rows, setRows] = useState<Array<RowUser>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/admin/recruiter-list`
        );
        // console.log(res.data.users);
        const users = await res.data.users;
        const formattedUsers = users.map((user: ReceivedUser) => ({
          id: user.ID,
          Email: user.Email,
          IsVerified: user.IsVerified,
          Company: user.Company
        }));
        setRows(formattedUsers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    return () => {
    };
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

export default RecruiterList;
