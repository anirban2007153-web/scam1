import { ScenarioData, ScanRecord } from '../types';

export const PRESET_SCENARIOS: Record<string, ScenarioData> = {
  kyc: {
    id: 'kyc',
    title: 'Bank KYC Phishing',
    subtitle: 'Suspicious link & urgency',
    text: 'URGENT! Your account will be blocked. Verify your KYC immediately at example.com',
    risk: 'HIGH RISK',
    category: 'Possible Phishing / Bank Impersonation',
    chips: [
      { text: '✕ Urgent Account Blocking Language', type: 'danger' },
      { text: '✕ Unverified Domain (example.com)', type: 'danger' },
      { text: '✕ Sensitive KYC / Identity Demand', type: 'danger' },
      { text: '✕ Psychological Panic Induction', type: 'danger' },
      { text: '⚠ Shortcode / Masked Sender', type: 'neutral' },
    ],
    heuristics: [
      {
        label: 'Ultimatum language',
        detail: 'Threatens that service or bank account will be blocked immediately.',
      },
      {
        label: 'Credential harvesting',
        detail: 'Demands immediate KYC verification over unverified external site.',
      },
      {
        label: 'Unverified external link',
        detail: 'Directs user to unofficial generic host (example.com).',
      },
      {
        label: 'Panic inducement',
        detail: 'Employs uppercase “URGENT!” to deter critical second thought.',
      },
    ],
    recommendations: [
      {
        label: 'Never share credentials',
        detail: 'Never share OTP, PIN, password, or banking credentials under any circumstance.',
      },
      {
        label: 'Official App Only',
        detail: 'Verify account status exclusively through your verified mobile banking application.',
      },
      {
        label: 'Do not tap external links',
        detail: 'Never click hyperlinked text messages from unknown contacts.',
      },
      {
        label: 'Report & Block',
        detail: 'Forward suspicious message to carrier spam shortcode (1909 or 7726) and block sender.',
      },
    ],
    keypadWarning: {
      title: '⚠️ ScamShield Warning',
      riskHeader: 'RISK: HIGH',
      summary: 'Possible phishing message.',
      instruction:
        'Do not open link or share OTP, PIN, password, or banking details. Verify only in official bank app.',
    },
  },

  electricity: {
    id: 'electricity',
    title: 'Electricity Urgent Cut',
    subtitle: 'Utility disconnect panic',
    text: 'Dear consumer, electricity bill unpaid. Power disconnect tonight 9PM unless paid at tinyurl.com/pay-power',
    risk: 'HIGH RISK',
    category: 'Utility Disconnection Extortion',
    chips: [
      { text: '✕ Same-Day Service Disconnection Threat', type: 'danger' },
      { text: '✕ Obfuscated Shortlink (tinyurl.com)', type: 'danger' },
      { text: '✕ Impersonating Municipal Utility', type: 'danger' },
      { text: '✕ False Emergency Pressure (Tonight 9PM)', type: 'danger' },
    ],
    heuristics: [
      {
        label: 'Panic deadline',
        detail: 'Forces hurried payment by threatening immediate power cutoff tonight.',
      },
      {
        label: 'Obfuscated URL',
        detail: 'Shortened link obscures destination server to hide credential phishing form.',
      },
      {
        label: 'Payment bypass',
        detail: 'Directs money transfer outside authorized state electric grid billing software.',
      },
    ],
    recommendations: [
      {
        label: 'Do not pay via link',
        detail: 'Utility providers never mandate bill payment through shortened external URLs.',
      },
      {
        label: 'Verify on physical bill',
        detail: 'Inspect your consumer ID through your official local power utility app or physical bill.',
      },
      {
        label: 'Report extortion',
        detail: 'Flag number to consumer protection fraud portals.',
      },
    ],
    keypadWarning: {
      title: '⚠️ ScamShield Warning',
      riskHeader: 'RISK: HIGH',
      summary: 'Utility disconnect fraud.',
      instruction:
        'Power boards never disconnect via SMS links. Never pay outside official utility counters.',
    },
  },

  prize: {
    id: 'prize',
    title: 'Prize / Lottery Hook',
    subtitle: 'Advance fee solicitation',
    text: 'Congratulations! You have been selected for a reward of $10,000. Contact claim manager to claim your prize.',
    risk: 'MEDIUM RISK',
    category: 'Advance-Fee / Lottery Hook',
    chips: [
      { text: '⚠ Unsolicited Cash Prize Lure', type: 'warning' },
      { text: '⚠ Advance Fee Solicitation Trap', type: 'warning' },
      { text: '⚠ Unverified Claim Manager Contact', type: 'warning' },
      { text: '⚠ Zero Prior Participation Record', type: 'warning' },
    ],
    heuristics: [
      {
        label: 'Unearned lottery claim',
        detail: 'Claims monetary reward without prior lottery participation or ticket purchase.',
      },
      {
        label: 'Advance fee indicator',
        detail: 'Typically primes victim to pay "processing charges" or "taxes" before release.',
      },
      {
        label: 'Generic salutation',
        detail: 'No personalized recipient details; broadcast to wide candidate pool.',
      },
    ],
    recommendations: [
      {
        label: 'Never pay advance fees',
        detail: 'Legitimate lotteries and sweepstakes never require processing fees to collect prize money.',
      },
      {
        label: 'Do not call back',
        detail: 'Calling back verifies your phone number is active for subsequent social engineering calls.',
      },
      {
        label: 'Delete & ignore',
        detail: 'Delete message immediately and do not engage with sender.',
      },
    ],
    keypadWarning: {
      title: '⚠️ ScamShield Warning',
      riskHeader: 'RISK: MEDIUM',
      summary: 'Advance-fee lottery hook.',
      instruction:
        'Never pay fees or advance tax to claim prizes. Delete SMS and do not call the sender.',
    },
  },

  doctor: {
    id: 'doctor',
    title: 'Doctor Appointment',
    subtitle: 'Legitimate confirmation',
    text: 'Doctor appointment reminder: Dr. Sharma at Apex Clinic tomorrow at 10:30 AM. Reply N to reschedule.',
    risk: 'LOW RISK',
    category: 'Legitimate / Low Risk Routine Notice',
    chips: [
      { text: '✓ No External Links Included', type: 'safe' },
      { text: '✓ No Sensitive Credential Demand', type: 'safe' },
      { text: '✓ Standard Informational Tone', type: 'safe' },
      { text: '✓ Transparent Reschedule Option', type: 'safe' },
    ],
    heuristics: [
      {
        label: 'No credential demands',
        detail: 'Contains no solicitations for banking passwords, OTPs, or credit card numbers.',
      },
      {
        label: 'Zero unverified links',
        detail: 'Message does not divert user to off-platform login screens or external forms.',
      },
      {
        label: 'Routine service tone',
        detail: 'Context matches standard scheduled health appointment reminders.',
      },
    ],
    recommendations: [
      {
        label: 'Routine Vigilance',
        detail: 'Message appears standard. As standard practice, never text passwords or payment PINs.',
      },
      {
        label: 'Direct Phone Confirmation',
        detail: 'If unsure of appointment date, call clinic desk through official saved directory number.',
      },
    ],
    keypadWarning: {
      title: 'ℹ ScamShield Notice',
      riskHeader: 'RISK: LOW',
      summary: 'Standard routine notice.',
      instruction:
        'No immediate threats detected. Reminder: never text banking PINs or OTP passwords.',
    },
  },
};

