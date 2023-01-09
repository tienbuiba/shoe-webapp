import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Loading from './components/loading/Loading';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop/>
      <BaseOptionChartStyle/>
      <Loading/>  
      <Router/> 
    </ThemeProvider>
  );
}
