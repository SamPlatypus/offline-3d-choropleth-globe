import React, { useState, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Sphere, OrbitControls } from '@react-three/drei/native';
import * as THREE from 'three';
import {
  MetricId,
  SAMPLE_METRICS,
  buildCountryData,
  getCountryValue,
  formatMetricValue,
} from './data/sampleMetrics';
import { Legend } from './components/Legend';

/**
 * Fully offline 3D Choropleth Globe
 * - No external models or network requests at runtime
 * - expo-gl + three + @react-three/fiber
 * - Spin / pinch via OrbitControls
 * - Countries shown as colored markers sized by metric
 * - Dark ambient style
 */

const METRICS: { id: MetricId; label: string }[] = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Land Area' },
  { id: 'gdp_pc', label: 'GDP per Capita' },
];

// Approximate lat/lon for the sample countries (for marker placement)
const COUNTRY_COORDS: Record<string, [number, number]> = {
  'United States': [39.8, -98.5],
  China: [35.9, 104.2],
  India: [20.6, 79.0],
  Brazil: [-14.2, -51.9],
  Russia: [61.5, 105.3],
  Japan: [36.2, 138.3],
  Germany: [51.2, 10.4],
  'United Kingdom': [55.4, -3.4],
  France: [46.2, 2.2],
  Australia: [-25.3, 133.8],
  Canada: [56.1, -106.3],
  Mexico: [23.6, -102.5],
  Indonesia: [-0.8, 113.9],
  Nigeria: [9.1, 8.7],
  Pakistan: [30.4, 69.3],
  Bangladesh: [23.7, 90.4],
  Philippines: [12.9, 121.8],
  Egypt: [26.8, 30.8],
  Vietnam: [14.1, 108.3],
  Turkey: [38.96, 35.24],
  Iran: [32.4, 53.7],
  Thailand: [15.9, 100.9],
  'South Africa': [-30.6, 22.9],
  Argentina: [-38.4, -63.6],
  Colombia: [4.6, -74.3],
  Spain: [40.5, -3.7],
  Italy: [41.9, 12.6],
  'South Korea': [35.9, 127.8],
  'Saudi Arabia': [23.9, 45.1],
  Poland: [51.9, 19.1],
};

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeScene({
  metric,
  selectedCountry,
  onSelect,
}: {
  metric: MetricId;
  selectedCountry: string | null;
  onSelect: (name: string) => void;
}) {
  const countryData = useMemo(() => buildCountryData(metric), [metric]);
  const groupRef = useRef<THREE.Group>(null);

  // Gentle auto-rotation when not interacting
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 3, 5]} intensity={0.9} />
      <directionalLight position={[-3, -2, -4]} intensity={0.25} />

      <group ref={groupRef}>
        {/* Base globe */}
        <Sphere args={[1.6, 48, 48]}>
          <meshStandardMaterial
            color="#12121c"
            roughness={0.85}
            metalness={0.1}
          />
        </Sphere>

        {/* Subtle atmosphere */}
        <Sphere args={[1.63, 32, 32]}>
          <meshBasicMaterial
            color="#1a2a3a"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Country markers */}
        {SAMPLE_METRICS.map((country) => {
          const coords = COUNTRY_COORDS[country.name];
          if (!coords) return null;
          const [lat, lon] = coords;
          const data = countryData[country.name];
          if (!data) return null;

          const pos = latLonToVector3(lat, lon, 1.65);
          const size = 0.03 + data.scale * 0.06;
          const isSelected = selectedCountry === country.name;

          return (
            <mesh
              key={country.name}
              position={pos}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(country.name);
              }}
            >
              <sphereGeometry args={[size, 12, 12]} />
              <meshStandardMaterial
                color={isSelected ? '#c0e8f0' : data.color}
                emissive={isSelected ? '#4a8a9a' : data.color}
                emissiveIntensity={isSelected ? 0.6 : 0.25}
                roughness={0.4}
              />
            </mesh>
          );
        })}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2.8}
        maxDistance={7}
        rotateSpeed={0.6}
        zoomSpeed={0.7}
      />
    </>
  );
}

export default function App() {
  const [metric, setMetric] = useState<MetricId>('population');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const selectedValue = selectedCountry
    ? getCountryValue(selectedCountry, metric)
    : null;

  const currentMetricLabel =
    METRICS.find((m) => m.id === metric)?.label ?? 'Metric';

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <View style={styles.globeContainer}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <GlobeScene
            metric={metric}
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
          />
        </Canvas>
      </View>

      <Legend metricLabel={currentMetricLabel} />

      <View style={styles.metricBar}>
        {METRICS.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => setMetric(m.id)}
            style={[styles.metricButton, metric === m.id && styles.metricButtonActive]}
          >
            <Text
              style={[
                styles.metricText,
                metric === m.id && styles.metricTextActive,
              ]}
            >
              {m.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>
          {selectedCountry ?? 'Tap a country marker'}
        </Text>
        {selectedCountry && selectedValue != null ? (
          <Text style={styles.panelValue}>
            {currentMetricLabel}: {formatMetricValue(selectedValue, metric)}
          </Text>
        ) : (
          <Text style={styles.panelBody}>
            {SAMPLE_METRICS.length} countries · drag to spin · pinch to zoom · tap marker
          </Text>
        )}
        <Text style={styles.panelHint}>
          Fully offline · Soft ambient palette · Sample data
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
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  metricButtonActive: {
    backgroundColor: '#1a2a34',
  },
  metricText: {
    color: '#777790',
    fontSize: 13,
  },
  metricTextActive: {
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