export const INITIAL_HISTORY_RECORDS: ScanRecord[] = [
  {
    id: 'rec-1',
    timestamp: 'Just Now',
    relativeTime: 'Just Now',
    message: 'URGENT! Your account will be blocked. Verify your KYC immediately at example.com',
    risk: 'HIGH RISK',
    category: 'Possible Phishing / Bank Impersonation',
    indicatorCount: 4,
    scenarioKey: 'kyc',
  },
  {
    id: 'rec-2',
    timestamp: '12 mins ago',
    relativeTime: '12 mins ago',
    message: 'Congratulations! You have won $10,000 lottery bonus. Contact claim manager to release payment.',
    risk: 'MEDIUM RISK',
    category: 'Advance-Fee / Lottery Hook',
    indicatorCount: 2,
    scenarioKey: 'prize',
  },
  {
    id: 'rec-3',
    timestamp: '35 mins ago',
    relativeTime: '35 mins ago',
    message: 'Doctor appointment reminder: Dr. Sharma at Apex Clinic tomorrow at 10:30 AM. Reply N to reschedule.',
    risk: 'LOW RISK',
    category: 'Legitimate / Low Risk Routine Notice',
    indicatorCount: 0,
    scenarioKey: 'doctor',
  },
  {
    id: 'rec-4',
    timestamp: '1 hour ago',
    relativeTime: '1 hour ago',
    message: 'Dear consumer, electricity bill unpaid. Power disconnect tonight 9PM unless paid at tinyurl.com/pay-power',
    risk: 'HIGH RISK',
    category: 'Utility Disconnection Extortion',
    indicatorCount: 4,
    scenarioKey: 'electricity',
  },
];

