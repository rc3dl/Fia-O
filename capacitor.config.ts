
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fiao.panama',
  appName: 'Fiao',
  webDir: 'dist',

  // Fondo rojo de FIA'O mientras carga la aplicación.
  backgroundColor: '#B91C1C',

  server: {
    androidScheme: 'https',
  },

  plugins: {
    SystemBars: {
      insetsHandling: 'disable',
      initialViewportFitValueHint: 'cover',
      hidden: true,
    },

    LocalNotifications: {
      smallIcon: 'ic_stat_fiao',
      iconColor: '#B91C1C',
    },
  },
};

export default config;
