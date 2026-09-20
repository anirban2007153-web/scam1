import { IndicatorChip, HeuristicItem, SafetyRecommendation } from '../types';

export interface BrandDomainConfig {
  brand: string;
  aliases: string[];
  domains: string[];
}

export interface UrlAnalysis {
  rawUrl: string;
  hostname: string;
  registeredDomain: string;
  brand?: string;
  status: 'trusted' | 'lookalike' | 'mismatch' | 'unknown' | 'suspicious';
  score: number;
  indicators: string[];
}

export interface DetectionResult {
  score: number;
  chips: IndicatorChip[];
  heuristics: HeuristicItem[];
  recommendations: SafetyRecommendation[];
  urlAnalyses: UrlAnalysis[];
  claimedBrands: string[];
}

export const TRUSTED_BRANDS: BrandDomainConfig[] = [
  { brand: 'Airtel', aliases: ['airtel', 'hellotune'], domains: ['airtel.in'] },
  { brand: 'Jio', aliases: ['jio', 'myjio'], domains: ['jio.com', 'myjio.com'] },
  { brand: 'Flipkart', aliases: ['flipkart'], domains: ['flipkart.com'] },
  { brand: 'Amazon', aliases: ['amazon'], domains: ['amazon.com', 'amazon.in'] },
  { brand: 'Google', aliases: ['google'], domains: ['google.com'] },
  { brand: 'Microsoft', aliases: ['microsoft'], domains: ['microsoft.com'] },
  { brand: 'Apple', aliases: ['apple'], domains: ['apple.com'] },
  { brand: 'SBI', aliases: ['sbi', 'state bank of india'], domains: ['sbi.co.in'] },
  { brand: 'HDFC', aliases: ['hdfc', 'hdfc bank'], domains: ['hdfcbank.com'] },
  { brand: 'ICICI', aliases: ['icici', 'icici bank'], domains: ['icicibank.com'] },
];

const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s<>"']+|(?<![@\w])(?:[a-z0-9-]+\.)+(?:com|in|co\.in|org|net|me|cc|pw|xyz|top|live|link|vip)(?:\/[^\s<>"']*)?/gi;
const SHORTENERS = new Set(['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'shorturl.at', 'rb.gy', 'rebrand.ly', 'tiny.cc']);
const SUSPICIOUS_TLDS = new Set(['xyz', 'top', 'pw', 'click', 'zip', 'mov', 'work', 'live', 'vip']);
const MULTI_LABEL_PUBLIC_SUFFIXES = new Set(['co.in', 'com.au', 'co.uk', 'co.nz', 'co.jp', 'com.sg', 'co.za', 'com.br']);

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '');
}

function getRegisteredDomain(hostname: string): string {
  const normalized = normalizeHostname(hostname);
  const parts = normalized.split('.').filter(Boolean);
  if (parts.length <= 2) return parts.join('.');
  const suffix = parts.slice(-2).join('.');
  return MULTI_LABEL_PUBLIC_SUFFIXES.has(suffix) ? parts.slice(-3).join('.') : parts.slice(-2).join('.');
}

function parseHostname(rawUrl: string): string | null {
  try {
    const candidate = /^https?:\/\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl;
    return normalizeHostname(new URL(candidate).hostname);
  } catch {
    return null;
  }
}

function domainMatches(hostname: string, officialDomain: string): boolean {
  const normalizedOfficial = normalizeHostname(officialDomain);
  return hostname === normalizedOfficial || hostname.endsWith('.' + normalizedOfficial);
}

function baseBrandToken(domain: string): string {
  return domain.split('.')[0].replace(/[^a-z0-9]/g, '');
}

function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j <= b.length; j += 1) prev[j] = current[j];
  }
  return prev[b.length];
}

function isLookalikeDomain(registeredDomain: string, officialDomains: string[]): boolean {
  const candidate = baseBrandToken(registeredDomain);
  if (!candidate || candidate.length < 4) return false;
  return officialDomains.some((official) => {
    const target = baseBrandToken(official);
    const distance = levenshtein(candidate, target);
    return distance <= 2 && distance / Math.max(candidate.length, target.length) <= 0.25;
  });
}

