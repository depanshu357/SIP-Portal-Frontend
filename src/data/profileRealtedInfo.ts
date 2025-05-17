export const branchList: Array<string> = ["AE","BSBE","CE","CHE","CSE","EE","MSE","ME","CHM","ECO","ES","MTH","SDS","PHY","CGS","DES","IME","MSP","NET","PSE","Stats","HSS","Mathematics","SEE","SSA"]
export const programList: Array<string> = ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MT", "MSR", "MSc", "MDes", "MBA", "PhD"]
export const ineligibleCombList: Array<{ branch: string; programs: Array<string> }> = [
  { branch: "AE", programs: ["BS", "DualC", "MSc", "MDes", "MBA"] },
  { branch: "BSBE", programs: ["BS", "DualC", "MSc", "MSR", "MDes", "MBA"] },
  { branch: "CE", programs: ["BS", "DualC", "MSc", "MDes", "MBA"] },
  { branch: "CHE", programs: ["BS", "DualC", "MSc", "MDes", "MBA"] },
  { branch: "CSE", programs: ["BS", "DualB", "DualC", "MSc", "MDes", "MBA"] },
  { branch: "EE", programs: ["BS", "DualC", "MSc", "MDes", "MBA"] },
  { branch: "MSE", programs: ["BS", "DualC", "MSc", "MSR", "MDes", "MBA"] },
  { branch: "ME", programs: ["BS", "DualC", "MSc", "MDes", "MBA"] },
  { branch: "CHM", programs: ["BT", "DualB", "DualC", "MT", "MSR", "MDes", "MBA"] },
  { branch: "ECO", programs: ["BT", "DualC", "MT", "MSR", "MDes", "MBA"] },
  { branch: "ES", programs: ["BT", "DoubleMajor", "DualC", "MSR", "MDes", "MBA"] },
  { branch: "MTH", programs: ["BT", "DualC", "MT", "MSR", "MSc", "MDes", "MBA", "PhD"] },
  { branch: "SDS", programs: ["BT", "DualC", "MT", "MSR", "MSc", "MDes", "MBA", "PhD"] },
  { branch: "PHY", programs: ["BT", "DualC", "MT", "MSR","MDes", "MBA",] },
  { branch: "CGS", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MT", "MSc", "MDes", "MBA",] },
  { branch: "DES", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualC", "MT", "MSR", "MSc", "MBA",] },
  { branch: "IME", programs: ["BT", "BS", "DoubleMajor", "DualA", "MSR", "MSc", "MDes",] },
  { branch: "MSP", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MSR", "MSc", "MDes", "MBA", ] },
  { branch: "NET", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MSR", "MSc", "MDes", "MBA",] },
  { branch: "PSE", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MSc", "MDes", "MBA",] },
  { branch: "Stats", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MT", "MSR", "MDes", "MBA",] },
  { branch: "HSS", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MT", "MSR", "MSc", "MDes", "MBA",] },
  { branch: "Mathematics", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MT", "MSR", "MDes", "MBA",] },
  { branch: "SEE", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MSc", "MDes", "MBA",] },
  { branch: "SSA", programs: ["BT", "BS", "DoubleMajor", "DualA", "DualB", "DualC", "MSR", "MSc", "MDes", "MBA",] },
]

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
    NatureOfBusiness: string;
  }