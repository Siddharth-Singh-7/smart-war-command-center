import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Signal, Wifi, Lock, Send, Terminal, Cpu, Radio, Video } from 'lucide-react';

export default function CommHub() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'HQ', text: 'RECON-01 signal acquired. Confirming encryption keys...', type: 'SYSTEM' },
    { id: 2, sender: 'STRIKE-TEAM', text: 'Sector 4 clear. Moving to extraction point.', type: 'USER' },
    { id: 3, sender: 'HQ', text: 'Copy that. Extraction heli ETA 4 minutes.', type: 'SYSTEM' },
    { id: 4, sender: 'AI', text: 'Thermal spike detected at 45.2N. Advisory: Reroute Team Beta.', type: 'AI' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'COMMAND', text: input, type: 'USER' }]);
    setInput('');
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 overflow-hidden">
      <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
        {/* Encrypted Comms Terminal */}
        <div className="col-span-12 lg:col-span-5 glass-panel flex flex-col overflow-hidden bg-black/40">
          <div className="p-4 border-b border-primary/20 flex items-center justify-between bg-primary/5">
            <h2 className="text-sm font-orbitron text-primary uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              SECURE TERMINAL // ALPHA
            </h2>
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-green-glow" />
              <span className="text-[10px] text-green-glow font-mono">E2E ENCRYPTED</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.sender === 'COMMAND' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${
                      msg.type === 'AI' ? 'text-blue-glow' : 
                      msg.type === 'SYSTEM' ? 'text-amber-glow' : 'text-primary/60'
                    }`}>
                      {msg.sender}
                    </span>
                    <span className="text-[8px] text-muted-foreground">12:44:02</span>
                  </div>
                  <div className={`max-w-[85%] p-3 rounded-sm text-xs leading-relaxed ${
                    msg.sender === 'COMMAND' 
                      ? 'bg-primary/20 border border-primary/40 text-primary' 
                      : msg.type === 'AI'
                        ? 'bg-blue-glow/10 border border-blue-glow/30 text-blue-glow'
                        : 'bg-white/5 border border-white/10 text-primary/90'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-primary/20 bg-primary/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ENTER COMMAND..."
                className="w-full bg-black/50 border border-primary/30 rounded-sm px-4 py-3 text-xs font-mono text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-glow transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Satellite Feed & Signal Matrix */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 overflow-hidden">
          {/* Mock Satellite Feed */}
          <div className="flex-1 glass-panel relative overflow-hidden group">
            <div className="absolute inset-0 bg-black">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-screen grayscale" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
              {/* Overlay graphics */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-red-glow font-bold animate-pulse">● LIVE FEED</span>
                      <span className="text-xs font-orbitron text-primary">SAT-V9-NORTH</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-primary/60 text-[10px] space-y-1">
                    <p>AZM: 142.04</p>
                    <p>ALT: 22,402km</p>
                    <p>SNR: 18.2dB</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-32 h-32 border border-primary/40 relative">
                    <div className="absolute inset-0 border border-primary/20 animate-ping" />
                    <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-primary/40" />
                    <div className="absolute left-1/2 top-0 w-[0.5px] h-full bg-primary/40" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-glow" />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="font-mono text-[9px] text-primary/60">
                    <p>SCANNING SECTOR: 4-DELTA</p>
                    <p>COORD: 45.28312 / 12.84221</p>
                  </div>
                  <Video className="w-5 h-5 text-primary/40" />
                </div>
              </div>
            </div>
            {/* HUD Scanline */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-[2px] bg-primary/20 absolute top-0 animate-scan-vertical" />
            </div>
          </div>

          {/* Signal Diagnostics */}
          <div className="h-48 glass-panel p-6 flex gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-[10px] font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2">
                <Signal className="w-4 h-4" />
                Sub-Space Diagnostics
              </h3>
              <div className="flex-1 flex items-end gap-1 px-1 border-b border-primary/20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                    className="flex-1 bg-primary/30 rounded-t-[1px]"
                  />
                ))}
              </div>
            </div>
            
            <div className="w-48 flex flex-col gap-3 justify-center">
              {[
                { label: 'Uplink', value: '4.2 Gbps', icon: Wifi },
                { label: 'Latency', value: '12ms', icon: Cpu },
                { label: 'Burst', value: 'ACTIVE', icon: Radio },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-primary/5 rounded-sm border border-primary/10">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-3 h-3 text-primary/60" />
                    <span className="text-[9px] text-muted-foreground uppercase">{stat.label}</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
