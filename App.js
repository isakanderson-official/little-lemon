import { AppProvider } from './context/AppContext';
import Navigation from './navigation';

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
