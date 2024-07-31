import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LibraryPage from "./pages/LibraryPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="sidebar-wrapper"></div>
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<LibraryPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
