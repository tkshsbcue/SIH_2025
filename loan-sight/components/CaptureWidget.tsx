import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { Card } from './Card';
import { colors, spacing, typography, borderRadius } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';
import { usePermissions } from '../lib/hooks/usePermissions';

interface CaptureWidgetProps {
  mode?: 'photo' | 'video';
  onCapture: (mediaUri: string, metadata: CaptureMetadata) => void;
}

export interface CaptureMetadata {
  location: { lat: number; lng: number };
  timestamp: string;
  deviceId: string;
}

export const CaptureWidget: React.FC<CaptureWidgetProps> = ({
  mode = 'photo',
  onCapture,
}) => {
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { theme } = useThemeStore();
  const themeColors = colors[theme];
  const { cameraPermission, locationPermission, requestCameraPermission, requestLocationPermission } = usePermissions();

  const handleCamera = async () => {
    if (!cameraPermission) {
      const granted = await requestCameraPermission();
      if (!granted) {
        Alert.alert('Permission Required', 'Camera access is needed to capture evidence.');
        return;
      }
    }

    setIsCapturing(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: mode === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setCapturedUri(uri);
        await captureWithMetadata(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleGallery = async () => {
    setIsCapturing(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mode === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setCapturedUri(uri);
        await captureWithMetadata(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setIsCapturing(false);
    }
  };

  const captureWithMetadata = async (uri: string) => {
    let location = { lat: 0, lng: 0 };

    if (!locationPermission) {
      const granted = await requestLocationPermission();
      if (granted) {
        const loc = await Location.getCurrentPositionAsync({});
        location = { lat: loc.coords.latitude, lng: loc.coords.longitude };
      }
    } else {
      const loc = await Location.getCurrentPositionAsync({});
      location = { lat: loc.coords.latitude, lng: loc.coords.longitude };
    }

    const metadata: CaptureMetadata = {
      location,
      timestamp: new Date().toISOString(),
      deviceId: 'demo-device-1',
    };

    onCapture(uri, metadata);
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="camera" size={32} color={themeColors.ink} />
        <Text style={[styles.title, { color: themeColors.ink }]}>
          Capture Evidence
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.mutedForeground }]}>
          Take a photo or select from gallery
        </Text>
      </View>

      {capturedUri && (
        <Image
          source={{ uri: capturedUri }}
          style={styles.preview}
          resizeMode="cover"
        />
      )}

      <View style={styles.buttons}>
        <Button
          title="Take Photo"
          onPress={handleCamera}
          variant="primary"
          loading={isCapturing}
          style={styles.button}
          testID="capture-photo"
        />
        <Button
          title="Choose from Gallery"
          onPress={handleGallery}
          variant="outline"
          loading={isCapturing}
          style={styles.button}
        />
      </View>

      <View style={[styles.infoBox, { backgroundColor: themeColors.muted, borderColor: themeColors.border }]}>
        <Ionicons name="information-circle" size={20} color={themeColors.mutedForeground} />
        <Text style={[styles.infoText, { color: themeColors.mutedForeground }]}>
          Location and timestamp will be automatically added
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.headline,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    backgroundColor: '#F4F4F5',
  },
  buttons: {
    gap: spacing.sm,
  },
  button: {
    width: '100%',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  infoText: {
    ...typography.caption,
    flex: 1,
  },
});

