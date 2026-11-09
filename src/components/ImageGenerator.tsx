import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Video, AlertCircle, Maximize2, RefreshCw } from 'lucide-react';
import { Epoch, EPOCHS } from '../data/musicHistoryData';

interface ImageGeneratorProps {
  initialEpoch?: Epoch | null;
  onSendToVideoAnimator: (imageUrl: string) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  initialEpoch,
  onSendToVideoAnimator,
}) => {
  const [prompt, setPrompt] = useState(
    initialEpoch
      ? `Historische Aufführung in der Epoche ${initialEpoch.name}: Authentischer Konzertsaal, zeitgenössische Instrumente und Musiker im Prunkgewand.`
      : 'Uraufführung von Beethovens 9. Sinfonie im Kärntnertortheater Wien 1824: Historisches Theater, Beethoven auf der Bühne, Chor und Orchester bei warmem Kerzenschein.'
  );

  // Mandated affordance: image size (1K, 2K, 4K) using gemini-3-pro-image-preview
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3' | '3:4' | '9:16'>('16:9');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedSize, setGeneratedSize] = useState<string>('2K');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scenarioPresets = [
    {
      title: 'Beethovens 9. Sinfonie 1824',
      epoch: 'Wiener Klassik',
      prompt: 'Uraufführung der 9. Sinfonie von Ludwig van Beethoven im Theater am Kärntnertor in Wien am 7. Mai 1824. Voll besetztes Biedermeier-Theater, Orchester mit historischen Instrumenten, Beethoven steht mit dem Rücken zum Publikum und wird nach dem Finale zum applaudierenden Saal umgedreht. Historisches Meister-Ölgemälde.',
    },
    {
      title: 'J.S. Bach an der Thomaskirche',
      epoch: 'Barock',
      prompt: 'Johann Sebastian Bach prüft die neue Orgel in der Leipziger Thomaskirche im 18. Jahrhundert. Majestätischer barocker Prospekt, geschnitztes Pfeifenwerk, Kerzenschein auf Notenmanuskripten, Thomanerchor im Hintergrund, chiaroscuro Beleuchtung.',
    },
    {
      title: 'Mittelalterliches Skriptorium',
      epoch: 'Mittelalter',
      prompt: 'Gotisches Klosterskriptorium im 12. Jahrhundert. Benediktinermönche und Hildegard von Bingen schreiben feine gregorianische Neumen und Buchmalereien mit Federkiel auf Kalbspergament. Warmes Sonnenlicht fällt durch Maßwerkfenster.',
    },
    {
      title: 'Venezianische Opernpracht 1640',
      epoch: 'Barock',
      prompt: 'Barockes venezianisches Opernhaus bei Kerzenschein mit Gondeln vor den Kanälen von Venedig. Auf der Bühne prachtvoll kostümierte Sänger im L’Orfeo von Monteverdi, im Orchestergraben Cembalo, Gamben und Zinken.',
    },
    {
      title: 'Salon bei Clara & Robert Schumann',
      epoch: 'Romantik',
      prompt: 'Intimer Musiksalon in Leipzig um 1853. Clara Schumann spielt ein Nocturne am Hammerflügel, Johannes Brahms lauscht vornübergebeugt mit Notenblatt in der Hand, Robert Schumann sitzt schreibend am Schreibtisch. Romantisches Biedermeier-Interieur.',
    },
    {
      title: 'Pariser Sacre-Skandal 1913',
      epoch: 'Moderne',
      prompt: 'Théâtre des Champs-Élysées in Paris am 29. Mai 1913. Die Skandal-Uraufführung von Igor Strawinskys Le Sacre du Printemps mit den Ballets Russes. Tumulte, empörte Bohème im Jugendstil-Auditorium, expressive Tänzer in slawischen Urzeit-Gewändern.',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize, // '1K', '2K', '4K'
          aspectRatio,
        }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
        setGeneratedSize(data.imageSize || imageSize);
      } else {
        setErrorMsg(data.error || 'Fehler bei der Bildgenerierung.');
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini Pro Bildmodell · gemini-3-pro-image-preview</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold tracking-tight">
            Hochauflösende Epochen-Bilder generieren
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Erschaffe fotorealistische oder gemäldeartige Szenen aus der europäischen Musikgeschichte mit dem Spitzenmodell <strong>gemini-3-pro-image-preview</strong>. Wähle die Auflösung flexibel zwischen <strong>1K, 2K und 4K</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prompt Input */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
              1. Historische Szene beschreiben
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder-stone-600"
              placeholder="z.B. Uraufführung von Mozarts Requiem bei Kerzenschein..."
            />

            {/* Presets */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-semibold text-stone-500">
                Musikgeschichtliche Szenarien (Vorlage anklicken):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scenarioPresets.map((sc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPrompt(sc.prompt)}
                    className="p-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-800 text-left transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] text-amber-400 font-medium">
                      <span>{sc.epoch}</span>
                    </div>
                    <div className="font-serif text-xs font-bold text-stone-200 mt-0.5">{sc.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mandated Affordance: Image Size Selector (1K, 2K, 4K) */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
                2. Bildgröße & Detailauflösung (Affordance: 1K, 2K, 4K)
              </label>
              <span className="text-[10px] font-mono text-amber-400">gemini-3-pro-image-preview</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(['1K', '2K', '4K'] as const).map((size) => {
                const isSelected = imageSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                        : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-serif text-lg font-bold">{size}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {size === '1K' ? 'Standard (1024px)' : size === '2K' ? 'Hochauflösend (2048px)' : 'Ultra-Detail (4096px)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
              3. Bild-Seitenverhältnis
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: '16:9', label: '16:9', desc: 'Konzertsaal' },
                { id: '4:3', label: '4:3', desc: 'Gemälde' },
                { id: '1:1', label: '1:1', desc: 'Quadrat' },
                { id: '3:4', label: '3:4', desc: 'Porträt' },
                { id: '9:16', label: '9:16', desc: 'Hochformat' },
              ].map((ratio) => (
                <button
                  key={ratio.id}
                  type="button"
                  onClick={() => setAspectRatio(ratio.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    aspectRatio === ratio.id
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                      : 'bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="font-mono text-xs font-bold">{ratio.label}</div>
                  <div className="text-[9px] text-stone-500 truncate">{ratio.desc}</div>
                </button>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generiere Bild mit {imageSize}-Auflösung (gemini-3-pro-image-preview)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Bild generieren ({imageSize} / {aspectRatio})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Output Viewer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-stone-100">Generiertes Bild</h2>
              {generatedImageUrl && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                  {generatedSize} · {aspectRatio}
                </span>
              )}
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold">Hinweis zur Bildgenerierung:</div>
                  <div className="leading-relaxed">{errorMsg}</div>
                </div>
              </div>
            )}

            {isGenerating ? (
              <div className="p-16 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-4">
                <Loader2 className="w-10 h-10 mx-auto text-amber-500 animate-spin" />
                <div>
                  <div className="text-sm font-bold text-stone-200">
                    gemini-3-pro-image-preview rendert Bild...
                  </div>
                  <div className="text-xs text-stone-500 mt-1">Auflösung: {imageSize} · Aspect: {aspectRatio}</div>
                </div>
              </div>
            ) : generatedImageUrl ? (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800 group shadow-2xl">
                  <img
                    src={generatedImageUrl}
                    alt="Generierte Szene"
                    className="w-full h-auto object-cover max-h-[480px]"
                  />
                  <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-stone-200">
                    {generatedSize} HD
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={generatedImageUrl}
                    download="historische-musikszene.png"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Bild in voller Auflösung ({generatedSize}) speichern</span>
                  </a>

                  {/* Connect to Video Feature! */}
                  <button
                    type="button"
                    onClick={() => onSendToVideoAnimator(generatedImageUrl)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Dieses Bild im Video-Labor animieren</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-16 rounded-xl bg-stone-950/60 border border-stone-800/80 text-center space-y-3 text-stone-500">
                <Sparkles className="w-10 h-10 mx-auto text-stone-700" />
                <p className="text-xs leading-relaxed max-w-xs mx-auto">
                  Beschreibe links eine musikalische Szene und wähle die gewünschte Auflösung (1K, 2K oder 4K).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
