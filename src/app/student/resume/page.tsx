"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enqueueSnackbar } from "notistack";
import React, { useState, useContext, useEffect } from "react";
import fileHandlers from "@/api/file";
import studentHandlers from "@/api/student";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";
import { ResumeType, StudentInfoForResume } from "@/types/custom_types";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { DownloadIcon } from "lucide-react";
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

const ResumePage = () => {
  const [resumes, setResumes] = React.useState<ResumeType[]>([]);
  const [requiredResumeNames, setRequiredResumeNames] = React.useState<
    string[]
  >([]);
  const [requiredMasterResumeName, setRequiredMasterResumeName] =
    useState<string>("");
  const [requiredSingleResumeNames, setRequiredSingleResumeNames] = useState<
    string[]
  >([]);
  const [studentInfoForResumeName, setStudentInfoForResumeName] =
    React.useState<StudentInfoForResume>({
      name: "",
      rollNumber: "",
      program: "",
      department: "",
    });
  const [file, setFile] = React.useState<File | null>(null);
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;

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
  const columns = [
    { field: "Name", headerName: "Name", minWidth: 200, flex: 2 },
    { field: "CreatedAt", headerName: "Uploaded At", minWidth: 100, flex: 1 },
    { field: "Category", headerName: "Category", minWidth: 100, flex: 1 },
    { field: "IsVerified", headerName: "Verified", minWidth: 100, flex: 1 },
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
  ].map((col) => ({
    ...col,
    headerClassName: "font-bold text-base text-emerald-600",
  }));
  useEffect(() => {
    function getInitialData() {
      studentHandlers
        .getInfoForResume()
        .then(
          (res: {
            message: string;
            variant: "success" | "error";
            data: StudentInfoForResume | null;
          }) => {
            if (res.variant === "success" && res.data) {
              setStudentInfoForResumeName(res.data);
              return;
            }
            enqueueSnackbar(res.message, { variant: res.variant });
          }
        );
    }
    function getResumeList() {
      if (!event || !event.Title) return;
      fileHandlers
        .getResumeList(event.id)
        .then(
          (res: {
            message: string;
            variant: "success" | "error" | "";
            data: ResumeType[] | null;
          }) => {
            if (res.variant === "success" && res.data) {
              setResumes(res.data);
              return;
            }
            enqueueSnackbar(res.message, { variant: "error" });
          }
        );
    }
    getInitialData();
    getResumeList();
  }, []);
  useEffect(() => {
    if (!studentInfoForResumeName || !resumes) return;
    const names = resumeNames(studentInfoForResumeName);
    const currentResumeNames = resumes.map((resume) => resume.Name);
    const requiredNames = names.filter(
      (name) => !currentResumeNames.includes(name)
    );
    setRequiredResumeNames(requiredNames);
    return () => {};
  }, [resumes, studentInfoForResumeName]);

  const resumeNames = (
    studentInfoForResumeName: StudentInfoForResume
  ): Array<string> => {
    if (!studentInfoForResumeName) return [];
    const list = [];
    const base_name =
      studentInfoForResumeName.name.split(" ").join("_") +
      "_" +
      studentInfoForResumeName.rollNumber +
      "_" +
      studentInfoForResumeName.program +
      "_" +
      studentInfoForResumeName.department;
    list.push(base_name + "_MT.pdf");
    setRequiredMasterResumeName(base_name + "_MT.pdf");
    for (let i = 1; i <= 3; i++) {
      list.push(base_name + "_S" + i + ".pdf");
      setRequiredSingleResumeNames([
        ...requiredSingleResumeNames,
        base_name + "_S" + i + ".pdf",
      ]);
    }
    return list;
  };
  function updateResumeList() {
    if (!event || !event.Title) return;
    fileHandlers
      .getResumeList(event.id)
      .then(
        (res: {
          message: string;
          variant: "success" | "error" | "";
          data: ResumeType[] | null;
        }) => {
          if (res.variant === "success" && res.data) {
            setResumes(res.data);
            return;
          }
          enqueueSnackbar(res.message, { variant: "error" });
        }
      );
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  const handleFileUpload = () => {
    if (!(event.Title && event.AcademicYear)) {
      return;
    }
    if (!file) {
      enqueueSnackbar("Please select a file", { variant: "error" });
      return;
    }
    const category = file.name.endsWith("MT.pdf") ? "master" : "single";
    if(requiredResumeNames.includes(requiredMasterResumeName) && file.name !== requiredMasterResumeName){
      enqueueSnackbar("Please upload Master Resume First", { variant: "error" });
      return;
    }
    if (requiredResumeNames.length === 0) {
      enqueueSnackbar("All required resumes are uploaded", {
        variant: "error",
      });
      return;
    }
    if (requiredResumeNames.includes(file.name) === false) {
      enqueueSnackbar("Invalid file name", { variant: "error" });
      return;
    }
    if (file.type !== "application/pdf") {
      enqueueSnackbar("Invalid file type", { variant: "error" });
      return;
    }
    if (file.size > 1024 * 1024) {
      enqueueSnackbar("File size too large", { variant: "error" });
      return;
    }
    fileHandlers
      .post(file, event.id, category)
      .then((res: { message: string; variant: "success" | "error" }) => {
        enqueueSnackbar(res.message, { variant: res.variant });
        if (res.variant === "success") {
          setFile(null);
          updateResumeList();
        }
      });
  };
  const showFileSize = (file: File | null) => {
    if (!file) return <span></span>;
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > 1) {
      return (
        <span>
          file size:
          <span className="text-red-500">{sizeInMB.toFixed(3) + "MB"}</span>
        </span>
      );
    }
    return (
      <span>
        file size:<span>{sizeInMB.toFixed(3) + "MB"}</span>
      </span>
    );
  };
  return (
    <div className="max-w-[1200px] mx-auto w-[95vw] md:w-full">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">
        Resume Upload
      </h1>
      <div>
        <ol className="list-decimal list-inside">
          <li>Click on the button below to upload your resume.</li>
          <li>
            Your resume will be reviewed by our team and you will be notified
            once it is approved.
          </li>
          <li>
            You can only upload one resume at a time. If you want to update your
            resume, you will have to upload a new one.
          </li>
          <li>
            Master Resume refers to multi-page pdf which contains all the points
            you want to include in your single page resumes.{" "}
          </li>
          <li>
            Single Resume refers to single-page pdfs you want to submit for a
            specific job.
          </li>
          <li>Total of 4 resumes allowed including Master Resume</li>
          {requiredResumeNames.includes(requiredMasterResumeName) ? (
            <li>
              Required Master Resume Name :{" "}
              <span className="font-bold">{requiredMasterResumeName}</span>
            </li>
          ) : (
            <li><span className="font-bold">Status</span>: Master Resume has been uploaded</li>
          )}
          {requiredResumeNames.filter((e) => e !== requiredMasterResumeName)
            .length ? (
            <li>
              {" "}
              Required Single resume names are{" "}
              {requiredResumeNames
                .filter((e) => e !== requiredMasterResumeName)
                .map((e) => (
                  <span className="font-bold">{e} </span>
                ))}
            </li>
          ) : (
            <li><span className="font-bold">Status</span>: All required Single resumes have been uploaded</li>
          )}
        </ol>
      </div>
      <div className="bg-white shadow-lg mx-auto m-4">
        <div className="flex flex-col md:flex-row p-4 justify-between gap-4">
          <div className="w-full md:w-8/12">
            <Label htmlFor="resume" className="text-emerald-700">
              Upload Resume (PDF, max 1MB)
            </Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
          <div className="w-full md:w-4/12 flex flex-col-reverse">
            {/* <Label htmlFor="category" className="text-emerald-700">
              Resume Category
            </Label>
            <Select
              onValueChange={(value: "master" | "single") => setCategory(value)}
            >
              <SelectTrigger className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="master">Master</SelectItem>
              </SelectContent>
            </Select> */}
            <button
            className="bg-emerald-800 text-white p-2 mt-4 rounded-md w-full"
            onClick={handleFileUpload}
          >
            Upload
          </button>
          </div>
        </div>
        <div className="flex flex-row-reverse justify-between items-center text-gray-500 p-4 py-0">
          
          <div>{showFileSize(file)}</div>
        </div>
      </div>
      <div>
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
              marginTop: "4rem",
              minHeight: "calc(50vh)",
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ResumePage;
