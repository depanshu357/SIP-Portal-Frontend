"use client";

import React, { useState, useContext } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paper, TextField, Typography } from "@mui/material";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { EventContextType, EventDefault, EventType } from "@/types/custom_types";
import { EventContext } from "@/contexts/eventContext";
import { JobDescriptionInput } from "@/types/custom_types";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import BranchProgramTable from "@/components/BranchProgramTable";

type Props = {};

const JobDescriptionPage = (props: Props) => {
  const [value, setValue] = useState("");
  const eventContext = useContext(EventContext) as EventContextType | null;
  const event: EventType = eventContext ? eventContext.event : EventDefault;

  const [jobDescription, setJobDescription] = useState<JobDescriptionInput>({title: "", description: "", location: "", stipend: ""});
  const [selectedCombinations, setSelectedCombinations] = useState<Set<string>>(new Set())
  
  const handleInputChange = (e: string, target: string) => {
    setJobDescription({...jobDescription, [target]: e});
  }

  const handleSubmit =  () => {
    const data = {...jobDescription, description: value, eventId: event.id, eligibility: Array.from(selectedCombinations)};
    console.log(data);
    if(!event || !event.id) return;
    const instance = axios.create({
      withCredentials: true,
    });
    instance.post(`${process.env.NEXT_PUBLIC_API_KEY}/recruiter/create-job`, data).then((res) => {
      console.log(res);
      enqueueSnackbar("Job Description created successfully", { variant: "success" });
    }).catch((err) => {
      console.log(err);
      enqueueSnackbar("Error creating Job Description", { variant: "error" });
    });
  

  }


  return (
    <div>
      <Paper
        sx={{
          maxWidth: "1200px",
          marginX: "10px",
          margin: "auto",
          marginTop: "2rem",
          padding: "10px",
        }}
        elevation={3}
      >
        <div>
          <h1 className="text-center text-4xl p-2 font-bold text-emerald-600">
            Job Description Form
          </h1>
          <div>
            <div>
              <Label className="text-lg font-bold text-black">
                Job Heading (Profile)
              </Label>
              <Input
                placeholder="Write job heading..."
                type="text"
                className="mx-auto border-emerald-500 bg-white"
                value={jobDescription.title}
                onChange={(e) => handleInputChange(e.target.value, "title")}
              />
            </div>
            <div className="mt-4">
              <Label className="text-lg font-bold text-black">Content</Label>
              {/* <QuillTextEditor value={value} setValue={setValue} /> */}
              {/* <ReactQuill className="custom-quill" theme="snow" value={value} onChange={setValue} /> */}
              <RichTextEditor value={value} setValue={setValue} />
            </div>
            <div className="flex gap-2 justify-between w-full mt-4 flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-1/2">
                <Label className="text-lg font-bold text-black">
                  Job Location
                </Label>
                <textarea
                  placeholder="Write job location..."
                  className="w-full p-2 text-sm border rounded-md resize-none border-emerald-500 bg-white h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={jobDescription.location}
                  onChange={(e) => handleInputChange(e.target.value, "location")}
                />
              </div>
                <div className="flex flex-col w-full md:w-1/2">
                <Label className="text-lg font-bold text-black">Stipend</Label>
                <textarea
                  placeholder="Write job location..."
                  className="w-full p-2 text-sm border rounded-md resize-none border-emerald-500 bg-white h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={jobDescription.stipend}
                  onChange={(e) => handleInputChange(e.target.value, "stipend")}
                />
                </div>
            </div>
          </div>
          <div>  
            <BranchProgramTable selectedCombinations={selectedCombinations} setSelectedCombinations={setSelectedCombinations} />
          </div>
          <div className="flex flex-row-reverse mt-4">
            <Button className="bg-emerald-500 text-white hover:bg-emerald-600" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default JobDescriptionPage;
