import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Target, Radar } from 'lucide-react';

export function ThreatAnalysis() {
  const threats = [
    { id: 1, type: 'CRITICAL', msg: 'Enemy movement detected - Sector 7G', time: '04:22:10' },
    { id: 2, type: 'WARNING', msg: 'Unusual activity pattern identified', time: '04:22:05' },
    { id: 3, type: 'INFO', msg: 'Satellite link re-established', time: '04:21:55' },
    { id: 4, type: 'WARNING', msg: 'Thermal signature surge in Grid 4', time: '04:21:40' },
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Risk Meter Section */}
      <div className="glass-panel p-6 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2">
            <Radar className="w-4 h-4" />
            Threat Matrix
          </h3>
          <span className="text-[10px] text-muted-foreground font-mono">ID: T-800-AI</span>
        </div>
        
        <div className="relative w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border-2 border-primary/40 rounded-full radar-sweep" />
          <div className="text-center">
            <span className="text-4xl font-black text-red-glow">78%</span>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Conflict Prob</div>
          </div>
        </div>
        
        <div className="w-full mt-6 space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[10px] text-muted-foreground uppercase">Engagement ETA</span>
            <span className="text-sm font-orbitron text-primary">00:12:45</span>
          </div>
          <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Threat Detection Feed */}
      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-primary/20 flex items-center justify-between bg-primary/5">
          <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Detection Feed
          </h3>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-glow animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono">
          {threats.map((threat) => (
            <motion.div 
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold ${
                  threat.type === 'CRITICAL' ? 'bg-red-glow/20 text-red-glow' : 
                  threat.type === 'WARNING' ? 'bg-amber-glow/20 text-amber-glow' : 'bg-primary/20 text-primary'
                }`}>
                  {threat.type}
                </span>
                <span className="text-[9px] text-muted-foreground">[{threat.time}]</span>
              </div>
              <p className="text-xs text-primary/90 leading-relaxed group-hover:text-primary transition-colors">
                {threat.msg}
              </p>
              <div className="h-[1px] w-full bg-primary/10 mt-3" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Intelligence Brief */}
      <div className="glass-panel p-4 bg-blue-glow/5 border-secondary/30">
        <h3 className="text-xs font-orbitron text-secondary/80 uppercase tracking-widest flex items-center gap-2 mb-3">
          <Target className="w-4 h-4" />
          Tactical Insights
        </h3>
        <p className="text-[11px] leading-relaxed text-secondary/80 font-medium">
          Pattern analysis suggests decentralized regrouping in Sector 4. Recommend immediate UAV reconnaissance to confirm thermal spikes.
        </p>
      </div>
    </div>
  );
}
