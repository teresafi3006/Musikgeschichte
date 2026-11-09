import React, { useState } from 'react';
import { EPOCHS, COMPOSERS, Epoch, Composer } from '../data/musicHistoryData';
import { audioSynth } from '../utils/audioSynthesizer';
import { Play, Square, Calendar, User, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { TabType } from './Navbar';

interface InteractiveTimelineProps {
  onAnimateComposer: (composer: Composer) => void;
  setActiveTab: (tab: TabType) => void;
}

interface HistoricalMilestone {
  year: string;
  epochId: string;
  title: string;
  significance: string;
}

const MILESTONES: HistoricalMilestone[] = [
  { year: 'ca. 600', epochId: 'mittelalter', title: 'Kodifizierung des Gregorianischen Chorals', significance: 'Papst Gregor I. ordnet die liturgischen Gesänge der abendländischen Kirche.' },
  { year: 'ca. 1025', epochId: 'mittelalter', title: 'Guido von Arezzo: Notenlinien & Solmisation', significance: 'Erfindung des 4-Linien-Systems im Terzabstand und der Tonsilben Ut-Re-Mi-Fa-Sol-La.' },
  { year: '1198', epochId: 'mittelalter', title: 'Notre-Dame-Schule: Vierstimmiges Organum', significance: 'Perotin komponiert "Viderunt omnes" – früheste monumentale 4-stimmige Mehrstimmigkeit.' },
  { year: '1365', epochId: 'mittelalter', title: 'Machauts Messe de Nostre Dame', significance: 'Erste vollständige vierstimmige Messe eines einzelnen Autors in isorhythmischer Satztechnik.' },
  { year: '1501', epochId: 'renaissance', title: 'Ottaviano Petrucci: Erster Notendruck', significance: 'In Venedig wird der Notendruck mit beweglichen Lettern erfunden (Harmonice Musices Odhecaton).' },
  { year: '1562', epochId: 'renaissance', title: 'Tridentinisches Konzil & Palestrina', significance: 'Das Konzil verlangt Textverständlichkeit; Palestrinas Missa Papae Marcelli setzt den Maßstab.' },
  { year: '1600 / 1607', epochId: 'barock', title: 'Geburt der Oper & Monteverdis L’Orfeo', significance: 'Die Florentiner Camerata begründet die Monodie; Monteverdi vollendet die Gattung Oper in Mantua.' },
  { year: '1722', epochId: 'barock', title: 'Bachs Wohltemperiertes Klavier (Teil I)', significance: 'Präludien und Fugen durch alle 24 Dur- und Molltonarten beweisen die wohltemperierte Stimmung.' },
  { year: '1781', epochId: 'klassik', title: 'Haydns Streichquartette op. 33', significance: 'Begründung der klassischen thematisch-motivischen Arbeit "auf eine ganz neue, besondere Art".' },
  { year: '1804', epochId: 'klassik', title: 'Beethovens Sinfonie Nr. 3 "Eroica"', significance: 'Sprengung der klassischen Formdimensionen zugunsten einer heroisch-dramatischen Entwicklung.' },
  { year: '1824', epochId: 'klassik', title: 'Beethovens 9. Sinfonie mit Chor', significance: 'Erstmals wird die menschliche Stimme (Schillers "Ode an die Freude") in eine Sinfonie integriert.' },
  { year: '1859', epochId: 'romantik', title: 'Wagners Tristan und Isolde (Tristan-Akkord)', significance: 'Der mysteriöse chromatische Akkord F-H-D#-G# leitet die Auflösung der funktionalen Tonalität ein.' },
  { year: '1876', epochId: 'romantik', title: 'Eröffnung des Bayreuther Festspielhauses', significance: 'Uraufführung des gesamten Rings des Nibelungen im visionären Orchestergraben-Theater.' },
  { year: '1913', epochId: 'moderne', title: 'Strawinskys "Le Sacre du Printemps" Skandal', significance: 'Archaische Rhythmen und bitonale Akkordballungen lösen in Paris einen historischen Theaterskandal aus.' },
  { year: '1923', epochId: 'moderne', title: 'Schönbergs Dodekaphonie (Zwölftonmethode)', significance: 'Komposition mit zwölf nur aufeinander bezogenen Tönen hebt das tonale Gravitationszentrum auf.' },
];

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  onAnimateComposer,
  setActiveTab,
}) => {
  const [activeEpochId, setActiveEpochId] = useState<string>('barock');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const activeEpoch = EPOCHS.find((e) => e.id === activeEpochId) || EPOCHS[2];
  const activeComposers = COMPOSERS.filter((c) => c.epochId === activeEpoch.id);
  const activeMilestones = MILESTONES.filter((m) => m.epochId === activeEpoch.id);

  const handleToggleAudio = (audioId: Epoch['audioId']) => {
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
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Historische Gesamtschau</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold tracking-tight">
            Interaktive Zeitleiste der europäischen Musikgeschichte
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Navigiere durch die Epochen und Zäsuren: Von den frühmittelalterlichen Neumen über die polyphone Renaissance, die barocke Pracht, die Aufklärung der Klassik, die Romantik bis zu den Klangwelten der Moderne.
          </p>
        </div>

        {/* Visual Epoch Scrubber Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800">
          <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
            Klicke auf eine Epoche in der Zeitleiste
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {EPOCHS.map((epoch, idx) => {
              const isSelected = epoch.id === activeEpochId;
              return (
                <button
                  key={epoch.id}
                  onClick={() => setActiveEpochId(epoch.id)}
                  className={`relative p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500/80 ring-2 ring-amber-500/40 shadow-lg'
                      : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-850'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                    <span className="font-mono">0{idx + 1}</span>
                    <span className="font-mono">{epoch.period.replace('ca. ', '')}</span>
                  </div>
                  <div className={`font-serif text-sm font-bold truncate ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                    {epoch.name}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">{epoch.centuryRange}</div>

                  {isSelected && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rotate-45 rounded-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deep Details Drawer for Active Epoch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Milestones, and Style */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-7 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono font-medium ${activeEpoch.color.badge} border mb-2`}>
                  {activeEpoch.period} · {activeEpoch.centuryRange}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">{activeEpoch.name}</h2>
                <p className="text-amber-400 font-serif italic text-sm mt-1">{activeEpoch.tagline}</p>
              </div>

              {/* Synthesized Audio Trigger */}
              <button
                onClick={() => handleToggleAudio(activeEpoch.audioId)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md ${
                  playingAudioId === activeEpoch.audioId
                    ? 'bg-amber-600 text-stone-950 animate-pulse'
                    : 'bg-stone-800 hover:bg-stone-750 text-amber-200 border border-amber-600/30'
                }`}
              >
                {playingAudioId === activeEpoch.audioId ? (
                  <>
                    <Square className="w-4 h-4 fill-current" />
                    <span>Hörbeispiel stoppen</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-amber-400" />
                    <span>Stil-Klangprobe abspielen</span>
                  </>
                )}
              </button>
            </div>

            {/* Context & Description */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                Geistige & gesellschaftliche Hintergründe
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed bg-stone-950/40 p-4 rounded-xl border border-stone-800/80">
                {activeEpoch.philosophicalContext}
              </p>
            </div>

            {/* Historical Milestones */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Bedeutende Zäsuren & Ereignisse der Epoche</span>
              </h3>
              <div className="space-y-3">
                {activeMilestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-850/60 border border-stone-800">
                    <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 shrink-0">
                      {m.year}
                    </span>
                    <div>
                      <div className="font-serif text-sm font-bold text-stone-200">{m.title}</div>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{m.significance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Musical Developments */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                Prägende Form- & Satztechniken
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeEpoch.musicalForms.map((form, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-xs text-amber-200/90">
                    {form}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Key Composers & Actions */}
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Schlüsselkomponisten der Epoche</span>
            </h3>

            <div className="space-y-3">
              {activeComposers.map((comp) => (
                <div
                  key={comp.id}
                  className="p-3.5 rounded-xl bg-stone-850/60 border border-stone-800 hover:border-stone-700 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-200">{comp.name}</h4>
                      <span className="text-xs font-mono text-stone-400">{comp.lifespan}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      {comp.nationality.split('/')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">{comp.biography}</p>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-amber-300/80 truncate max-w-[180px]">{comp.keyWorks[0]}</span>
                    <button
                      onClick={() => onAnimateComposer(comp)}
                      title="Porträt mit KI als Video animieren"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300"
                    >
                      <span>Animieren</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick jump to Quiz or Glossary */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-serif font-bold text-stone-200 text-sm">Prüfungswissen festigen</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Möchtest du das Wissen über {activeEpoch.name} direkt im Quiz überprüfen oder Fachbegriffe nachschlagen?
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-3 py-2 rounded-lg bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-200 text-xs font-medium border border-indigo-700/50 transition-colors text-center"
              >
                Zum Quiz-Modul
              </button>
              <button
                onClick={() => setActiveTab('glossary' as any)}
                className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium border border-stone-700 transition-colors text-center"
              >
                Zum Fachglossar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
