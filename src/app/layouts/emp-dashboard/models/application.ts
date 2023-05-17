export interface Application {
  appid: number,
  appDateOfCreation: number;
  reminders: number;
  schoolCampus: string;
  schoolFee: number;
  studensStatus: string;
  studentDocs: [
    {
      fileName: string;
      fileUrl: string;
    }
  ];
  studentEmail: string;
  studentFullName: string;
  studentIntakeMonth: string;
  studentIntakeYear: string;
  studentNationality: string;
  studentPhone: string;
  studentProfilePictureUrl: string;
  studentProgramName: string;
  studentSchoolName: string;
  studentScore: number;
  studentSource: string;
  studentUsername: string;
  studentEmpName: string;
  studentBio: string;
  studentJobTitle: string;
  studentEngTest: string;
  studentDateOfBirth: string;
  studentSubagent: string;
  studentEducation: {
    university: string;
    faculty: string;
  };
  studentFieldOfInterest: [];
  studentBudget: [min: number, max: number];
  studentSavedPrograms: [
    {
      city: string;
      created_at: number;
      desc: string;
      fee: number;
      id: number;
      intake: string;
      lang: string;
      length: string;
      level: string;
      name: string;
      school: string;
      type: string;
    }
  ];
}
