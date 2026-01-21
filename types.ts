
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'ML' | 'Cloud' | 'Finance' | 'IoT' | 'Analytical';
  tech: string[];
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}
