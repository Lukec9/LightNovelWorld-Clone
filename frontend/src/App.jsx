import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LibraryPage from "./pages/LibraryPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AccountLayout from "./components/layouts/AccountLayout";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="sidebar-wrapper"></div>
      <main>
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route path="library" element={<LibraryPage />} />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path="browse" element={<BrowsePage />} />
        </Routes>
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
