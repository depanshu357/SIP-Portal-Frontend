"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactQuillReader } from "@/components/QuillTextEditor";
import { parseISO, formatDistanceToNow, max, set } from "date-fns";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import Editor from "@/components/Editor";
import Quill from "quill";
// import {convertHtmlToDelta} from 'node-quill-converter'

type Row = {
  id: string;
  Heading: string;
  Content: boolean;
  Recipients: string[];
  CreatedAt: string;
};
type Received = {
  ID: string;
  Heading: string;
  Content: boolean;
  Recipients: string[];
  CreatedAt: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "98vw",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  border: "0px",
  borderRadius: 2,
  boxShadow: 24,
  p: 1,
};

const Notifications = () => {
  const [rows, setRows] = useState<Array<Row>>([]);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef<Quill | null>(null);
  const { data: session } = useSession();
  const handleOpen = () => {
    if (window.innerWidth < 768) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_KEY}/student/notices`,
            {
              params: {
                email: session.user.email || "student", // Use session email if available
              },
            }
          );
          const notices = res.data.notices;
          setRows(
            notices.map((notice: Received) => ({
              id: notice.ID,
              Heading: notice.Heading,
              Content: notice.Content,
              Recipients: notice.Recipients,
              CreatedAt: notice.CreatedAt,
            }))
          );
        } catch (err) {
          console.error("Error fetching notices:", err);
        }
      }
    };

    fetchData();
  }, [session]);
  useEffect(() => {
    const quill = new Quill(document.createElement("div"));
    quillRef.current = quill; // Set the ref to the Quill instance

    return () => {
      quillRef.current = null; // Cleanup on unmount
    };
  }, []);
  const [selectedItem, setSelectedItem] = useState<null | Row>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = rows.filter((item) =>
    item.Heading.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function formatRelativeTime(dateString: string): string {
    const date = parseISO(dateString);
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return relativeTime;
  }
  useEffect(() => {
    if (selectedItem && quillRef.current) {
      const htmlContent = selectedItem.Content?.toString() ?? "";
      const delta = quillRef.current.clipboard.convert({html:htmlContent});
      quillRef.current.setContents(delta);
    }
  }, [selectedItem,quillRef.current]);

  const convertHtmlToReactComponent = (html: string) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div>
      <div className="mt-4 rounded-md shadow-lg bg-white max-w-[1200px] mx-auto max-h-[88vh] h-[800px] p-4 flex flex-row">
        <div className="box-border left md:w-2/6 w-full h-full rounded-l-md border-y-2 border-l-2 border-gray relative overflow-hidden">
          <div className="sticky top-0 bg-white p-4 border-b border-emerald-200 z-[15]">
            <div className="relative bg-white ">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500"
                size={18}
              />
              <Input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2  focus:ring-opacity-50"
              />
            </div>
          </div>
          <ScrollArea className="h-full z-10 overflow-hidden">
            <ul className="divide-y divide-emerald-300 p-0 mb-16 h-fit overflow-y-scroll">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="p-2 emerald-50 hover:bg-emerald-50 cursor-pointer transition duration-150 ease-in-out
                            m-1 rounde-lg block text-md"
                  onClick={() => {
                    handleOpen();
                    const htmlContent = item.Content?.toString() ?? "";
                    const delta = quillRef.current?.clipboard.convert({
                      html: htmlContent,
                    });
                    console.log(delta);
                    quillRef.current?.setContents(delta ?? []);
                    setSelectedItem(item);
                  }}
                >
                  {item.Heading}
                  <div className="text-sm text-gray-500 w-full">
                    {formatRelativeTime(item.CreatedAt.toString())}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div className="box-border right  w-4/6 hidden md:block h-full rounded-r-md border-2 border-gray overflow-hidden">
          <div className="h-full">
            {selectedItem ? (
              <div className="h-full">
                <h1 className="text-2xl font-bold p-5 bg-emerald-50">
                  {selectedItem.Heading}
                </h1>

                <div className="text-gray-600  h-full block overflow-y-scroll">
                  {/* <ReactQuillReader content={selectedItem.Content.toString()} /> */}
                    <Editor
                    ref={quillRef}
                    readOnly={true}
                    onSelectionChange={setRange}
                    onTextChange={setLastChange}
                  />
                  
                  
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 h-full w-full flex justify-center items-center flex-col">
                <h1 className="text-2xl font-bold p-5 bg-emerald-50">
                  {"Notices"}
                </h1>
                <Image
                  src="/assets/images/notice.jpg"
                  alt="empty"
                  width={500}
                  height={500}
                />
                <p>Select an item to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 className="text-2xl font-bold p-5 bg-emerald-50">
              {selectedItem?.Heading ?? ""}
            </h1>
            <div className="text-gray-600  h-full block overflow-y-scroll">
              {/* <ReactQuillReader
                content={selectedItem?.Content?.toString() ?? ""}
              /> */}
              {convertHtmlToReactComponent(selectedItem?.Content?.toString() ?? "")}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Notifications;
