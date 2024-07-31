import TheLibrary from "../components/LibraryPageComp/TheLibrary";
import AccountContainer from "../components/AccountContainer";

import "../styles/LibraryPageStyles.css";
import "../styles/AccountContainerStyles.css";

const LibraryPage = () => {
  return (
    <>
      <AccountContainer />
      <TheLibrary />
    </>
  );
};

export default LibraryPage;
