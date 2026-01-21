
import React from 'react';
import { Project, Experience, Skill } from './types';
import { Github, Linkedin, Mail, Phone, ExternalLink, Cpu, Cloud, Database, Code, Shield } from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Distributed TensorFlow Training',
    description: 'Scaled large-scale neural network training across multi-node Kubernetes clusters.',
    category: 'ML',
    tech: ['TensorFlow', 'Kubernetes', 'Python', 'GCP'],
  },
  {
    id: '2',
    title: 'FinEdge Analytics',
    description: 'Real-time stock prediction and portfolio risk assessment using LSTM and AWS Lambda.',
    category: 'Finance',
    tech: ['LSTM', 'AWS', 'Python', 'React'],
  },
  {
    id: '3',
    title: 'SmartCity IoT Gateway',
    description: 'Unified dashboard for 500+ IoT sensors managing traffic and energy.',
    category: 'IoT',
    tech: ['C++', 'MQTT', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '4',
    title: 'CloudSec Vault',
    description: 'Automated IAM and secret rotations with Terraform and HashiCorp Vault.',
    category: 'Cloud',
    tech: ['Terraform', 'Vault', 'AWS', 'IAM'],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Cloud Engineering Intern',
    company: 'NextGen Systems',
    period: '2023 - Present',
    description: [
      'Architected multi-region AWS infrastructure with Terraform.',
      'Optimized Kubernetes cluster costs by 35% using preemptible nodes.',
      'Implemented Canary deployments using Istio.'
    ]
  },
  {
    id: 'exp2',
    role: 'ML Research Fellow',
    company: 'KIIT AI Lab',
    period: '2022 - 2023',
    description: [
      'Published research on efficient transformer architectures for edge devices.',
      'Collaborated with senior researchers on patent-pending CV algorithms.'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'AWS / GCP / Azure', level: 90, category: 'Cloud' },
  { name: 'Kubernetes & Docker', level: 85, category: 'DevOps' },
  { name: 'Terraform & Ansible', level: 80, category: 'DevOps' },
  { name: 'PyTorch & TensorFlow', level: 85, category: 'AI/ML' },
  { name: 'CI/CD Pipelines', level: 90, category: 'DevOps' },
  { name: 'Python / Go / JS', level: 95, category: 'Programming' }
];

export const CONTACT_LINKS = [
  { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
  { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com' },
  { name: 'Email', icon: <Mail size={20} />, url: 'mailto:sourish@example.com' }
];
