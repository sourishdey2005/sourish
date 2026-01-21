
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Html } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  HeroSection, 
  AboutSection, 
  ExperienceSection, 
  ProjectsSection, 
  ResearchSection,
  SkillsSection,
  ContactSection 
} from './components/Sections';
import Portrait from './components/Portrait';
import Terminal from './components/Terminal';

gsap.registerPlugin(ScrollTrigger);

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center font-mono">
    <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyan-500 animate-[loading_2s_ease-in-out_infinite]"></div>
    </div>
    <p className="text-cyan-500 text-[10px] mt-4 tracking-[0.3em] uppercase animate-pulse">Initializing Neural Interface</p>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  </div>
);

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Map 0-1 progress to 0-10 for the Portrait component stages
        setScrollProgress(self.progress * 10);
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="relative bg-[#050505] min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <Suspense fallback={<LoadingScreen />}>
        {/* Fixed 3D Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas 
            shadows 
            dpr={[1, 2]} 
            camera={{ position: [0, 0, 5], fov: 35 }}
          >
            <ambientLight intensity={0.5} />
            <spotLight 
              position={[10, 10, 10]} 
              angle={0.15} 
              penumbra={1} 
              intensity={2} 
              color="#00f2ff"
              castShadow 
            />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#0066ff" />
            <Portrait scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Content Layer */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ResearchSection />
          
          <section className="min-h-screen py-24 px-6 md:px-24 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-12 text-center">Interactive Shell</h2>
            <Terminal />
          </section>

          <SkillsSection />
          
          <section className="min-h-screen py-24 px-6 md:px-24">
            <h2 className="text-4xl font-bold mb-16 text-center">Credentials & Honors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['AWS Solutions Architect', 'TensorFlow Certified', 'Kubernetes Expert'].map(cert => (
                <div key={cert} className="glass p-8 rounded-xl border-l-4 border-l-cyan-500">
                  <h4 className="font-bold mb-2">{cert}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Verified Credential</p>
                </div>
              ))}
            </div>
          </section>

          <ContactSection />
        </main>

        {/* HUD Elements */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
          <div className="text-cyan-500 font-bold text-xl tracking-tighter pointer-events-auto cursor-pointer">
            SD<span className="text-white/20">.ENG</span>
          </div>
          <div className="flex gap-8 pointer-events-auto">
            {['About', 'Work', 'Logic', 'Shell', 'Contact'].map(item => (
              <button key={item} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>
        </nav>

        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
          <div className="text-[8px] font-mono text-cyan-500/50 uppercase tracking-widest">
            System Integrity: 100%
          </div>
          <div className="text-[8px] font-mono text-cyan-500/50 uppercase tracking-widest">
            Sync Level: {(scrollProgress * 10).toFixed(1)}%
          </div>
        </div>

      </Suspense>
    </div>
  );
};

export default App;