export function extractUrls(text: string): string[] {
  return Array.from(new Set((text.match(URL_PATTERN) ?? []).map((url) => url.replace(/[),.!?;:]+$/, ''))));
}

export function detectClaimedBrands(text: string): BrandDomainConfig[] {
  const lower = text.toLowerCase();
  return TRUSTED_BRANDS.filter((config) => config.aliases.some((alias) => lower.includes(alias.toLowerCase())));
}

export function analyzeUrl(rawUrl: string, claimedBrands: BrandDomainConfig[]): UrlAnalysis | null {
  const hostname = parseHostname(rawUrl);
  if (!hostname) return null;

  const registeredDomain = getRegisteredDomain(hostname);
  const tld = registeredDomain.split('.').pop() ?? '';
  const indicators: string[] = [];
  let status: UrlAnalysis['status'] = 'unknown';
  let score = 0;

  if (SHORTENERS.has(registeredDomain)) {
    status = 'suspicious';
    score += 2;
    indicators.push('URL shortener obscures the destination domain');
  }

  if (SUSPICIOUS_TLDS.has(tld)) {
    status = 'suspicious';
    score += 2;
    indicators.push('Uncommon/suspicious top-level domain detected (.' + tld + ')');
  }

  const matchingBrand = claimedBrands.find((brand) => brand.domains.some((domain) => domainMatches(hostname, domain)));

  if (matchingBrand) {
    status = score > 0 ? 'suspicious' : 'trusted';
    if (score === 0) indicators.push('Official ' + matchingBrand.brand + ' domain detected');
  } else if (claimedBrands.length > 0) {
    const lookalikeBrand = claimedBrands.find((brand) => isLookalikeDomain(registeredDomain, brand.domains));
    if (lookalikeBrand) {
      status = 'lookalike';
      score += 5;
      indicators.push('Potential ' + lookalikeBrand.brand + ' impersonation detected');
      indicators.push('Domain spelling is similar to the official brand domain');
    } else {
      status = 'mismatch';
      score += 2;
      indicators.push('Message mentions a known brand but the URL uses a different registered domain');
    }
  } else if (status === 'unknown') {
    indicators.push('Unknown domain; URL alone is not treated as proof of a scam');
  }

  if (hostname.split('.').length >= 4 && status === 'unknown') {
    indicators.push('Deep subdomain structure should be verified carefully');
    score += 1;
  }

  if (/^http:\/\//i.test(rawUrl)) {
    score += 1;
    indicators.push('HTTP link does not provide transport encryption');
  }

  return {
    rawUrl,
    hostname,
    registeredDomain,
    brand: matchingBrand?.brand ?? claimedBrands.find((brand) => isLookalikeDomain(registeredDomain, brand.domains))?.brand,
    status,
    score,
    indicators,
  };
}

