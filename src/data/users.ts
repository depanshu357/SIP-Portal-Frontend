type User = {
    Email: string;
    Password: string;
    Role: "admin" | "student" | "recruiter";
    IsVerified?: boolean;
}
const users: Array<User> = [
    {
        Email: "ataps@email.com",
        Password: "asdfasdf",
        Role: "admin",
        IsVerified: true
    },
    {
        Email: "depanshus21@iitk.ac.in",
        Password: "asdfasdf",
        Role: "student",
        IsVerified: true
    },
    {
        Email:"depanshusahu057@gmail.com",
        Password: "asdfasdf",
        Role: "recruiter",
        IsVerified: true
    }
]
export const getUserByEmail = (email: string) => {
    return users.find(user => user.Email === email);
}