"use client";

import React, { useState, useContext, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DateTimePicker } from "@mantine/dates";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paper, TextField, Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  EventContextType,
  EventDefault,
  EventType,
} from "@/types/custom_types";
import { EventContext } from "@/contexts/eventContext";
import { JobDescriptionInput } from "@/types/custom_types";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import BranchProgramTable from "@/components/BranchProgramTable";
import RichTextReader from "@/components/RichTextReader";
import RichTextEditor from "@/components/RichTextEditor";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {};

const EditProforma = (props: Props) => {
  const [value, setValue] = useState("");
  const [timeValue, setTimeValue] = useState<Date>(new Date());
  const params = useParams();
  const router = useRouter();
  const eventContext = useContext(EventContext) as EventContextType | null;
  const event: EventType = eventContext ? eventContext.event : EventDefault;

  const [jobDescription, setJobDescription] = useState<any>({});
  const [selectedCombinations, setSelectedCombinations] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/proforma`, {
        params: {
          proformaId: params.id,
        },
      })
      .then((res) => {
        // console.log(res.data.proforma);
        let proforma = res.data.proforma;
        setJobDescription(proforma);
        setSelectedCombinations(new Set(proforma.Eligibility));
        setTimeValue(new Date(proforma.Deadline));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    // TODO: add checks if all the fields are submitted are not
    const data = {
      ...jobDescription,
      eligibility: Array.from(selectedCombinations),
      deadline: timeValue,
    };
    // console.log(data);
    if (!event || !event.id) return;
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(`${process.env.NEXT_PUBLIC_API_KEY}/recruiter/edit-job-description`, data)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Job Description updated successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error creating Job Description", { variant: "error" });
      });
  };
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
          <div onClick={() => router.back()} className='cursor-pointer'>
            <ArrowBackIcon  />
          </div>
          <h1 className="text-center text-4xl p-2 pt-0 font-bold text-emerald-600">
            Edit Description Form
          </h1>
          <p className="text-gray-400">
            Note: You can only edit deadline and eligibility
          </p>

          <div>
            <div>
              <Label className="text-lg font-bold text-black">
                Job Heading (Profile)
              </Label>
              <Input
                placeholder="Write job heading..."
                type="text"
                className="mx-auto border-emerald-500 bg-white"
                value={jobDescription.Title}
                disabled={true}
              />
            </div>
            <div className="mt-4">
              <Label className="text-lg font-bold text-black">Content</Label>
              {/* <QuillTextEditor value={value} setValue={setValue} /> */}
              {/* <ReactQuill className="custom-quill" theme="snow" value={value} onChange={setValue} /> */}
              {/* <RichTextEditor value={jobDescription?.Description?.toString()} setValue={setValue} /> */}
              <RichTextReader
                key={jobDescription?.ID}
                value={jobDescription?.Description?.toString() ?? ""}
              />
            </div>
            <div className="flex gap-2 justify-between w-full mt-4 flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-1/2">
                <Label className="text-lg font-bold text-black">
                  Job Location
                </Label>
                <textarea
                  placeholder="Write job location..."
                  className="w-full p-2 text-sm border rounded-md resize-none border-emerald-500 bg-white h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={jobDescription.Location}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <Label className="text-lg font-bold text-black">Stipend</Label>
                <textarea
                  placeholder="Write job location..."
                  className="w-full p-2 text-sm border rounded-md resize-none border-emerald-500 bg-white h-20 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  value={jobDescription.Stipend}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div>
            <BranchProgramTable selectedCombinations={selectedCombinations} setSelectedCombinations={setSelectedCombinations} />
          </div>
          <div className="flex flex-row mt-4 flex-wrap justify-between items-end">
            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Deadline"
              placeholder="Pick date and time"
              className="p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={timeValue}
              onChange={(value) => value && setTimeValue(value)}
            />
            <Button
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default EditProforma;
