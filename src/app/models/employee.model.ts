export interface Employee {
    id: number;
    name: string;
    email: string;
    contactNumber: string;
    gender: 'Male' | 'Female';
    skills: Skill[];
  }
  
  export interface Skill {
    name: string;
    experience: number;
  }
  