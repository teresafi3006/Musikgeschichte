/**
 * Web Audio API Engine for Educational Music History Demonstration
 * Synthesizes historical stylistic markers natively without external MP3 assets.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private activeNodes: (OscillatorNode | GainNode)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public stopAll() {
    this.isPlaying = false;
    this.activeNodes.forEach(node => {
      try {
        if ('stop' in node) {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch (e) {
        // already stopped
      }
    });
    this.activeNodes = [];
  }

  // Helper note frequency
  private noteToFreq(note: string): number {
    const notes: Record<string, number> = {
      'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00,
      'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23,
      'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16,
      'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
    };
    return notes[note] || 440;
  }

  /**
   * 1. Mittelalter: Gregorianischer Choral (Dorian Mode Modal Choral)
   */
  public playGregorianChant(onComplete?: () => void) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    const melody: { note: string; dur: number }[] = [
      { note: 'D3', dur: 1.2 }, // Drone/Bourdon in background
      { note: 'D4', dur: 0.8 },
      { note: 'F4', dur: 0.6 },
      { note: 'G4', dur: 0.7 },
      { note: 'A4', dur: 1.0 },
      { note: 'C5', dur: 0.6 },
      { note: 'B4', dur: 0.5 },
      { note: 'A4', dur: 0.8 },
      { note: 'G4', dur: 0.7 },
      { note: 'F4', dur: 0.6 },
      { note: 'E4', dur: 0.7 },
      { note: 'D4', dur: 1.6 },
    ];

    // Background Drone (Monastery organ/vocal drone)
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'triangle';
    droneOsc.frequency.setValueAtTime(this.noteToFreq('D3'), ctx.currentTime);
    droneGain.gain.setValueAtTime(0.08, ctx.currentTime);
    droneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 10);
    droneOsc.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start();
    droneOsc.stop(ctx.currentTime + 10);
    this.activeNodes.push(droneOsc, droneGain);

    let time = ctx.currentTime + 0.1;
    for (const item of melody) {
      if (item.note === 'D3') continue;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Vocal formant simulation
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700, time);
      filter.Q.setValueAtTime(2.5, time);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(this.noteToFreq(item.note), time);

      // Smooth church acoustic envelope
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.25, time + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, time + item.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + item.dur);
      this.activeNodes.push(osc, gain);

      time += item.dur * 0.9;
    }

    const delayMs = Math.max(100, (time - ctx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isPlaying) {
        this.isPlaying = false;
        onComplete?.();
      }
    }, delayMs);
  }

  /**
   * 2. Renaissance: Franko-flämische Polyphonie / Vokalkadenz
   */
  public playRenaissancePolyphony(onComplete?: () => void) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    // 4-voice imitative entries: Tenor -> Altus -> Superius -> Bassus leading to a full cadence
    const chords = [
      // 1. Entry
      { notes: ['D4'], timeOffset: 0, dur: 1.2 },
      { notes: ['D4', 'A4'], timeOffset: 1.0, dur: 1.2 },
      { notes: ['D4', 'F4', 'A4'], timeOffset: 2.0, dur: 1.4 },
      { notes: ['D3', 'D4', 'F4', 'A4'], timeOffset: 3.2, dur: 1.5 }, // d-Moll Vollklang
      { notes: ['G3', 'D4', 'G4', 'Bb4'], timeOffset: 4.6, dur: 1.5 }, // g-Moll
      { notes: ['A3', 'C#4', 'E4', 'A4'], timeOffset: 6.0, dur: 1.6 }, // A-Dur Dominante mit Clausula cantizans
      { notes: ['D3', 'D4', 'F#4', 'A4'], timeOffset: 7.5, dur: 2.5 }, // Picardische Terz (D-Dur Schluss)
    ];

    const totalDuration = 10;
    const startTime = ctx.currentTime + 0.1;

    for (const chord of chords) {
      for (const note of chord.notes) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(this.noteToFreq(note), startTime + chord.timeOffset);

        gain.gain.setValueAtTime(0.001, startTime + chord.timeOffset);
        gain.gain.linearRampToValueAtTime(0.08, startTime + chord.timeOffset + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + chord.timeOffset + chord.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + chord.timeOffset);
        osc.stop(startTime + chord.timeOffset + chord.dur);
        this.activeNodes.push(osc, gain);
      }
    }

    setTimeout(() => {
      if (this.isPlaying) {
        this.isPlaying = false;
        onComplete?.();
      }
    }, totalDuration * 1000);
  }

  /**
   * 3. Barock: Basso Continuo & Quintfallsequenz (Cembalo-Timbre)
   */
  public playBaroqueContinuo(onComplete?: () => void) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    // Quintfallsequenz in a-Moll: Am -> Dm -> G -> C -> F -> Bdim -> E7 -> Am
    const sequence = [
      { bass: 'A3', treble: ['C5', 'E5', 'A5'], dur: 0.8 },
      { bass: 'D3', treble: ['D5', 'F5', 'A5'], dur: 0.8 },
      { bass: 'G3', treble: ['B4', 'D5', 'G5'], dur: 0.8 },
      { bass: 'C3', treble: ['C5', 'E5', 'G5'], dur: 0.8 },
      { bass: 'F3', treble: ['A4', 'C5', 'F5'], dur: 0.8 },
      { bass: 'B3', treble: ['G#4', 'D5', 'F5'], dur: 0.8 },
      { bass: 'E3', treble: ['G#4', 'B4', 'E5'], dur: 1.0 },
      { bass: 'A3', treble: ['A4', 'C5', 'E5'], dur: 1.5 },
    ];

    let time = ctx.currentTime + 0.1;

    for (const step of sequence) {
      // Bass string (Cello continuo)
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sawtooth';
      bassOsc.frequency.setValueAtTime(this.noteToFreq(step.bass), time);
      bassGain.gain.setValueAtTime(0.18, time);
      bassGain.gain.exponentialRampToValueAtTime(0.001, time + step.dur * 0.9);
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(time);
      bassOsc.stop(time + step.dur);
      this.activeNodes.push(bassOsc, bassGain);

      // Harpsichord (Cembalo) arpeggiated chords
      step.treble.forEach((tNote, idx) => {
        const arpeggioDelay = idx * 0.04;
        const harpsOsc = ctx.createOscillator();
        const harpsGain = ctx.createGain();
        harpsOsc.type = 'square'; // sharp plucked transient
        harpsOsc.frequency.setValueAtTime(this.noteToFreq(tNote), time + arpeggioDelay);

        harpsGain.gain.setValueAtTime(0.09, time + arpeggioDelay);
        harpsGain.gain.exponentialRampToValueAtTime(0.001, time + arpeggioDelay + 0.6);

        harpsOsc.connect(harpsGain);
        harpsGain.connect(ctx.destination);
        harpsOsc.start(time + arpeggioDelay);
        harpsOsc.stop(time + arpeggioDelay + 0.6);
        this.activeNodes.push(harpsOsc, harpsGain);
      });

      time += step.dur;
    }

    const delayMs = Math.max(100, (time - ctx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isPlaying) {
        this.isPlaying = false;
        onComplete?.();
      }
    }, delayMs);
  }

  /**
   * 4. Wiener Klassik: Sonatenhauptthema mit Alberti-Bass (Mozart KV 545 Stil)
   */
  public playClassicalSonata(onComplete?: () => void) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    // Melody: C5, E5, G5, B4, C5, D5, C5 ... with Alberti bass
    const melody = [
      { note: 'C5', time: 0, dur: 1.0 },
      { note: 'E5', time: 1.0, dur: 0.5 },
      { note: 'G5', time: 1.5, dur: 0.5 },
      { note: 'B4', time: 2.0, dur: 0.75 },
      { note: 'C5', time: 2.75, dur: 0.25 },
      { note: 'D5', time: 3.0, dur: 0.5 },
      { note: 'C5', time: 3.5, dur: 1.0 },
      // Nachsatz Kadenz G7 -> C
      { note: 'A4', time: 4.5, dur: 0.5 },
      { note: 'F5', time: 5.0, dur: 0.5 },
      { note: 'D5', time: 5.5, dur: 0.5 },
      { note: 'B4', time: 6.0, dur: 0.5 },
      { note: 'C5', time: 6.5, dur: 1.5 },
    ];

    // Alberti bass: C3-G3-E3-G3 (broken chords)
    const albertiNotes = [
      'C3', 'G3', 'E3', 'G3', 'C3', 'G3', 'E3', 'G3',
      'C3', 'G3', 'E3', 'G3', 'C3', 'G3', 'E3', 'G3',
      'F3', 'C4', 'A3', 'C4', 'G3', 'D4', 'B3', 'D4',
      'C3', 'G3', 'E3', 'G3', 'C3'
    ];

    const startTime = ctx.currentTime + 0.1;

    // Play melody
    for (const item of melody) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(this.noteToFreq(item.note), startTime + item.time);
      gain.gain.setValueAtTime(0.18, startTime + item.time);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.time + item.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime + item.time);
      osc.stop(startTime + item.time + item.dur);
      this.activeNodes.push(osc, gain);
    }

    // Play Alberti bass
    let bTime = 0;
    for (const note of albertiNotes) {
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();
      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(this.noteToFreq(note), startTime + bTime);
      bGain.gain.setValueAtTime(0.08, startTime + bTime);
      bGain.gain.exponentialRampToValueAtTime(0.001, startTime + bTime + 0.28);
      bOsc.connect(bGain);
      bGain.connect(ctx.destination);
      bOsc.start(startTime + bTime);
      bOsc.stop(startTime + bTime + 0.28);
      this.activeNodes.push(bOsc, bGain);
      bTime += 0.28;
    }

    setTimeout(() => {
      if (this.isPlaying) {
        this.isPlaying = false;
        onComplete?.();
      }
    }, 8500);
  }

  /**
   * 5. Romantik: Der berühmte Tristan-Akkord (F - H - D# - G#) & Auflösung nach E7
   */
  public playRomanticTristan(onComplete?: () => void) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    const startTime = ctx.currentTime + 0.1;

    // 1. Initial Cello upbeat: A3 -> F3 -> E3
    const upbeat = [
      { note: 'A3', time: 0, dur: 1.0 },
      { note: 'F3', time: 1.0, dur: 0.8 },
      { note: 'E3', time: 1.8, dur: 0.8 },
    ];
    for (const u of upbeat) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(this.noteToFreq(u.note), startTime + u.time);
      gain.gain.setValueAtTime(0.12, startTime + u.time);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + u.time + u.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime + u.time);
      osc.stop(startTime + u.time + u.dur);
      this.activeNodes.push(osc, gain);
    }

    // 2. The famous Tristan Chord hits at time 2.8: F3 + B3 + D#4 + G#4
    const tristanNotes = ['F3', 'B3', 'D#4', 'G#4'];
    for (const note of tristanNotes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(this.noteToFreq(note), startTime + 2.8);
      gain.gain.setValueAtTime(0.14, startTime + 2.8);
      gain.gain.exponentialRampToValueAtTime(0.005, startTime + 5.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime + 2.8);
      osc.stop(startTime + 5.5);
      this.activeNodes.push(osc, gain);
    }

    // 3. Chromatic sigh: G#4 resolves upward to A4 (time 4.2)
    const sighOsc = ctx.createOscillator();
    const sighGain = ctx.createGain();
    sighOsc.type = 'triangle';
    sighOsc.frequency.setValueAtTime(this.noteToFreq('A4'), startTime + 4.2);
    sighGain.gain.setValueAtTime(0.16, startTime + 4.2);
    sighGain.gain.exponentialRampToValueAtTime(0.001, startTime + 5.6);
    sighOsc.connect(sighGain);
    sighGain.connect(ctx.destination);
    sighOsc.start(startTime + 4.2);
    sighOsc.stop(startTime + 5.6);
    this.activeNodes.push(sighOsc, sighGain);

    // 4. Resolution to Dominant Septaccord E7: E3 + G#3 + D4 + E4 (time 5.6)
    const e7Notes = ['E3', 'G#3', 'D4', 'E4'];
    for (const note of e7Notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(this.noteToFreq(note), startTime + 5.6);
      gain.gain.setValueAtTime(0.15, startTime + 5.6);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 9.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime + 5.6);
      osc.stop(startTime + 9.0);
      this.activeNodes.push(osc, gain);
    }

    setTimeout(() => {
      if (this.isPlaying) {
        this.isPlaying = false;
        onComplete?.();
      }
    }, 9500);
  }

  /**
   * 6. Moderne: Zwölftonreihe (Arnold Schönberg Dodekaphonie)
   */
  public playTwelveToneRow(rowType: 'original' | 'retrograde' | 'inversion' | 'retrogradeInversion' = 'original', onComplete?: () => void) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.isPlaying = true;

    // Classic 12-Tone row:
    const originalNotes = ['C4', 'C#4', 'E4', 'D#4', 'G4', 'F#4', 'F4', 'A4', 'Ab4', 'Bb4', 'B4', 'D4'];

    let sequence = [...originalNotes];

    if (rowType === 'retrograde') {
      sequence = [...originalNotes].reverse();
    } else if (rowType === 'inversion') {
      const noteNames = ['C4', 'B3', 'Ab3', 'A3', 'F3', 'F#3', 'G3', 'Eb3', 'E3', 'D3', 'C#3', 'Bb3'];
      sequence = noteNames;
    } else if (rowType === 'retrogradeInversion') {
      const noteNames = ['C4', 'B3', 'Ab3', 'A3', 'F3', 'F#3', 'G3', 'Eb3', 'E3', 'D3', 'C#3', 'Bb3'];
      sequence = [...noteNames].reverse();
    }

    const startTime = ctx.currentTime + 0.1;
    let time = startTime;

    sequence.forEach((note, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      // Modern stark synthetic tone (sine + square overtone)
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(this.noteToFreq(note), time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.55);
      this.activeNodes.push(osc, gain);

      time += 0.55;
    });

    const delayMs = Math.max(100, (time - ctx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isPlaying) {
        this.isPlaying = false;
        onComplete?.();
      }
    }, delayMs);
  }
}

export const audioSynth = new AudioSynthesizer();
