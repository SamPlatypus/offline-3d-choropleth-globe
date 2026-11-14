# Offline 3D Choropleth Globe

Fully offline, mobile-first 3D spinnable world globe with choropleth country coloring by selectable metrics.

**Dark ambient aesthetic · Soft gentle colors · APK-ready**

## Status

- [x] Repository created
- [x] Project scaffolded (Expo + React Native + Three.js foundation)
- [ ] Core 3D globe with country boundaries
- [ ] Choropleth coloring + metric switcher
- [ ] Country selection + detail panel
- [ ] Sample offline datasets bundled
- [ ] Performance step-downs for mid/low-end devices
- [ ] APK build + install test

## Goals (from project prompt)

- Freely rotatable / pinch-zoomable 3D globe
- Map accurately wrapped; countries colored by metric
- Fully offline after install (all data + geometry bundled)
- Runs on real Android devices (mid-range target, with quality step-downs)
- Minimal dark theme, soft ambient lighting, gentle low-saturation colors
- Metric switcher, legend, side/bottom panel for selected country details
- Delivered as installable APK

## Tech Direction

- **Expo** (managed workflow preferred for easier APK generation)
- **React Native** + **expo-gl** / **expo-three** or **@react-three/fiber** + **three**
- Country geometry: simplified Natural Earth / public-domain GeoJSON or TopoJSON (bundled)
- Possible helper: `@aeryflux/globe` (Expo-compatible 3D globe with country support) or custom R3F implementation
- Sample metrics: population, land area, GDP per capita (public-domain style synthetic or open data)

## Getting Started (once code is in place)

```bash
npm install
npx expo start
```

Build APK (after EAS setup):

```bash
eas build -p android --profile preview
```

## License

MIT (project code). Country boundary data follows source licenses (Natural Earth is public domain).

---

Built iteratively from chat with Grok. Multi-session development expected.
