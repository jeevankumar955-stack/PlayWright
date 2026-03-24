import { Page, Locator } from '@playwright/test';
import fs from 'fs';

interface AutoHealEvent {
  originalSelector: string;
  strategy: string;
  timeMs: number;
  status: string;
  actualSelector: string;
  reasoning: string;
}

const autoHealEvents: AutoHealEvent[] = [];

export async function autoHealLocator(
  page: Page,
  selectors: string[],
  timeout = 5000
): Promise<Locator> {
  const start = Date.now();

  // 1. Try direct matches first
  for (const selector of selectors) {
    const locator = page.locator(selector);
    try {
      // Check if element is present within a short window
      await locator.waitFor({ state: 'attached', timeout: 500 });
      
      recordEvent(selector, "[ORIGINAL]", Date.now() - start, "SUCCESS", selector, "Selector found");
      return locator;
    } catch (e) {
      continue; // Move to next selector strategy
    }
  }

  // 2. Fuzzy healing attempt (Regex search in HTML)
  const html = await page.content();
  for (const sel of selectors) {
    if (sel.startsWith('#')) {
      const idGuess = sel.replace('#', '');
      const regex = new RegExp(`id=["']${idGuess}\\w*["']`, 'i');
      const match = html.match(regex);

      if (match?.[0]) {
        const healedId = match[0].split('=')[1]?.replace(/["']/g, '');
        const healedSelector = `#${healedId}`;
        
        recordEvent(sel, "[FUZZY]", Date.now() - start, "SUCCESS", healedSelector, "Corrected ID via fuzzy match");
        return page.locator(healedSelector);
      }
    }
  }

  throw new Error(`AutoHeal: Failed to find element after trying ${selectors.length} strategies.`);
}

function recordEvent(os: string, st: string, t: number, stat: string, act: string, reas: string) {
  autoHealEvents.push({ originalSelector: os, strategy: st, timeMs: t, status: stat, actualSelector: act, reasoning: reas });
}

export function writeAutoHealReport() {
  const reportPath = `AutoHeal_Report_${Date.now()}.html`;
  // ... (Your HTML generation logic stays here)
  fs.writeFileSync(reportPath, "HTML_CONTENT_HERE");
  console.log(`Report generated: ${reportPath}`);
}