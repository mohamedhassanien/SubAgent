export interface Student {
  studentName: string;
  studentUserName: string;
  studentEmail: string;
  studentNationality: string;
  studentPhone: string;
  studentStatus: string;
  schoolOfInterest: string;
  programOfInterest: string;
  studentCreatedAt: number;
  studentSource: string;
  studentSeriousnessScore: any;
  studentDocs: [
    {
      fileName: string;
      fileUrl: string;
    }
  ];
  studentIntakeMonth: string;
  studentIntakeYear: string;
  studentEmpName: string;
  studentProfilePictureUrl: string;
  studentBio: string;
  studentJobTitle: string;
  studentEngTest: string;
  studentDateOfBirth: string;
  reminders: number;
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
