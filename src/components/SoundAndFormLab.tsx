import React, { useState } from 'react';
import { audioSynth } from '../utils/audioSynthesizer';
import { Play, Square, Music, Volume2, Sparkles, Layers, Sliders, Info } from 'lucide-react';

export const SoundAndFormLab: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [sonataStage, setSonataStage] = useState<'expo' | 'durch' | 'rep' | 'coda'>('expo');
  const [twelveToneMode, setTwelveToneMode] = useState<'original' | 'retrograde' | 'inversion' | 'retrogradeInversion'>('original');

  const handlePlaySound = (soundId: string, playFn: (onEnd: () => void) => void) => {
    if (activeSoundId === soundId) {
      audioSynth.stopAll();
      setActiveSoundId(null);
      return;
    }

    setActiveSoundId(soundId);
    playFn(() => setActiveSoundId(null));
  };

  const soundDemos = [
    {
      id: 'gregorian',
      title: 'Gregorianischer Choral',
      epoch: 'Mittelalter',
      subtitle: 'Modaler Dorischer Gesang & Vokalresonanz',
      description: 'Einstimmige, fließende liturgische Melodielinie in dorischer Kirchentonart (D-E-F-G-A-B-C-D) mit Hallraum-Akustik.',
      action: (onEnd: () => void) => audioSynth.playGregorianChant(onEnd),
    },
    {
      id: 'renaissance',
      title: 'Franko-flämische Vokalpolyphonie',
      epoch: 'Renaissance',
      subtitle: '4-stimmige Imitation & Clausula formalis',
      description: 'Gestaffelte Themeneinsätze durch 4 Stimmen, Terzkonsonanzen und Schlussharmonisierung mit picardischer Terz.',
      action: (onEnd: () => void) => audioSynth.playRenaissancePolyphony(onEnd),
    },
    {
      id: 'baroque',
      title: 'Basso Continuo & Quintfallsequenz',
      epoch: 'Barock',
      subtitle: 'Cembalo-Klangfarbe & Cello-Bassfundament',
      description: 'Die Quintfallkette (Am-Dm-G-C-F-Bdim-E7-Am) als wichtigstes harmonisches Antriebsmodell des Generalbasszeitalters.',
      action: (onEnd: () => void) => audioSynth.playBaroqueContinuo(onEnd),
    },
    {
      id: 'classic',
      title: 'Klassisches Sonatenthema',
      epoch: 'Wiener Klassik',
      subtitle: 'Periodischer 8-Takt-Bau & Alberti-Bass',
      description: 'Mozart-Stil (KV 545): Klare Gliederung in Vordersatz (Halbschluss) und Nachsatz (Ganzschluss) über gebrochenen Alberti-Dreiklängen.',
      action: (onEnd: () => void) => audioSynth.playClassicalSonata(onEnd),
    },
    {
      id: 'romantic',
      title: 'Der Tristan-Akkord (Wagner)',
      epoch: 'Romantik',
      subtitle: 'F – H – D# – G# mit chromatischer Seufzerauflösung',
      description: 'Der berühmteste Vierklang der Musikgeschichte: Sehrende Chromatik und schwebende Tonalität, die zur Dominante E7 auflöst.',
      action: (onEnd: () => void) => audioSynth.playRomanticTristan(onEnd),
    },
    {
      id: 'modern',
      title: 'Zwölftonreihe (Dodekaphonie)',
      epoch: 'Moderne',
      subtitle: 'Arnold Schönberg: 12 Halbtöne ohne tonales Zentrum',
      description: 'Alle 12 Halbtöne gleichberechtigt in einer festen Intervallfolge; abspielbar als Grundgestalt, Krebs, Umkehrung oder Krebsumkehrung.',
      action: (onEnd: () => void) => audioSynth.playTwelveToneRow(twelveToneMode, onEnd),
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
            <Music className="w-3.5 h-3.5" />
            <span>Akustische & Analytische Praxis</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold tracking-tight">
            Interaktives Klang- & Formlabor
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Höre die stilistischen Erkennungsmerkmale aller Epochen über die Web Audio API Synthesizer-Engine und analysiere architektonische Meisterformen wie die Sonatenhauptsatzform und die Zwölftonmatrix interaktiv.
          </p>
        </div>
      </div>

      {/* Section 1: Historical Sound Demos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <span>Epochen-Hörbeispiele (Web Audio Synthese)</span>
          </h2>
          {activeSoundId && (
            <button
              onClick={() => {
                audioSynth.stopAll();
                setActiveSoundId(null);
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Wiedergabe beenden</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {soundDemos.map((demo) => {
            const isPlaying = activeSoundId === demo.id;
            return (
              <div
                key={demo.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isPlaying
                    ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500 shadow-lg'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-750 hover:bg-stone-850/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                    {demo.epoch}
                  </span>
                  {isPlaying && (
                    <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Wiedergabe aktiv
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-100">{demo.title}</h3>
                <div className="text-xs text-amber-300/80 font-medium mt-0.5">{demo.subtitle}</div>
                <p className="mt-2 text-xs text-stone-400 leading-relaxed">{demo.description}</p>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => handlePlaySound(demo.id, demo.action)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium text-xs transition-all shadow-sm ${
                      isPlaying
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-stone-800 hover:bg-stone-750 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stopp</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Klangbeispiel hören</span>
                      </>
                    )}
                  </button>

                  <span className="text-[10px] text-stone-500 font-mono">Synthesizer API</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Interactive Sonata Form Visualizer */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs uppercase font-mono font-semibold text-rose-400">
            Formenlehre-Labor (Klassik & Romantik)
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
            Architektur der Sonatenhauptsatzform
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
            Die Sonatenhauptsatzform ist kein statisches Schema, sondern ein hochdramatisches Spannungsmodell aus These, Antithese, Konflikt und Versöhnung. Klicke auf die Formteile für die werkanalytische Detailansicht.
          </p>
        </div>

        {/* Stage Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setSonataStage('expo')}
            className={`p-3 rounded-xl border text-left transition-all ${
              sonataStage === 'expo'
                ? 'bg-rose-950/40 border-rose-500/80 text-rose-200 ring-1 ring-rose-500'
                : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="text-[10px] font-mono">Teil 1</div>
            <div className="font-serif text-sm font-bold">1. Exposition</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Konflikt-Etablierung</div>
          </button>

          <button
            onClick={() => setSonataStage('durch')}
            className={`p-3 rounded-xl border text-left transition-all ${
              sonataStage === 'durch'
                ? 'bg-amber-950/40 border-amber-500/80 text-amber-200 ring-1 ring-amber-500'
                : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="text-[10px] font-mono">Teil 2</div>
            <div className="font-serif text-sm font-bold">2. Durchführung</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Motivische Zuspitzung</div>
          </button>

          <button
            onClick={() => setSonataStage('rep')}
            className={`p-3 rounded-xl border text-left transition-all ${
              sonataStage === 'rep'
                ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 ring-1 ring-emerald-500'
                : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="text-[10px] font-mono">Teil 3</div>
            <div className="font-serif text-sm font-bold">3. Reprise</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Tonale Versöhnung</div>
          </button>

          <button
            onClick={() => setSonataStage('coda')}
            className={`p-3 rounded-xl border text-left transition-all ${
              sonataStage === 'coda'
                ? 'bg-indigo-950/40 border-indigo-500/80 text-indigo-200 ring-1 ring-indigo-500'
                : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="text-[10px] font-mono">Epilog</div>
            <div className="font-serif text-sm font-bold">4. Coda</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Schluss-Bekräftigung</div>
          </button>
        </div>

        {/* Diagram details box */}
        <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
          {sonataStage === 'expo' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif text-lg font-bold text-rose-300">
                  Die Exposition (Vorstellung der beiden Themengruppen)
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 font-mono">
                  Wird in der Klassik meist wiederholt
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">1. Hauptthema (HT)</div>
                  <div className="text-emerald-400 font-mono mb-2">Tonart: Tonika (T)</div>
                  <p className="text-stone-400 leading-relaxed">
                    Markant, rhythmisch prägnant, oft Fanfaren- oder Dreiklangscharakter. Setzt das tonale Fundament.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">2. Überleitung (ÜL)</div>
                  <div className="text-amber-400 font-mono mb-2">Modulation</div>
                  <p className="text-stone-400 leading-relaxed">
                    Dynamischer Umbruch. Verlässt die Tonika und moduliert zielsicher zur Dominante (bei Dur) bzw. Paralleldur (bei Moll).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">3. Seitenthema (ST)</div>
                  <div className="text-rose-400 font-mono mb-2">Tonart: Dominante (D)</div>
                  <p className="text-stone-400 leading-relaxed">
                    Kontrastierender Charakter: Meist lyrisch, sanglich, weicher gefärbt. Steht in tonaler Opposition zum Hauptthema!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">4. Schlussgruppe (SG)</div>
                  <div className="text-rose-400 font-mono mb-2">Bestätigung der D</div>
                  <p className="text-stone-400 leading-relaxed">
                    Kadenzierende Bekräftigung der neuen Tonart mit Vorhaltsbildungen und Tutti-Akkordschlägen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {sonataStage === 'durch' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif text-lg font-bold text-amber-300">
                  Die Durchführung (Das thematische Schlachtfeld)
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 font-mono">
                  Höchste harmonische Instabilität
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Hier werden die Motive der Exposition zerlegt, kombiniert, sequenziert und durch entlegene Tonarten geführt. Keine feste Satzform vorgeschrieben – Beethoven nutzt hier oft kontrapunktische Engführungen, dramatische Steigerungswellen und scheinbare Auflösungen, bis auf einem dominanten Orgelpunkt die Rückleitung zur Reprise erzwungen wird.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-amber-200 mb-1">Motivische Abspaltung</div>
                  <p className="text-stone-400">Verarbeitung kleinster Partikel (z.B. nur die 3 Achtel der 5. Sinfonie).</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-amber-200 mb-1">Modulationsketten</div>
                  <p className="text-stone-400">Rasch wechselnde Tonarten erzeugen Unruhe und dramatischen Sog.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-amber-200 mb-1">Rückleitung & Orgelpunkt</div>
                  <p className="text-stone-400">Ein liegender Basston auf der Dominante staut Energie für den Wiedereintritt auf.</p>
                </div>
              </div>
            </div>
          )}

          {sonataStage === 'rep' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif text-lg font-bold text-emerald-300">
                  Die Reprise (Wiederkehr & Tonale Versöhnung)
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 font-mono">
                  Der entscheidende Unterschied zur Exposition!
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200">
                <span className="font-bold">Klausur-Kernregel:</span> In der Reprise erklingt das Seitenthema{' '}
                <span className="underline decoration-emerald-400 font-bold">NICHT</span> mehr in der Dominante, sondern in der{' '}
                <span className="underline decoration-emerald-400 font-bold">Tonika (Haupttonart)</span>! Der tonale Konflikt ist damit gelöst.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">Hauptthema (HT)</div>
                  <div className="text-emerald-400 font-mono text-[11px]">Tonika (T)</div>
                  <p className="text-stone-400 mt-1">Triumphale oder modifizierte Rückkehr des Eröffnungsthemas.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">Modifizierte Überleitung</div>
                  <div className="text-stone-400 font-mono text-[11px]">Bleibt im Tonika-Bereich</div>
                  <p className="text-stone-400 mt-1">Darf nun nicht mehr zur Dominante wegmodulieren!</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                  <div className="font-bold text-stone-200 mb-1">Seitenthema (ST)</div>
                  <div className="text-emerald-400 font-mono text-[11px]">Tonika (T)</div>
                  <p className="text-stone-400 mt-1">Das ehemals fremde Thema ordnet sich der Heimattonart unter.</p>
                </div>
              </div>
            </div>
          )}

          {sonataStage === 'coda' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif text-lg font-bold text-indigo-300">
                  Die Coda (Schlussabschnitt / Zweite Durchführung)
                </h3>
                <span className="text-xs px-2.5 py-1 rounded bg-stone-800 text-stone-300 font-mono">
                  Von Beethoven zur Großform erhoben
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Ursprünglich bei Haydn und Mozart ein kurzer bestätigender Kehraus, wird die Coda bei Ludwig van Beethoven oft zu einer eigenständigen "zweiten Durchführung", die dem Satz monumentales Gewicht und finale Katharsis verleiht (z.B. in der Eroica oder der 5. Sinfonie).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Arnold Schönberg 12-Tone Matrix Generator */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-mono font-semibold text-cyan-400">
              Moderne & Dodekaphonie-Labor
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
              Arnold Schönbergs Zwölfton-Reihenrechner
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Erlebe die 4 Modi einer Zwölftonreihe: Grundgestalt, Krebs, Umkehrung und Krebsumkehrung.
            </p>
          </div>

          <button
            onClick={() => {
              if (activeSoundId === 'twelve-synth') {
                audioSynth.stopAll();
                setActiveSoundId(null);
              } else {
                setActiveSoundId('twelve-synth');
                audioSynth.playTwelveToneRow(twelveToneMode, () => setActiveSoundId(null));
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
              activeSoundId === 'twelve-synth'
                ? 'bg-cyan-500 text-stone-950 animate-pulse'
                : 'bg-cyan-900/40 text-cyan-200 border border-cyan-600/40 hover:bg-cyan-900/60'
            }`}
          >
            {activeSoundId === 'twelve-synth' ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Reihe stoppen</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Aktive Reihe abspielen</span>
              </>
            )}
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'original', name: 'Grundgestalt (O)', desc: 'Originalreihe wie komponiert' },
            { id: 'retrograde', name: 'Krebs (R)', desc: 'Reihe rückwärts von hinten nach vorn' },
            { id: 'inversion', name: 'Umkehrung (I)', desc: 'Intervallspiegelung (steigend ↔ fallend)' },
            { id: 'retrogradeInversion', name: 'Krebsumkehrung (RI)', desc: 'Umkehrung rückwärts gelesen' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setTwelveToneMode(mode.id as any);
                if (activeSoundId === 'twelve-synth') {
                  audioSynth.stopAll();
                  setActiveSoundId(null);
                }
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                twelveToneMode === mode.id
                  ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500'
                  : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="font-serif text-sm font-bold">{mode.name}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{mode.desc}</div>
            </button>
          ))}
        </div>

        {/* Interactive Piano Keys / Pitch Display */}
        <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <div className="text-xs text-stone-400 font-mono">
            Tonabfolge der aktiven Zwölftonreihe (alle 12 Halbtöne ohne Wiederholung):
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {(twelveToneMode === 'original'
              ? ['C', 'C#', 'E', 'D#', 'G', 'F#', 'F', 'A', 'Ab', 'Bb', 'B', 'D']
              : twelveToneMode === 'retrograde'
              ? ['D', 'B', 'Bb', 'Ab', 'A', 'F', 'F#', 'G', 'D#', 'E', 'C#', 'C']
              : twelveToneMode === 'inversion'
              ? ['C', 'B', 'Ab', 'A', 'F', 'F#', 'G', 'Eb', 'E', 'D', 'C#', 'Bb']
              : ['Bb', 'C#', 'D', 'E', 'Eb', 'G', 'F#', 'F', 'A', 'Ab', 'B', 'C']
            ).map((tone, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-center flex flex-col items-center justify-center hover:border-cyan-500 transition-colors"
              >
                <span className="text-[10px] text-stone-500 font-mono">{idx + 1}</span>
                <span className="font-serif font-bold text-sm text-cyan-300 mt-0.5">{tone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
