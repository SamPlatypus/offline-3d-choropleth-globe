import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

/**
 * Offline 3D Choropleth Globe - Foundation
 *
 * Dark ambient style. Soft gentle colors.
 * Next steps: integrate 3D globe (expo-gl + three / @aeryflux/globe / R3F),
 * load simplified country GeoJSON, apply choropleth, add metric switcher + panel.
 */

const METRICS = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Land Area' },
  { id: 'gdp_pc', label: 'GDP per Capita' },
] as const;

type MetricId = (typeof METRICS)[number]['id'];

export default function App() {
  const [metric, setMetric] = useState<MetricId>('population');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      {/* Placeholder for 3D Globe */}
      <View style={styles.globeContainer}>
        <View style={styles.globePlaceholder}>
          <Text style={styles.placeholderTitle}>3D Globe</Text>
          <Text style={styles.placeholderSub}>
            Spin · Pinch-zoom · Choropleth{('\n')}Coming in next session
          </Text>
          <Text style={styles.placeholderHint}>
            Metric: {METRICS.find((m) => m.id === metric)?.label}
          </Text>
        </View>
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

      {/* Side / Bottom Panel (placeholder) */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>
          {selectedCountry ? selectedCountry : 'Tap a country'}
        </Text>
        <Text style={styles.panelBody}>
          {selectedCountry
            ? `Details for current metric will appear here.`
            : 'Country details + legend will live in this panel.'}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  globePlaceholder: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: '#12121a',
    borderWidth: 1,
    borderColor: '#1e1e2a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderTitle: {
    color: '#e0e0e8',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderSub: {
    color: '#8888a0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  placeholderHint: {
    color: '#6a8a9a',
    fontSize: 13,
    marginTop: 16,
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
    minHeight: 100,
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
