import Router from './routes';
import ThemeProvider from './theme';
import Loading from './components/loading/Loading';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <Loading />
      <Router />
    </ThemeProvider>
  );
}
