"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useState } from "react";
// import ReactQuill from "react-quill-new";

import CustomizedHook from "@/components/CustomizedMultiSelectAutoComplete";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import RichTextEditor from '@/components/RichTextEditor';
import { EventContextType, EventDefault, EventType } from "@/types/custom_types";
import { EventContext } from "@/contexts/eventContext";

const NoticeStudent = () => {
  const [value, setValue] = useState("");
  const [heading, setHeading] = useState("");
  const [recipients, setRecipients] = useState<Array<string>>([]);
  const eventContext = useContext(EventContext) as EventContextType | null;
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  const handleNoticeSubmit = () => {
    console.log(recipients, heading, value);
    if(recipients.length === 0 || heading === "" || value=== "") {
      enqueueSnackbar("Please fill all the fields", { variant: "error" });
      return;
    }
    axios.
    post(`${process.env.NEXT_PUBLIC_API_KEY}/admin/create-notice`, {
      recipients: recipients,
      heading: heading,
      content: value,
      events: event.id,

    }).then((res) => {
      console.log(res);
      enqueueSnackbar("Notice created successfully", { variant: "success" });
    }).catch((err) => {
      console.log(err);
      enqueueSnackbar("Error creating notice", { variant: "error" });
    });
  }
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
      <div>
        <Label className="text-lg font-bold text-black">Recipients</Label>
        <CustomizedHook setRecipients={setRecipients}/>
      </div>
      <div>
        <Label className="text-lg font-bold text-black">Topic</Label>
        <Input
          placeholder="Write topic..."
          type="text"
          className="mx-auto border-emerald-500 bg-white"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
      <div>
        <Label className="text-lg font-bold text-black">Content</Label>
        {/* <QuillTextEditor value={value} setValue={setValue} /> */}
        {/* <ReactQuill className="custom-quill" theme="snow" value={value} onChange={setValue} /> */}
        <RichTextEditor value={value} setValue={setValue}/>
      </div>
      <div className="flex flex-row-reverse">
        <Button onClick={handleNoticeSubmit} className="bg-emerald-500 hover:bg-emerald-400">Create</Button>
      </div>
    </div>
  );
};

export default NoticeStudent;
