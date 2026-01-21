
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, EXPERIENCE, SKILLS, CONTACT_LINKS } from '../constants';
import Terminal from './Terminal';
import { ExternalLink, Download, ArrowRight, Code, Shield, Cloud, Cpu, Server, Database } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export const HeroSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
    <motion.div {...fadeInUp} className="z-10 mt-20">
      <span className="px-4 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 inline-block bg-cyan-500/5 backdrop-blur-sm">
        Available for Engineering Roles
      </span>
      <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sourish Dey</span>
      </h1>
      <h2 className="text-xl md:text-2xl text-white/60 font-mono mb-8">
        Cloud | AI/ML | DevOps Engineer
      </h2>
      <p className="max-w-xl mx-auto text-white/40 mb-10 leading-relaxed">
        Building intelligent, scalable, and secure digital ecosystems. Specialized in distributed systems and high-performance ML pipelines.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors flex items-center gap-2">
          Contact Me <ArrowRight size={18} />
        </button>
        <button className="px-8 py-3 glass rounded-md hover:bg-white/10 transition-colors flex items-center gap-2">
          Download Resume <Download size={18} />
        </button>
      </div>
    </motion.div>
  </section>
);

export const AboutSection = () => (
  <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-24">
    <div className="max-w-2xl">
      <motion.div {...fadeInUp}>
        <h2 className="text-4xl font-bold mb-8">Professional Profile</h2>
        <p className="text-xl text-white/60 mb-8 leading-relaxed">
          Results-driven engineer pursuing B.Tech at <span className="text-white">KIIT University</span>. 
          Focused on the intersection of <span className="text-cyan-400">Cloud Infrastructure</span> and 
          <span className="text-blue-400"> Machine Learning</span>.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          <div>
            <div className="text-4xl font-bold text-cyan-400 mb-2">3+</div>
            <div className="text-sm text-white/40 uppercase tracking-widest font-mono">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
            <div className="text-sm text-white/40 uppercase tracking-widest font-mono">Projects Deployed</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const ExperienceSection = () => (
  <section className="min-h-screen py-24 px-6 md:px-24">
    <h2 className="text-4xl font-bold mb-16 text-center">Engineering Timeline</h2>
    <div className="max-w-4xl mx-auto relative">
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
      {EXPERIENCE.map((exp, index) => (
        <motion.div 
          key={exp.id}
          {...fadeInUp}
          className={`relative mb-16 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] w-[11px] h-[11px] rounded-full bg-cyan-500 shadow-[0_0_10px_#00f2ff]"></div>
          <div className="md:w-1/2 px-8">
            <div className="glass p-6 rounded-lg hover:border-cyan-500/40 transition-colors cursor-default">
              <span className="text-cyan-400 font-mono text-xs">{exp.period}</span>
              <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
              <p className="text-white/60 mb-4">{exp.company}</p>
              <ul className="space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i} className="text-sm text-white/40 flex items-start gap-2">
                    <span className="text-cyan-500 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'ML', 'Cloud', 'Finance', 'IoT', 'Analytical'];
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section className="min-h-screen py-24 px-6 md:px-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-4xl font-bold mb-4">Engineering Projects</h2>
          <p className="text-white/40">Scalable solutions across multiple domains.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 text-xs font-mono rounded-full transition-all ${filter === cat ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map(project => (
          <motion.div 
            key={project.id}
            {...fadeInUp}
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={20} className="text-cyan-400" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded">
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
            <p className="text-white/50 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] uppercase tracking-widest text-white/30 px-2 py-1 bg-white/5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const ResearchSection = () => (
  <section className="min-h-screen py-24 px-6 md:px-24 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div {...fadeInUp}>
        <h2 className="text-4xl font-bold mb-8">Engineering Logic</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Server size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Distributed Training</h4>
              <p className="text-sm text-white/40">Horovod + TensorFlow for cluster-wide synchronization.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Zero-Trust Infrastructure</h4>
              <p className="text-sm text-white/40">Terraform-defined VPCs with mTLS and IAM least privilege.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
              <Cloud size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Serverless Orchestration</h4>
              <p className="text-sm text-white/40">Event-driven pipelines using AWS Step Functions and Lambda.</p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div {...fadeInUp} className="font-mono text-sm bg-black/60 p-6 rounded-lg border border-white/10 shadow-2xl">
        <div className="text-cyan-400 mb-4">// infra/k8s/canary.tf</div>
        <div className="text-white/40 space-y-2">
          <div><span className="text-purple-400">resource</span> "kubernetes_deployment" "canary" {"{"}</div>
          <div className="pl-4">name = <span className="text-green-400">"app-v2"</span></div>
          <div className="pl-4">replicas = <span className="text-orange-400">1</span></div>
          <div className="pl-4">template {"{"} ... {"}"}</div>
          <div>{"}"}</div>
          <div className="pt-4 text-cyan-400">// ml/training/dist.py</div>
          <div><span className="text-purple-400">import</span> tensorflow <span className="text-purple-400">as</span> tf</div>
          <div>strategy = tf.distribute.MirroredStrategy()</div>
          <div><span className="text-purple-400">with</span> strategy.scope():</div>
          <div className="pl-4">model = create_model()</div>
          <div className="pl-4">model.compile(...)</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const SkillsSection = () => (
  <section className="min-h-screen py-24 px-6 md:px-24">
    <h2 className="text-4xl font-bold mb-16">Technical Arsenal</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {SKILLS.map((skill, i) => (
        <motion.div key={skill.name} {...fadeInUp} transition={{ delay: i * 0.1 }}>
          <div className="flex justify-between mb-2 font-mono text-sm uppercase tracking-widest">
            <span className="text-white/60">{skill.name}</span>
            <span className="text-cyan-400">{skill.level}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,242,255,0.5)]"
            />
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export const ContactSection = () => (
  <section className="min-h-screen py-24 px-6 md:px-24 flex flex-col items-center justify-center text-center">
    <motion.div {...fadeInUp}>
      <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's Build the <span className="text-cyan-400">Future.</span></h2>
      <p className="text-xl text-white/40 max-w-2xl mx-auto mb-16">
        Currently looking for opportunities in High-Performance Computing, Cloud Native Engineering, and Scalable AI.
      </p>
      <div className="flex flex-wrap justify-center gap-12 mb-24">
        {CONTACT_LINKS.map(link => (
          <a 
            key={link.name} 
            href={link.url}
            className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
          >
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:border-cyan-500 transition-colors">
              {link.icon}
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-cyan-400">
              {link.name}
            </span>
          </a>
        ))}
      </div>
      <footer className="text-white/20 font-mono text-[10px] uppercase tracking-[0.2em]">
        &copy; 2024 Sourish Dey | Designed for Engineering Excellence
      </footer>
    </motion.div>
  </section>
);
