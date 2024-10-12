"use client";

import React, { useContext, useEffect, useState } from "react";
import fileHandlers from "@/api/file";

import { EventContext } from "@/contexts/eventContext";
import {
  EventDefault,
  EventType,
  ResumeTypeForAdmin,
} from "@/types/custom_types";
import { ResumeType, StudentInfoForResume } from "@/types/custom_types";
import { enqueueSnackbar } from "notistack";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { Switch } from "@/components/ui/switch";

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

const ResumeAdminPage = () => {
  const [resumes, setResumes] = React.useState<ResumeTypeForAdmin[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  useEffect(() => {
    function getResumeList() {
      if (!event || !event.Title) return;
      console.log(event);
      fileHandlers
        .getResumeListForAdmin(event.Title, event.AcademicYear)
        .then(
          (res: {
            message: string;
            variant: "success" | "error" | "";
            data: ResumeTypeForAdmin[] | null;
          }) => {
            if (res.variant === "success" && res.data) {
              setResumes(res.data);
              return;
            }
            enqueueSnackbar(res.message, { variant: "error" });
          }
        );
    }
    getResumeList();
  }, []);
  const handleVerficationToggle = (ID: number) => {
    let requiredVerificationState = "No";
    const updatedResumes = resumes.map((resume) => {
      if (resume.id === ID) {
        requiredVerificationState = resume.IsVerified === "Yes" ? "No" : "Yes";
        return {
          ...resume,
          IsVerified: resume.IsVerified === "Yes" ? "No" : "Yes",
        };
      }
      return resume;
    });
    fileHandlers
      .fileVerificationToggle(ID, requiredVerificationState === "Yes")
      .then((res: { message: string; variant: "success" | "error" }) => {
        enqueueSnackbar(res.message, { variant: res.variant });
        if (res.variant === "success") {
          setResumes(updatedResumes);
        }
      });
  };
  const handleFileDownload = (id: number, name: string) => {
    fileHandlers
      .downloadFile(id)
      .then(
        (res: {
          message: string;
          variant: "success" | "error";
          data: Blob | null;
        }) => {
          if (res.variant === "success" && res.data) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", name);
            document.body.appendChild(link);
            link.click();

            // cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }
          enqueueSnackbar(res.message, { variant: res.variant });
        }
      );
  };
  const columns: any = [
    { field: "Name", headerName: "Name", minWidth: 200, flex: 4 },
    { field: "CreatedAt", headerName: "Uploaded At", minWidth: 100, flex: 2 },
    { field: "Event", headerName: "Event", minWidth: 100, flex: 2 },
    { field: "Category", headerName: "Category", minWidth: 100, flex: 2 },
    {
      field: "verfication",
      headerName: "Verify",
      flex: 1,
      minWidth: 50,
      renderCell: (params: { row: ResumeTypeForAdmin }) => {
        return (
          <div>
            <Switch
              id="event-mode"
              checked={params.row.IsVerified === "Yes"}
              className=" data-[state=checked]:bg-emerald-600 focus:ring-emerald-500"
              onClick={() => {
                handleVerficationToggle(params.row.id);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 100,
      flex: 2,
      renderCell: (params: any) => {
        return (
          <div>
            <Button
              variant="outline"
              size="sm"
              className="text-emerald-600 hover:text-emerald-700 border-emerald-300 hover:bg-emerald-50"
              onClick={() => {
                handleFileDownload(params.row.id, params.row.Name);
              }}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        );
      },
    },
    {
      field: "rejection",
      headerName: "Reject",
      flex: 2,
      minWidth: 100,
      renderCell: (params: { row: ResumeType }) => {
        return (
          <div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50"
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ].map((col) => ({
    ...col,
    headerClassName: "font-bold text-base text-emerald-600",
  }));
  return (
    <div>
      <div className="max-w-[1200px] m-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">
          Resume List
        </h1>
      </div>
      <ThemeProvider theme={dataGridTheme}>
        <DataGrid
          autoHeight
          rows={resumes}
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
            outline: "none",
            border: "0px",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            "--DataGrid-overlayHeight": "300px",
            marginTop: "2rem",
            minHeight: "calc(50vh)",
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default ResumeAdminPage;
