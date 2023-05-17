export class Resume {
  name!: string;
  address!: string;
  eduCity!: number;
  email!: string;
  expStartDate!: string;
  expEndDate!: string;
  jobTitle!: string;
  lastName!: string;
  linkedIn!: string;
  country!: string;
  nationality!: string;
  softSkill!: string;
  lang!: string;
  summary!: string;
  location!: string;
  profilePic!: string;
  phone!: Number;
  plOfBirth!: string;
  zipcode!: number;
  daOfBirth!: string;
  company!: string;
  headline!: string;
  city!: string;
  startDate!: string;
  deg!: number;
  skill!: string;
  info!: string;
  scl!: string;
  expDesc!: string;
  eduName!: string;
  endDate!: string;
  // additionalInfos: AdditionalInfo[] = [];
  // skills: Skill[] = [];
  // softSkills: softSkill[] = [];
  // langs: Lang[] = [];

  constructor() {
    // this.additionalInfos.push(new AdditionalInfo());
    // this.skills.push(new Skill());
    // this.softSkills.push(new softSkill());
    // this.langs.push(new Lang());
  }
}

export class AdditionalInfo {
  title!: string;
}

export class Skill {
  skill!: string;
  level!: number;
}

export class softSkill {
  skill!: string;
  level!: number;
}

export class Lang {
  lang!: string;
}
