import React, { useState } from 'react';
import { EPOCHS, COMPOSERS, Epoch, Composer } from '../data/musicHistoryData';
import { audioSynth } from '../utils/audioSynthesizer';
import { Play, Square, Music, GraduationCap, Video, Sparkles, User, Info, CheckCircle2 } from 'lucide-react';
import { TabType } from './Navbar';

interface EpochsExplorerProps {
  onAnimateComposer: (composer: Composer) => void;
  onGenerateEpochScene: (epoch: Epoch) => void;
  setActiveTab: (tab: TabType) => void;
}

export const EpochsExplorer: React.FC<EpochsExplorerProps> = ({
  onAnimateComposer,
  onGenerateEpochScene,
  setActiveTab,
}) => {
  const [selectedEpochId, setSelectedEpochId] = useState<string>('klassik');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedComposer, setSelectedComposer] = useState<Composer | null>(null);

  const currentEpoch = EPOCHS.find((e) => e.id === selectedEpochId) || EPOCHS[3];
  const epochComposers = COMPOSERS.filter((c) => c.epochId === currentEpoch.id);

  const handlePlayAudio = (audioId: Epoch['audioId']) => {
    if (playingAudioId === audioId) {
      audioSynth.stopAll();
      setPlayingAudioId(null);
      return;
    }

    setPlayingAudioId(audioId);

    const onEnd = () => setPlayingAudioId(null);

    switch (audioId) {
      case 'gregorian':
        audioSynth.playGregorianChant(onEnd);
        break;
      case 'renaissance':
        audioSynth.playRenaissancePolyphony(onEnd);
        break;
      case 'baroque':
        audioSynth.playBaroqueContinuo(onEnd);
        break;
      case 'classic':
        audioSynth.playClassicalSonata(onEnd);
        break;
      case 'romantic':
        audioSynth.playRomanticTristan(onEnd);
        break;
      case 'modern':
        audioSynth.playTwelveToneRow('original', onEnd);
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner with University Context */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
            <span>Universitäres Studienkompendium</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold tracking-tight">
            Epochen der europäischen Musikgeschichte
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Von den einstimmigen Gesängen des Gregorianischen Chorals über die Polyphonie der Renaissance und den Generalbass des Barock bis hin zur Sonatenform der Wiener Klassik, der chromatischen Romantik und den Umbrüchen der Moderne.
          </p>
        </div>

        {/* Timeline Bar Navigation */}
        <div className="mt-6 pt-6 border-t border-stone-800/80">
          <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3 flex items-center justify-between">
            <span>Epochen-Chronologie (500 – Gegenwart)</span>
            <span className="text-amber-400">Wähle eine Epoche zur Vertiefung</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {EPOCHS.map((epoch, idx) => {
              const isSelected = epoch.id === selectedEpochId;
              return (
                <button
                  key={epoch.id}
                  onClick={() => {
                    setSelectedEpochId(epoch.id);
                    setSelectedComposer(null);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-stone-850/60 border-stone-800 hover:border-stone-700 hover:bg-stone-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span>0{idx + 1}</span>
                    <span className="font-mono text-[10px]">{epoch.period.replace('ca. ', '')}</span>
                  </div>
                  <div className={`font-serif text-sm font-semibold truncate ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                    {epoch.name}
                  </div>
                  <div className="text-[10px] text-stone-400 truncate mt-0.5">{epoch.centuryRange}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Epoch Main View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Epoch Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono font-medium ${currentEpoch.color.badge} border mb-2`}>
                  {currentEpoch.period} · {currentEpoch.centuryRange}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">{currentEpoch.name}</h2>
                <p className="text-amber-400/90 font-serif italic text-sm mt-1">{currentEpoch.tagline}</p>
              </div>

              {/* Epoch Audio Player Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayAudio(currentEpoch.audioId)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-md ${
                    playingAudioId === currentEpoch.audioId
                      ? 'bg-amber-600 text-stone-950 animate-pulse'
                      : 'bg-stone-800 hover:bg-stone-750 text-amber-200 border border-amber-600/30'
                  }`}
                >
                  {playingAudioId === currentEpoch.audioId ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>Hörbeispiel stoppen</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current text-amber-400" />
                      <span>Stilistisches Hörbeispiel</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onGenerateEpochScene(currentEpoch)}
                  title="Historische Szene mit KI bildlich erzeugen"
                  className="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-750 text-stone-300 hover:text-amber-300 border border-stone-750 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Historical and Philosophical Context */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Geistiger & Gesellschaftlicher Kontext</span>
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed bg-stone-950/40 p-4 rounded-xl border border-stone-800/70">
                {currentEpoch.philosophicalContext}
              </p>
            </div>

            {/* Core Characteristics */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                Wesentliche Stilmerkmale für Klausur & Analyse
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {currentEpoch.coreCharacteristics.map((charac, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{charac}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Two-column grid for Forms and Techniques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-800">
              <div className="bg-stone-950/50 p-4 rounded-xl border border-stone-800/60">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Zentrale Gattungen & Formen
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentEpoch.musicalForms.map((form, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] text-stone-300">
                      {form}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-stone-950/50 p-4 rounded-xl border border-stone-800/60">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Satztechniken & Tonsystem
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentEpoch.compositionTechniques.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] text-amber-200/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Typical Instrumentation */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                Typisches Instrumentarium & Klangapparat
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentEpoch.instrumentation.map((inst, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-stone-800/80 text-stone-300 text-xs border border-stone-700/50">
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Composers & University Spotlight */}
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>Schlüssel-Komponisten</span>
              </h3>
              <span className="text-xs text-stone-400">{epochComposers.length} Persönlichkeiten</span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Klicke auf eine Persönlichkeit für Biografie, Prüfungs-Schlagworte und zur Videobelebung des Porträts.
            </p>

            {/* Composer List */}
            <div className="space-y-3">
              {epochComposers.map((comp) => {
                const isSelected = selectedComposer?.id === comp.id;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComposer(comp)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-600/70 shadow-md'
                        : 'bg-stone-850/50 border-stone-800 hover:border-stone-700 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-serif text-sm font-bold text-stone-200">{comp.name}</div>
                        <div className="text-xs text-stone-400 font-mono mt-0.5">{comp.lifespan}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700/50">
                        {comp.nationality.split('/')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-amber-300/80 mt-1 line-clamp-1">{comp.role}</div>

                    {/* Quick action buttons if selected */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-3">
                        <p className="text-xs text-stone-300 leading-relaxed">{comp.biography}</p>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-stone-400 mb-1">Klausur-Kernwerke:</div>
                          <ul className="text-xs text-stone-300 space-y-0.5 list-disc list-inside">
                            {comp.keyWorks.map((kw, i) => (
                              <li key={i} className="truncate">{kw}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-amber-400 mb-1">Prüfungs-Schlagworte:</div>
                          <div className="flex flex-wrap gap-1">
                            {comp.examKeywords.map((kw, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded text-amber-200">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Animate Portrait CTA Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAnimateComposer(comp);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-100 font-medium text-xs shadow-md transition-all border border-amber-600/40"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Historisches Porträt zum Leben erwecken (Video)</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick jump to Quiz / Lab */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-serif font-bold text-stone-200 text-sm flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>Wissen direkt überprüfen?</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Teste dein Wissen über {currentEpoch.name} mit Prüfungsfragen oder analysiere die Sonatenform im Labor.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium border border-stone-700 transition-colors text-center"
              >
                Zum Selbsttest
              </button>
              <button
                onClick={() => setActiveTab('lab')}
                className="px-3 py-2 rounded-lg bg-amber-900/40 hover:bg-amber-900/60 text-amber-200 text-xs font-medium border border-amber-700/50 transition-colors text-center"
              >
                Zum Klanglabor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
