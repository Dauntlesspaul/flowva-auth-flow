/**
 * Signup Component
 *
 * Handles user registration with email/password and Google login.
 * Includes password validation, strength meter, and confirmation check.
 * Displays messages for successful account creation or errors.
 *
 * Key Features:
 * - Password validation for strength (length, number, special character).
 * - Confirmation of password match during sign-up.
 * - Simulated Google login and account creation processes.
 * - Visual feedback on password strength and form submission status.
 *
 * Imports:
 * - `Flova`: App logo.
 * - `Google`: Google login icon.
 * - `Create`: Create account button icon.
 */

import { useState } from "react";
import Google, { Create, Flova } from "../assets/svg";

interface FormDetails {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Validation {
  message: string;
  strength: string;
}

export default function Signup({
  setPage,
}: {
  setPage: (page: "login" | "signup") => void;
}) {
  const [formData, setFormData] = useState<FormDetails>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<Validation>({
    message: "",
    strength: "",
  });

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [google, setGoogle] = useState<boolean>(false);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

  // Password validation function

  const validatePassword = (password: string) => {
    const lengthRegex = /.{8,}/; // Minimum 8 characters

    const numberRegex = /[0-9]/; // Must contain a number

    const specialCharRegex = /[*%$#@]/; // Must contain a special character

    if (!lengthRegex.test(password)) {
      setErrorMessage({
        message:
          "Use at least 8 characters with a mix of letters, numbers & symbols",
        strength: "weak",
      });
    } else if (
      !specialCharRegex.test(password) ||
      !numberRegex.test(password)
    ) {
      setErrorMessage({
        message:
          "Use at least 8 characters with a mix of letters, numbers & symbols",
        strength: "medium",
      });
    } else {
      setErrorMessage({
        message: "Strong password!",
        strength: "strong",
      });
    }
  };

  // Handling input field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "password") {
        validatePassword(value); // Validate password on change
      }

      return updatedForm;
    });
  };

  // Handling form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
      return;
    }

    // Simulate Submition
    setStatus("submitting");
    setPasswordMatchMessage("Creating your account...");

    // Simulate account creation delay
    setTimeout(() => {
      setStatus("success");
      setPasswordMatchMessage(
        "Account created successfully! Welcome to Flowva."
      );

      // Remove the success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setPasswordMatchMessage("");
      }, 3000);
    }, 1500);

    // Proceed with form submission (e.g., send to backend)
    console.log("Form submitted", formData);
  };

  // Handling Google login simulation
  const handleGoogle = () => {
    setGoogle(true);
    setTimeout(() => {
      setGoogle(false);
    }, 5000);
  };

  return (
    <form className="animate-form" onSubmit={handleSubmit}>
      <div className="logo">
        <Flova />
        Flowva
      </div>

      <div className="welcome">Join Flowva today</div>

      {/* Display error message if passwords do not match */}
      {status === "error" && (
        <div className="form-message error-message">Passwords do not match</div>
      )}

      {/* Display submitting or success message */}
      {(status === "submitting" || status === "success") && (
        <div className="form-message success-message">
          {passwordMatchMessage}
        </div>
      )}

      {/* Display Google login redirect message */}
      {google && (
        <div className="form-message success-message">
          Redirecting to Google...
        </div>
      )}

      {/* Email input */}
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="you@example.com"
          onChange={handleChange}
          required
        />
      </div>

      {/* Password input with strength meter */}
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input
          name="password"
          value={formData.password}
          type={passwordShow ? "text" : "password"}
          placeholder="••••••••"
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setPasswordShow(!passwordShow)}
          className="password-toggle"
        >
          {passwordShow ? "Hide" : "Show"}
        </button>

        {/* Password strength meter */}
        <div className="password-strength">
          <div
            className="strength-meter"
            style={{
              backgroundColor:
                errorMessage.strength === "strong"
                  ? "#4caf50"
                  : errorMessage.strength === "medium"
                  ? "#ffc107"
                  : errorMessage.strength === "weak"
                  ? "#ff5252"
                  : "",
              width:
                errorMessage.strength === "strong"
                  ? "100%"
                  : errorMessage.strength === "medium"
                  ? "66%"
                  : errorMessage.strength === "weak"
                  ? "33%"
                  : "",
            }}
          />
        </div>
        <p className="password-hint">{errorMessage.message}</p>
      </div>

      {/* Confirm Password input */}
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          name="confirmPassword"
          value={formData.confirmPassword}
          type={confirmPasswordShow ? "text" : "password"}
          placeholder="••••••••"
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
          className="password-toggle"
        >
          {confirmPasswordShow ? "Hide" : "Show"}
        </button>
      </div>

      <button type="submit" className="btn">
        <Create />
        Create account
      </button>

      <div className="divider">or continue with</div>

      {/* Google sign up button */}
      <button
        onClick={handleGoogle}
        type="button"
        className="btn btn-secondary"
        id="google-signup"
      >
        <Google />
        Google
      </button>

      {/* Footer with sign-in redirect */}
      <div className="form-footer">
        Already have an account?{" "}
        <button type="button" onClick={() => setPage("login")}>
          Sign in
        </button>
      </div>
    </form>
  );
}
