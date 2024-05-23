import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";

/** IMPORT PAGES HERE **/
import Login from "./pages/Login";
import BaseWrapper from "./components/wrapper/BaseWrapper";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Singup";
import DeckPage from "./pages/deck/DeckPage";


const App:React.FC = () => {

    return (
        <Provider store={store}>

            <BaseWrapper>

                <Router>

                    <Routes>

                        <Route path="/" index element={<Login />} />

                        <Route path="/signup" element={<Signup />} />

                        <Route path="/dashboard" element={<Dashboard />}  />

                        <Route path="/deck/:id" element={<DeckPage />} />

                    </Routes>

                </Router>

            </BaseWrapper>

        </Provider>
    )
}

export default App;