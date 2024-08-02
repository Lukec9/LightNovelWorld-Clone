import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LibraryPage from "./pages/LibraryPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AccountLayout from "./components/layouts/AccountLayout";

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
        </Routes>
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
