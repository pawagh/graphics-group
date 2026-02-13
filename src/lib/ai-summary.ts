/**
 * AI Summary Utility (Placeholder)
 *
 * This module provides a stub for automatically generating short summaries of
 * the key contributions of each publication. In the future, wire this up to an
 * AI API (e.g., OpenAI GPT, Anthropic Claude) to auto-summarize papers when
 * they are added through the admin dashboard.
 *
 * Usage:
 *   import { generateSummary } from '@/lib/ai-summary';
 *   const summary = await generateSummary(title, abstract);
 */

// TODO: Replace this stub with a real AI call when ready.
// Example integration points:
//   1. Call this from the admin "Add Publication" flow after a paper is added.
//   2. Optionally run in batch over existing publications that lack summaries.
//   3. Store the result in the publication's `summary` field.

/**
 * Generate a short summary of a paper's key contributions.
 *
 * @param title     - The paper title.
 * @param abstract  - The paper abstract or any available descriptive text.
 * @returns A concise 1-2 sentence summary string, or empty string if unavailable.
 */
export async function generateSummary(
  _title: string,
  _abstract: string
): Promise<string> {
  // TODO: Implement real AI summarization here.
  // Example with OpenAI (uncomment and configure when ready):
  //
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4o-mini',
  //     messages: [
  //       {
  //         role: 'system',
  //         content: 'Summarize the key contributions of this academic paper in 1-2 concise sentences.',
  //       },
  //       {
  //         role: 'user',
  //         content: `Title: ${_title}\n\nAbstract: ${_abstract}`,
  //       },
  //     ],
  //     max_tokens: 150,
  //   }),
  // });
  // const data = await response.json();
  // return data.choices?.[0]?.message?.content?.trim() ?? '';

  return '';
}
