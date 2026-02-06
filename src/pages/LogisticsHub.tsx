import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Users, Activity, Battery, Zap, Database, ArrowRight } from 'lucide-react';

export default function LogisticsHub() {
  const assets = [
    { name: 'UAV RECON-01', status: 'ACTIVE', health: 94, battery: 78 },
    { name: 'ARMOR DIV-A', status: 'STAGING', health: 100, battery: 100 },
    { name: 'SUPPLY TRUCK-4', status: 'IN TRANSIT', health: 82, battery: 45 },
    { name: 'DRONE SWARM-X', status: 'CHARGING', health: 100, battery: 12 },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-12 gap-6">
        {/* Resource Allocation Chart */}
        <div className="col-span-12 lg:col-span-7 glass-panel p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-orbitron tracking-tighter text-primary">RESOURCE DISTRIBUTION</h2>
                <p className="text-xs text-muted-foreground font-mono">GLOBAL SUPPLY NETWORK // V-99</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase border border-primary/20 px-3 py-1.5 rounded-sm hover:bg-primary/10 transition-colors">
              Request Refill <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            {[
              { label: 'ENERGY GRID', value: '88%', sub: 'Node-A Optimized', icon: Zap },
              { label: 'AMMO RESERVE', value: '42%', sub: 'Critical Level', icon: Battery, critical: true },
              { label: 'PERSONNEL', value: '1,204', sub: '92% Active Duty', icon: Users },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className={`w-4 h-4 ${item.critical ? 'text-red-glow animate-pulse' : 'text-primary'}`} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                </div>
                <div className={`text-3xl font-black font-orbitron ${item.critical ? 'text-red-glow' : 'text-primary'}`}>
                  {item.value}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="h-32 w-full flex items-center gap-2 px-2">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0.1 }}
                animate={{ scaleY: [0.1, Math.random() + 0.5, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                className={`flex-1 rounded-sm ${i > 16 ? 'bg-red-glow/40' : i > 12 ? 'bg-amber-glow/40' : 'bg-primary/40'}`}
                style={{ height: '100%', originY: 1 }}
              />
            ))}
          </div>
        </div>

        {/* Live Asset Status */}
        <div className="col-span-12 lg:col-span-5 glass-panel p-6">
          <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2 mb-6">
            <Truck className="w-4 h-4" />
            Asset Operational Status
          </h3>
          
          <div className="space-y-4">
            {assets.map((asset, i) => (
              <div key={i} className="p-4 bg-primary/5 border border-primary/10 rounded-sm group hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 rounded-sm">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary/90">{asset.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{asset.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase">Health</p>
                    <p className={`text-sm font-bold font-mono ${asset.health < 90 ? 'text-amber-glow' : 'text-primary'}`}>
                      {asset.health}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${asset.battery}%` }}
                      className={`h-full ${asset.battery < 20 ? 'bg-red-glow' : asset.battery < 50 ? 'bg-amber-glow' : 'bg-primary'}`}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground w-8">{asset.battery}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment Map Simulation Overlay */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        <div className="col-span-12 glass-panel p-6 relative overflow-hidden h-[300px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-20" />
            <div className="grid grid-cols-20 grid-rows-20 w-full h-full border border-primary/5">
              {[...Array(400)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-primary/10" />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-orbitron text-primary/80 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Supply Line Monitoring
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-mono text-primary/60">
                <span>LAT: 45.283N</span>
                <span>LON: 12.842E</span>
              </div>
            </div>
            
            <div className="flex-1 border border-primary/20 rounded-sm bg-primary/5 p-4 relative">
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full animate-ping" />
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-glow rounded-full animate-ping" />
              <svg className="absolute inset-0 w-full h-full opacity-30">
                <motion.path
                  d="M 100 150 Q 300 50 500 150 T 900 150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[10px] font-mono text-primary/40 uppercase tracking-[1em]">Tactical Supply Overlay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
