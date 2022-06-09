import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProfileHome from "./components/ProfileHome";
import MyNavBar from "./components/MyNavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyFooter from "./components/MyFooter";
import NotFound from "./components/NotFound";
import Details from "./components/Details";
import NewsFeed from "./components/NewsFeed";

const App = () => {
  return (
    <BrowserRouter>
      <div className="linkedIn-body">
        <MyNavBar />
        <Routes>
          <Route path="/" element={<ProfileHome />} />
          <Route path="/details/:username/:id" element={<Details />} />
          <Route path="/feed" element={<NewsFeed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
