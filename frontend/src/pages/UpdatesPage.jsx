import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";
const UpdatesSection = lazy(() =>
  import("../components/UpdatesPageComp/UpdatesSection")
);
import "../styles/UpdatesPageStyles.css";

const UpdatesPage = () => {
  return (
    <div className="latest-updates">
      <div className="container">
        <Suspense fallback={<Spinner />}>
          <UpdatesSection />
        </Suspense>
      </div>
    </div>
  );
};

export default UpdatesPage;
