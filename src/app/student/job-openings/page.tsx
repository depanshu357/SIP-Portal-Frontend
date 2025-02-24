"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { EventContext } from "@/contexts/eventContext";
import {
  EventDefault,
  EventType,
  ResumeType,
  ResumeTypeForStudentApplication,
} from "@/types/custom_types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enqueueSnackbar } from "notistack";
import fileHandlers from "@/api/file";

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

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const time = `${formattedHours}:${minutes} ${ampm}`;
  return `${day}-${month}-${year}` === "01-01-1"
    ? "N/A"
    : `${day}-${month}-${year} ${time}`;
}

const JobOpenings = () => {
  const [rows, setRows] = useState<any>([]);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>("");
  const [appliedJobDescriptionIdList, setAppliedJobDescriptionIdList] = useState<Array<number>>([])
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [resumeList, setResumeList] = useState<
    ResumeTypeForStudentApplication[]
  >([]);
  const router = useRouter();
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;

  async function getListOfAppliedJobIds() {
    console.log("happening");
    try {
      const res = await authInstance.get('/student/applied-job-id-list');
      let list: number[] = [];
      res.data.appliedJobIdList.forEach((e: any) => list.push(e.JobDescriptionID));
      setAppliedJobDescriptionIdList(list);
      return list;
    } catch (error) {
      console.error("Error fetching applied job IDs", error);
      return [];
    }
  }

  function getRequiredResumeList() {
    fileHandlers
      .getResumeListForApplication(event.id)
      .then(
        (res: {
          message: string;
          variant: "success" | "error" | "";
          data: ResumeTypeForStudentApplication[] | null;
        }) => {
          if (res.variant === "success" && res.data) {
            console.log(res.data);
            setResumeList(res.data);
            return;
          }
          enqueueSnackbar(res.message, { variant: "error" });
        }
      );
  }

  function updateJobDescriptionList() {
    authInstance
      .get("/student/get-job-description-list", {
        params: {
          eventID: event.id,
        },
      })
      .then(async (res) => {
        let idList: Array<number> = await getListOfAppliedJobIds();
        console.log(idList)
        setRows(
          res.data.jobDescriptionList.filter((data: any) => !idList.includes(data.ID)).map((data: any) => ({
            id: data.ID,
            company: data.Company,
            title: data.Title,
            deadline: data.Deadline,
          }))
        );
      });
  }
  useEffect(() => {
    updateJobDescriptionList();
    getRequiredResumeList();
  }, []);

  function handleEventShowProforma(id: string) {
    router.push(`/student/proforma/${id}`);
  }

  function handleJobApplication(jobId: number) {
    console.log("applying for job");
    console.log(selectedResume)
    console.log(selectedJob)
    let fileId;
    resumeList.forEach((resume) => {
      if(resume.Name === selectedResume){
        fileId = resume.ID
      }
    })
    console.log(jobId, fileId)
    authInstance.post("/student/apply-for-job",{
      jobId: jobId,
      fileId: fileId,
    }).then((res)=>{
      enqueueSnackbar("Applied Successfully", {variant: "success"})
      updateJobDescriptionList();
    }).catch((err)=>{
      enqueueSnackbar("Error Submitting Job Application", {variant: "error"})
    })
    setDialogOpen(false)
  }

  const columns = [
    { field: "title", headerName: "Profile", minWidth: 200, flex: 1 },
    { field: "company", headerName: "Company", minWidth: 100, flex: 1 },
    {
      field: "deadline",
      headerName: "Deadline",
      minWidth: 200,
      flex: 1,
      renderCell: (params: { row: any }) => {
        return <div>{formatTime(params.row.deadline)}</div>;
      },
    },
    {
      field: "proforma",
      headerName: "Proforma",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: any }) => {
        return (
          <div>
            <Button
              onClick={() => handleEventShowProforma(params.row.id)}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Open
            </Button>
          </div>
        );
      },
    },
    {
      field: "apply",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: any }) => {
        return (
          <div>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-emerald-600 hover:bg-emerald-500 text-white hover:text-white"
                onClick={() => {
                  setSelectedJob(params.row)
                  setDialogOpen(true)
                }}
              >
                Apply
              </Button>
            </DialogTrigger>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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

        <DialogContent className="sm:max-w-[425px] bg-white shadow">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Select your resume to apply for this position.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select onValueChange={setSelectedResume}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your resume" />
              </SelectTrigger>
              <SelectContent>
                {resumeList.map((resume) => (
                  <SelectItem key={resume.ID} value={resume.Name}>
                    {resume.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={() => handleJobApplication(selectedJob?.id)}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobOpenings;
