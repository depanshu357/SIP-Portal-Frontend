"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import fileHandlers from "@/api/file";
import studentHandlers from "@/api/student";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";
import { ResumeType, StudentInfoForResume } from "@/types/custom_types";
const ResumePage = () => {
  const [category, setCategory] = React.useState<"master" | "single">("single");
  const [resumes, setResumes] = React.useState<ResumeType[]>([]);
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
      if(!event || !event.Title) return;
      fileHandlers
        .getResumeList(event.Title)
        .then(
          (res: {
            message: string;
            variant: "success" | "error" | "";
            data: ResumeType[] | null;
          }) => {
            console.log(res.message);
            if ((res.variant === "success" || res.variant === "") && res.data) {
              setResumes(res.data);
              console.log(res.data);
              return;
            }
            enqueueSnackbar(res.message, { variant: "error" });
          }
        );
    }
    getInitialData();
    getResumeList();
    return () => {
      getInitialData();
      getResumeList();
    };
  }, []);
  const resumeNames = (): Array<String> => {
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
    for (let i = 1; i <= 3; i++) {
      list.push(base_name + "_S" + i + ".pdf");
    }
    return list;
  };
  const requiredResumeNames = ():Array<String> => {
    if(!resumes || resumes.length===0) return resumeNames();
    const allResumeNames = resumes.map((resume) => resume.Name);
    console.log(resumes)
    // return allResumeNames;
    const requiredResumes = resumes.filter((resume) => !allResumeNames.includes(resume.Name));
    const requiredResumeNames = requiredResumes.map((resume) => resume.Name);
    return requiredResumeNames;
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  const handleFileUpload = () => {
    if (event.Title && event.AcademicYear && category){
      console.log(event.Title, event.AcademicYear, category)
    }else return;
    if (file) {
      if (file.type !== "application/pdf") {
        enqueueSnackbar("Invalid file type", { variant: "error" });
        return;
      }
      if (file.size > 1024 * 1024) {
        enqueueSnackbar("File size too large", { variant: "error" });
        return;
      }
      // setResumes([...resumes, newResume]);
      console.log(event)
      fileHandlers
        .post(file, event.Title, event.AcademicYear, category)
        .then((res: { message: string; variant: "success" | "error" }) => {
          enqueueSnackbar(res.message, { variant: res.variant });
        });
    } else {
      enqueueSnackbar("Please select a file", { variant: "error" });
    }
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
          <li className="mb-1">
            Click on the button below to upload your resume.
          </li>
          <li className="mb-1">
            Your resume will be reviewed by our team and you will be notified
            once it is approved.
          </li>
          <li className="mb-1">
            You can only upload one resume at a time. If you want to update your
            resume, you will have to upload a new one.
          </li>
          <li className="mb-1">
            Master Resume refers to multi-page pdf which contains all the points
            you want to include in your single page resumes.{" "}
          </li>
          <li className="mb-1">
            Single Resume refers to single-page pdfs you want to submit for a
            specific job.
          </li>
          <li className="mb-1">
            Total of 4 resumes allowed including Master Resume
          </li>
          <li className="mb-1">Max File Size: 1MB</li>
          <li className="mb-1">{requiredResumeNames().map((name,index)=>{
            return <li key={index}>{name}</li>
          })}</li>
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
          <div className="w-full md:w-4/12">
            <Label htmlFor="category" className="text-emerald-700">
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
            </Select>
          </div>
        </div>
        <div className="flex flex-row-reverse justify-between items-center text-gray-500 p-4 pt-0">
          <button
            className="bg-emerald-800 text-white p-2 mt-4 rounded-md"
            onClick={handleFileUpload}
          >
            Upload
          </button>
          <div>{showFileSize(file)}</div>
        </div>
      </div>
      <div>
        {resumeNames().map((name, index) => (
          <div key={index} className="bg-white shadow-lg mx-auto m-4">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePage;
