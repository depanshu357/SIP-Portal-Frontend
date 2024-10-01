"use client";
// components/QuillEditor.js
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // import Quill styles
import "@/styles/quill.css"; // import custom styles

// Dynamically import react-quill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" },],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
    ],
    ["link", "image","video"],
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
  "link",
  "image",
  "video",
];

const QuillTextEditor = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      QuillTextEditor
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        className="custom-quill border-2 border-emerald-500 rounded-lg overflow-hidden min-h-[200px]"
      />
    </div>
  );
};

export default QuillTextEditor;
