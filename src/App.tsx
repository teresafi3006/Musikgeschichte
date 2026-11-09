import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { EpochsExplorer } from './components/EpochsExplorer';
import { GlossaryView } from './components/GlossaryView';
import { SoundAndFormLab } from './components/SoundAndFormLab';
import { ExamTrainer } from './components/ExamTrainer';
import { VideoAnimator } from './components/VideoAnimator';
import { ImageGenerator } from './components/ImageGenerator';
import { Composer, Epoch } from './data/musicHistoryData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const [selectedComposerForVideo, setSelectedComposerForVideo] = useState<Composer | null>(null);
  const [selectedEpochForImage, setSelectedEpochForImage] = useState<Epoch | null>(null);
  const [sharedImageUrlForVideo, setSharedImageUrlForVideo] = useState<string | null>(null);

  const handleAnimateComposer = (composer: Composer) => {
    setSelectedComposerForVideo(composer);
    setSharedImageUrlForVideo(composer.portraitPlaceholderUrl);
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateEpochScene = (epoch: Epoch) => {
    setSelectedEpochForImage(epoch);
    setActiveTab('image');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendToVideoAnimator = (imageUrl: string) => {
    setSharedImageUrlForVideo(imageUrl);
    setSelectedComposerForVideo(null);
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-stone-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'timeline' && (
          <InteractiveTimeline
            onAnimateComposer={handleAnimateComposer}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'epochs' && (
          <EpochsExplorer
            onAnimateComposer={handleAnimateComposer}
            onGenerateEpochScene={handleGenerateEpochScene}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'glossary' && <GlossaryView />}

        {activeTab === 'lab' && <SoundAndFormLab />}

        {activeTab === 'quiz' && <ExamTrainer />}

        {activeTab === 'video' && (
          <VideoAnimator
            initialComposer={selectedComposerForVideo}
            initialImageUrl={sharedImageUrlForVideo}
          />
        )}

        {activeTab === 'image' && (
          <ImageGenerator
            initialEpoch={selectedEpochForImage}
            onSendToVideoAnimator={handleSendToVideoAnimator}
          />
        )}
      </main>

      {/* Academic Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-900/60 mt-12 py-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-200">MusicaEuropa</span>
            <span>·</span>
            <span>Fachdidaktisches Portal für Studierende der Musikwissenschaft</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-400">
            <span>Quellenfundus: Dahlhaus, Eggebrecht, Grout & Palisca</span>
            <span className="hidden sm:inline">·</span>
            <span>Interactions API & Gemini Pro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
