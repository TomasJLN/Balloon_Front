import './App.css';
// import Featured from './components/featured/Featured';
import Footer from './components/footer/Footer';
import { Header } from './components/header/Header';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      {/* <Featured /> */}
      <Footer />
    </div>
  );
}

export default App;
