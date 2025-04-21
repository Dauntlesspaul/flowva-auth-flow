/**
 * App Component
 * 
 * Manages the authentication views (Sign In, Sign Up, Reset Password) within a single-page layout.
 * Uses state (`page`) to switch between different modal-like views without page reloads or routing.
 * The `pages` object maps page names (e.g., "login", "signup", "resetPassword") to the respective components,
 * enabling easy navigation between them.
 * 
 * Key Features:
 * - Conditional rendering of different authentication forms (SignIn, SignUp, ResetPassword).
 * - State-driven page navigation using `setPage` to update the current view.
 * - Centralized handling of authentication UI components within a single container.
 */

import { useState } from "react";
import Signin from "./component/sign-in";
import Signup from "./component/sign-up";
import ResetPassword from "./component/forgot-password";

function App() {
  const [page, setPage] = useState<keyof typeof pages>("login");

  // Controls modal-like auth views (Sign In, Sign Up, Reset Password) within a single-page view
  // Uses a key-to-component map for clean, scalable switching without routing or page reloads
  const pages = {
    login: <Signin setPage={setPage} />,
    signup: <Signup setPage={setPage} />,
    resetPassword: <ResetPassword setPage={setPage} />,
  };

  return (
    <div className="container">
      <div className="card">{pages[page]}</div>
    </div>
  );
}

export default App;
