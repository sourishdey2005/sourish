
import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to Sourish-OS v3.14', 'Type "help" to list commands.']);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available: help, ls, whoami, skills, clear, uptime, contact';
        break;
      case 'ls':
        response = 'projects/  research/  cv.pdf  id_rsa.pub';
        break;
      case 'whoami':
        response = 'Sourish Dey - Cloud | AI/ML | DevOps Engineer. Pursuing B.Tech @ KIIT.';
        break;
      case 'skills':
        response = 'Cloud (AWS, GCP, Azure), DevOps (K8s, Docker, Terraform), ML (PyTorch, TensorFlow), Programming (Python, Go, JS)';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'uptime':
        response = 'Up 20 years, 3 months, 14 days. Load average: 0.98, 0.95, 0.99';
        break;
      case 'contact':
        response = 'Email: sourish@example.com | LinkedIn: /in/sourish-dey';
        break;
      default:
        response = `Command not found: ${cmd}`;
    }

    setHistory([...history, `sourish@portfolio:~$ ${input}`, response]);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="glass w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
      <div className="bg-white/10 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">bash — 80x24</div>
      </div>
      <div 
        ref={terminalRef}
        className="p-6 h-64 overflow-y-auto font-mono text-sm text-cyan-400 space-y-1 bg-black/60"
      >
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex">
          <span className="text-green-500 mr-2">sourish@portfolio:~$</span>
          <input
            type="text"
            className="bg-transparent border-none outline-none flex-grow text-cyan-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
