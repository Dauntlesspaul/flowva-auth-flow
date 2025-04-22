/**
 * Signin Component
 *
 * Handles user sign-in with email/password or Google login.
 * Displays success or error messages based on the form's state.
 *
 * Key Features:
 * - Password validation to ensure correct format.
 * - Google login simulation with a visual feedback mechanism.
 * - Dynamic form inputs based on current status (idle, signing, welcome).
 * - Option to toggle password visibility and reset password.
 *
 * Imports:
 * - `Flova`: App logo.
 * - `Google`: Google login icon.
 * - `Sign`: Sign-in button icon.
 */

import { useState } from "react";
import Google, { Flova, Sign } from "../assets/svg";

export default function Signin({
  setPage,
}: {
  setPage: (page: "login" | "signup" | "resetPassword") => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState<boolean>(false);
  const [google, setGoogle] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "signing" | "welcome">("idle");

  const [authMessage, setAuthhMessage] = useState("");

  // Function to simulate Google login process
  const handleGoogle = () => {
    setGoogle(true);
    setTimeout(() => {
      setGoogle(false);
    }, 5000);
  };

  // Password must be at least 8 characters, include a number and a special character
  // This validation matches the format required at sign-up, ensuring consistency

  const validatePassword = (password: string): boolean => {
    const lengthRegex = /.{8,}/; // At least 8 characters
    const numberRegex = /[0-9]/; // Must contain at least one number
    const specialCharRegex = /[*%$#@]/; // Must contain one special character
    return (
      lengthRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  // Function to handle input changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password before allowing login
    // Ensures user credentials follow the same format as during sign-up

    if (!validatePassword(formData.password)) {
      setError("Invalid credentials");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    // Simulate Authorization
    setStatus("signing");
    setAuthhMessage("Signing in...");

    // Simulate account creation delay
    setTimeout(() => {
      setStatus("welcome");
      setAuthhMessage("Welcome back! Redirecting...");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setAuthhMessage("");
      }, 3000);
    }, 1500);

    // Proceed with form submission (e.g., send to backend)
    console.log("Form submitted", formData);
  };

  return (
    <form id="signin-form" className="animate-form" onSubmit={handleSubmit}>
      <div className="logo">
        <Flova />
        Flowva
      </div>

      <div className="welcome">Welcome back</div>

      {/* Display success or error messages based on form status */}
      {(status === "signing" || status === "welcome") && (
        <div className="form-message success-message">{authMessage}</div>
      )}

      {error && <div className="form-message error-message">{error}</div>}

      {/* Google login simulation */}
      {google && (
        <div className="form-message success-message">
          Redirecting to Google...
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={status !== "idle"}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type={show ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          disabled={status !== "idle"}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="password-toggle"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {/* Link to reset password if the user has forgotten it */}
      <div className="forgot-password">
        <button
          onClick={() => setPage("resetPassword")}
          type="button"
          disabled={status !== "idle"}
        >
          Forgot password?
        </button>
      </div>

      <button type="submit" className="btn" disabled={status !== "idle"}>
        <Sign />
        Sign in
      </button>

      <div className="divider">or continue with</div>

      {/* Google login button */}
      <button
        onClick={handleGoogle}
        type="button"
        className="btn btn-secondary"
        disabled={status !== "idle"}
      >
        <Google />
        Google
      </button>

      {/* Footer with a link to the sign-up page */}
      <div className="form-footer">
        Don't have an account?
        <button onClick={() => setPage("signup")} disabled={status !== "idle"}>
          Sign up
        </button>
      </div>
    </form>
  );
}
