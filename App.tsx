import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Globe } from '@aeryflux/globe/react-native';

/**
 * Offline 3D Choropleth Globe
 *
 * Dark ambient style · Soft gentle colors · Spinnable globe with country interaction
 *
 * Current: Real 3D globe (aeryflux) with controls + country click.
 * Next: Full offline models, metric-driven choropleth coloring, sample data values.
 */

const METRICS = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Land Area' },
  { id: 'gdp_pc', label: 'GDP per Capita' },
] as const;

type MetricId = (typeof METRICS)[number]['id'];

// Soft ambient demo highlights (gentle blues / teals / muted greens)
// These will later be driven by real metric values + color scale.
const DEMO_COUNTRY_DATA: Record<string, { scale: number; color?: string; extrusion?: number }> = {
  'United States': { scale: 0.85, color: '#5b8fa8', extrusion: 0.15 },
  China: { scale: 0.9, color: '#4a7c8c', extrusion: 0.12 },
  India: { scale: 0.8, color: '#6a9aaa', extrusion: 0.1 },
  Brazil: { scale: 0.75, color: '#5a8a7a', extrusion: 0.08 },
  Russia: { scale: 0.7, color: '#4a6a8a', extrusion: 0.1 },
  Japan: { scale: 0.65, color: '#7a9aaa', extrusion: 0.05 },
  Germany: { scale: 0.6, color: '#6a8a9a', extrusion: 0.05 },
  'United Kingdom': { scale: 0.55, color: '#5a7a8a', extrusion: 0.04 },
  France: { scale: 0.55, color: '#6a8aaa', extrusion: 0.04 },
  Australia: { scale: 0.5, color: '#5a8a7a', extrusion: 0.06 },
};

export default function App() {
  const [metric, setMetric] = useState<MetricId>('population');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // For now the demo data is static. Later this will recompute colors/scales from the active metric.
  const countryData = useMemo(() => DEMO_COUNTRY_DATA, []);

  const handleCountryClick = (name: string) => {
    setSelectedCountry(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      {/* 3D Globe */}
      <View style={styles.globeContainer}>
        <Globe
          surface="dark"
          showCountries
          showBorders
          enableControls
          rotationSpeed={0.00025}
          ambientIntensity={0.25}
          ambientColor="#6a9aaa"
          countryData={countryData}
          dataHighlightColor="#7ab8c8"
          onCountryClick={handleCountryClick}
          glowIntensity={0.5}
          bloomStrength={0.2}
          style={styles.globe}
        />
      </View>

      {/* Metric Switcher */}
      <View style={styles.metricBar}>
        {METRICS.map((m) => (
          <Text
            key={m.id}
            style={[styles.metricButton, metric === m.id && styles.metricButtonActive]}
            onPress={() => setMetric(m.id)}
          >
            {m.label}
          </Text>
        ))}
      </View>

      {/* Detail Panel */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>
          {selectedCountry ? selectedCountry : 'Tap a country on the globe'}
        </Text>
        <Text style={styles.panelBody}>
          {selectedCountry
            ? `Selected · Current metric: ${METRICS.find((m) => m.id === metric)?.label}. Full value + legend coming next.`
            : 'Spin and pinch to explore. Country details and metric values will appear here.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  globeContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  globe: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  metricBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#0f0f16',
    borderTopWidth: 1,
    borderTopColor: '#1a1a24',
  },
  metricButton: {
    color: '#777790',
    fontSize: 13,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  metricButtonActive: {
    color: '#a8c8d8',
    fontWeight: '600',
  },
  panel: {
    backgroundColor: '#0f0f16',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1a24',
    minHeight: 90,
  },
  panelTitle: {
    color: '#d0d0e0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  panelBody: {
    color: '#777790',
    fontSize: 13,
    lineHeight: 18,
  },
});
