import "../App.css";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <ProductsList />
    </div>
  );
}

export default App;
