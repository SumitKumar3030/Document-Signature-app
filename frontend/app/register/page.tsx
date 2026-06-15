"use client";

import Link from "next/link";
import { useState } from "react";
import api from "../lib/axios";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" }); // Handles errors and success

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status.message) setStatus({ type: "", message: "" }); // Clear messages when typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await api.post("/auth/register", formData);
      console.log(res.data);
      
      setStatus({
        type: "success",
        message: "Account created successfully! Redirecting to login...",
      });
      
      // Smoothly redirect to login after 2 seconds so they can read the success message
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
  console.error(error);

  if (axios.isAxiosError(error)) {
    setStatus({
      type: "error",
      message:
        error.response?.data?.message ||
        "Registration failed",
    });
  } else {
    setStatus({
      type: "error",
      message: "Something went wrong",
    });
  }

  setIsLoading(false);
}
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side: Branding/Visual */}
      <div className="hidden md:flex flex-col justify-center bg-blue-600 p-12 text-white">
        <h2 className="text-4xl font-bold mb-6">Create Legally Binding Signatures.</h2>
        <p className="text-blue-100 text-lg max-w-md">
          Get started today and streamline your contract management. Send agreements, track status, and secure sign-offs faster than ever.
        </p>
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3 text-blue-100">
            <CheckCircle className="h-5 w-5 text-blue-300 shrink-0" />
            <span>Compliant with major e-signature laws</span>
          </div>
          <div className="flex items-center gap-3 text-blue-100">
            <CheckCircle className="h-5 w-5 text-blue-300 shrink-0" />
            <span>Bank-grade AES-256 encryption</span>
          </div>
          <div className="flex items-center gap-3 text-blue-100">
            <CheckCircle className="h-5 w-5 text-blue-300 shrink-0" />
            <span>Tamper-evident audit trails</span>
          </div>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Get Started</h1>
            <p className="text-gray-500 mt-2">Create your free account in less than a minute</p>
          </div>

          {/* Status Message (Error / Success) */}
          {status.message && (
            <div
              className={`p-4 border-l-4 text-sm rounded-r-lg ${
                status.type === "success"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-red-50 border-red-500 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters long</p>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  required
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
  href="/login"
  className="text-blue-600 font-semibold hover:underline"
>
  Sign in
</Link>
          </p>
        </div>
      </div>
    </div>
  );
}