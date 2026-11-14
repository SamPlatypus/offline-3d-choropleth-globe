import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STOPS = [
  { label: 'Low', color: '#2a3a4a' },
  { label: '', color: '#3a5a6a' },
  { label: '', color: '#4a7a8a' },
  { label: '', color: '#5a9aaa' },
  { label: 'High', color: '#6ab8c8' },
];

interface LegendProps {
  metricLabel: string;
}

export function Legend({ metricLabel }: LegendProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metricLabel}</Text>
      <View style={styles.barRow}>
        {STOPS.map((stop, i) => (
          <View key={i} style={styles.stop}>
            <View style={[styles.swatch, { backgroundColor: stop.color }]} />
            {stop.label ? <Text style={styles.label}>{stop.label}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#0c0c14',
    borderTopWidth: 1,
    borderTopColor: '#1a1a24',
  },
  title: {
    color: '#8888a0',
    fontSize: 11,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  stop: {
    alignItems: 'center',
    flex: 1,
  },
  swatch: {
    width: '100%',
    height: 8,
    borderRadius: 2,
  },
  label: {
    color: '#666680',
    fontSize: 10,
    marginTop: 3,
  },
});
