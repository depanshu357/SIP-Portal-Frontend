type User = {
    email: string;
    password: string;
    role: "admin" | "student" | "recruiter";
    isVerified?: boolean;
}
const users: Array<User> = [
    {
        email: "ataps@email.com",
        password: "asdfasdf",
        role: "admin",
        isVerified: true
    },
    {
        email: "depanshus21@iitk.ac.in",
        password: "asdfasdf",
        role: "student",
        isVerified: true
    },
    {
        email:"depanshusahu057@gmail.com",
        password: "asdfasdf",
        role: "recruiter",
        isVerified: true
    }
]
export const getUserByEmail = (email: string) => {
    return users.find(user => user.email === email);
}