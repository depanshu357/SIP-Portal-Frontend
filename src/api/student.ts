import authInstance from "./config";

interface StudentInfoForResume {
    name: string,
    rollNumber: string,
    program: string,
    department: string,
}

const studentHandlers = {
    getInfoForResume: async (): Promise<{ message: string, variant: "success" | "error", data: StudentInfoForResume | null }> => {
        try {
            const res = await authInstance.get('/student/info-for-resume-name');
            return { message: "Data fetched successfully", variant: "success", data: res.data };
        } catch (err) {
            return { message: "Failed to fetch data", variant: "error", data: null };
        }
    },
}

export default studentHandlers;