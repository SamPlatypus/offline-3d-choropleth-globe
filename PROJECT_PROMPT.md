# Master Build Prompt (Locked)

**Project: Offline 3D Choropleth Globe (Mobile APK)**

**Goal**  
Create a fully offline, mobile-first 3D spinnable globe with a choropleth world map wrapped around it. Countries are colored by selectable metrics. The app must run well on mid-to-low-end Android devices, require no internet after install, and be delivered as an installable APK. Multi-session development is expected. Code lives in this repository.

**Core Requirements (Priority Order)**

1. **3D Globe**
   - Freely rotatable/spinnable sphere with country map accurately wrapped around it.
   - Touch drag to rotate with light inertia.
   - Pinch-to-zoom.
   - Optional gentle auto-rotation toggle.
   - Clean country borders that remain readable at different zoom levels.
   - Target smooth performance (30+ fps) on mid-range Android. Lower geometry/texture quality on weaker devices is acceptable and expected.

2. **Choropleth + Data**
   - Countries colored by the currently selected metric.
   - Simple metric switcher (segmented control, buttons, or lightweight dropdown — keep it practical).
   - Bundle 2–3 clean public-domain-style sample datasets (examples: population, land area, GDP per capita or similar). All data ships inside the app.
   - Clear, readable color legend.
   - Distinct visual states for selected, tapped/hovered, and unselected countries.

3. **Interaction & Information**
   - Tap a country → highlight it and open a side panel or bottom sheet showing the country name + values for the current metric (and any other key sample fields).
   - Lightweight tooltips or labels on interaction.
   - Smooth, responsive feel even on older phones.

4. **Visual Style**
   - Minimal, dark theme.
   - Soft ambient lighting / gentle atmosphere.
   - Soft, low-saturation, gentle colors for the choropleth (avoid harsh neons or high-contrast clashing hues).
   - Clear visual hierarchy and good readability of legend + side panel against the dark background.

5. **Technical Constraints**
   - Fully offline after install. No external map tiles or data fetches at runtime.
   - Any stack is acceptable as long as it produces a reliable Android APK.
   - Prefer solutions that keep the binary reasonably lightweight.
   - Include basic performance step-downs (reduced polygon count, texture resolution, or effects) for lower-end devices.

6. **Delivery**
   - Working APK that can be sideloaded.
   - Complete source in this GitHub repository.
   - Clear README covering: how to run locally, how to build the APK, data sources used, and any performance notes.

**Out of Scope for Initial Version**  
Advanced search, flying camera animations, multiple color themes, high-end PBR materials, or complex animations. These can be added later once the core offline 3D choropleth globe is solid.

**Success Criteria for First Working Version**  
- Globe spins and zooms smoothly on a real Android device.  
- Metrics can be switched and countries recolor correctly.  
- Tapping a country shows details.  
- Everything works with airplane mode on.  
- APK installs and runs.  
- Code is in this repo with a usable README.
