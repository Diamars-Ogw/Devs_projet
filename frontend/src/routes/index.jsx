import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Auth
import Login from "@/pages/auth/Login";

// Director
import DirectorLayout from "@/pages/director/DirectorLayout";
import DirectorDashboard from "@/pages/director/Dashboard";

// Users
import UsersList from "@/pages/director/users/UsersList";
import CreateUser from "@/pages/director/users/CreateUser";
import EditUser from "@/pages/director/users/EditUser";

// Promotions
import PromotionsList from "@/pages/director/promotions/PromotionsList";
import CreatePromotion from "@/pages/director/promotions/CreatePromotion";
import EditPromotion from "@/pages/director/promotions/EditPromotion";

// Spaces
import SpacesList from "@/pages/director/spaces/SpacesList";
import CreateSpace from "@/pages/director/spaces/CreateSpace";
import EditSpace from "@/pages/director/spaces/EditSpace";
import EnrollStudents from "@/pages/director/spaces/EnrollStudents";

// Other
import InactiveAccounts from "@/pages/director/InactiveAccounts";
import Reports from "@/pages/director/reports/GeneralDomain";

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/director",
        element: (
          <ProtectedRoute allowedRoles={["DIRECTEUR"]}>
            <DirectorLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <DirectorDashboard /> },

          // Users
          { path: "users", element: <UsersList /> },
          { path: "users/create", element: <CreateUser /> },
          { path: "users/edit/:id", element: <EditUser /> },

          // Promotions
          { path: "promotions", element: <PromotionsList /> },
          { path: "promotions/create", element: <CreatePromotion /> },
          { path: "promotions/edit/:id", element: <EditPromotion /> },

          // Spaces
          { path: "spaces", element: <SpacesList /> },
          { path: "spaces/create", element: <CreateSpace /> },
          { path: "spaces/edit/:id", element: <EditSpace /> },
          { path: "spaces/:id/enroll", element: <EnrollStudents /> },

          // Other
          { path: "inactive-accounts", element: <InactiveAccounts /> },
          { path: "reports", element: <Reports /> },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
