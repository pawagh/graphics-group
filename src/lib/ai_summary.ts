/**
 * AI Summary Utility
 *
 * Extracts structured key contributions using Gemini 2.5 Flash Lite.
 * Summary/TLDR is now natively handled by Semantic Scholar.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash-lite';

export interface PaperAnalysis {
  keyContributions: string[];
}

/**
 * Generate a structured extraction of a paper's contributions.
 *
 * @param title     - The paper title.
 * @param abstract  - The paper abstract or any available descriptive text.
 * @returns Array of key contributions, or null.
 */
export async function generateAnalysis(
  title: string,
  abstract: string
): Promise<PaperAnalysis | null> {
  if (!GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not configured - skipping AI analysis');
    return null;
  }

  if (!abstract || abstract.trim().length < 50) {
    return null;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are analyzing an academic research paper from a Visual Computing lab.
The summary of this paper has already been handled. Your ONLY task is to extract the key contributions.

Generate a list of 3-5 KEY CONTRIBUTIONS — short, specific bullet points (one sentence each).

Respond with ONLY valid JSON in this exact format, no markdown fences:
{
  "keyContributions": ["First contribution...", "Second contribution...", "Third contribution..."]
}

Paper title: ${title}

Abstract: ${abstract}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const candidates = data.candidates || [];
    if (candidates.length === 0) return null;

    const rawText = candidates[0].content?.parts?.[0]?.text?.trim() || '';
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    if (Array.isArray(parsed.keyContributions)) {
      return {
        keyContributions: parsed.keyContributions.filter(
          (c: unknown) => typeof c === 'string' && c.trim()
        ),
      };
    }

    return null;
  } catch (error) {
    console.error('Error generating analysis:', error);
    return null;
  }
}

/**
 * Check if AI analysis is available (API key configured)
 */
export function isSummarizationAvailable(): boolean {
  return !!GEMINI_API_KEY;
}