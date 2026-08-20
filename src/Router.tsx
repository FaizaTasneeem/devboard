import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RepoDetails from "./components/RepoDetails";
import { ErrorFallback } from "./components/ErrorFallback";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorFallback />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "repo/:owner/:name",
                element: <RepoDetails />,
            },
        ],
    },
]);

export default router;