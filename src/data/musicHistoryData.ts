export interface Composer {
  id: string;
  name: string;
  lifespan: string;
  epochId: string;
  nationality: string;
  role: string;
  biography: string;
  keyWorks: string[];
  historicalSignificance: string;
  examKeywords: string[];
  portraitPrompt: string;
  portraitPlaceholderUrl: string;
}

export interface Epoch {
  id: string;
  name: string;
  period: string;
  centuryRange: string;
  tagline: string;
  philosophicalContext: string;
  coreCharacteristics: string[];
  musicalForms: string[];
  compositionTechniques: string[];
  instrumentation: string[];
  keyComposers: string[];
  color: {
    primary: string;
    bg: string;
    border: string;
    badge: string;
  };
  audioId: 'gregorian' | 'renaissance' | 'baroque' | 'classic' | 'romantic' | 'modern';
}

export const EPOCHS: Epoch[] = [
  {
    id: 'mittelalter',
    name: 'Mittelalter',
    period: 'ca. 500 – 1400',
    centuryRange: '6. – 14. Jahrhundert',
    tagline: 'Vom einstimmigen Choral zur ersten Mehrstimmigkeit',
    philosophicalContext: 'Theozentrisches Weltbild. Musik als Abbild göttlicher Schöpfungsharmonie (Musica mundana, humana, instrumentalis nach Boethius). Übergang von oraler Überlieferung zu Neumen und Mensuralnotation.',
    coreCharacteristics: [
      'Gregorianischer Choral: Lateinischer, unbegleiteter geistlicher Sologesang oder Einstimmigkeit des Chores',
      'Modale Tonalität: Die 8 Kirchentonarten (Dorisch, Phrygisch, Lydisch, Mixolydisch und deren Plagaltöne)',
      'Entwicklung der Mehrstimmigkeit: Vom Parallelorganum zum Halteton- und Diskantus-Organum',
      'Weltliche Einstimmigkeit: Troubadours (Südfrankreich), Trouvères (Nordfrankreich) und deutscher Minnesang',
      'Ars Antiqua (Notre-Dame-Schule) & Ars Nova (14. Jh., Mensuralrhythmik, Isorhythmie)',
    ],
    musicalForms: [
      'Gregorianischer Choral (Proprium & Ordinarium Missae)',
      'Organum (Parallel-, Schwebe-, Haltetonorganum)',
      'Motette (mittelalterlich, oft mehrtextig & politisch)',
      'Conductus',
      'Minnesang (Kanzonenform AAB / Stollen-Stollen-Abgesang)',
    ],
    compositionTechniques: [
      'Cantus firmus (vorgegebene liturgische Melodie als Träger)',
      'Isorhythmie (Talea = Rhythmusmuster, Color = Tonhöhenfolge)',
      'Neumen- und Quadratnotation',
      'Guido von Arezzos Solmisation (Ut-Re-Mi-Fa-Sol-La) und 4-Linien-System',
    ],
    instrumentation: ['Gesang (A cappella)', 'Portativ (Kleinorgel)', 'Fidel', 'Laute', 'Psalterium', 'Schalmei', 'Drehleier'],
    keyComposers: ['hildegard', 'leonin', 'perotin', 'machaut', 'walther'],
    color: {
      primary: 'amber-800',
      bg: 'bg-amber-950/20',
      border: 'border-amber-700/40',
      badge: 'bg-amber-800/20 text-amber-300 border-amber-700/50',
    },
    audioId: 'gregorian',
  },
  {
    id: 'renaissance',
    name: 'Renaissance',
    period: 'ca. 1400 – 1600',
    centuryRange: '15. – 16. Jahrhundert',
    tagline: 'Die Blüte der Vokalpolyphonie & Humanismus',
    philosophicalContext: 'Humanismus und Wiederentdeckung der antiken Ideale. Emanzipation des Künstlers. Harmonisches Gleichgewicht: Terzen- und Sexten-Konsonanzen lösen das Diktat der reinen Quinten ab. Erfindung des Notendrucks (Petrucci 1501).',
    coreCharacteristics: [
      'Vollstimmige Vokalpolyphonie: Gleichberechtigung von 4 bis 6 Stimmen (Cantus, Altus, Tenor, Bassus)',
      'Prinzip der Durchimitation: Ein musikalisches Motiv wandert nacheinander durch alle Stimmen',
      'Musikalische Textausdeutung: Madrigalismen (Aufsteigen bei Himmel, Absteigen bei Hölle, Chromatik bei Schmerz)',
      'Tridentinisches Konzil (1545–1563): Forderung nach Textverständlichkeit in der Kirchenmusik (Palestrina-Stil)',
      'Venezianische Mehrchörigkeit: Raumakustische Aufstellung von Chören und Bläsern im Markusdom',
    ],
    musicalForms: [
      'Messe (Cantus-firmus-Messe, Parodiemesse, Paraphrasemesse)',
      'Motette (geistlich, durchimitiert)',
      'Madrigal (weltliche weltgewandte Spitzenform der Renaissance)',
      'Chanson & Frottola',
      'Erste eigenständige Instrumentalmusik (Toccata, Ricercar, Tanzsätze wie Pavane & Gaillarde)',
    ],
    compositionTechniques: [
      'Durchimitation (Imitativer Kontrapunkt)',
      'Parodieverfahren (Mehrstimmige Vorlage wird kunstvoll umgearbeitet)',
      'Klausellehre (Tenor-, Diskant-, Bass-, Altklausel)',
      'Affektdarstellung durch Madrigalismen',
    ],
    instrumentation: ['Vokalensembles', 'Viola da Gamba', 'Laute & Vihuela', 'Cembalo / Virginal', 'Zink (Cornetto)', 'Posaune (Sackbut)'],
    keyComposers: ['dufay', 'josquin', 'palestrina', 'lasso', 'gabrieli'],
    color: {
      primary: 'emerald-800',
      bg: 'bg-emerald-950/20',
      border: 'border-emerald-700/40',
      badge: 'bg-emerald-800/20 text-emerald-300 border-emerald-700/50',
    },
    audioId: 'renaissance',
  },
  {
    id: 'barock',
    name: 'Barock',
    period: 'ca. 1600 – 1750',
    centuryRange: '17. – Mitte 18. Jahrhundert',
    tagline: 'Generalbass, Opernerfindung & Monumentaler Kontrapunkt',
    philosophicalContext: 'Absolutismus, theatralische Inszenierung von Macht und Glauben (Gegenreformation). Dualismus von Ordnung und Pathos. Memento Mori und Vanitas-Motiv. Systematisierung von Dur-Moll-Tonalität und Affektenlehre.',
    coreCharacteristics: [
      'Generalbass-Prinzip (Basso continuo): Durchgehende harmonische Bassfundierung (Cembalo/Orgel + Cello/Fagott)',
      'Geburt der Oper um 1600 in Florenz: Florentiner Camerata, Monodie (begleiteter Sologesang statt Polyphonie)',
      'Konzertierendes Prinzip (Stile concertato): Wettstreit zwischen Tutti (Ripieno) und Solisten',
      'Affektenlehre und musikalische Figurenlehre: Jeder Satz stellt einen einheitlichen Gemütszustand dar',
      'Höhepunkt des Kontrapunkts: Fugenkunst, Kanon und polyphone Meisterschaft (J.S. Bach)',
    ],
    musicalForms: [
      'Oper (Opera seria & Opera buffa)',
      'Oratorium, Passion & Kantate',
      'Concerto grosso & Solokonzert (Dreisätzig: Schnell - Langsam - Schnell)',
      'Fuge & Präludium',
      'Suite / Partita (Allemande, Courante, Sarabande, Gigue)',
      'Triosonate & Da-Capo-Arie (ABA)',
    ],
    compositionTechniques: [
      'Generalbassbezifferung (Stufenharmonik & Ziffernnotation)',
      'Quintfallsequenzen und Kadenzharmonik',
      'Fugenkomposition: Dux (Thema), Comes (Antwort auf der Quinte), Exposition, Durchführung, Engführung, Orgelpunkt',
      'Ritornellform im Solokonzert',
    ],
    instrumentation: ['Cembalo & Orgel', 'Streichorchester mit Darmsaiten', 'Naturtrompeten & Pauken', 'Barockoboe & Traversflöte', 'Laute & Theorbe'],
    keyComposers: ['monteverdi', 'vivaldi', 'bach', 'haendel', 'schuetz'],
    color: {
      primary: 'indigo-800',
      bg: 'bg-indigo-950/20',
      border: 'border-indigo-700/40',
      badge: 'bg-indigo-800/20 text-indigo-300 border-indigo-700/50',
    },
    audioId: 'baroque',
  },
  {
    id: 'klassik',
    name: 'Wiener Klassik',
    period: 'ca. 1750 – 1827',
    centuryRange: 'Zweite Hälfte 18. – Anfang 19. Jahrhundert',
    tagline: 'Klarheit, Ausgewogenheit & Die Sonatenhauptsatzform',
    philosophicalContext: 'Zeitalter der Aufklärung (Kant), bürgerliche Emanzipation, Humanitätsideal. Suche nach Natürlichkeit, Fasslichkeit und idealer Formvollendung. Das Triumvirat der "Ersten Wiener Schule": Haydn, Mozart, Beethoven.',
    coreCharacteristics: [
      'Sonatenhauptsatzform: Das zentrale dramaturgische Modell der Instrumentalmusik',
      'Thematisch-motivische Arbeit: Aus kleinsten Kernmotiven (z.B. Beethovens 5. Sinfonie) erwachsen monumentale Sätze',
      'Periodischer Satzbau: Symmetrie (Vordersatz mit Halbschluss 4 Takte + Nachsatz mit Ganzschluss 4 Takte)',
      'Durchbrochener Satz: Motive werden dialogisch zwischen den Orchesterinstrumenten weitergereicht',
      'Emanzipation des Streichquartetts und der klassischen Sinfonie (4-sätziges Modell)',
    ],
    musicalForms: [
      'Klassische Sinfonie (1. Sonatensatz, 2. Langsamer Satz, 3. Menuett/Scherzo, 4. Rondo/Finale)',
      'Streichquartett (zwei Violinen, Viola, Violoncello als "Gespräch von vier vernünftigen Leuten")',
      'Solokonzert (mit orchestraler Doppelexposition und Solisten-Kadenz)',
      'Klaviersonate',
      'Klassische Oper (Mozarts da-Ponte-Opern, Singspiel)',
    ],
    compositionTechniques: [
      'Sonatenform: Exposition (HT, Überleitung, ST, Schlussgruppe) -> Durchführung (Modulation/Spannung) -> Reprise (alles in Tonika) -> Coda',
      'Alberti-Bässe als rhythmisch belebende Dreiklangs-Begleitung',
      'Klare funktionale Tonalität: Tonika - Subdominante - Dominante - Tonika',
    ],
    instrumentation: ['Klassisches Orchester (2 Flöten, 2 Oboen, 2 Klarinetten, 2 Fagotte, Hörner, Streicher)', 'Hammerklavier / Pianoforte', 'Klarinette als vollwertiges Orchesterinstrument'],
    keyComposers: ['haydn', 'mozart', 'beethoven'],
    color: {
      primary: 'rose-800',
      bg: 'bg-rose-950/20',
      border: 'border-rose-700/40',
      badge: 'bg-rose-800/20 text-rose-300 border-rose-700/50',
    },
    audioId: 'classic',
  },
  {
    id: 'romantik',
    name: 'Romantik',
    period: 'ca. 1820 – 1910',
    centuryRange: '19. Jahrhundert',
    tagline: 'Subjektivität, Weltschmerz & Die Entgrenzung der Harmonik',
    philosophicalContext: 'Subjektivismus, Naturbegeisterung, Weltschmerz, Rückzug ins Innere und Traumwelten. Das bürgerliche Konzertleben boomt, Aufkommen des Virtuosentums (Liszt, Paganini). Streit zwischen Neudeutscher Schule (Programmmusik, Wagner/Liszt) und Traditionalisten (Brahms, Hanslick).',
    coreCharacteristics: [
      'Erweiterung der Harmonik: Dichte Chromatik, alterierte Akkorde, schwebende Tonalität (Tristan-Akkord)',
      'Ausdruckssteigerung & Dynamik: Vom ppp bis fff, Tempomodifikationen (Rubato)',
      'Leitmotivtechnik: Wiederkehrende musikalische Motive verknüpft mit Personen, Gefühlen oder Ideen (Wagner)',
      'Programmmusik vs. Absolute Musik: Musik mit außermusikalischem literarischem Programm',
      'Nationale Schulen: Einbindung volksmusikalischer Idiome (Böhmen: Dvořák; Skandinavien: Grieg; Russland: Mächtiges Häuflein)',
    ],
    musicalForms: [
      'Klavier-Miniatur / Charakterstück (Nocturne, Ballade, Impromptu, Fantasiestück)',
      'Romantisches Kunstlied (Schubert, Schumann, Wolf)',
      'Sinfonische Dichtung (Liszt, Richard Strauss)',
      'Musikdrama (Wagner: Gesamtkunstwerk ohne Nummernoper-Gliederung)',
      'Monumentalsinfonie (Bruckner, Mahler: Einbezug von Fernorchestern & Vokalchören)',
    ],
    compositionTechniques: [
      'Chromatische Stimmführung und mediantische Rückungen',
      'Leitmotiv-Verarbeitung',
      'Thematische Transformation',
      'Klangfarben-Differenzierung im riesigen romantischen Orchester',
    ],
    instrumentation: ['Riesiges Sinfonieorchester mit Wagner-Tuben, Englischhorn, Kontrafagott, Harfen, Celesta', 'Moderner Konzertflügel mit Gussrahmen', 'Ventiltrompeten und -hörner'],
    keyComposers: ['schubert', 'schumann', 'chopin', 'liszt', 'wagner', 'brahms', 'mahler'],
    color: {
      primary: 'purple-800',
      bg: 'bg-purple-950/20',
      border: 'border-purple-700/40',
      badge: 'bg-purple-800/20 text-purple-300 border-purple-700/50',
    },
    audioId: 'romantic',
  },
  {
    id: 'moderne',
    name: 'Moderne & 20. Jahrhundert',
    period: 'ab ca. 1900',
    centuryRange: '20. & 21. Jahrhundert',
    tagline: 'Emanzipation der Dissonanz & Stilpluralismus',
    philosophicalContext: 'Weltkriege, Industrialisierung, Psychoanalyse (Freud), Relativitätstheorie. Bruch mit jahrhundertealten Traditionen. Ästhetischer Pluralismus: von strikter Konstruktion bis zum radikalen Zufall.',
    coreCharacteristics: [
      'Emanzipation der Dissonanz: Dissonanzen müssen sich nicht mehr in Konsonanzen auflösen',
      'Freie Atonalität & Dodekaphonie: Die Zwölftontechnik von Arnold Schönberg (Zweite Wiener Schule)',
      'Impressionismus: Klangfarbe und Atmosphäre statt Zielgerichtetheit (Debussy, Ravel, Ganztonleiter)',
      'Rhythmus-Revolution: Polyrhythmik, wechselnde ungerade Taktarten (Strawinskys Sacre du Printemps)',
      'Neoklassizismus: Rückgriff auf barocke/klassische Formen mit moderner Harmonik (Strawinsky, Hindemith)',
      'Avantgarde nach 1945: Serielle Musik (Stockhausen, Boulez), Aleatorik (Cage), Minimal Music (Reich, Glass)',
    ],
    musicalForms: [
      'Kammermusik für ungewöhnliche Besetzungen (z.B. Pierrot Lunaire)',
      'Zwölfton-Kompositionen (Suiten, Variationen)',
      'Klangflächen-Musik & Mikropolyphonie (Ligeti: Atmosphères)',
      'Minimal Music (Phasing, Additive Rhythmen)',
      'Elektronische und elektroakustische Musik / Tape Music',
    ],
    compositionTechniques: [
      'Zwölftonreihe: Grundgestalt (O), Krebs (R), Umkehrung (I), Krebsumkehrung (RI)',
      'Erweiterte Spieltechniken (Flageolett, Col legno, Frullato, Präpariertes Klavier)',
      'Klangfarbenmelodie (Schönberg, Webern)',
      'Ganzton- und Pentatonikleitern, Bitonalität / Polytonalität',
    ],
    instrumentation: ['Traditionelles Orchester + Synthesizer, Tonband, Theremin, präpariertes Klavier, erweiterte Schlagwerkgruppen'],
    keyComposers: ['debussy', 'schoenberg', 'stravinsky', 'bartok', 'stockhausen', 'reich'],
    color: {
      primary: 'cyan-800',
      bg: 'bg-cyan-950/20',
      border: 'border-cyan-700/40',
      badge: 'bg-cyan-800/20 text-cyan-300 border-cyan-700/50',
    },
    audioId: 'modern',
  },
];

