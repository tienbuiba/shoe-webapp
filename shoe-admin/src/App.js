// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ConfirmModal from './layouts/modal/ConfirmModal';
import Loading from './components/loading/Loading';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Loading/>
      <Router />
      <ConfirmModal></ConfirmModal>      
    </ThemeProvider>
  );
}
