import Router from './routes';
import ThemeProvider from './theme';
import Loading from './components/loading/Loading';
import ConfirmModal from './layouts/modal/ConfirmModal';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <Loading />
      <Router />
      <ConfirmModal></ConfirmModal>
    </ThemeProvider>
  );
}
