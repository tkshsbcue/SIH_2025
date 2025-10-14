# LoanSight - Loan Utilization Tracker

A production-quality, mobile-first React Native app for tracking loan utilization with beneficiary evidence uploads, officer review, offline sync, and AI validation placeholders.

## Features

### For Beneficiaries
- 📱 Phone + OTP authentication
- 📸 Evidence capture with auto geo-tagging and timestamps
- 💾 Offline-first with sync queue management
- 📊 Loan dashboard with upload timeline
- 🔄 Manual and automatic sync with WiFi/cellular control

### For Officers
- 🔐 Officer portal with secure login
- 📋 Evidence review dashboard with filters
- ✅ Approve/Reject workflow with comments
- 🤖 AI validation status (stubbed for future integration)
- 📈 Analytics and counts dashboard

### General
- 🌗 Light/Dark theme support
- ♿ Accessible UI (WCAG compliant)
- 🎨 PhonePe-inspired clean mobile design
- 📱 React Navigation with bottom tabs
- 🗄️ Zustand for state management
- 🔌 Offline-first architecture

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Storage**: AsyncStorage
- **Media**: Expo Image Picker, Location
- **UI**: Custom components with accessibility
- **Notifications**: React Native Toast Message

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- Expo Go app (for testing on device)

### Installation

1. Clone the repository
```bash
cd loan-sight
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on your preferred platform
```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

## Demo Credentials

### Beneficiaries
- Phone: `+919876543210` (or any from mock data)
- OTP: `123456`

### Officers
- Username: `priyasharma` (or `amitpatel`)
- Password: `officer123`

## Project Structure

```
loan-sight/
├── app/
│   ├── navigation/          # Navigation setup
│   └── screens/             # All screens
│       ├── Auth/            # Phone login, OTP
│       ├── Beneficiary/     # Home dashboard
│       ├── Upload/          # Evidence capture, sync
│       ├── Officer/         # Dashboard, review
│       └── Notifications/   # Notification center
├── components/              # Reusable UI components
├── lib/
│   ├── services/            # Mock backend services
│   ├── stores/              # Zustand stores
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Theme, constants
│   └── types.ts             # TypeScript types
└── App.tsx                  # Root component
```

## Key Components

### Services (Hardcoded/Mock)
- `authService` - Phone OTP and officer login
- `evidenceService` - Evidence CRUD and sync queue
- `loanService` - Loan management
- `officerService` - Evidence review and decisions
- `validationService` - AI validation stub

### Stores
- `authStore` - User session management
- `syncStore` - Offline sync queue
- `themeStore` - Light/Dark theme

### Screens
- **Auth**: PhoneLogin, OtpVerify, OfficerLogin
- **Beneficiary**: Home (dashboard), RecordEvidence, SyncManager
- **Officer**: Dashboard, ReviewEvidence
- **Common**: Settings, Notifications

## Offline Functionality

The app supports offline-first architecture:
- Evidence drafts saved to AsyncStorage
- Sync queue with retry logic
- WiFi-only sync option
- Network status indicator
- Manual and automatic sync

## Future Integration (Supabase)

Currently using hardcoded mock services. When ready to connect to Supabase:

1. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

2. Replace mock services in `lib/services/` with Supabase queries
3. Update `.env` with Supabase URL and keys
4. Implement real-time subscriptions for officer dashboard

## Accessibility

- Minimum touch target size: 44x44
- Screen reader support (accessibilityLabel)
- High contrast ratios (WCAG AA)
- Toast announcements (accessibilityLiveRegion)
- Keyboard navigation support

## Theme

The app uses a PhonePe-inspired design language:
- Primary: `#0066FF`
- Accent: `#00A86B`
- Warning: `#FFB020`
- Error: `#EF4444`

## License

MIT

## Contact

For questions or support, contact the development team.

