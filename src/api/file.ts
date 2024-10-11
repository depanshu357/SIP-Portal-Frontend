import authInstance, {fileInstance} from "./config";

const fileHandlers = {
    post: async (file: File, academic_year: string, event: string, category: string): Promise<{ message: string, variant: "success" | "error" }> => {
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
    }
}

export default fileHandlers;
