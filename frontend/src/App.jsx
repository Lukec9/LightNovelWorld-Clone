import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LibraryPage from "./pages/LibraryPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AccountLayout from "./components/layouts/AccountLayout";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import RankingPage from "./pages/RankingPage";
import RankingLayout from "./components/layouts/RankingLayout";
import UpdatesPage from "./pages/UpdatesPage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="sidebar-wrapper"></div>
      <main>
        {/* <div className="container"> */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route path="library" element={<LibraryPage />} />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="ranking" element={<RankingLayout />}>
            <Route index element={<RankingPage />} />
            <Route path="rating" element={<RankingPage />} />
            <Route path="reads" element={<RankingPage />} />
            <Route path="reviews" element={<RankingPage />} />
            <Route path="comments" element={<RankingPage />} />
            <Route path="collections" element={<RankingPage />} />
          </Route>
          <Route path="latest-updates" element={<UpdatesPage />} />
          <Route path="searchadv" element={<AdvancedSearchPage />} />
        </Routes>
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
