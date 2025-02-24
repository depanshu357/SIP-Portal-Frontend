import { format } from "date-fns";
import authInstance, {fileDownloadInstance, fileInstance} from "./config";

import { ResumeType, ResumeTypeForAdmin } from "@/types/custom_types";

const fileHandlers = {
    post: async (file: File, eventId: string, category: string): Promise<{ message: string, variant: "success" | "error" }> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('eventId', eventId);
        formData.append('category', category);
        console.log(file)
        try {
            await fileInstance.post('/student/upload-file', formData);
            return { message: "File uploaded successfully", variant: "success" };
        } catch (err) {
            return { message: "Failed to upload file", variant: "error" };
        }
    },
    getResumeList: async (eventId: string): Promise<{ message: string, variant: "success" | "error" | "", data: ResumeType[] | null }> => {
        try {
            const res = await authInstance.get('/student/resume-list', {
                params: {
                    eventId: eventId,
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
    getResumeListForAdmin: async (eventId: string): Promise<{ message: string, variant: "success" | "error" | "", data: ResumeTypeForAdmin[] | null }> => {
        try {
            const res = await authInstance.get('/admin/resume-list', {
                params: {
                    eventId: eventId,
                }
            });
            const fileList = res.data.files;
            const resumeList: ResumeTypeForAdmin[] = fileList.map((file: any) => {
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
    fileVerificationToggle: async (id: number, value: boolean): Promise<{ message: string, variant: "success" | "error" }> => {
        try {
            await authInstance.post('/admin/verify-resume', {
                id: id,
                value: value,
            });
            return { message: "Resume verification status updated successfully", variant: "success" };
        } catch (err) {
            return { message: "Failed to update resume verification status", variant: "error" };
        }
    },
    downloadFile : async (id: number): Promise<{ message: string, variant: "success" | "error", data: Blob | null }> => {
        try {
            const response = await fileDownloadInstance.get(`/download-file`,{
                params: {
                    id: id,
                },
            })
            return { message: "File downloaded successfully", variant: "success", data: response.data };
        } catch (err) {
            return { message: "Failed to download file", variant: "error", data: null };
        }
    },
    deleteFile: async (id: number): Promise<{ message: string, variant: "success" | "error" }> => {
        try {
            await authInstance.delete('/admin/delete-resume', {
                params :{
                    id: id,
                }
            });
            return { message: "File deleted successfully", variant: "success" };
        } catch (err) {
            return { message: "Failed to delete file", variant: "error" };
        }
    }
}

export default fileHandlers;
