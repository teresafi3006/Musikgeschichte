import React, { useState } from 'react';
import { CURATED_EXAM_QUESTIONS, ExamQuestion, EPOCHS } from '../data/musicHistoryData';
import { audioSynth } from '../utils/audioSynthesizer';
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Play,
  Square,
  Award,
  BookOpen,
  ArrowRight,
  Send,
  Loader2,
} from 'lucide-react';

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: Record<string, number>;
  isCompleted: boolean;
  score: number;
}

export const ExamTrainer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'standard' | 'ai'>('standard');
  const [selectedEpochFilter, setSelectedEpochFilter] = useState<string>('all');

  // Filter questions based on selected filter
  const quizQuestions = React.useMemo(() => {
    if (selectedEpochFilter === 'all') {
      return CURATED_EXAM_QUESTIONS;
    }
    return CURATED_EXAM_QUESTIONS.filter((q) => q.epochId === selectedEpochFilter);
  }, [selectedEpochFilter]);

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    isCompleted: false,
    score: 0,
  });

  const [hasRevealedAnswer, setHasRevealedAnswer] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // AI Dynamic Question State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState<any | null>(null);
  const [aiSelectedAnswer, setAiSelectedAnswer] = useState<number | null>(null);
  const [aiSelectedLevel, setAiSelectedLevel] = useState<'bachelor' | 'master'>('bachelor');
  const [aiSelectedEpoch, setAiSelectedEpoch] = useState<string>('Wiener Klassik');

  // AI Free Text Essay Evaluation State
  const [essayQuestion, setEssayQuestion] = useState('Erkläre das Prinzip der thematisch-motivischen Arbeit bei Beethoven im Vergleich zum barocken Generalbasssatz.');
  const [essayAnswer, setEssayAnswer] = useState('');
  const [essayLoading, setEssayLoading] = useState(false);
  const [essayResult, setEssayResult] = useState<any | null>(null);

  const currentQ = quizQuestions[quizState.currentQuestionIndex] || quizQuestions[0];
  const isLastQuestion = quizState.currentQuestionIndex === quizQuestions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    if (hasRevealedAnswer) return;

    const isCorrect = optionIndex === currentQ.correctIndex;
    const newAnswers = {
      ...quizState.selectedAnswers,
      [currentQ.id]: optionIndex,
    };

    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: newAnswers,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    setHasRevealedAnswer(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizState((prev) => ({ ...prev, isCompleted: true }));
      setHasRevealedAnswer(false);
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
      setHasRevealedAnswer(false);
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      score: 0,
    });
    setHasRevealedAnswer(false);
    audioSynth.stopAll();
  };

  const handlePlayQuestionAudio = (audioId?: ExamQuestion['audioSampleId']) => {
    if (!audioId) return;
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

  // AI Dynamic Question Generator
  const generateAiQuestion = async () => {
    setAiLoading(true);
    setAiQuestion(null);
    setAiSelectedAnswer(null);

    try {
      const response = await fetch('/api/ai-exam-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          epoch: aiSelectedEpoch,
          level: aiSelectedLevel,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setAiQuestion(data.data);
      } else {
        alert(data.error || 'Fehler beim Generieren der Frage.');
      }
    } catch (e: any) {
      alert('Netzwerkfehler: ' + e.message);
    } finally {
      setAiLoading(false);
    }
  };

  // AI Essay Answer Evaluation
  const evaluateEssay = async () => {
    if (!essayAnswer.trim()) return;
    setEssayLoading(true);
    setEssayResult(null);

    try {
      const response = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: essayQuestion,
          userAnswer: essayAnswer,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setEssayResult(data.data);
      } else {
        alert(data.error || 'Fehler bei der Bewertung.');
      }
    } catch (e: any) {
      alert('Fehler: ' + e.message);
    } finally {
      setEssayLoading(false);
    }
  };

  const percentage = Math.round((quizState.score / quizQuestions.length) * 100);

  return (
    <div className="space-y-8">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-300">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-100">Prüfungs- & Selbsttest-Zentrum</h2>
            <p className="text-xs text-stone-400">Multiple-Choice-Test mit wissenschaftlicher Auswertung</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMode('standard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'standard'
                ? 'bg-amber-900/60 text-amber-200 border border-amber-600/70 shadow-sm'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            Curriculares Hochschulquiz
          </button>
          <button
            onClick={() => setActiveMode('ai')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === 'ai'
                ? 'bg-amber-900/60 text-amber-200 border border-amber-600/70 shadow-sm'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>KI-Klausursimulator (Gemini)</span>
          </button>
        </div>
      </div>

      {activeMode === 'standard' ? (
        <>
          {!quizState.isCompleted ? (
            <div className="space-y-6">
              {/* Epoch Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-stone-400 font-medium shrink-0">Epochen-Fokus:</span>
                <button
                  onClick={() => {
                    setSelectedEpochFilter('all');
                    handleRestartQuiz();
                  }}
                  className={`px-3 py-1 rounded-full shrink-0 border transition-all ${
                    selectedEpochFilter === 'all'
                      ? 'bg-amber-900/50 border-amber-600 text-amber-200'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Alle Epochen ({CURATED_EXAM_QUESTIONS.length} Fragen)
                </button>
                {EPOCHS.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEpochFilter(ep.id);
                      handleRestartQuiz();
                    }}
                    className={`px-3 py-1 rounded-full shrink-0 border transition-all ${
                      selectedEpochFilter === ep.id
                        ? 'bg-amber-900/50 border-amber-600 text-amber-200'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {ep.name}
                  </button>
                ))}
              </div>

              {/* Active Quiz Card */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span>
                      Frage {quizState.currentQuestionIndex + 1} von {quizQuestions.length}
                    </span>
                    <span>Punktestand: {quizState.score}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                      style={{
                        width: `${((quizState.currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Question Info & Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                    {currentQ.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                    Epoche: {EPOCHS.find((e) => e.id === currentQ.epochId)?.name || currentQ.epochId}
                  </span>
                  {currentQ.audioSampleId && (
                    <button
                      onClick={() => handlePlayQuestionAudio(currentQ.audioSampleId)}
                      className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-300 text-xs border border-stone-700"
                    >
                      {playingAudioId === currentQ.audioSampleId ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Audio stoppen</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Hörbeispiel abspielen</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* The Question Text */}
                <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-bold leading-snug">
                  {currentQ.question}
                </h3>

                {/* Answer Options */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = quizState.selectedAnswers[currentQ.id] === idx;
                    const isCorrect = idx === currentQ.correctIndex;

                    let btnStyle = 'bg-stone-850/80 border-stone-800 hover:border-stone-700 text-stone-200';

                    if (hasRevealedAnswer) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-100 ring-1 ring-rose-500';
                      } else {
                        btnStyle = 'opacity-50 bg-stone-900 border-stone-850 text-stone-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={hasRevealedAnswer}
                        className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm font-medium leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Revealed Scientific Explanation */}
                {hasRevealedAnswer && (
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {quizState.selectedAnswers[currentQ.id] === currentQ.correctIndex ? (
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>Richtig beantwortet!</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-rose-400">
                          <XCircle className="w-4 h-4" />
                          <span>Leider nicht korrekt.</span>
                        </span>
                      )}
                      <span className="text-stone-500">·</span>
                      <span className="text-stone-400">{currentQ.examRelevance}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all"
                      >
                        <span>{isLastQuestion ? 'Ergebnisübersicht anzeigen' : 'Nächste Frage'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Result Summary (Ergebnisübersicht) */
            <div className="space-y-8 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-center max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                    Ergebnisübersicht deines Selbsttests
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Hochschulmodul: Europäische Musikgeschichte (Bachelor/Master)
                  </p>
                </div>

                {/* Score Callout */}
                <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-around">
                  <div>
                    <div className="text-3xl font-serif font-bold text-amber-300">
                      {quizState.score} / {quizQuestions.length}
                    </div>
                    <div className="text-xs text-stone-400">Richtige Antworten</div>
                  </div>
                  <div className="h-10 w-px bg-stone-800" />
                  <div>
                    <div className="text-3xl font-serif font-bold text-stone-100">{percentage}%</div>
                    <div className="text-xs text-stone-400">Quote</div>
                  </div>
                  <div className="h-10 w-px bg-stone-800" />
                  <div>
                    <div className="text-sm font-bold text-emerald-400">
                      {percentage >= 85
                        ? 'Summa cum laude'
                        : percentage >= 70
                        ? 'Sehr gut bestanden'
                        : percentage >= 50
                        ? 'Bestanden'
                        : 'Wiederholungsbedarf'}
                    </div>
                    <div className="text-xs text-stone-400">Klausururteil</div>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Quiz wiederholen</span>
                  </button>
                  <button
                    onClick={() => setActiveMode('ai')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 font-medium text-xs sm:text-sm border border-stone-700 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>KI-Prüfer herausfordern</span>
                  </button>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div className="pt-8 border-t border-stone-800 space-y-4">
                <h4 className="font-serif text-lg font-bold text-stone-200">
                  Detaillierte Analyse aller Prüfungsfragen:
                </h4>

                <div className="space-y-3">
                  {quizQuestions.map((q, idx) => {
                    const userChoice = quizState.selectedAnswers[q.id];
                    const isCorrect = userChoice === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect ? 'bg-stone-950/40 border-stone-800' : 'bg-rose-950/20 border-rose-900/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            <span className="font-serif text-sm font-bold text-stone-200">
                              {idx + 1}. {q.question}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-stone-400 pl-6 space-y-1">
                          <div>
                            Deine Antwort:{' '}
                            <span className={isCorrect ? 'text-emerald-300 font-medium' : 'text-rose-300 font-medium'}>
                              {userChoice !== undefined ? q.options[userChoice] : 'Keine Antwort'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div>
                              Korrekte Lösung:{' '}
                              <span className="text-emerald-400 font-medium">{q.options[q.correctIndex]}</span>
                            </div>
                          )}
                          <p className="text-stone-300 pt-1 leading-relaxed">{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* AI Klausursimulator (Gemini 3.8 Flash) */
        <div className="space-y-8">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Dynamischer KI-Klausur-Generator</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Generiert maßgeschneiderte musikwissenschaftliche Hochschul-Prüfungsfragen auf Knopfdruck
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={aiSelectedEpoch}
                  onChange={(e) => setAiSelectedEpoch(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                >
                  <option value="Mittelalter">Mittelalter</option>
                  <option value="Renaissance">Renaissance</option>
                  <option value="Barock">Barock</option>
                  <option value="Wiener Klassik">Wiener Klassik</option>
                  <option value="Romantik">Romantik</option>
                  <option value="Moderne">Moderne & 20. Jh.</option>
                </select>

                <select
                  value={aiSelectedLevel}
                  onChange={(e) => setAiSelectedLevel(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                >
                  <option value="bachelor">Bachelor (Basismodul)</option>
                  <option value="master">Master (Vertiefungsmodul)</option>
                </select>

                <button
                  onClick={generateAiQuestion}
                  disabled={aiLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generiere...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Neue Frage erstellen</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {aiQuestion ? (
              <div className="space-y-5 animate-in fade-in">
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200">
                  <span className="font-bold">Historischer Kontext:</span> {aiQuestion.historicalContext}
                </div>

                <h4 className="font-serif text-lg font-bold text-stone-100">{aiQuestion.question}</h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {aiQuestion.options?.map((opt: string, i: number) => {
                    const isSelected = aiSelectedAnswer === i;
                    const isCorrect = i === aiQuestion.correctIndex;
                    const hasSelected = aiSelectedAnswer !== null;

                    let style = 'bg-stone-850 border-stone-800 text-stone-300 hover:border-stone-700';
                    if (hasSelected) {
                      if (isCorrect) style = 'bg-emerald-950/60 border-emerald-500 text-emerald-100';
                      else if (isSelected) style = 'bg-rose-950/60 border-rose-500 text-rose-100';
                      else style = 'opacity-40 bg-stone-900 border-stone-800';
                    }

                    return (
                      <button
                        key={i}
                        disabled={hasSelected}
                        onClick={() => setAiSelectedAnswer(i)}
                        className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${style}`}
                      >
                        <span className="font-mono font-bold mr-2 text-stone-400">[{String.fromCharCode(65 + i)}]</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {aiSelectedAnswer !== null && (
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                    <div className="text-xs font-semibold text-amber-400">Musikwissenschaftliche Auflösung:</div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{aiQuestion.explanation}</p>
                    {aiQuestion.listeningRecommendation && (
                      <div className="text-xs text-stone-400 pt-1">
                        <span className="font-semibold text-stone-300">Empfohlenes Werk zum Nachhören:</span>{' '}
                        {aiQuestion.listeningRecommendation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-amber-500/60 mb-2" />
                <p className="text-sm font-medium text-stone-300">Bereit für eine individuelle Prüfungsfrage?</p>
                <p className="text-xs text-stone-500">
                  Wähle Epoche und Niveau oben aus und klicke auf "Neue Frage erstellen".
                </p>
              </div>
            )}
          </div>

          {/* AI Essay / Free Text Answer Evaluator */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
            <div className="pb-4 border-b border-stone-800">
              <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Freitext-Klausurfragen & Essay-Korrektur</span>
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Formuliere eine Antwort in eigenen Worten; der KI-Dozent bewertet Vollständigkeit, Fachbegriffe und Methodik.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-stone-400 mb-1.5">
                Klausurfrage:
              </label>
              <input
                type="text"
                value={essayQuestion}
                onChange={(e) => setEssayQuestion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-stone-400 mb-1.5">
                Deine studentische Antwort:
              </label>
              <textarea
                rows={4}
                value={essayAnswer}
                onChange={(e) => setEssayAnswer(e.target.value)}
                placeholder="Formuliere hier deine These und Ausführungen (z.B. Erwähnung von motivischer Abspaltung, Sequenzierung, Generalbass-Akkordbezifferung)..."
                className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder-stone-600"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={evaluateEssay}
                disabled={essayLoading || !essayAnswer.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {essayLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Bewerte Antwort...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Antwort korrigieren lassen</span>
                  </>
                )}
              </button>
            </div>

            {essayResult && (
              <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase font-bold text-indigo-400">Bewertung</span>
                    <h4 className="font-serif text-lg font-bold text-stone-100">{essayResult.verdict}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-amber-300">{essayResult.scoreOutOf10}</span>
                    <span className="text-xs text-stone-400"> / 10 Punkte</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-stone-400 uppercase mb-1">Dozenten-Feedback:</h5>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{essayResult.feedback}</p>
                </div>

                {essayResult.missingPoints?.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-rose-400 uppercase mb-1">Fehlende Aspekte:</h5>
                    <ul className="list-disc list-inside text-xs text-stone-300 space-y-0.5">
                      {essayResult.missingPoints.map((pt: string, i: number) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {essayResult.improvedSampleAnswer && (
                  <div className="pt-2">
                    <h5 className="text-xs font-semibold text-emerald-400 uppercase mb-1">Musterlösung:</h5>
                    <p className="text-xs text-stone-300 bg-stone-900/80 p-3 rounded-lg border border-stone-800 italic">
                      "{essayResult.improvedSampleAnswer}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
