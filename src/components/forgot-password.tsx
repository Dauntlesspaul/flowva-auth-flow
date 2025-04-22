/**
 * ResetPassword Component
 *
 * Allows users to reset their password by entering their email. Shows loading and success messages.
 *
 * Imports:
 * - `Envelope`: Icon for the reset button.
 * - `Flova`: App logo.
 */

import { useState } from "react";
import { Envelope, Flova } from "../assets/svg";

export default function ResetPassword({
  setPage,
}: {
  setPage: (page: "login" | "signup" | "resetPassword") => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [authMessage, setAuthhMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Simulate password reset
    setStatus("loading");
    setAuthhMessage("Sending reset link...");
    // Simulate delay
    setTimeout(() => {
      setStatus("success");
      setAuthhMessage("Reset link sent to your email");
      // Remove the success message after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setAuthhMessage("");
      }, 3000);
    }, 1500);
  };
  return (
    <form onSubmit={handleSubmit} className="animate-form">
      <div className="logo">
        <Flova />
        Flowva
      </div>
      <div className="welcome">Reset your password</div>

      {/* Display success or loading messages based on the current status */}
      {(status === "loading" || status === "success") && (
        <div className="form-message success-message">{authMessage}</div>
      )}
      <div className="form-group">
        <label htmlFor="forgot-email">Email</label>
        <input
          type="email"
          id="forgot-email"
          placeholder="you@example.com"
          required
        />
      </div>
      <button type="submit" className="btn">
        <Envelope />
        Send reset link
      </button>
      <div className="form-footer">
        Remember your password?
        <button onClick={() => setPage("login")} type="button">
          Sign in
        </button>
      </div>
    </form>
  );
}
