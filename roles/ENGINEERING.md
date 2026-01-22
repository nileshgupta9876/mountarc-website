# Engineering Role

## Focus
Implementation, code quality, testing, technical problem-solving.

## Responsibilities
- Implement features according to specs
- Write clean, maintainable code
- Write unit and integration tests
- Fix bugs and technical debt
- Code reviews

## Key Outputs
- Production code
- Unit tests
- Code documentation
- Pull requests

## Handoff Protocol

### Receiving Work
- From Architect: Design specs and ADRs
- From BA: Detailed specifications
- Clarify technical ambiguities before coding

### Handing Off
- To QA: Completed features for testing
- To DevOps: Deployment-ready code
- To Architect: Technical feedback

## Decision Authority
- Implementation details
- Code structure within design constraints
- Testing approach
- Refactoring scope

---

## Mobile Development Guidelines

This project includes **Android and iOS** mobile applications built with React Native.

### Platform Strategy

| Aspect | Approach |
|--------|----------|
| Framework | React Native (shared codebase) |
| Code Sharing | 85-90% shared between iOS and Android |
| Language | TypeScript |
| State Management | Redux/Context |

### Key Architecture Documents

| Document | Purpose |
|----------|---------|
| [ADR-001](../decisions/ADR-001-offline-first-mobile-architecture.md) | Offline-first architecture, SQLite, sync queue |
| [ADR-014](../decisions/ADR-014-ios-application-architecture.md) | iOS-specific architecture, APNs, Keychain, Face ID |
| [ADR-011](../decisions/ADR-011-razorpay-payment-gateway-integration.md) | Payment integration (Android + iOS SDKs) |

### Shared Code (src/)

All business logic, UI components, and services should be platform-agnostic:

```
src/
├── components/       # Shared UI components
├── screens/          # Shared screen components
├── services/         # Business logic (API, auth, sync, booking)
├── hooks/            # Shared React hooks
├── store/            # Redux/Context state
├── navigation/       # React Navigation config
├── utils/            # Shared utilities
└── types/            # TypeScript definitions
```

### Platform-Specific Code

#### Android (`android/`)
- Firebase Cloud Messaging (FCM) for push notifications
- Android Keystore for secure storage
- Fingerprint/Face Unlock biometric auth
- Google Play Store distribution

#### iOS (`ios/`)
- Apple Push Notification service (APNs)
- Keychain Services for secure storage
- Face ID / Touch ID biometric auth
- App Store / TestFlight distribution
- CocoaPods for dependencies

### Mobile Development Checklist

When implementing mobile features:

- [ ] Write shared code first (TypeScript in `src/`)
- [ ] Use platform detection (`Platform.OS`) only when necessary
- [ ] Create `.ios.tsx` / `.android.tsx` files for platform-specific components
- [ ] Test on both iOS Simulator and Android Emulator
- [ ] Test offline scenarios (airplane mode)
- [ ] Verify push notifications on both platforms
- [ ] Test biometric authentication on physical devices
- [ ] Run E2E tests (Detox) on both platforms

### Offline-First Requirements

Per ADR-001, the following operations must work offline:
- QR code scanning at all locations
- Trip status updates (STARTED, COMPLETED)
- Viewing today's assigned bookings

Implementation requirements:
- Store data in encrypted SQLite (SQLCipher)
- Queue offline events in sync queue
- Show staleness indicators in UI
- Sync opportunistically when connectivity returns

### iOS-Specific Requirements

Per ADR-014:

| Feature | Implementation |
|---------|----------------|
| Push Notifications | APNs via `@react-native-community/push-notification-ios` |
| Secure Storage | Keychain via `react-native-keychain` |
| Biometrics | Face ID/Touch ID via `react-native-biometrics` |
| QR Scanning | `react-native-camera` with iOS permissions |
| Payments | Razorpay iOS SDK |
| Offline DB | SQLite + SQLCipher |

### Testing Requirements

| Test Type | Tools | Coverage |
|-----------|-------|----------|
| Unit Tests | Jest | Business logic, services |
| Component Tests | React Native Testing Library | UI components |
| E2E Tests | Detox | Critical user flows |
| Platform Tests | Separate test suites | iOS and Android specific |

### Build & Release

| Platform | Beta Distribution | Production |
|----------|-------------------|------------|
| Android | Firebase App Distribution | Google Play Store |
| iOS | TestFlight | App Store |

CI/CD pipelines handle builds via GitHub Actions (see `.github/workflows/`).

---

*Last Updated: 2026-01-14*
