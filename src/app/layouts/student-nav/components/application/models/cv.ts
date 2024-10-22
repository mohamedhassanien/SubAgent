export interface Resume {
  fullName: string;
  headline: string;
  jobTitle: string;
  adress: string;
  email: string;
  city: string;
  phone: number;
  zipcode: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  summary: string;
  linkedIn: string;
  exps: Exp[];
  edus: Edu[];
  skills: Skill[];
  langs: lang[];
  [key: string]: any;
}

export interface Edu {
  programName: string;
  schName: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  present: boolean;
}

export interface Exp {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  present: boolean;
}

export interface Skill {
  name: string;
  level: string;
}
export interface lang {
  name: string;
  level: string;
}
