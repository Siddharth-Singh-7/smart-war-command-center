import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, ChevronRight, BarChart3 } from 'lucide-react';

export function DecisionSupport() {
  const actions = [
    { id: 1, title: 'Deploy Recon Drone', cost: '15%', risk: 'LOW' },
    { id: 2, title: 'Reinforce Sector 4', cost: '40%', risk: 'MEDIUM' },
    { id: 3, title: 'Initiate Defensive Formation', cost: '25%', risk: 'LOW' },
  ];

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Strategic Engine Status */}
      <div className="glass-panel p-4 flex items-center justify-between border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm border border-primary/30 flex items-center justify-center bg-primary/10">
            <Cpu className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-orbitron text-primary uppercase tracking-widest">AI Strategic Engine</h3>
            <span className="text-[10px] text-muted-foreground uppercase">Processing optimal vectors...</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-mono text-green-glow">OPTIMAL</span>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-primary/40 rounded-full" />)}
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-primary/20 flex items-center justify-between bg-primary/5">
          <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Recommended Actions
          </h3>
          <span className="text-[10px] text-muted-foreground font-mono">PRIORITY: HIGH</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {actions.map((action) => (
            <motion.button 
              key={action.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass-panel p-4 border-primary/20 hover:border-primary/60 transition-colors text-left group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-orbitron text-primary group-hover:neon-text transition-all uppercase tracking-tight">
                  {action.title}
                </span>
                <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-muted-foreground uppercase">Resources</span>
                  <span className="text-[11px] font-mono text-primary/80">{action.cost}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-muted-foreground uppercase">Risk Factor</span>
                  <span className={`text-[11px] font-mono ${
                    action.risk === 'LOW' ? 'text-green-glow' : 'text-amber-glow'
                  }`}>{action.risk}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Outcome Predictions */}
      <div className="glass-panel p-6">
        <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2 mb-6">
          <BarChart3 className="w-4 h-4" />
          Outcome Predictions
        </h3>
        
        <div className="space-y-6">
          <PredictionMeter label="Success Probability" value={92} color="var(--primary)" />
          <PredictionMeter label="Casualty Risk" value={14} color="var(--red-glow)" />
          <PredictionMeter label="Resource Efficiency" value={68} color="var(--blue-glow)" />
        </div>
      </div>
    </div>
  );
}

function PredictionMeter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
        <span className="text-sm font-orbitron" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full relative"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse-slow" />
        </motion.div>
      </div>
    </div>
  );
}
