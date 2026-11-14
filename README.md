# Offline 3D Choropleth Globe

Fully offline-capable, mobile-first 3D spinnable world globe with choropleth country coloring by selectable metrics.

**Dark ambient aesthetic · Soft gentle colors · APK-ready**

## Status

- [x] Repository created
- [x] Project scaffolded (Expo + React Native)
- [x] Real 3D globe integrated (`@aeryflux/globe`)
- [x] Sample metric data + dynamic choropleth coloring
- [x] Country tap → value shown in panel
- [x] Soft ambient color scale
- [x] **Legend component**
- [ ] True offline model bundling (code ready — just add the GLB file)
- [ ] APK build via EAS

## What’s working now

- Interactive 3D globe (drag to rotate, pinch to zoom)
- Soft dark ambient look with gentle country highlights
- 30 sample countries colored by the active metric
- Live recolor when switching metrics
- Tap country → name + formatted value
- Color legend under the globe
- Metric switcher + clean dark UI

## Run

```bash
git clone https://github.com/SamPlatypus/offline-3d-choropleth-globe
cd offline-3d-choropleth-globe
npm install
npx expo start
```

## Making the model fully offline (one-time step)

The code is prepared for a local model. Currently it still uses the small CDN model so the project runs immediately.

**To go fully offline:**

1. Download the mobile model (~1 MB):
   ```
   https://cdn.jsdelivr.net/npm/@aeryflux/globe@1.8.0/models/atlas_hex_subdiv_5L.glb
   ```

2. Create the folder and place the file:
   ```
   assets/models/atlas_hex_subdiv_5L.glb
   ```

3. In `App.tsx`, change the model line to:
   ```ts
   const MODEL_URL = require('./assets/models/atlas_hex_subdiv_5L.glb');
   ```

4. Restart Expo / rebuild.

After that the app needs no network after install.

## Project structure

```
App.tsx                 # Main screen + globe
components/Legend.tsx   # Soft color legend
data/sampleMetrics.ts   # Sample offline metrics + color helpers
metro.config.js         # Required for @aeryflux/globe
```

## Next recommended steps

- Add the GLB for true offline
- EAS Build → APK
- Optional: more countries, search, or auto-rotate toggle

## License

MIT (project code). Upstream globe models and Natural Earth-derived data follow their respective licenses.
