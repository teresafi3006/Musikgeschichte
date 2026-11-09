import React from 'react';
import {
  Calendar,
  BookOpen,
  Library,
  Music,
  GraduationCap,
  Video,
  Sparkles,
  VolumeX,
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynthesizer';

export type TabType = 'timeline' | 'epochs' | 'glossary' | 'lab' | 'quiz' | 'video' | 'image';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'timeline' as TabType, label: 'Zeitleiste', icon: Calendar, color: 'text-amber-400' },
    { id: 'epochs' as TabType, label: 'Epochen', icon: BookOpen, color: 'text-amber-300' },
    { id: 'glossary' as TabType, label: 'Glossar', icon: Library, color: 'text-blue-400' },
    { id: 'lab' as TabType, label: 'Klanglabor', icon: Music, color: 'text-emerald-400' },
    { id: 'quiz' as TabType, label: 'Selbsttest', icon: GraduationCap, color: 'text-indigo-400' },
    { id: 'video' as TabType, label: 'Video-Labor', icon: Video, color: 'text-rose-400' },
    { id: 'image' as TabType, label: 'Bild-Atelier', icon: Sparkles, color: 'text-amber-400' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => setActiveTab('timeline')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-inner border border-amber-500/40">
              <span className="font-serif text-2xl font-bold text-amber-100">𝄞</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight text-amber-100">MusicaEuropa</span>
                <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/50">
                  Hochschulportal
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden md:block">
                Europäische Musikgeschichte & Klausurtrainer
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    isActive
                      ? 'bg-amber-950/60 text-amber-200 border border-amber-600/70 shadow-sm'
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Quick Audio Stop Button */}
            <button
              onClick={() => audioSynth.stopAll()}
              title="Alle Hörbeispiele stoppen"
              className="ml-1 p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors shrink-0"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
