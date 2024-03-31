import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../pages/Home";
import Error from "../pages/Error";
import AddUser from "../features/users/AddUser";
import EditUser from "../features/users/EditUser";
import AllUsers from "../features/users/AllUsers";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Main/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "*",
                element : <Error/>
            },
            {
                path : "/add-user",
                element : <AddUser/>
            },
            {
                path : "/edit-user/:id",
                element : <EditUser/>
            },
            {
                path : "/all-users",
                element : <AllUsers/>
            }
        ]
    }
])


export default  router;