export const COMPOSERS: Composer[] = [
  {
    id: 'hildegard',
    name: 'Hildegard von Bingen',
    lifespan: '1098 – 1179',
    epochId: 'mittelalter',
    nationality: 'Deutsch / Heiliges Römisches Reich',
    role: 'Äbtissin, Universalgelehrte, Mystikerin & Komponistin',
    biography: 'Gründerin der Klöster Rupertsberg und Eibingen. Hildegard schuf über 70 liturgische Gesänge mit außerordentlich weitem Ambitus, expressiven Melismen und visionären Texten, die sich kühn über die strengen Konventionen des gregorianischen Chorals ihrer Zeit hinwegsetzten.',
    keyWorks: ['Symphonia armoniae celestium revelationum', 'Ordo Virtutum (Frühestes überliefertes geistliches Singspiel)', 'O viridissima virga'],
    historicalSignificance: 'Erste namentlich greifbare Komponistin der abendländischen Musikgeschichte mit eigenem Werkkanon.',
    examKeywords: ['Ambituserweiterung', 'Ordo Virtutum', 'Neumen', 'Modale Melodik', 'Liturgisches Drama'],
    portraitPrompt: 'Hildegard von Bingen in a medieval scriptorium, writing illuminated musical neumes on parchment by candlelight, gothic arches in background, authentic Romanesque artwork style',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'machaut',
    name: 'Guillaume de Machaut',
    lifespan: 'ca. 1300 – 1377',
    epochId: 'mittelalter',
    nationality: 'Französisch',
    role: 'Dichter & führender Meister der Ars Nova',
    biography: 'Kanoniker in Reims und Sekretär Johanns von Luxemburg. Machaut vollendete die Neuerungen der Ars Nova durch komplexe Rhythmik (Mensuralnotation) und vollbrachte die historische Tat, den Messordinariumstext als geschlossenes mehrstimmiges Gesamtwerk zu komponieren.',
    keyWorks: ['Messe de Nostre Dame (Erste vollständige vierstimmige Messe eines einzelnen Autors)', 'Ma fin est mon commencement (Krebskanon)', 'Zahlreiche Balladen und Virelais'],
    historicalSignificance: 'Gipfelpunkt der Ars Nova; Etablierung der vierstimmigen Messe als zyklisches Kunstwerk.',
    examKeywords: ['Messe de Nostre Dame', 'Isorhythmie', 'Talea und Color', 'Mensuralnotation', 'Ars Nova'],
    portraitPrompt: 'Guillaume de Machaut as a 14th century medieval scholar with quill and musical notation in a monastery library, illuminated manuscript style',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'josquin',
    name: 'Josquin des Prez',
    lifespan: 'ca. 1450 – 1521',
    epochId: 'renaissance',
    nationality: 'Franko-flämisch',
    role: 'Führender Meister der Hochrenaissance-Polyphonie',
    biography: 'Von Martin Luther als "Meister der Noten" gerühmt ("sie müssen tun, wie er will; die andern Sangmeister müssen tun, wie die Noten wollen"). Josquin wirkte in Mailand, Rom und Ferrara und perfektionierte die strophische Durchimitation und das empathische Wort-Ton-Verhältnis.',
    keyWorks: ['Missa Pange lingua', 'Motette: Ave Maria... virgo serena', 'Mille Regretz (Chanson)', 'El Grillo'],
    historicalSignificance: 'Größter Komponist der Renaissance; Begründer der modernen Durchimitation und des musikalischen Humanismus.',
    examKeywords: ['Durchimitation', 'Soggeto cavato', 'Ave Maria... virgo serena', 'Wort-Ton-Verhältnis', 'Franko-flämische Schule'],
    portraitPrompt: 'Josquin des Prez in Renaissance scholar robes with a choir book open on a carved wooden lectern in a Florentine palace, Renaissance oil painting',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'palestrina',
    name: 'Giovanni Pierluigi da Palestrina',
    lifespan: '1525 – 1594',
    epochId: 'renaissance',
    nationality: 'Italienisch',
    role: 'Kapellmeister an der Cappella Giulia in Rom',
    biography: 'Der Inbegriff der katholischen Kirchenmusik nach dem Tridentinischen Konzil. Der Legende nach "rettete" er die Kirchenmehrstimmigkeit vor dem Bann des Papstes durch seine klangreine, textverständliche Missa Papae Marcelli.',
    keyWorks: ['Missa Papae Marcelli', 'Motette: Sicut cervus', 'Stabat Mater', 'Canticum Canticorum'],
    historicalSignificance: 'Schöpfer des klassischen Kontrapunkts (Palestrina-Stil), der bis ins 20. Jahrhundert (Fux: Gradus ad Parnassum) als Lehrvorbild diente.',
    examKeywords: ['Tridentinisches Konzil', 'Textverständlichkeit', 'Missa Papae Marcelli', 'Dissonanzbehandlung', 'Stile antico'],
    portraitPrompt: 'Giovanni Pierluigi da Palestrina in clerical vestments directing a choir in the Sistine Chapel beneath Michelangelo fresco, dramatic chiaroscuro Renaissance painting',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'monteverdi',
    name: 'Claudio Monteverdi',
    lifespan: '1567 – 1643',
    epochId: 'barock',
    nationality: 'Italienisch',
    role: 'Brücke von Renaissance zu Barock, Opernpionier',
    biography: 'Hofkapellmeister in Mantua und Domkapellmeister am Markusdom in Venedig. Er formulierte die Doktrin der "Seconda pratica", wonach die Musik der Herrin des Textes sein muss ("L’orazione sia padrona dell’armonia e non serva"). Mit L’Orfeo 1607 schuf er die erste vollgültige Oper der Musikgeschichte.',
    keyWorks: ['L’Orfeo (1607)', 'Marienvesper (1610)', 'L’incoronazione di Poppea (1642)', 'Madrigalbücher 1–8 (u.a. Lamento d’Arianna)'],
    historicalSignificance: 'Schlüsselfigur beim Übergang von der Renaissance-Polyphonie (Prima pratica) zur barocken Monodie und Oper (Seconda pratica).',
    examKeywords: ['Seconda pratica', 'Prima pratica', 'Florentiner Camerata', 'Monodie', 'L’Orfeo', 'Generalbass'],
    portraitPrompt: 'Claudio Monteverdi in black 17th-century Italian robes in front of St Marks Basilica in Venice, holding musical score, Caravaggio chiaroscuro style',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bach',
    name: 'Johann Sebastian Bach',
    lifespan: '1685 – 1750',
    epochId: 'barock',
    nationality: 'Deutsch',
    role: 'Thomaskantor in Leipzig, Universalgenie des Barock',
    biography: 'Bach führte alle kontrapunktischen, harmonischen und gattungsmäßigen Errungenschaften des Barock zu unübertroffener Vollendung. In Weimar, Köthen und Leipzig schuf er ein monumentales Werkverzeichnis geistlicher und weltlicher Musik, das für nachfolgende Generationen zum Fundament wurde.',
    keyWorks: ['Das Wohltemperierte Klavier (Teil I & II)', 'Matthäus-Passion', 'Die Kunst der Fuge', 'Brandenburgische Konzerte (BWV 1046–1051)', 'h-Moll-Messe (BWV 232)'],
    historicalSignificance: 'Höchster Vollender des musikalischen Barock; Meister von Fuge, Kanon, Choralharmonisierung und sakraler Rhetorik.',
    examKeywords: ['Fuge', 'Das Wohltemperierte Klavier', 'Wohltemperierte Stimmung', 'Basso continuo', 'Theologische Symbolik', 'BWV'],
    portraitPrompt: 'Johann Sebastian Bach in powdered baroque wig and velvet coat, holding a canon triplex six vocibus sheet in his hand, famous Elias Gottlob Haussmann portrait style, detailed oil on canvas',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'mozart',
    name: 'Wolfgang Amadeus Mozart',
    lifespan: '1756 – 1791',
    epochId: 'klassik',
    nationality: 'Österreichisch (Erzbistum Salzburg / Wien)',
    role: 'Wunderkind & Großmeister der Wiener Klassik',
    biography: 'Bereits als Kind europaweit auf Konzertreisen. Mozart vereinte italienische Gesangsmelodik mit mitteleuropäischer Kontrapunktik und Sonatenform. Seine Opern (mit Lorenzo Da Ponte) und Klavierkonzerte definierten neue dramatische und formale Maßstäbe.',
    keyWorks: ['Die Zauberflöte (KV 620)', 'Don Giovanni (KV 527)', 'Le nozze di Figaro', 'Sinfonie Nr. 41 C-Dur "Jupiter" (KV 551)', 'Requiem d-Moll (KV 626)', 'Klarinettenkonzert A-Dur (KV 622)'],
    historicalSignificance: 'Verkörperung der klassischen Ausgewogenheit, meisterhafte psychologische Charakterisierung in der Oper und formale Synthese.',
    examKeywords: ['Sonatenhauptsatzform', 'Da-Ponte-Opern', 'Jupiter-Sinfonie (Fugiertes Finale)', 'Periodik', 'KV (Köchel-Verzeichnis)'],
    portraitPrompt: 'Wolfgang Amadeus Mozart in an 18th century red velvet coat playing an ornate Viennese fortepiano in a candlelit Habsburg palace room, Barbara Krafft portrait style',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1520523839898-50712140d393?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'beethoven',
    name: 'Ludwig van Beethoven',
    lifespan: '1770 – 1827',
    epochId: 'klassik',
    nationality: 'Deutsch / Österreichisch (Bonn / Wien)',
    role: 'Vollender der Klassik & Wegbereiter der Romantik',
    biography: 'Schüler Haydns in Wien. Trotz fortschreitender und schließlich völliger Ertaubung revolutionierte Beethoven alle Gattungen: Sinfonie, Klaviersonate und Streichquartett wurden zu existenziellen, dramatischen Kunstwerken erhoben. Er befreite den Komponisten aus dem Dienstverhältnis zum freien bürgerlichen Künstler.',
    keyWorks: ['Sinfonie Nr. 3 Es-Dur "Eroica" (Op. 55)', 'Sinfonie Nr. 5 c-Moll (Op. 67)', 'Sinfonie Nr. 9 d-Moll mit Schlusschor "An die Freude" (Op. 125)', 'Klaviersonate Nr. 23 "Appassionata"', 'Große Fuge Op. 133'],
    historicalSignificance: 'Schlüsselfigur des 19. Jahrhunderts; Erhebung der Instrumentalmusik zur philosophischen Weltanschauung.',
    examKeywords: ['Thematisch-motivische Arbeit', 'Eroica-Wende', 'Ertaubung & Heiligenstädter Testament', '9. Sinfonie', 'Spätwerk'],
    portraitPrompt: 'Ludwig van Beethoven with windswept wild hair and determined intense gaze, holding manuscript of the 9th Symphony and red scarf, dramatic Joseph Karl Stieler oil painting',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'wagner',
    name: 'Richard Wagner',
    lifespan: '1813 – 1883',
    epochId: 'romantik',
    nationality: 'Deutsch',
    role: 'Schöpfer des Musikdramas & Festspielgründer in Bayreuth',
    biography: 'Wagner revolutionierte das europäische Musiktheater: Er schaffte die herkömmliche Nummernoper ab zugunsten der "unendlichen Melodie" und des "Gesamtkunstwerks". Seine Harmonik in Tristan und Isolde (1859/65) markiert den Beginn der modernen Harmonik.',
    keyWorks: ['Der Ring des Nibelungen (Rheingold, Walküre, Siegfried, Götterdämmerung)', 'Tristan und Isolde', 'Parsifal', 'Die Meistersinger von Nürnberg'],
    historicalSignificance: 'Einflussreichster und polarisierendster Opernkomponist des 19. Jahrhunderts; Wegbereiter der modernen Harmonik durch den Tristan-Akkord.',
    examKeywords: ['Tristan-Akkord', 'Leitmotivik', 'Gesamtkunstwerk', 'Bayreuther Festspielhaus', 'Unendliche Melodie'],
    portraitPrompt: 'Richard Wagner in black beret and velvet coat studying a massive orchestral score at Wahnfried in Bayreuth, dramatic 19th century portrait painting',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'schoenberg',
    name: 'Arnold Schönberg',
    lifespan: '1874 – 1951',
    epochId: 'moderne',
    nationality: 'Österreichisch / US-amerikanisch (Wien / Los Angeles)',
    role: 'Begründer der Zweiten Wiener Schule & der Dodekaphonie',
    biography: 'Autodidakt aus Wien, Lehrer von Alban Berg und Anton Webern. Nach einer spätromantischen Phase (Verklärte Nacht) vollzog er 1908 den Schritt in die freie Atonalität und entwickelte in den frühen 1920er Jahren die "Methode der Komposition mit zwölf nur aufeinander bezogenen Tönen" (Zwölftontechnik).',
    keyWorks: ['Verklärte Nacht (Op. 4)', 'Pierrot Lunaire (Op. 21)', 'Variationen für Orchester (Op. 31)', 'Ein Überlebender aus Warschau (Op. 46)', 'Moses und Aron'],
    historicalSignificance: 'Radikaler Erneuerer der Musiksprache des 20. Jahrhunderts; Überwinder der jahrhundertealten Dur-Moll-Tonalität.',
    examKeywords: ['Zwölftontechnik', 'Dodekaphonie', 'Zweite Wiener Schule', 'Emanzipation der Dissonanz', 'Sprechgesang (Pierrot Lunaire)'],
    portraitPrompt: 'Arnold Schönberg sitting at a table in 1920s Vienna studying a 12-tone matrix grid and musical score, modernist Expressionist painting style with stark lighting',
    portraitPlaceholderUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
  },
];

