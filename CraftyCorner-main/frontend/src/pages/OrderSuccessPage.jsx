import React, { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const OrderSuccessPage = () => {
  useEffect(() => {
    document.title = "Order Successful";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Animated checkmark circle */}
        <div className="relative mb-8">
          <div className="
            w-32 h-32 rounded-full bg-green-500
            animate-[scaleIn_0.8s_ease-out_forwards]
            flex items-center justify-center
          ">
            <div className="
              w-12 h-24 border-r-4 border-b-4 border-white
              transform rotate-45 -translate-y-1
              animate-[checkmarkIn_0.5s_0.5s_ease-out_forwards]
              opacity-0
            "/>
          </div>
        </div>

        {/* Animated text */}
        <h1 className="
          text-3xl md:text-4xl font-bold text-green-700 mb-4
          animate-[fadeIn_0.8s_ease-out]
        ">
          Order Successful!
        </h1>

        <p className="
          text-lg text-gray-600 mb-8 max-w-md
          animate-[fadeIn_1s_ease-out]
        ">
          Thank you for your purchase. We've sent a confirmation to your email.
        </p>

        {/* Button with hover animation */}
        <button
          className="
            px-8 py-3 bg-green-600 text-white rounded-lg
            hover:bg-green-700 transition-colors duration-300
            transform hover:scale-105 focus:outline-none
            animate-[fadeIn_1.2s_ease-out]
          "
          onClick={() => window.location.href = '/'}
        >
          Continue Shopping
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccessPage;