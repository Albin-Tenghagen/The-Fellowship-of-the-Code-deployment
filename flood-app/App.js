import { ThemeProvider } from './themes/ThemeContext';
import Navigation from './navigation/Navigation';


export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}