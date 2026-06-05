import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

import { useEffect, useRef } from "react";

const FloatingItems = () => {
  const icons = [
    "🍩",
    "🥗",
    "🍕",
    "🥦",
    "🍅",
    "🍔",
    "🌮",
    "🍇",
    "🍋",
    "🫐",
    "🥬",
    "🍉",
    "🍃",
    "🥑",
    "🍒",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Loop over every item in the array and for each one return div with a key */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 95}%`, //random position from left to right
            fontSize: `${20 + Math.random() * 20}px`, // random size
            opacity: 0.1, // visibility 10%
            animation: `floatup ${6 + Math.random() * 8}s linear ${Math.random() * 6}s infinite`,
          }}
        >
          {icons[Math.floor(Math.random() * icons.length)]}
        </div>
      ))}
    </div>
  );
};

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-[#e8f0e9] border-b border-[#d4cfc6] relative overflow-hidden">
        {/* Floating animation */}
        <FloatingItems />

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-[#2d2d2d] mb-4 leading-tight">
            Don't let good food <br />
            <span className="text-[#4a7c59]">go to waste</span>
          </h1>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto mb-8">
            Connecting restaurants and cafes with community members — turning
            leftover food into shared meals.
          </p>
          <div className="flex items-center justify-center gap-4">
            {user ? (
              <Link
                to="/home"
                className="bg-[#4a7c59] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d6b4a] transition-colors"
              >
                Browse listings
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-[#4a7c59] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d6b4a] transition-colors"
                >
                  Get started
                </Link>
                <Link
                  to="/home"
                  className="border border-[#4a7c59] text-[#4a7c59] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#e8f0e9] transition-colors"
                >
                  Browse food
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#2d2d2d] text-center mb-12">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-[#c8deca] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽</span>
            </div>
            <h3 className="font-semibold text-[#2d2d2d] mb-2">
              Restaurants post food
            </h3>
            <p className="text-[#6b7280] text-sm">
              At the end of the day restaurants and cafes post their leftover
              food on Last Bite.
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-[#c8deca] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👀</span>
            </div>
            <h3 className="font-semibold text-[#2d2d2d] mb-2">
              Community browses
            </h3>
            <p className="text-[#6b7280] text-sm">
              Community members browse available listings and claim food they
              want to pick up.
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-[#c8deca] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-[#2d2d2d] mb-2">
              Pick up for free
            </h3>
            <p className="text-[#6b7280] text-sm">
              Claimers pick up the food for free or leave an optional donation
              for the restaurant.
            </p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-white border-t border-b border-[#d4cfc6]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-[#2d2d2d] text-center mb-12">
            Why Last Bite?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 bg-gray-100 rounded-2xl p-6">
              <span className="text-2xl">🌱</span>
              <div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Reduce food waste
                </h3>
                <p className="text-[#6b7280] text-sm">
                  Millions of tonnes of food are wasted every year. Last Bite
                  helps reduce that one meal at a time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-100 rounded-2xl p-6">
              <span className="text-2xl">💚</span>
              <div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Build community
                </h3>
                <p className="text-[#6b7280] text-sm">
                  Connect local restaurants with the people around them and
                  build a stronger community.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-100 rounded-2xl p-6">
              <span className="text-2xl">🆓</span>
              <div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Always free
                </h3>
                <p className="text-[#6b7280] text-sm">
                  Food is always free to claim. Donations are optional and go
                  directly to the restaurant.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-100 rounded-2xl p-6">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold text-[#2d2d2d] mb-1">
                  Quick and easy
                </h3>
                <p className="text-[#6b7280] text-sm">
                  Post a listing in seconds. Claim food with one click. No
                  complicated process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4">
          Ready to make a difference?
        </h2>
        <p className="text-[#6b7280] mb-8">
          Join Last Bite today and help reduce food waste in your community.
        </p>
        <Link
          to="/register"
          className="bg-[#4a7c59] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d6b4a] transition-colors"
        >
          Create your account
        </Link>
      </div>
    </div>
  );
};

export default Landing;
