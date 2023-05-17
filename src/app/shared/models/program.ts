export interface Program {
  WhattheydoInfo: [
    {
      id: number;
      number: number;
      text: string;
    }
  ];
  Whattheystudy: [
    {
      id: number;
      number: number;
      text: string;
    }
  ];
  Wheretheylive: [
    {
      id: number;
      number: number;
      text: string;
    }
  ];
  Wheretheywork: [
    {
      number: number;
      text: string;
    }
  ];
  cities: [
    {
      Name: string;
      youtubelink: string;
    }
  ];
  cityInfo: {
    Achigh: string;
    Aclow: number;
    Id: number;
    Name: string;
    ghight: number;
    glow: number;
    grohigh: number;
    grolow: number;
    outhigh: number;
    outlow: number;
    parag: string;
    trans: number;
    youtubelink: string;
  };
  programFee: number;
  programId: number;
  programIntake: string;
  programLang: string;
  programLength: number;
  programLevel: string;
  programName: string;
  programType: string;
  schoolInfo: {
    schoolDesr: string;
    schoolName: string;
    logo:string
  };
  spec:[]

}
