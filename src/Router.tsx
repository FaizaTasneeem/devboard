import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RepoDetails from "./components/RepoDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: 'repo/:owner/:name',
        element: <RepoDetails />
    }
]);

export default router;