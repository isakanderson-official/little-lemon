import { AppProvider } from './context/AppContext';
import Navigation from './navigation';

export default function App() {
  console.log('In App.js');
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