export function analyzeMessage(text: string): DetectionResult {
  const claimedBrands = detectClaimedBrands(text);
  const urls = extractUrls(text);
  const urlAnalyses = urls.map((url) => analyzeUrl(url, claimedBrands)).filter((item): item is UrlAnalysis => Boolean(item));

  let score = 0;
  const chips: IndicatorChip[] = [];
  const heuristics: HeuristicItem[] = [];
  const recommendations: SafetyRecommendation[] = [];

  const hasUrgency = /(urgent|immediately|action required|suspended|blocked|freeze|arrest|terminate|police|\b24\s*hours?\b|tonight|deadline|today)/i.test(text);
  const hasCredentialDemand = /(otp|one[- ]time password|pin|password|passcode|cvv|security code|verify (?:your )?(?:identity|account|kyc)|netbanking|banking credentials)/i.test(text);
  const hasPaymentDemand = /(pay|payment|transfer|send money|deposit|fee|₹|rs\.?\s*\d|refund.*(?:card|account)|restore access)/i.test(text);
  const hasLure = /(won|winner|lottery|reward|prize|free cash|guaranteed return|work from home|part time job|crypto profit|gift)/i.test(text);
  const hasDelivery = /(parcel|package|fedex|ups|dhl|postal|customs fee|delivery pending|address updated)/i.test(text);

  if (hasUrgency) {
    score += 3;
    chips.push({ text: '✕ High-Urgency Panic Pressure', type: 'danger' });
    heuristics.push({ label: 'Artificial urgency', detail: 'Creates time pressure that can push the recipient into acting before verification.' });
  }

  if (hasCredentialDemand) {
    score += 5;
    chips.push({ text: '✕ Credential / Sensitive Code Request', type: 'danger' });
    heuristics.push({ label: 'Credential request', detail: 'Requests OTP, PIN, password, passcode, CVV, or sensitive account verification.' });
    recommendations.push({ label: 'Never share authentication codes', detail: 'Do not disclose OTPs, PINs, passwords, or CVVs in response to an SMS.' });
  }

  if (hasPaymentDemand) {
    score += 3;
    chips.push({ text: '✕ Payment / Money Request', type: 'danger' });
    heuristics.push({ label: 'Financial action request', detail: 'Asks the recipient to pay, transfer money, or provide a fee to resolve an issue.' });
    recommendations.push({ label: 'Verify payment requests independently', detail: 'Open the official app or website yourself instead of using the SMS link.' });
  }

  if (hasLure) {
    score += 2;
    chips.push({ text: '⚠ Unsolicited Reward / Financial Lure', type: 'warning' });
    heuristics.push({ label: 'Financial baiting', detail: 'Promises an unexpected reward, prize, gift, or unusually easy financial gain.' });
  }

  if (hasDelivery) {
    score += 2;
    chips.push({ text: '⚠ Delivery Impersonation Pattern', type: 'warning' });
    heuristics.push({ label: 'Delivery impersonation pattern', detail: 'Uses a parcel or delivery problem to create a reason for payment or verification.' });
  }

  for (const analysis of urlAnalyses) {
    score += analysis.score;
    for (const indicator of analysis.indicators) {
      const isStrong = analysis.status === 'lookalike' || analysis.status === 'suspicious';
      chips.push({ text: (isStrong ? '✕ ' : '⚠ ') + indicator, type: isStrong ? 'danger' : 'warning' });
    }

    if (analysis.status === 'trusted') {
      heuristics.push({ label: 'Official domain check passed', detail: analysis.indicators[0] ?? 'URL host matches a configured official domain.' });
    } else if (analysis.status === 'lookalike') {
      heuristics.push({ label: 'Potential brand impersonation', detail: 'The registered domain ' + analysis.registeredDomain + ' resembles a configured official domain without matching it.' });
    } else if (analysis.status === 'mismatch') {
      heuristics.push({ label: 'Brand/domain mismatch', detail: 'The message claims a known brand, but the registered URL domain is ' + analysis.registeredDomain + '.' });
    }
  }

  if (urls.length === 0) chips.push({ text: '✓ No External Link Detected', type: 'safe' });

  if (score === 0 || (score <= 1 && urlAnalyses.every((item) => item.status === 'trusted' || item.status === 'unknown'))) {
    chips.push({ text: '✓ No Critical Suspicious Signals', type: 'safe' });
    heuristics.push({ label: 'Baseline checks passed', detail: 'No high-confidence phishing, credential, payment, or impersonation signals were detected.' });
    recommendations.push({ label: 'Continue normal caution', detail: 'A low-risk result is not a guarantee of safety; independently verify unexpected requests.' });
  }

  if (recommendations.length === 0) {
    recommendations.push({ label: 'Verify independently', detail: 'Use the official app, saved contact, or manually entered website when a message asks for an important action.' });
  }

  return { score, chips, heuristics, recommendations, urlAnalyses, claimedBrands: claimedBrands.map((brand) => brand.brand) };
}
