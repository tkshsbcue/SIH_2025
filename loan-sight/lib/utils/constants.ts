export const APP_NAME = 'LoanSight';
export const APP_TAGLINE = 'Transparent evidence. Faster approvals.';

export const OTP_LENGTH = 6;
export const OTP_EXPIRY_SECONDS = 60;
export const DEMO_OTP = '123456';

export const UPLOAD_HELP_TITLE = 'How to capture evidence';
export const UPLOAD_HELP_BULLETS = [
  'Show the invoice/receipt clearly.',
  'Include the purchased asset in frame.',
  'Capture one close shot and one contextual shot.',
  'Ensure GPS is enabled for automatic location tagging.',
];

export const SYNC_RETRY_DELAYS = [1000, 3000, 5000, 10000]; // exponential backoff
export const MAX_SYNC_RETRIES = 3;

export const WIFI_ONLY_KEY = 'wifi_only_sync';
export const THEME_KEY = 'app_theme';
export const USER_SESSION_KEY = 'user_session';

