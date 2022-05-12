import "../App.css";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import Footer from "../components/Footer";
import ProductsError from "../components/ProductsError";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <ProductsList />
      <Footer />
      <ProductsError />
    </div>
  );
}

export default App;
