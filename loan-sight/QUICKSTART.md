# Quick Start Guide - LoanSight

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd /Users/kumartanay/SIH_2025/loan-sight
npm install
```

### 2. Start the App
```bash
npm start
```

This will open Expo DevTools. You can then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

### 3. Login as Beneficiary

**Step 1**: On the login screen, enter:
- Phone: `+919876543210` (or just `9876543210`)
- Tap "Send OTP"

**Step 2**: Enter OTP:
- OTP: `123456` (shown on screen in demo mode)
- Tap "Verify OTP"

**You're in!** 🎉

### 4. Try Key Features

#### Upload Evidence
1. Tap the **camera icon** (floating button) or **Upload tab**
2. Take a photo or choose from gallery
3. Enter amount spent and notes
4. Tap **Save & Sync**

#### View Sync Status
1. Go to **Sync tab**
2. See all uploaded evidence
3. Check sync status (pending, synced, failed)
4. Retry failed uploads

#### Switch Theme
1. Tap **Settings** icon (top right on Home)
2. Toggle **Dark Mode**

### 5. Login as Officer

**Step 1**: From login screen, tap "I'm an Officer"

**Step 2**: Enter credentials:
- Username: `priyasharma`
- Password: `officer123`

**Step 3**: Review evidence:
1. See dashboard with all evidence
2. Tap any evidence card to review
3. Check AI validation status
4. Approve or Reject with comments

## 📱 Testing Checklist

- [ ] Login with phone OTP
- [ ] Upload photo evidence
- [ ] View evidence in sync manager
- [ ] Switch between light/dark theme
- [ ] Login as officer
- [ ] Review and approve evidence
- [ ] Check offline functionality (airplane mode)

## 🔧 Troubleshooting

### Camera/Location Permissions
The app will request permissions on first use. Make sure to allow:
- Camera access
- Photo library access
- Location access (when in use)

### Offline Sync
- Evidence is saved locally even without internet
- When connection returns, items auto-sync
- Can toggle "WiFi Only" in Settings

### Clear Data
To reset the app:
1. Go to Settings
2. Logout
3. Or clear app data from device settings

## 📚 More Demo Accounts

### Beneficiaries
- `+919876543210` - Asha Devi
- `+919876543211` - Rajesh Kumar
- `+919876543212` - Lakshmi Bai

### Officers
- Username: `priyasharma` / Password: `officer123`
- Username: `amitpatel` / Password: `officer123`

**All OTPs**: `123456`

## 🎯 Next Steps

1. **Connect to Supabase**: Replace mock services with real backend
2. **Implement Real AI**: Add actual ML validation
3. **Add Real Location Maps**: Integrate map view for evidence location
4. **Push Notifications**: Enable real push notifications
5. **Analytics**: Add tracking and monitoring

## 🐛 Known Limitations (Demo Mode)

- Mock data only (hardcoded beneficiaries, loans)
- No real backend (data in AsyncStorage)
- AI validation is simulated
- OTP is always `123456`
- Sync is simulated with delays

## 💡 Tips

- Use **WiFi Only** to save mobile data
- Check **Sync Manager** for upload status
- Officers can filter evidence by status
- Evidence auto-tagged with GPS + timestamp
- Supports light and dark themes

---

**Need help?** Check the main README.md for detailed documentation.

