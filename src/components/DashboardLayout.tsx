import React from 'react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  header: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  bottomBar: React.ReactNode;
  centerContent: React.ReactNode;
}

export function DashboardLayout({
  header,
  leftPanel,
  rightPanel,
  bottomBar,
  centerContent
}: DashboardLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background relative selection:bg-primary/30">
      {/* Background Scanning Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* Header Bar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-20 z-50 flex-shrink-0"
      >
        {header}
      </motion.header>

      {/* Main Tactical Area */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Analysis Panel */}
        <motion.aside 
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-[380px] h-full p-4 pr-2 flex-shrink-0"
        >
          {leftPanel}
        </motion.aside>

        {/* Center 3D Visualization Area */}
        <main className="flex-1 relative h-full flex items-center justify-center p-2">
          {centerContent}
          
          {/* HUD Overlay Corners */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-sm pointer-events-none" />
        </main>

        {/* Right Decision Panel */}
        <motion.aside 
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-[380px] h-full p-4 pl-2 flex-shrink-0"
        >
          {rightPanel}
        </motion.aside>
      </div>

      {/* Bottom Tactical Bar */}
      <motion.footer 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="h-16 z-50 flex-shrink-0"
      >
        {bottomBar}
      </motion.footer>

      {/* Gloal Scanning Line */}
      <div className="scanning-line z-50 pointer-events-none opacity-30" />
    </div>
  );
}
