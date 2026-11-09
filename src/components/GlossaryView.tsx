import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';
import { Search, BookOpen, Layers, Wrench, Music2, History, ChevronRight, X } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'form' | 'instrument' | 'technik' | 'kontext'>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  // Filter and sort terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.epoch.toLowerCase().includes(q) ||
        item.examples.some((ex) => ex.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => a.term.localeCompare(b.term, 'de'));
  }, [searchQuery, selectedCategory]);

  // Alphabetical letters present
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    filteredTerms.forEach((t) => {
      const firstChar = t.term.charAt(0).toUpperCase();
      letters.add(firstChar);
    });
    return Array.from(letters).sort();
  }, [filteredTerms]);

  const categories = [
    { id: 'all', label: 'Alle Begriffe', icon: Layers, count: GLOSSARY_TERMS.length },
    { id: 'form', label: 'Musikalische Formen', icon: Music2, count: GLOSSARY_TERMS.filter((t) => t.category === 'form').length },
    { id: 'instrument', label: 'Instrumente', icon: BookOpen, count: GLOSSARY_TERMS.filter((t) => t.category === 'instrument').length },
    { id: 'technik', label: 'Satztechniken', icon: Wrench, count: GLOSSARY_TERMS.filter((t) => t.category === 'technik').length },
    { id: 'kontext', label: 'Historischer Kontext', icon: History, count: GLOSSARY_TERMS.filter((t) => t.category === 'kontext').length },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Alphabetisches Fachlexikon</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-bold tracking-tight">
            Glossar der europäischen Musikgeschichte
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
            Fundierte Definitionen und Erläuterungen zu Gattungen, Formen, Instrumenten, historischen Satztechniken und theoriegeschichtlichen Kontexten von der Antike bis zur Moderne.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-6 pt-6 border-t border-stone-800 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Begriff, Epoche, Satztechnik oder Beispiel suchen (z.B. Sonatenform, Basso Continuo, Cembalo)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-900/60 text-amber-200 border border-amber-600/70 shadow-sm'
                      : 'bg-stone-850/80 text-stone-300 border border-stone-800 hover:border-stone-700 hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-800/80 text-amber-100' : 'bg-stone-800 text-stone-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: List of Terms */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>{filteredTerms.length} Einträge gefunden</span>
            <span>Sortiert: A bis Z</span>
          </div>

          {filteredTerms.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-stone-900 border border-stone-800 text-stone-400">
              <BookOpen className="w-10 h-10 mx-auto text-stone-600 mb-3" />
              <p className="text-sm font-medium">Keine passenden Glossareinträge gefunden.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-amber-400 hover:underline"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredTerms.map((term) => {
                const isSelected = selectedTerm?.id === term.id;
                return (
                  <div
                    key={term.id}
                    onClick={() => setSelectedTerm(term)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-600/80 ring-1 ring-amber-500/50 shadow-md'
                        : 'bg-stone-900/90 border-stone-800 hover:border-stone-750 hover:bg-stone-850/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-base font-bold text-stone-100">{term.term}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 border border-stone-750 text-stone-300">
                            {term.epoch}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-stone-300 line-clamp-2 leading-relaxed">
                          {term.definition}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                          {term.categoryLabel}
                        </span>
                        <ChevronRight className={`w-4 h-4 text-stone-500 transition-transform ${isSelected ? 'translate-x-1 text-amber-400' : ''}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Inspector Card */}
        <div className="space-y-6">
          {selectedTerm ? (
            <div className="sticky top-24 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-start justify-between gap-2 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-[11px] font-mono font-medium text-amber-400 uppercase tracking-wider">
                    {selectedTerm.categoryLabel}
                  </span>
                  <h2 className="font-serif text-xl font-bold text-stone-100 mt-1">{selectedTerm.term}</h2>
                  <div className="text-xs text-stone-400 font-mono mt-0.5">Epoche: {selectedTerm.epoch}</div>
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
                  Definition
                </h4>
                <p className="text-xs sm:text-sm text-stone-200 bg-stone-950/50 p-3.5 rounded-xl border border-stone-800/80 leading-relaxed">
                  {selectedTerm.definition}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
                  Musikwissenschaftliche Vertiefung
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-850/50 p-3.5 rounded-xl border border-stone-800">
                  {selectedTerm.academicDetails}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Kanonische Werkauszüge & Beispiele
                </h4>
                <ul className="space-y-1.5">
                  {selectedTerm.examples.map((ex, i) => (
                    <li key={i} className="text-xs text-stone-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="sticky top-24 bg-stone-900/60 border border-stone-800 rounded-2xl p-8 text-center text-stone-400 space-y-3">
              <BookOpen className="w-8 h-8 mx-auto text-amber-500/60" />
              <h3 className="font-serif font-bold text-stone-200 text-base">Begriff auswählen</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Klicke links auf einen Begriff, um die musikwissenschaftliche Definition, historische Bezüge und typische Werkauszüge anzuzeigen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
