# Offline 3D Choropleth Globe

Fully offline, mobile-first 3D spinnable world globe with choropleth country coloring by selectable metrics.

**Dark ambient aesthetic · Soft gentle colors · APK-ready**

## Status

- [x] Repository created
- [x] Project scaffolded (Expo + React Native)
- [x] **Real 3D globe integrated** (`@aeryflux/globe`) — dark surface, spin / pinch controls, country click → panel
- [ ] Full offline models (currently loads mobile-friendly model from CDN; will be bundled next)
- [ ] Metric-driven choropleth coloring + sample datasets
- [ ] Legend + richer country detail panel
- [ ] Performance step-downs for mid/low-end devices
- [ ] APK build + install test

## What’s working now

- Interactive 3D globe (drag to rotate, pinch to zoom)
- Soft dark ambient look with gentle country highlights
- Tap a country → name appears in the bottom panel
- Metric switcher UI (ready for data binding)
- Clean dark UI shell matching the brief

## Run it

```bash
npm install
npx expo start
```

Then open on a device / emulator (Android recommended).

> Note: First load may fetch the globe model from CDN. Offline packaging of the model is the next priority so the app works fully offline after install.

## Tech

- Expo (managed)
- `@aeryflux/globe` (Three.js based, Expo-compatible, country interaction + data highlighting)
- Dark ambient styling, soft low-saturation palette

## Roadmap (next sessions)

1. Bundle a small mobile GLB model for true offline use
2. Add sample public-domain-style metric data and drive country colors/scales from the active metric
3. Legend + improved detail panel
4. APK via EAS Build

## License

MIT (project code). Globe models / geographic data follow their upstream licenses (Natural Earth public domain roots).

---

Built iteratively with Grok. Multi-session development.
