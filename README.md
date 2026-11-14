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
- [x] Legend component
- [x] **Offline model path ready** (add the GLB file — see below)
- [ ] APK build via EAS

## Final offline step (required once)

The code now expects a local model:

```ts
const MODEL_URL = require('./assets/models/atlas_hex_subdiv_5L.glb');
```

**Do this once:**

1. Download the file (≈ 1.1 MB):
   ```
   https://cdn.jsdelivr.net/npm/@aeryflux/globe@1.8.0/models/atlas_hex_subdiv_5L.glb
   ```

2. Place it here:
   ```
   assets/models/atlas_hex_subdiv_5L.glb
   ```

3. Restart Expo / rebuild.

After that the app is fully offline.

> Tip: You can also drag-and-drop the file into the repo on GitHub under `assets/models/`.

## Run

```bash
git clone https://github.com/SamPlatypus/offline-3d-choropleth-globe
cd offline-3d-choropleth-globe
# add the GLB as described above
npm install
npx expo start
```

## What’s included

- Interactive 3D globe (drag + pinch)
- Metric switcher (Population / Land Area / GDP per Capita)
- Live choropleth recoloring with soft ambient palette
- Legend
- Country detail panel with formatted values
- 30 sample countries (illustrative offline data)

## License

MIT (project code). Upstream globe models follow their licenses.
