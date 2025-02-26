"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChevronsLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseISO, formatDistanceToNow } from "date-fns";

import Image from "next/image";
import { useSession } from "next-auth/react";
import RichTextReader from "@/components/RichTextReader";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";

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

const Notifications = () => {
  const [rows, setRows] = useState<Array<Row>>([]);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isMobileView, setIsMobileView] = useState(true);
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  const handleOpen = () => {
    if (isMobileView) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobileView(window.innerWidth < 768);
    return () => {
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!event || !event.id) return;
      if (session?.user?.email) {
        try {
          const instance = axios.create({
            withCredentials: true,
          });
          const res = await instance.get(
            `${process.env.NEXT_PUBLIC_API_KEY}/student/notices`,
            {
              params: {
                eventId: event.id,
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
  }, [session, event]);
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

  return (
    <div>
      <div className="mt-4 rounded-md shadow-lg bg-white max-w-[1200px] mx-auto max-h-[88vh] h-[800px] p-4 flex flex-row">
        {!(isMobileView && open) && (
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
                      setSelectedItem(item);
                      handleOpen();
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
        )}
        {(!isMobileView || open) && (
          <div className="box-border right md:w-4/6 md:block w-full h-full rounded-r-md border-2 border-gray overflow-hidden">
            <div className="h-full">
              {selectedItem ? (
                <div className="h-full">
                  <h1 className="text-2xl font-bold p-5 bg-emerald-50 flex flex-row items-center gap-2">
                    <span
                      className="text-emerald-500 md:hidden"
                      onClick={handleClose}
                    >
                      <ChevronsLeft />
                    </span>
                    {selectedItem.Heading}
                  </h1>

                  <div className="text-gray-600 block">
                    <RichTextReader
                      key={selectedItem?.id}
                      value={selectedItem?.Content?.toString() ?? ""}
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
                  <p>Select an item to view its content</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
