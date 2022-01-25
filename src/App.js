import './App.css';
import { AppRouter } from './AppRouter';
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import ContactForm from './forms/Contact_form/ContactForm';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <AppRouter />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
