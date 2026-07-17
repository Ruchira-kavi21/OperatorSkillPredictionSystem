import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");

    if (!token) {

        return <Navigate to="/login" replace />;

    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (

        allowedRoles &&
        (!user || !allowedRoles.includes(user.role))

    ) {

        return <Navigate to="/unauthorized" replace />;

    }

    return children;

}

export default ProtectedRoute;