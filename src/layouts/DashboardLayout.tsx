import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { StatusBar } from './StatusBar';

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Navigation Sidebar */}
      <Sidebar />
      
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Bar */}
        <TopBar />
        
        {/* Dashboard Pages */}
        <main className="flex-1 overflow-y-auto bg-muted/20">
          {children}
        </main>
        
        {/* Telemetry Status Bar */}
        <StatusBar />
      </div>
    </div>
  );
}
