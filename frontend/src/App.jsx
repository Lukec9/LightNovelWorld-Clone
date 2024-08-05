import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LibraryPage from "./pages/LibraryPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import RankingPage from "./pages/RankingPage";
import UpdatesPage from "./pages/UpdatesPage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";
import AccountPage from "./pages/AccountPages/AccountPage";
import AccountHistoryPage from "./pages/AccountPages/AccountHistoryPage";
import AccountCommentsPage from "./pages/AccountPages/AccountCommentsPage";

import AccountLayout from "./layouts/AccountLayout";
import RankingLayout from "./layouts/RankingLayout";
import AccountReviewsPage from "./pages/AccountPages/AccountReviewsPage";
import AccountInboxPage from "./pages/AccountPages/AccountInboxPage";

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
            <Route index element={<AccountPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="history" element={<AccountHistoryPage />} />
            <Route path="comments" element={<AccountCommentsPage />} />
            <Route path="reviews" element={<AccountReviewsPage />} />
            <Route path="inbox" element={<AccountInboxPage />} />
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
