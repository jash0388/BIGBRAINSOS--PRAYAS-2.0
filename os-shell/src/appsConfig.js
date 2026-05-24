import SystemDashboard from './components/apps/SystemDashboard';
import SettingsApp from './components/apps/SettingsApp';
import FileManager from './components/apps/FileManager';

export const desktopApps = [
  { name: 'Dashboard', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Activity_Monitor_Icon.png', type: 'native', Component: SystemDashboard },
  { name: 'Files', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mac_OS_X_Finder_icon.png', type: 'native', Component: FileManager },
  { name: 'VS Code', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
  { name: 'Browser', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg' },
  { name: 'Android Studio', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Android_Studio_Icon_3.6.svg' },
  { name: 'Terminal', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png' },
  { name: 'Settings', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Apple_Settings_icon_iOS_11.svg', type: 'native', Component: SettingsApp },
];
