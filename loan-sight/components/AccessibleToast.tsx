import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string,
  description?: string
) => {
  Toast.show({
    type,
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 4000,
    topOffset: 50,
  });
};

export const ToastProvider: React.FC = () => {
  return <Toast />;
};

