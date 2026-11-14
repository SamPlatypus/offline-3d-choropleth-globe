import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Globe } from '@aeryflux/globe/react-native';
import {
  MetricId,
  buildCountryData,
  getCountryValue,
  formatMetricValue,
  SAMPLE_METRICS,
} from './data/sampleMetrics';
import { Legend } from './components/Legend';

/**
 * Offline 3D Choropleth Globe
 *
 * Dark ambient · Soft gentle colors · Metric-driven country coloring + legend
 *
 * OFFLINE MODEL:
 * Place the file at: assets/models/atlas_hex_subdiv_5L.glb
 * Download from:
 * https://cdn.jsdelivr.net/npm/@aeryflux/globe@1.8.0/models/atlas_hex_subdiv_5L.glb
 *
 * Once the file exists, the require() below makes the app fully offline.
 */

const METRICS: { id: MetricId; label: string }[] = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Land Area' },
  { id: 'gdp_pc', label: 'GDP per Capita' },
];

// Local offline model (preferred).
// If the file is missing you will get a Metro bundler error — that means you still need to add the GLB.
// Fallback CDN line is kept commented for reference.
const MODEL_URL = require('./assets/models/atlas_hex_subdiv_5L.glb');

// CDN fallback (only use while the local file is not yet present):
// const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@aeryflux/globe@1.8.0/models/atlas_hex_subdiv_5L.glb';

export default function App() {
  const [metric, setMetric] = useState<MetricId>('population');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countryData = useMemo(() => buildCountryData(metric), [metric]);

  const selectedValue = selectedCountry
    ? getCountryValue(selectedCountry, metric)
    : null;

  const currentMetricLabel =
    METRICS.find((m) => m.id === metric)?.label ?? 'Metric';

  const handleCountryClick = (name: string) => {
    setSelectedCountry(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <View style={styles.globeContainer}>
        <Globe
          surface="dark"
          showCountries
          showBorders
          enableControls
          rotationSpeed={0.00022}
          ambientIntensity={0.22}
          ambientColor="#6a9aaa"
          countryData={countryData}
          dataHighlightColor="#7ab8c8"
          onCountryClick={handleCountryClick}
          glowIntensity={0.45}
          bloomStrength={0.18}
          modelUrl={MODEL_URL}
          style={styles.globe}
        />
      </View>

      <Legend metricLabel={currentMetricLabel} />

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

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>
          {selectedCountry ?? 'Tap a country on the globe'}
        </Text>
        {selectedCountry && selectedValue != null ? (
          <Text style={styles.panelValue}>
            {currentMetricLabel}: {formatMetricValue(selectedValue, metric)}
          </Text>
        ) : (
          <Text style={styles.panelBody}>
            {SAMPLE_METRICS.length} sample countries · soft ambient scale · spin, pinch, tap
          </Text>
        )}
        <Text style={styles.panelHint}>
          Values are illustrative sample data for offline demo
        </Text>
      </View>
    </SafeAreaView>
  );
}

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
    paddingVertical: 10,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1a1a24',
  },
  panelTitle: {
    color: '#d0d0e0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  panelValue: {
    color: '#8ab8c8',
    fontSize: 15,
    marginBottom: 2,
  },
  panelBody: {
    color: '#777790',
    fontSize: 13,
    lineHeight: 18,
  },
  panelHint: {
    color: '#55556a',
    fontSize: 11,
    marginTop: 4,
  },
});
