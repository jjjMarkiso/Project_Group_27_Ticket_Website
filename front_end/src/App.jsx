import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main.jsx";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import FilterPage from "./pages/filteredmain.jsx";
import AccountPage from "./pages/account.jsx";
import DetailsPage from "./pages/details.jsx";
import BillingInfoPage from "./pages/billing.jsx";
import './App.css'

function App() {

    return(
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/billing" element={<BillingInfoPage />} />
        </Routes>
      </Router>
    );
}

export default App
