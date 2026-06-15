"use client";

import Link from "next/link";
import { FileText, CheckCircle, Shield, Zap, ArrowRight, PenTool } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>DocSign</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Shield className="h-3.5 w-3.5" /> PDF Upload & Signing
Shareable Signature Links
Document Audit Logs
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Sign documents instantly.<br />
            <span className="text-blue-600">From anywhere. Securely.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Streamline your contracts, agreements, and onboarding. Eliminate the paper hassle with our lightning-fast e-signature ecosystem.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-md shadow-blue-200 group text-base"
            >
              Create Free Account 
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-xl transition text-base"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Why Teams Choose DocSign</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Everything you need to manage executed business contracts seamlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <PenTool className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Intuitive E-Signing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Upload custom PDFs and append cryptographic signatures effortlessly on desktops, tablets, or phones.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition group">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Instant Link Sharing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Generate localized workspace share links instantly out of your dashboard to gather signatures in minutes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition group">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enterprise Guardrails</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              All transactions run behind bank-grade AES-256 validation layers with durable record audit history metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center text-xs font-medium text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} © 2026 DocSign. Built by Sumit Kumar.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 transition">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition">Contact Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}