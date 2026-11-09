import React, { useState, useRef } from 'react';
import { Video, Upload, Sparkles, Loader2, Play, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { Composer, COMPOSERS } from '../data/musicHistoryData';

interface VideoAnimatorProps {
  initialComposer?: Composer | null;
  initialImageUrl?: string | null;
}

export const VideoAnimator: React.FC<VideoAnimatorProps> = ({
  initialComposer,
  initialImageUrl,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialImageUrl || initialComposer?.portraitPlaceholderUrl || COMPOSERS[5].portraitPlaceholderUrl // J.S. Bach
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [motionPrompt, setMotionPrompt] = useState(
    'Der Komponist blickt aufmerksam von seinem Notenmanuskript auf, hebt die Hand und dirigiert mit sanftem, konzentriertem Kopfnicken.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const promptPresets = [
    'Der Komponist blickt aufmerksam von seinem Notenmanuskript auf, hebt die Hand und dirigiert mit sanftem Kopfnicken.',
    'Sanftes Kerzenflackern im historischen Salon; der Musiker beginnt konzentriert auf den Tasten des Instruments zu spielen.',
    'Mittelalterliches Skriptorium: Feines Licht fällt auf das Pergament, Tinte glänzt und Neumen scheinen lebendig zu werden.',
    'Ein tiefes Einatmen vor dem Einsatz des Orchesters, feine Mimik und lebendige Augenbewegung im Stil eines historischen Ölgemäldes.',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Bitte lade eine gültige Bilddatei (JPEG, PNG oder WebP) hoch.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setGeneratedVideoUrl(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateVideo = async () => {
    if (!selectedImage) {
      setErrorMsg('Bitte wähle zuerst ein Bild oder lade ein Foto hoch.');
      return;
    }

    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    setErrorMsg(null);
    setGenerationStep('Interactions API wird initialisiert (gemini-omni-1.2-flash)...');

    try {
      // Step simulator for UI feedback
      const stepTimer1 = setTimeout(() => {
        setGenerationStep('Bildanalyse & Bewegungs-Synthese mit gemini-omni-1.2-flash...');
      }, 3000);

      const stepTimer2 = setTimeout(() => {
        setGenerationStep('Generiere Videosequenz im Seitenverhältnis ' + aspectRatio + '...');
      }, 10000);

      const response = await fetch('/api/animate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          prompt: motionPrompt,
          aspectRatio: aspectRatio, // '16:9' or '9:16'
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await response.json();

      if (data.success && (data.videoUrl || data.videoUri)) {
        setGeneratedVideoUrl(data.videoUrl || data.videoUri);
        setGenerationStep('Video erfolgreich generiert!');
      } else {
        setErrorMsg(data.error || 'Fehler bei der Videogenerierung. Bitte erneut versuchen.');
      }
    } catch (err: any) {
      setErrorMsg('Netzwerk- oder Serverfehler: ' + (err.message || 'Verbindung fehlgeschlagen'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>Gemini Interactions API · gemini-omni-1.2-flash</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold tracking-tight">
            Historische Porträts & Handschriften zum Leben erwecken
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Lade ein Porträt oder Notenblatt hoch oder wähle aus historischen Meisterporträts und animiere es mit dem Videomodell <strong>gemini-omni-1.2-flash</strong> im Format <strong>16:9 (Querformat)</strong> oder <strong>9:16 (Hochformat)</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Selection & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Image Picker / Uploader */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-base font-bold text-stone-200">
                1. Porträt oder Notenhandschrift wählen
              </h2>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Eigenes Foto hochladen</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Curated Historical Presets */}
            <div>
              <div className="text-[11px] text-stone-400 font-medium mb-2">
                Oder wähle aus historischen Komponisten-Porträts:
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {COMPOSERS.slice(0, 6).map((comp) => {
                  const isSelected = selectedImage === comp.portraitPlaceholderUrl;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => {
                        setSelectedImage(comp.portraitPlaceholderUrl);
                        setGeneratedVideoUrl(null);
                        setErrorMsg(null);
                      }}
                      className={`relative rounded-xl overflow-hidden border p-1 text-left transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-950/40 ring-2 ring-rose-500/50'
                          : 'border-stone-800 bg-stone-850 hover:border-stone-700'
                      }`}
                    >
                      <img
                        src={comp.portraitPlaceholderUrl}
                        alt={comp.name}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                      <div className="text-[10px] font-serif font-bold text-stone-200 truncate mt-1">
                        {comp.name.split(' ').pop()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-950 flex items-center justify-center p-2">
                <img
                  src={selectedImage}
                  alt="Gewähltes Bild"
                  className="max-h-64 object-contain rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* 2. Aspect Ratio Affordance (16:9 / 9:16) */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
              2. Video-Seitenverhältnis (Erforderlich: 16:9 oder 9:16)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500'
                    : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="w-8 h-5 rounded border border-current flex items-center justify-center text-[10px] font-mono">
                  16:9
                </div>
                <div className="text-left">
                  <div className="font-serif font-bold text-sm">Querformat (16:9)</div>
                  <div className="text-[11px] text-stone-400">Filmische Orchesterbühne & Oper</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500'
                    : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="w-5 h-8 rounded border border-current flex items-center justify-center text-[10px] font-mono">
                  9:16
                </div>
                <div className="text-left">
                  <div className="font-serif font-bold text-sm">Hochformat (9:16)</div>
                  <div className="text-[11px] text-stone-400">Fokus auf Porträt & Mimik</div>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Motion Prompt */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
              3. Bewegungsprompt (Motion Prompt für gemini-omni-1.2-flash)
            </label>
            <textarea
              rows={3}
              value={motionPrompt}
              onChange={(e) => setMotionPrompt(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-rose-500 transition-colors placeholder-stone-600"
              placeholder="Beschreibe die gewünschte historische Bewegung..."
            />

            {/* Prompt presets chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-semibold text-stone-500">Inspiration:</span>
              <div className="flex flex-wrap gap-1.5">
                {promptPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMotionPrompt(preset)}
                    className="text-[11px] px-2.5 py-1 rounded bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-800 text-left truncate max-w-full"
                  >
                    {preset.slice(0, 50)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleGenerateVideo}
                disabled={isGenerating || !selectedImage}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Video wird generiert (gemini-omni-1.2-flash)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Historisches Video mit gemini-omni-1.2-flash generieren</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Video Output & Playback (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="font-serif text-lg font-bold text-stone-100 flex items-center justify-between">
              <span>Generiertes Video-Ergebnis</span>
              {aspectRatio && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-rose-300 border border-stone-700">
                  {aspectRatio}
                </span>
              )}
            </h2>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold">Hinweis zur Videogenerierung:</div>
                  <div className="leading-relaxed">{errorMsg}</div>
                </div>
              </div>
            )}

            {isGenerating ? (
              <div className="p-12 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-4">
                <Loader2 className="w-10 h-10 mx-auto text-rose-500 animate-spin" />
                <div>
                  <div className="text-sm font-bold text-stone-200">{generationStep}</div>
                  <div className="text-xs text-stone-500 mt-1">
                    gemini-omni-1.2-flash rendert fotorealistische Bewegung...
                  </div>
                </div>
                <div className="w-48 h-1.5 rounded-full bg-stone-800 mx-auto overflow-hidden">
                  <div className="h-full bg-rose-500 animate-pulse w-3/4 rounded-full" />
                </div>
              </div>
            ) : generatedVideoUrl ? (
              <div className="space-y-4">
                <div
                  className={`relative rounded-xl overflow-hidden bg-black border border-stone-800 shadow-2xl flex items-center justify-center ${
                    aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[500px] mx-auto' : 'aspect-video w-full'
                  }`}
                >
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <a
                    href={generatedVideoUrl}
                    download="historisches-musik-video.mp4"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Video herunterladen</span>
                  </a>

                  <button
                    onClick={handleGenerateVideo}
                    className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 text-rose-200 text-xs font-semibold border border-rose-700/50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Neu generieren</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-xl bg-stone-950/60 border border-stone-800/80 text-center space-y-3 text-stone-500">
                <Video className="w-10 h-10 mx-auto text-stone-700" />
                <p className="text-xs leading-relaxed max-w-xs mx-auto">
                  Wähle ein Porträt und klicke auf "Video generieren", um die historische Figur mit <strong>gemini-omni-1.2-flash</strong> zum Leben zu erwecken.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
