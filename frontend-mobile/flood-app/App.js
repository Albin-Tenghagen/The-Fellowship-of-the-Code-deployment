import { ThemeProvider } from './themes/ThemeContext';
import Navigation from './navigation/Navigation';
import { DataProvider } from './context/DataContext';


export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
      <Navigation />
      </DataProvider>
    </ThemeProvider>
  );
}