export function evaluateCustomMessage(rawText: string): ScenarioData {
  const trimmed = rawText.trim();
  const lower = trimmed.toLowerCase();

  // Check matching against preset scenario triggers first
  if (lower.includes('kyc') || (lower.includes('account') && (lower.includes('block') || lower.includes('suspend') || lower.includes('urgent')))) {
    return {
      ...PRESET_SCENARIOS.kyc,
      text: trimmed,
    };
  }
  if (lower.includes('electricity') || lower.includes('power disconnect') || lower.includes('unpaid bill') || lower.includes('tinyurl.com/pay-power')) {
    return {
      ...PRESET_SCENARIOS.electricity,
      text: trimmed,
    };
  }
  if (lower.includes('lottery') || lower.includes('$10,000') || lower.includes('selected for a reward') || lower.includes('claim prize')) {
    return {
      ...PRESET_SCENARIOS.prize,
      text: trimmed,
    };
  }
  if (lower.includes('doctor appointment') || lower.includes('dr. sharma') || lower.includes('apex clinic')) {
    return {
      ...PRESET_SCENARIOS.doctor,
      text: trimmed,
    };
  }

  // Dynamic Heuristic Rule Engine
  let threatScore = 0;
  const chips: ScenarioData['chips'] = [];
  const heuristics: ScenarioData['heuristics'] = [];
  const recommendations: ScenarioData['recommendations'] = [];

  // Rule 1: Panic & Urgency
  const hasUrgency = /(urgent|immediately|action required|suspended|blocked|freeze|arrest|terminate|police|24 hours|tonight|deadline)/i.test(trimmed);
  if (hasUrgency) {
    threatScore += 3;
    chips.push({ text: '✕ High-Urgency Panic Pressure', type: 'danger' });
    heuristics.push({
      label: 'Artificial Urgency Trap',
      detail: 'Creates artificial time-pressure to force impulsive compliance before verification.',
    });
  }

  // Rule 2: Sensitive Financial & Credential Demands
  const hasCredentialDemand = /(otp|pin|password|kyc|bank account|debit card|credit card|cvv|ssn|pan card|verify identity|netbanking)/i.test(trimmed);
  if (hasCredentialDemand) {
    threatScore += 4;
    chips.push({ text: '✕ Credential / Identity Demand', type: 'danger' });
    heuristics.push({
      label: 'Credential Harvesting',
      detail: 'Solicits high-security authentication codes, KYC documents, or banking tokens.',
    });
    recommendations.push({
      label: 'Zero Trust for Credentials',
      detail: 'Official institutions will never solicit PINs, passwords, or OTPs via SMS.',
    });
  }

  // Rule 3: Links and Obfuscated URLs
  const hasUrl = /(https?:\/\/|www\.|bit\.ly|tinyurl|\.com\/|\.xyz|\.top|\.ru|\.link|\.vip|[a-z0-9-]+\.(me|cc|pw|live))/i.test(trimmed);
  if (hasUrl) {
    threatScore += 3;
    chips.push({ text: '✕ External Hyperlink Detected', type: 'danger' });
    heuristics.push({
      label: 'Off-Platform Redirection',
      detail: 'Redirects recipient to an external web destination outside verified banking apps.',
    });
    recommendations.push({
      label: 'Never Tap Links',
      detail: 'Always navigate directly to the verified service provider via bookmarks or official apps.',
    });
  }

  // Rule 4: Lottery, Free Money, or Unsolicited Job / Gifts
  const hasLure = /(won|winner|lottery|reward|prize|\$|usd|free cash|guaranteed return|work from home|part time job|crypto profit)/i.test(trimmed);
  if (hasLure) {
    threatScore += 2;
    chips.push({ text: '⚠ Unsolicited Financial Lure', type: 'warning' });
    heuristics.push({
      label: 'Financial Baiting',
      detail: 'Entices victim with promises of unexpected windfalls, gifts, or fast payments.',
    });
    recommendations.push({
      label: 'Refuse Advance Payments',
      detail: 'Legitimate opportunities never demand processing deposits or registration fees.',
    });
  }

  // Rule 5: Package / Delivery Traps
  const hasDelivery = /(parcel|package|fedex|ups|dhl|postal|customs fee|delivery pending|address updated)/i.test(trimmed);
  if (hasDelivery) {
    threatScore += 2;
    chips.push({ text: '⚠ Delivery Impersonation Pattern', type: 'warning' });
    heuristics.push({
      label: 'Postal Impersonation',
      detail: 'Simulates package delivery failure to elicit small payment or identity confirmation.',
    });
  }

  // Determine Risk Tier
  let risk: ScenarioData['risk'] = 'LOW RISK';
  let category = 'Informational / Low Risk Routine Notice';

  if (threatScore >= 4) {
    risk = 'HIGH RISK';
    category = hasCredentialDemand
      ? 'Critical Phishing / Credential Theft Vector'
      : (hasUrgency ? 'High-Risk Social Engineering / Extortion' : 'Suspicious Malicious Link');
  } else if (threatScore >= 2) {
    risk = 'MEDIUM RISK';
    category = hasLure ? 'Advance-Fee / Promotional Solicitation' : 'Unverified Notice with Warning Indicators';
  } else {
    risk = 'LOW RISK';
    category = 'Standard Routine Message / No Urgent Flags';
    chips.push({ text: '✓ No Critical Urgency Detected', type: 'safe' });
    chips.push({ text: '✓ No Sensitive Credential Demand', type: 'safe' });
    heuristics.push({
      label: 'Baseline Checks Passed',
      detail: 'Message text does not demonstrate typical aggressive phishing triggers.',
    });
    recommendations.push({
      label: 'Continuous Vigilance',
      detail: 'Remain mindful even with low-risk texts; never share confidential authentication tokens.',
    });
  }

  // Add default safety recommendations if empty
  if (recommendations.length === 0) {
    recommendations.push(
      {
        label: 'Official App Verification',
        detail: 'Confirm any unexpected account activity via official applications or direct customer support.',
      },
      {
        label: 'Report Spam',
        detail: 'Report unsolicited communications to your mobile operator’s spam line (7726 or 1909).',
      }
    );
  }

  return {
    id: `custom-${Date.now()}`,
    title: 'Custom Evaluation',
    subtitle: 'Dynamic Heuristic Analysis',
    text: trimmed,
    risk,
    category,
    chips,
    heuristics,
    recommendations,
    keypadWarning: {
      title: risk === 'LOW RISK' ? 'ℹ ScamShield Notice' : '⚠️ ScamShield Warning',
      riskHeader: `RISK: ${risk}`,
      summary: risk === 'LOW RISK' ? 'No urgent threats detected in message.' : 'Suspicious phishing indicators flagged.',
      instruction: risk === 'LOW RISK' 
        ? 'No immediate risks found. Never disclose PINs or OTP passwords.' 
        : 'Do not click external links or disclose banking codes. Verify in official app.',
    },
  };
}
