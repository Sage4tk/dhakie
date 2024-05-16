import { RouterProvider, createBrowserRouter } from "react-router-dom";

/** IMPORT PAGES HERE **/
import Login from "./pages/Login";


/** INITIATE PAGES HERE **/
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    }
]);

const App:React.FC = () => {
    return (<RouterProvider router={router} />)
}

export default App;