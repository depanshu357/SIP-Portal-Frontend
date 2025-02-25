"use client";

import axios from "axios";
import {useRouter} from 'next/navigation'

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { Button } from "@/components/ui/button";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";
import { enqueueSnackbar } from "notistack";
import { CircleArrowLeft, DownloadIcon } from "lucide-react";
import React from "react";
import fileHandlers from "@/api/file";

type Received = {
  ID: string;
  Title: string;
  Profile: string;
  Deadline: string;
  Visible: boolean;
}

type Row = {
  id: string;
  title: string;
  profile: string;
  deadline: string;
  visible: boolean;
}

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

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const time = `${formattedHours}:${minutes} ${ampm}`;
  return `${day}-${month}-${year}` === "01-01-1" ? "N/A" : `${day}-${month}-${year} ${time}`;
}


const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  withCredentials: true,
});
 
type Props = {};

const RecruiterJobOpenings = (props: Props) => {
  const [jobOpenings, setJobOpenings] = useState<Row[]>([]);
  const [applicantRows, setApplicantRows] = useState<any>([]);
  const [profileName, setProfileName] = useState<string>("");
  const [isApplicantsVisible, setIsApplicantsVisible] =
    useState<boolean>(false);
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        withCredentials: true,
      });
      instance
        .get(`${process.env.NEXT_PUBLIC_API_KEY}/recruiter/job-descriptions`, 
          {
            params: {
              eventId: event.id,
            }
          }
        )
        .then((res) => {
          const jobDescriptions = res.data.jobDescriptions;
          const modifiedData: Row[] = jobDescriptions.map((job: Received) => {
            return {
              id: job.ID,
              title: job.Title,
              profile: job.Profile,
              deadline: job.Deadline,
              visible: job.Visible,
            };
          });
          setJobOpenings(modifiedData);
          console.log(jobDescriptions);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    return () => {};
  }, []);

  const handleEventShowProforma = (id: string) => {
    router.push(`/recruiter/proforma/${id}`);
  }

  const handleEditProforma = (id: string) => {
    router.push(`/recruiter/edit-proforma/${id}`)
  }

  const handleShowApplicants = (jobId: string) => {
    authInstance
      .get("/admin/get-applicants", {
        params: {
          proformaId: jobId,
        },
      })
      .then((res) => {
        console.log(res.data);
        let list = res.data.applicants;
        setApplicantRows(
          list.map((data: any) => {
            return {
              id: data.ID,
              email: data.Email,
              name: data.Name,
              contactNumber: data.ContactNumber,
              fileId: data.FileID,
              rollNumber: data.RollNumber,
            };
          })
        );
        setIsApplicantsVisible(true);
      });
  };

  const handleFileDownload = (id: number, name: string, rollNumber: string) => {
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
            link.setAttribute(
              "download",
              profileName + "_" + rollNumber + "_" + name + ".pdf"
            );
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

  const columns = [
    { field: "title", headerName: "Position", minWidth: 200, flex: 1 },
    { field: "deadline", headerName: "Deadline", minWidth: 200, flex: 1,
      renderCell: (params: { row: Row }) => {
        return (
          <div>
            {formatTime(params.row.deadline)}
          </div>
        );
      }
     },
    {
      field: "link",
      headerName: "Enter",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: Row }) => {
        return (
          <Button
            onClick={() => handleEventShowProforma(params.row.id)}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            Open
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: Row }) => {
        return (
          <Button
            onClick={() => handleEditProforma(params.row.id)}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            Edit
          </Button>
        );
      },
    },
    {
          field: "applicants",
          headerName: "Applicants",
          flex: 1,
          minWidth: 100,
          renderCell: (params: { row: any }) => {
            return (
              <div>
                <Button
                  onClick={() => {
                    handleShowApplicants(params.row.id);
                    setProfileName(params.row.title);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  Show
                </Button>
              </div>
            );
          },
        },
  ];

  const applicantColumns = [
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 100, flex: 1 },
    { field: "rollNumber", headerName: "Roll Number", minWidth: 100, flex: 1 },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div>
            <Button
              variant="outline"
              size="sm"
              className="text-emerald-600 hover:text-emerald-700 border-emerald-300 hover:bg-emerald-50"
              onClick={() => {
                handleFileDownload(
                  params.row.fileId,
                  params.row.name,
                  params.row.rollNumber
                );
              }}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
    {!isApplicantsVisible && (
      <ThemeProvider theme={dataGridTheme}>
        <DataGrid
          autoHeight
          rows={jobOpenings}
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
    )}
    {isApplicantsVisible && (
      <div className=" rounded-lg w-auto">
        <ThemeProvider theme={dataGridTheme}>
        <div className="relative pt-2 flex justify-center items-center gap-2">
          <span onClick={() => setIsApplicantsVisible(false)} className="cursor-pointer ">
            <CircleArrowLeft size={30}/>
          </span>
          <span className="text-center text-3xl text-emerald-600 font-bold">Applicants List</span>
        </div>
          <DataGrid
            autoHeight
            rows={applicantRows}
            columns={applicantColumns}
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
              marginTop: "2rem",
              minHeight: "calc(100vh - 10rem)",
            }}
          />
        </ThemeProvider>
      </div>
    )}
  </div>)
};

export default RecruiterJobOpenings;
