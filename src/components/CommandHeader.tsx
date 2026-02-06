import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radio, Lock, Clock, Activity, LayoutDashboard, Database, MessageSquare, Radar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function CommandHeader() {
  const [time, setTime] = useState(new Date());
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'MEDIUM' | 'CRITICAL'>('MEDIUM');
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: 'DASHBOARD', path: '/', icon: LayoutDashboard },
    { name: 'INTEL', path: '/intel', icon: Radar },
    { name: 'LOGISTICS', path: '/logistics', icon: Database },
    { name: 'COMMMS', path: '/comms', icon: MessageSquare },
  ];

  return (
    <div className="w-full h-full glass-panel border-x-0 border-t-0 flex items-center px-8 justify-between">
      {/* Brand Section */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex flex-col group">
          <h1 className="text-2xl font-black neon-text tracking-widest leading-tight group-hover:text-primary-glow transition-colors">
            SMART-WAR
          </h1>
          <span className="text-[10px] text-primary/60 font-orbitron tracking-tighter uppercase">
            Tactical Command Interface // v4.0.1
          </span>
        </Link>
        
        <div className="h-10 w-[1px] bg-primary/20 mx-2" />
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-all relative group ${
                location.pathname === item.path 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <item.icon className={`w-3.5 h-3.5 ${location.pathname === item.path ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] font-orbitron font-bold tracking-widest uppercase">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="header-nav-active"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Center Status Indicators */}
      <div className="hidden lg:flex items-center gap-10">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase leading-none">AI System</span>
            <span className="text-xs font-bold text-primary">ONLINE</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${threatLevel === 'CRITICAL' ? 'text-red-glow animate-bounce' : 'text-primary'}`} />
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase leading-none">Threat Level</span>
            <span className={`text-xs font-bold ${
              threatLevel === 'CRITICAL' ? 'text-red-glow' : 
              threatLevel === 'MEDIUM' ? 'text-amber-glow' : 'text-green-glow'
            }`}>
              {threatLevel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase leading-none">Secure Link</span>
            <span className="text-xs font-bold text-primary">ENCRYPTED</span>
          </div>
        </div>
      </div>

      {/* Time & Terminal Section */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 font-mono">
          <Clock className="w-4 h-4 text-primary/60" />
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold tracking-widest">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <span className="text-[9px] text-muted-foreground">
              {time.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-sm">
          <Radio className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-mono text-primary/80 uppercase">Node-07 Active</span>
        </div>
      </div>
    </div>
  );
}