export interface ExamQuestion {
  id: string;
  epochId: string;
  category: 'formenlehre' | 'satztechnik' | 'historie' | 'hoerbeispiel' | 'zuordnung';
  question: string;
  codeOrScore?: string;
  audioSampleId?: 'gregorian' | 'renaissance' | 'baroque' | 'classic' | 'romantic' | 'modern';
  options: string[];
  correctIndex: number;
  explanation: string;
  examRelevance: string;
}

export const CURATED_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q1',
    epochId: 'klassik',
    category: 'formenlehre',
    question: 'Welche tonale Disposition kennzeichnet die Reprise eines typischen Sonatenhauptsatzes in einer Dur-Tonart?',
    options: [
      'Hauptthema in der Dominante, Seitenthema in der Tonika',
      'Hauptthema in der Tonika, Seitenthema in der Dominante',
      'Sowohl Hauptthema als auch Seitenthema erklingen in der Tonika (Haupttonart)',
      'Hauptthema in der Tonika, Seitenthema in der parallelen Molltonart',
    ],
    correctIndex: 2,
    explanation: 'Im Sonatenhauptsatz steht in der Exposition das Seitenthema in der Dominante (bzw. Parallele bei Moll). In der Reprise wird dieser tonale Konflikt gelöst: Sowohl das Hauptthema als auch das Seitenthema stehen nun in der Tonika (Haupttonart).',
    examRelevance: 'Standard-Prüfungsfrage im B.A.-Modul Formenlehre & Werkanalyse.',
  },
  {
    id: 'q2',
    epochId: 'barock',
    category: 'satztechnik',
    question: 'Was unterscheidet bei einer barocken Fuge den "Comes" vom "Dux"?',
    options: [
      'Der Comes ist das Thema in der Umkehrung, der Dux in der Grundgestalt.',
      'Der Dux ist der Themenvortrag auf der Tonika, der Comes die Beantwortung auf der Dominante (Oberquinte/Unterquarte).',
      'Der Comes wird ausschließlich vom Basso Continuo gespielt, der Dux von den Oberstimmen.',
      'Der Comes ist das Kontrasubjekt, der Dux das periodische Thema.',
    ],
    correctIndex: 1,
    explanation: 'In der Fuge ist der Dux (Führer) das Thema auf der Tonika. Der Comes (Gefährte) ist die Beantwortung des Themas durch eine andere Stimme auf der Dominantstufe (tonal oder real beantwortet).',
    examRelevance: 'Obligatorische Kontrapunkt- & Analysenfrage.',
  },
  {
    id: 'q3',
    epochId: 'romantik',
    category: 'satztechnik',
    question: 'Welche Töne bilden den originalen "Tristan-Akkord" im 2. Takt des Vorspiels zu Wagners "Tristan und Isolde"?',
    options: [
      'F – H – D# – G#',
      'C – E – G – B',
      'D – F# – A – C#',
      'G – H – D – F#',
    ],
    correctIndex: 0,
    explanation: 'Der Tristan-Akkord besteht aus den Tönen F – H – D# – G#. Seine harmonische Deutung (halbverminderter Septakkord mit Hochalteration oder übermäßiger Quintsextakkord mit Vorhalt) und seine chromatische Weiterführung nach E7 markieren einen Wendepunkt zur Auflösung der funktionellen Tonalität.',
    examRelevance: 'Zentrales Thema der Harmonielehre des 19. Jahrhunderts.',
  },
  {
    id: 'q4',
    epochId: 'mittelalter',
    category: 'historie',
    question: 'Welche musiktheoretische Pioniertat wird dem Mönch Guido von Arezzo (ca. 992–1050) zugeschrieben?',
    options: [
      'Die Erfindung des Basso Continuo',
      'Die Entwicklung der Solmisation (Ut-Re-Mi-Fa-Sol-La) und des Terzenliniensystems',
      'Die Komposition der ersten 12-Ton-Reihe',
      'Die Erfindung der Oper am Hof von Mantua',
    ],
    correctIndex: 1,
    explanation: 'Guido von Arezzo revolutionierte die Musikpädagogik durch die Erfindung des Liniensystems im Terzabstand mit Notenschlüsseln (F- und C-Schlüssel) und die Silbensolmisation anhand des Johannes-Hymnus ("Ut queant laxis").',
    examRelevance: 'Grundlagenfrage Historische Musikwissenschaft I.',
  },
  {
    id: 'q5',
    epochId: 'renaissance',
    category: 'historie',
    question: 'Welches kirchenpolitische Ereignis führte zu strengen Debatten über die Textverständlichkeit der Vokalpolyphonie und beeinflusste Palestrinas Schaffen?',
    options: [
      'Das Konzil von Trient (Tridentinum, 1545–1563)',
      'Der Westfälische Friede (1648)',
      'Das Konzil von Konstanz (1414–1418)',
      'Der Augsburger Reichs- und Religionsfrieden (1555)',
    ],
    correctIndex: 0,
    explanation: 'Das Konzil von Trient forderte in der Gegenreformation eine Läuterung der Kirchenmusik: weltliche Melodien wurden verbannt und absolute Textverständlichkeit ("dass die Worte von allen verstanden werden können") angemahnt, mustergültig erfüllt in Palestrinas Missa Papae Marcelli.',
    examRelevance: 'Historische Kontexte der Renaissance-Kirchenmusik.',
  },
  {
    id: 'q6',
    epochId: 'moderne',
    category: 'satztechnik',
    question: 'Welche vier Transformationen einer Zwölftonreihe bilden die strukturelle Basis einer dodekaphonen Komposition nach Arnold Schönberg?',
    options: [
      'Exposition, Durchführung, Reprise, Coda',
      'Grundgestalt (O), Krebs (R), Umkehrung (I), Krebsumkehrung (RI)',
      'Dux, Comes, Stretta, Orgelpunkt',
      'Major, Minor, Dorisch, Phrygisch',
    ],
    correctIndex: 1,
    explanation: 'Aus der Grundgestalt (Originalreihe) werden durch Spiegelung an horizontaler und vertikaler Achse drei Ableitungen gewonnen: der Krebs (Reihe rückwärts), die Umkehrung (Spiegelung der Intervalle) und die Krebsumkehrung (Umkehrung rückwärts). Zusammen mit den 12 Transpositionen ergeben sich 48 Reihenformen.',
    examRelevance: 'Standardaufgabe im Modul Neue Musik & 20. Jahrhundert.',
  },
  {
    id: 'q7',
    epochId: 'barock',
    category: 'historie',
    question: 'Welcher gelehrte Kreis in Florenz gilt als Wegbereiter der Monodie und damit der Erfindung der Gattung Oper um 1600?',
    options: [
      'Die Académie Royale de Musique',
      'Die Florentiner Camerata (um Giovanni de’ Bardi und Vincenzo Galilei)',
      'Die Schola Cantorum in Rom',
      'Der Leipziger Thomaskantorat-Kreis',
    ],
    correctIndex: 1,
    explanation: 'Die Florentiner Camerata erstrebte die Wiederbelebung des antiken griechischen Dramas. Da man annahm, die Antike habe Tragödien gesungen aufgeführt, entwickelte man die Monodie (Sologesang mit Akkordbegleitung) als Gegenpol zur polyphonen Stimmverflechtung.',
    examRelevance: 'Geburtsstunde der Neuzeit & Operngeschichte.',
  },
  {
    id: 'q8',
    epochId: 'klassik',
    category: 'formenlehre',
    question: 'Welche Satzfolge etablierte Joseph Haydn im klassischen viersätzigen Sinfonie- und Streichquartettmodell?',
    options: [
      '1. Präludium – 2. Fuge – 3. Arie – 4. Choral',
      '1. Schneller Satz (Sonatenform) – 2. Langsamer Satz – 3. Menuett/Scherzo (mit Trio) – 4. Schnelles Finale (Rondo / Sonatenform)',
      '1. Ouvertüre – 2. Courante – 3. Sarabande – 4. Gigue',
      '1. Toccata – 2. Rezitativ – 3. Da-Capo-Arie – 4. Marsch',
    ],
    correctIndex: 1,
    explanation: 'Das klassische 4-Satz-Schema: 1. Kopfsatz (Allegro im Sonatenhauptsatz), 2. Langsamer lyrischer Satz (Liedform/Thema & Variationen), 3. Tanzsatz (Menuett, später von Beethoven zum Scherzo dynamisiert), 4. Kehraus-Finale (oft Rondo oder Sonatenrondo).',
    examRelevance: 'Grundwissen Gattungsgeschichte der Sinfonie.',
  },
];
