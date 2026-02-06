import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Thermometer, Wifi, Satellite, Terminal } from 'lucide-react';

export function TacticalDataStream() {
  const [logs, setLogs] = useState<string[]>([
    '[04:22:10] INITIALIZING NEURAL UPLINK... OK',
    '[04:22:12] DECRYPTING ENEMY COMMS: 45% COMPLETE',
    '[04:22:15] WARNING: THERMAL SIGNATURE DETECTED AT GRID 4',
    '[04:22:18] DRONE FEED #04 ACTIVE [PRIORITY: ALPHA]',
    '[04:22:20] OVERRIDE PROTOCOL: ACTIVE',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] PACKET RECEIVED FROM SECTOR ${Math.floor(Math.random() * 9)}G`,
        `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] SIGNAL STRENGTH NOMINAL [98.2%]`,
        `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] HEARTBEAT DETECTED IN GRID ${Math.floor(Math.random() * 50)}`,
        `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] BUFFERING TACTICAL OVERLAY...`,
      ];
      setLogs(prev => [...prev.slice(-4), newLogs[Math.floor(Math.random() * newLogs.length)]]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full glass-panel border-x-0 border-b-0 flex items-center px-6 gap-8">
      {/* Live HUD Data */}
      <div className="flex items-center gap-12 border-r border-primary/20 pr-12 h-full">
        <DataIndicator icon={<Cloud className="w-4 h-4" />} label="Weather" value="Storm / High Visibility" />
        <DataIndicator icon={<Thermometer className="w-4 h-4" />} label="Terrain" value="Mountainous / Frozen" />
        <DataIndicator icon={<Wifi className="w-4 h-4" />} label="Signal" value="98.2% [Secure]" />
        <DataIndicator icon={<Satellite className="w-4 h-4" />} label="Sat-Feed" value="Link Established" />
      </div>

      {/* Scrolling Terminal Output */}
      <div className="flex-1 flex items-center gap-4 overflow-hidden relative">
        <Terminal className="w-4 h-4 text-primary/60 flex-shrink-0" />
        <div className="flex gap-8 whitespace-nowrap overflow-hidden">
          {logs.map((log, i) => (
            <motion.span 
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] font-mono text-primary/60"
            >
              {log}
            </motion.span>
          ))}
        </div>
        {/* Fade gradient */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      {/* Comm Status */}
      <div className="flex items-center gap-4 bg-primary/5 px-4 h-full border-l border-primary/20">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-muted-foreground uppercase">Comms Status</span>
          <span className="text-xs font-orbitron text-primary">ENCRYPTED L5</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
      </div>
    </div>
  );
}

function DataIndicator({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary/60">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[9px] text-muted-foreground uppercase leading-none mb-1">{label}</span>
        <span className="text-[11px] font-mono font-bold text-primary/90">{value}</span>
      </div>
    </div>
  );
}
