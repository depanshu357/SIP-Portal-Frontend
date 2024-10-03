"use client";
// components/QuillEditor.js
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // import Quill styles
import "@/styles/quill.css"; // import custom styles
import Editor from "@/components/Editor";
import parse from "html-react-parser";
import { Button } from "./ui/button";

// Dynamically import react-quill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
];


const QuillTextEditor = ({value,setValue}:{value:string,setValue: (arg0: string) => void}) => {
  return (
    <div>
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Write notifications here..."
          className="custom-quill border-2 border-emerald-500 rounded-lg overflow-hidden min-h-[200px]"
        />
      {/* <div>{parse(value)}</div>
      <div dangerouslySetInnerHTML={{ __html: value }} />{" "} */}
      {/* Render formatted text */}

      {/* <ReactQuill
        value={value}
        // readOnly={true}
        modules={modules}
        formats={formats}
        className="custom-quill-for-reading"
      /> */}
    </div>
  );
};

export const ReactQuillReader = ({ content }: { content: string }) => {
  return <ReactQuill
    value={content}
    readOnly={true}
    modules={modules}
    formats={formats}
    className="custom-quill-for-reading"
  />
}

export default QuillTextEditor;
