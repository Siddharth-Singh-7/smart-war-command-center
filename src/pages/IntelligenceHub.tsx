import React from 'react';
import { motion } from 'framer-motion';
import { Radar, Shield, Target, Zap, AlertCircle, Search, Crosshair, Globe } from 'lucide-react';

export default function IntelligenceHub() {
  const signalData = Array.from({ length: 40 }).map((_, i) => Math.random() * 100);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-12 gap-6">
        {/* Deep Scan Visualizer */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Radar className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-orbitron tracking-tighter text-primary">DEEP SCAN: SECTOR 7G</h2>
                <p className="text-xs text-muted-foreground font-mono">ENCRYPTED SIGNAL ANALYSIS // FREQ: 4.2GHz</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase">Signal Strength</p>
                <p className="text-sm font-bold font-mono text-primary">94.2%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase">Noise Floor</p>
                <p className="text-sm font-bold font-mono text-amber-glow">-114dBm</p>
              </div>
            </div>
          </div>

          <div className="h-64 w-full flex items-end gap-1 px-2 border-b border-primary/20 relative">
            {signalData.map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.02, repeat: Infinity, repeatType: "reverse" }}
                className="flex-1 bg-gradient-to-t from-primary/40 to-primary rounded-t-sm"
              />
            ))}
            {/* Grid overlay */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
              <div className="border border-primary/5" />
              <div className="border border-primary/5" />
              <div className="border border-primary/5" />
              <div className="border border-primary/5" />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[
              { label: 'Thermal', value: 'High', color: 'text-red-glow' },
              { label: 'EM Signature', value: 'Pulsing', color: 'text-primary' },
              { label: 'Biological', value: 'Negative', color: 'text-green-glow' },
              { label: 'Structure', value: 'Reinforced', color: 'text-amber-glow' },
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-primary/5 border border-primary/10 rounded-sm">
                <p className="text-[10px] text-muted-foreground uppercase mb-1">{stat.label}</p>
                <p className={`text-sm font-bold font-orbitron ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Threat Matrix */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Globe className="w-4 h-4" />
              Global Vulnerability
            </h3>
            <div className="space-y-6">
              {[
                { zone: 'EURO-CORE', risk: 12, status: 'STABLE' },
                { zone: 'ASIA-PAC', risk: 45, status: 'MONITOR' },
                { zone: 'AMERI-SEC', risk: 89, status: 'CRITICAL' },
              ].map((zone, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-mono text-primary/80">{zone.zone}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold ${
                      zone.status === 'CRITICAL' ? 'bg-red-glow/20 text-red-glow' : 
                      zone.status === 'MONITOR' ? 'bg-amber-glow/20 text-amber-glow' : 'bg-green-glow/20 text-green-glow'
                    }`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.risk}%` }}
                      className={`h-full ${zone.risk > 70 ? 'bg-red-glow' : zone.risk > 30 ? 'bg-amber-glow' : 'bg-green-glow'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 bg-red-glow/5 border-red-glow/30">
            <h3 className="text-xs font-orbitron text-red-glow uppercase tracking-widest flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 animate-bounce" />
              Immediate Priority
            </h3>
            <p className="text-sm text-red-glow/90 font-mono leading-relaxed">
              &gt; UNKNOWN UPLOAD DETECTED FROM NODE-22<br/>
              &gt; SOURCE: BLACK-LEVEL CLEARANCE<br/>
              &gt; ACTION: ISOLATE & DECRYPT
            </p>
            <button className="w-full mt-4 py-2 bg-red-glow/20 border border-red-glow/40 text-red-glow text-[10px] font-bold uppercase tracking-tighter hover:bg-red-glow/30 transition-colors">
              Initiate Counter-Measures
            </button>
          </div>
        </div>
      </div>

      {/* Intelligence Feed Section */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-12 glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2">
              <Search className="w-4 h-4" />
              Target Acquisition History
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary/60 font-mono">LIVE FEED ACTIVE</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="border-b border-primary/20 text-[10px] text-muted-foreground uppercase">
                  <th className="pb-3 pl-2">Designation</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Last Seen</th>
                  <th className="pb-3">Threat LVL</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {[
                  { id: 'TGT-001', type: 'Armored Div', loc: '45.2N, 12.8E', last: '2m ago', threat: 'ALPHA' },
                  { id: 'TGT-042', type: 'SAM Battery', loc: '46.1N, 13.5E', last: '15m ago', threat: 'BETA' },
                  { id: 'TGT-089', type: 'Comm Tower', loc: '44.8N, 14.2E', last: '1h ago', threat: 'GAMMA' },
                  { id: 'TGT-112', type: 'Supply Line', loc: '45.7N, 11.9E', last: '3h ago', threat: 'BETA' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-primary/5 hover:bg-primary/5 transition-colors group">
                    <td className="py-4 pl-2 font-bold text-primary">{row.id}</td>
                    <td className="py-4 text-muted-foreground">{row.type}</td>
                    <td className="py-4 font-mono">{row.loc}</td>
                    <td className="py-4 text-muted-foreground">{row.last}</td>
                    <td className="py-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold ${
                        row.threat === 'ALPHA' ? 'bg-red-glow/20 text-red-glow' : 
                        row.threat === 'BETA' ? 'bg-amber-glow/20 text-amber-glow' : 'bg-primary/20 text-primary'
                      }`}>
                        {row.threat}
                      </span>
                    </td>
                    <td className="py-4 pr-2 text-right">
                      <button className="p-1 hover:text-primary transition-colors">
                        <Crosshair className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
