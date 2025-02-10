export const branchList: Array<string> = ["AE","BSBE","CE","CHE","CSE","EE","MSE","ME","CHM","ECO","ES","MTH","SDS","PHY","CGS","DES","IME","MSP","NET","PSE","Stats","HSS","Mathematics","SEE","SSA"]
export const programList: Array<string> = ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MT", "MSR", "MSc", "MDes", "MBA", "PhD"]

export type ProfileDataType = {
    name: string;
    rollNumber: string;
    email: string;
    department: string;
    secondaryDepartment: string;
    specialisation: string;
    gender: string;
    dob: string;
    alternateContactNumber: string;
    currentCPI: string;
    tenthBoard: string;
    tenthMarks: string;
    entranceExam: string;
    category: string;
    currentAddress: string;
    disability: string;
    expectedGraduationYear: string;
    program: string;
    secondaryProgram: string;
    preference: string;
    personalEmail: string;
    contactNumber: string;
    whatsappNumber: string;
    twelfthBoardYear: string;
    tenthBoardYear: string;
    twelfthBoard: string;
    twelfthMarks: string;
    entranceExamRank: string;
    categoryRank: string;
    permanentAddress: string;
    friendsName: string;
    friendsContactDetails: string;
}

export const defaultProfileData: ProfileDataType = {
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    secondaryDepartment: "",
    specialisation: "",
    gender: "",
    dob: "",
    alternateContactNumber: "",
    currentCPI: "",
    tenthBoard: "",
    tenthMarks: "",
    entranceExam: "",
    category: "",
    currentAddress: "",
    disability: "",
    expectedGraduationYear: "",
    program: "",
    secondaryProgram: "",
    preference: "",
    personalEmail: "",
    contactNumber: "",
    whatsappNumber: "",
    twelfthBoardYear: "",
    tenthBoardYear: "",
    twelfthBoard: "",
    twelfthMarks: "",
    entranceExamRank: "",
    categoryRank: "",
    permanentAddress: "",
    friendsName: "",
    friendsContactDetails: "",
  }

  export type RecruiterProfileDataType = {
    Company: string;
    Email: string;
    ContactNumber: string;
    AdditionalInfo: string;
  }