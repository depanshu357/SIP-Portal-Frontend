import { format } from "date-fns";
import authInstance, {fileInstance} from "./config";

import { ResumeType } from "@/types/custom_types";

const fileHandlers = {
    post: async (file: File, event: string, academic_year: string,category: string): Promise<{ message: string, variant: "success" | "error" }> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('academic_year', academic_year);
        formData.append('event', event);
        formData.append('category', category);
        try {
            await fileInstance.post('/student/upload-file', formData);
            return { message: "File uploaded successfully", variant: "success" };
        } catch (err) {
            return { message: "Failed to upload file", variant: "error" };
        }
    },
    getResumeList: async (event: string,academic_year:string): Promise<{ message: string, variant: "success" | "error" | "", data: ResumeType[] | null }> => {
        try {
            const res = await authInstance.get('/student/resume-list', {
                params: {
                    event: event,
                    academic_year: academic_year,
                }
            });
            const fileList = res.data.files;
            const resumeList: ResumeType[] = fileList.map((file: any) => {
                return {
                    Name: file.Name,
                    Category: file.Category,
                    IsVerified: file.IsVerified ? "Yes" : "No",
                    id: file.ID,
                    CreatedAt: format( file.CreatedAt, "dd/MM/yyyy"),
                };
            });
            return { message: "Data fetched successfully", variant: "success", data: resumeList };
        } catch (error) {
            console.log(error);
            return { message: "Failed to fetch data", variant: "error", data: null };
        }
    },
}

export default fileHandlers;
