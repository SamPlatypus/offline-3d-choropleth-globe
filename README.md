# Offline 3D Choropleth Globe

Fully offline-capable, mobile-first 3D spinnable world globe with choropleth country coloring by selectable metrics.

**Dark ambient aesthetic · Soft gentle colors · APK-ready**

## Status

- [x] Repository created
- [x] Project scaffolded (Expo + React Native)
- [x] Real 3D globe integrated (`@aeryflux/globe`)
- [x] **Sample metric data + dynamic choropleth coloring** (Population / Land Area / GDP per Capita)
- [x] Country tap → value shown in panel
- [x] Soft ambient color scale
- [ ] **True offline model bundling** (currently uses the small mobile CDN model; see instructions below)
- [ ] Legend component
- [ ] APK build via EAS

## What’s working now

- Interactive 3D globe (drag to rotate, pinch to zoom)
- Soft dark ambient look
- 30 sample countries colored by the active metric (gentle blue-teal scale)
- Switch metrics → countries recolor live
- Tap country → name + formatted value in the bottom panel
- Metric switcher + clean dark UI

## Run

```bash
git clone https://github.com/SamPlatypus/offline-3d-choropleth-globe
cd offline-3d-choropleth-globe
npm install
npx expo start
```

## Making the model fully offline

The globe currently loads the lightweight mobile model from the package CDN:

```
https://cdn.jsdelivr.net/npm/@aeryflux/globe@1.8.0/models/atlas_hex_subdiv_5L.glb
```

(~1 MB – good for mobile)

**To ship fully offline:**

1. Download that file.
2. Place it at `assets/models/atlas_hex_subdiv_5L.glb`.
3. In `App.tsx` change `modelUrl` to the local asset (using `expo-asset` or a `require` / `Asset.fromModule` pattern).
4. Rebuild.

Once that is done the app needs no network after install.

## Sample Data

See `data/sampleMetrics.ts`. Values are illustrative / public-domain-style approximations for demo purposes only.

## Next

- Bundle the GLB for true offline
- Simple legend
- EAS APK build

## License

MIT (project code). Upstream globe models and Natural Earth-derived data follow their respective licenses.
