## Today's Progress:

### 2025/04/02

- Created user stories  
- Built the app skeleton  
- Worked with Figma, selecting colors and fonts  
- Started working on the React Native map structure  
- Created a backlog in the GitHub project  

### 2025/04/09

## Installation & Setup

- The project **`flood-app`** was created following the installation guide 
- Used `npx create-expo-app` to scaffold the project
- Started with `npx expo start` using Metro Bundler
- Tested in a physical mobile device via **Expo Go**

## Installed Packages

### Main Dependencies (`dependencies`)
| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | `~52.0.43` | React Native framework via Expo |
| `react` | `^18.3.1` | React library |
| `react-native` | `0.76.9` | Core mobile components |
| `@react-navigation/native` | `^7.1.6` | Navigation handling |
| `@react-navigation/bottom-tabs` | `^7.3.10` | Bottom tab navigation |
| `react-native-screens` | `^4.10.0` | Screen optimization |
| `react-native-safe-area-context` | `^4.12.0` | Safe area handling |
| `expo-status-bar` | `~2.0.1` | Status bar styling |
| `expo-font` | `~13.0.4` | Font loading |
| `@expo/metro-runtime` | `~4.0.1` | Web runtime support |
| `react-native-web` | `~0.19.13` | Web compatibility |
| `react-dom` | `^18.3.1` | Web rendering |
| `date-fns` | `^4.1.0` | Date utility library |

## UI, logic, navigation, and theming

### Navigation Setup

- Three initial screens created:
  - `HomeScreen.js`
  - `ProfileScreen.js`
  - `SettingsScreen.js`
- Navigation set up using **stack** and **bottom tab navigators**

### Light/Dark Theme Base

- Basic support for theme switching included
- Either using `react-native-paper` or a custom solution in `/themes`
- Allows for **manual toggle** or **system-based** theme detection
