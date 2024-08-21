import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

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
import AccountReviewsPage from "./pages/AccountPages/AccountReviewsPage";
import AccountInboxPage from "./pages/AccountPages/AccountInboxPage";
import NoticesPage from "./pages/NoticesPage";
import NovelPage from "./pages/NovelPages/NovelPage";
import AuthorsNovelsPage from "./pages/AuthorsNovelsPage";
import NovelReviews from "./pages/NovelPages/NovelReviews";
import NovelChapters from "./pages/NovelPages/NovelChapters";

import AccountLayout from "./layouts/AccountLayout";
import RankingLayout from "./layouts/RankingLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./pages/AuthPage";
import { useAuthContext } from "./context/AuthContext";
import Spinner from "./components/Spinner";
import NovelChapter from "./pages/NovelPages/NovelChapter";
import NotFound from "./pages/NotFound";

function App() {
  const { state } = useAuthContext();
  if (state.loading) return <Spinner />;

  return (
    <div className="app">
      <Header />
      <div className="sidebar-wrapper"></div>
      <main>
        {/* <div className="container"> */}
        <Routes>
          <Route index element={<HomePage />} />

          <Route
            path="account"
            element={state.user ? <AccountLayout /> : <Navigate to="/auth" />}
          >
            <Route index element={<AccountPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="history" element={<AccountHistoryPage />} />
            <Route path="comments" element={<AccountCommentsPage />} />
            <Route path="reviews" element={<AccountReviewsPage />} />
            <Route path="inbox" element={<AccountInboxPage />} />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route
            path="auth"
            element={!state.user ? <AuthPage /> : <Navigate to="/" />}
          />
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
          <Route path="notices" element={<NoticesPage />} />
          <Route path="novel/:nid">
            <Route index element={<NovelPage />} />
            <Route path="chapters" element={<NovelChapters />} />
            <Route path="chapters/:chapNum" element={<NovelChapter />} />
            <Route path="reviews" element={<NovelReviews />} />
          </Route>
          <Route path="author/:aname" element={<AuthorsNovelsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </div> */}
      </main>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
