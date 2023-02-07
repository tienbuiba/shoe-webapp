import Router from './routes';
import ThemeProvider from './theme';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ConfirmModal from './layouts/modal/ConfirmModal';
import Loading from './components/loading/Loading';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <BaseOptionChartStyle />
      <Loading />
      <Router />
      <ConfirmModal></ConfirmModal>
    </ThemeProvider>
  );
}
