import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON with generous payload limits for base64 images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Helper to initialize GoogleGenAI
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY ist nicht konfiguriert. Bitte in den Settings > Secrets hinterlegen.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Feature 1: Animate images into video using gemini-omni-1.2-flash via Interactions API
app.post('/api/animate-video', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt, aspectRatio = '16:9' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Kein Bild bereitgestellt (imageBase64 erforderlich).' });
    }

    // Clean base64 string if it contains data URI header
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';
    const motionPrompt = prompt || 'Sanfte, atmosphärische Bewegung im Stil eines historischen Dokudramas, filmische Kamerafahrt.';

    const ai = getGenAIClient();

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.2-flash',
      input: [
        {
          type: 'image',
          mime_type: mimeType,
          data: cleanBase64,
        },
        {
          type: 'text',
          text: motionPrompt,
        },
      ],
      background: false,
      store: false,
      stream: false,
      response_format: {
        type: 'video',
        aspect_ratio: validAspectRatio,
      },
    }, { timeout: 300000 });

    const videoPart = interaction.output_video;
    if (videoPart && videoPart.data) {
      const mime = videoPart.mime_type || 'video/mp4';
      const videoDataUrl = `data:${mime};base64,${videoPart.data}`;
      return res.json({
        success: true,
        videoUrl: videoDataUrl,
        aspectRatio: validAspectRatio,
        mimeType: mime,
      });
    }

    if (videoPart && videoPart.uri) {
      return res.json({
        success: true,
        videoUri: videoPart.uri,
        aspectRatio: validAspectRatio,
        mimeType: videoPart.mime_type || 'video/mp4',
      });
    }

    return res.status(500).json({
      error: 'Das Modell hat keine Videodaten zurückgegeben. Bitte erneut versuchen.',
    });
  } catch (error: any) {
    console.error('Error generating video with gemini-omni-1.2-flash:', error);
    res.status(500).json({
      error: error?.message || 'Fehler bei der Videogenerierung mit gemini-omni-1.2-flash.',
    });
  }
});

// Feature 2: Generate high-quality images using gemini-3-pro-image-preview with 1K, 2K, 4K size affordance
app.post('/api/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt, aspectRatio = '16:9', imageSize = '2K' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Kein Bildprompt übermittelt.' });
    }

    // Validate imageSize (1K, 2K, 4K)
    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(imageSize) ? imageSize : '2K';

    const validAspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:4'];
    const chosenAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '16:9';

    const ai = getGenAIClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `${prompt}. High historical accuracy, artistic oil painting or archival engraving style suitable for music history research.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: chosenAspectRatio,
          imageSize: chosenSize,
        },
      },
    });

    let foundImageUrl: string | null = null;
    let descriptionText = '';

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        foundImageUrl = `data:${mime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        descriptionText += part.text;
      }
    }

    if (foundImageUrl) {
      return res.json({
        success: true,
        imageUrl: foundImageUrl,
        imageSize: chosenSize,
        aspectRatio: chosenAspectRatio,
        description: descriptionText,
      });
    }

    return res.status(500).json({
      error: 'Das Modell hat kein Bild zurückgegeben. ' + (descriptionText || ''),
    });
  } catch (error: any) {
    console.error('Error generating image with gemini-3-pro-image-preview:', error);
    res.status(500).json({
      error: error?.message || 'Fehler bei der Bildgenerierung mit gemini-3-pro-image-preview.',
    });
  }
});

// AI Musicology Tutor & Dynamic Exam Generator (gemini-3.8-flash)
app.post('/api/ai-exam-question', async (req: Request, res: Response) => {
  try {
    const { epoch, level = 'bachelor', topic } = req.body;
    const ai = getGenAIClient();

    const prompt = `Erstelle als Universitätsprofessor für historische Musikwissenschaft eine anspruchsvolle Prüfungsaufgabe für Musikstudierende.
Epoche: ${epoch || 'Europäische Musikgeschichte quer durch alle Epochen'}
Niveau: ${level === 'master' ? 'Master / Vertiefungsmodul' : 'Bachelor / Basismodul'}
Fokus/Thema: ${topic || 'Formenlehre, Satztechnik, Ästhetik oder Gattungsgeschichte'}

Antworte im exakten JSON-Format:
{
  "question": "Die präzise formulierte Prüfungsfrage",
  "historicalContext": "Kurze Einbettung in den historischen & gesellschaftlichen Kontext",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correctIndex": 0,
  "explanation": "Wissenschaftlich fundierte Begründung, warum die Antwort korrekt ist und weshalb die Distraktoren falsch sind.",
  "listeningRecommendation": "Konkretes Hörempfehlungs-Werk zur Vertiefung (Komponist, Werk, Satz)",
  "openDiscussionPrompt": "Eine weiterführende Seminar-Diskussionsfrage für die mündliche Prüfung"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'Du bist Professor für historische Musikwissenschaft an einer deutschen Musikhochschule. Deine Fragen sind fachlich präzise (Verwendung von Fachtermini wie Cantus firmus, Basso continuo, thematisch-motivische Arbeit, Zwölftonreihe, Monodie etc.), didaktisch herausfordernd und motivierend.',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating exam question:', error);
    res.status(500).json({
      error: error?.message || 'Fehler beim Generieren der Prüfungsfrage.',
    });
  }
});

// AI Essay & Answer Evaluation
app.post('/api/evaluate-answer', async (req: Request, res: Response) => {
  try {
    const { question, userAnswer, context } = req.body;
    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'Frage und Studierenden-Antwort erforderlich.' });
    }

    const ai = getGenAIClient();
    const prompt = `Bewerte die folgende Antwort eines Musikstudenten:
Frage: "${question}"
Kontext: "${context || 'Europäische Musikgeschichte'}"
Antwort des Studierenden: "${userAnswer}"

Antworte im JSON-Format:
{
  "scoreOutOf10": 8,
  "verdict": "Sehr gut / Gut / Befriedigend / Nachbesserung erforderlich",
  "feedback": "Detailliertes, wohlwollendes aber fachlich strenges musikwissenschaftliches Feedback",
  "missingPoints": ["Punkt 1, der noch gefehlt hat", "Punkt 2"],
  "improvedSampleAnswer": "Mustersatz/Musterantwort auf Hochschulniveau"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error evaluating answer:', error);
    res.status(500).json({
      error: error?.message || 'Fehler bei der Bewertung.',
    });
  }
});

// Start dev or production server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In dev mode, mount Vite dev server as middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built dist files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
