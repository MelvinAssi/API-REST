import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>        
        <AppRoutes/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
