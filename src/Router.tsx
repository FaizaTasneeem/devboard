import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: 'repo/:owner/:name',
        element: <Dashboard />
    }
]);

export default router;