"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [academicYear, setAcademicYear] = useState("");
  const handleCreateEvent = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}/admin/create-event`, {
        title: title,
        start_date: startDate,
        academic_year: academicYear,
      })
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Event created successfully", { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Failed to create event", { variant: "error" });
      });
  };
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
      <div>
        <Label className="text-lg font-bold text-black">Topic</Label>
        <Input
          placeholder="Write title..."
          type="text"
          className="mx-auto border-emerald-500 bg-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <Label className="text-lg font-bold text-black">Start Date</Label>
        <DatePicker
          slotProps={{
            textField: {
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#50C878", // Emerald color for normal state
                    borderRadius: "6px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#45b568", // Darker emerald on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#50C878", // Same emerald color on focus
                    backgroundColor: "#e0f2f1", // Light emerald background on focus
                  },
                },
              },
            },
            popper: {
              sx: {
                ".MuiPaper-root": {
                  borderRadius: "10px",
                },
              },
            },
          }}
          value={startDate}
          onChange={setStartDate}
        />
      </div>
      <div>
        <Label className="text-lg font-bold text-black">Academic Year</Label>
        <Input
          placeholder="eg. 2024-25"
          type="text"
          className="mx-auto border-emerald-500 bg-white"
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
        />
      </div>
      <div className="flex flex-row-reverse">
        <Button
          onClick={handleCreateEvent}
          className="bg-emerald-500 hover:bg-emerald-400"
        >
          Create Event
        </Button>
      </div>
    </div>
  );
};

export default CreateEvent;
