# Offline 3D Choropleth Globe

**Fully offline** mobile 3D globe with metric-based country visualization.

Dark ambient style · Soft colors · Works with no network after install.

## Features

- Spinnable 3D globe (drag to rotate, pinch to zoom)
- Gentle auto-rotation
- 30 countries shown as colored markers sized & tinted by the selected metric
- Metrics: Population · Land Area · GDP per Capita
- Tap a marker → see the value in the bottom panel
- Soft ambient color legend
- Zero external network requests at runtime
- Ready for Android APK via EAS

## Run locally

```bash
npm install
npx expo start
```

Open on Android device or emulator.

## Build APK

1. Install EAS CLI if needed: `npm install -g eas-cli`
2. Log in: `eas login`
3. Configure (first time): `eas build:configure`
4. Build:
   ```bash
   eas build -p android --profile preview
   ```
5. Download the APK from the link EAS gives you and install on your phone.

The `eas.json` is already set to produce an APK.

## Technical

- Expo + React Native
- `expo-gl` + `three` + `@react-three/fiber` + `@react-three/drei`
- All data and geometry are local (no CDN models, no external tiles)
- Sample metrics in `data/sampleMetrics.ts` (illustrative)

## Project structure

```
App.tsx                 # Main screen + 3D scene
components/Legend.tsx   # Color legend
data/sampleMetrics.ts   # Offline sample data + color helpers
eas.json                # APK build profile
```

## License

MIT
