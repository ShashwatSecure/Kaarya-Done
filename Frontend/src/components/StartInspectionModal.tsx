import React, { useState, useEffect, useRef } from "react";

interface StartInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  bookedBy?: string;
  finalPrice?: number; // Optional prefilled price
}

const StartInspectionModal: React.FC<StartInspectionModalProps> = ({
  isOpen,
  onClose,
  title = "Kitchen Sink Leak Repair",
  bookedBy = "Neha Gupta",
  finalPrice = 1750,
}) => {
  const [step, setStep] = useState<"otp" | "price" | "payment">("otp");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [price, setPrice] = useState("");

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep("otp");
      setOtp(["", "", "", ""]);
      setPrice("");
    }
  }, [isOpen]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleSubmitOtp = () => {
    if (otp.some((d) => d === "")) {
      alert("Please enter all 4 digits of the OTP.");
      return;
    }
    // Validate OTP here if needed
    setStep("price");
  };

  const handleSubmitPrice = () => {
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      alert("Please enter a valid final price.");
      return;
    }
    setStep("payment");
  };

  const handlePaymentConfirmed = () => {
    alert("Payment confirmed! Thank you.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-inspection-modal-title"
      >
        <div className="relative bg-white rounded-xl w-full max-w-md mx-4 p-6 shadow-lg">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
            aria-label="Close modal"
          >
            &#x2715;
          </button>

          {/* Step content */}
          {step === "otp" && (
            <>
              <h2
                id="start-inspection-modal-title"
                className="text-xl font-bold mb-4"
              >
                OTP Verification
              </h2>
              <p className="text-gray-600 mb-6">
                Enter 4-digit OTP sent to the user's mobile number ending with 89XX
              </p>
              <div className="mb-6">
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      className="w-14 h-14 border-2 border-gray-300 rounded-lg text-center text-2xl focus:border-orange-500 focus:outline-none"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      ref={(el) => {
                        otpRefs.current[idx] = el;
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
                <div className="text-right mt-2">
                  <button
                    className="text-orange-500 text-sm hover:underline"
                    onClick={() => alert("OTP resent!")}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
              <button
                onClick={handleSubmitOtp}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Visit and Inspect
              </button>
            </>
          )}

          {step === "price" && (
            <>
              <h2 className="text-xl font-bold mb-4">Final Price Submission</h2>
              <div className="mb-4">
                <p className="text-gray-600 mb-2">Service:</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-gray-500">Booked by {bookedBy}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Final Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
                    placeholder="Enter final price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min={1}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  After submission, you'll need to confirm payment collection.
                </p>
              </div>

              <button
                onClick={handleSubmitPrice}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Submit Final Price
              </button>
            </>
          )}

          {step === "payment" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-green-600 text-4xl"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="text-xl font-bold text-center mb-4">Confirm Payment Collection</h2>

              <p className="text-gray-600 text-center mb-6">
                The final price of ₹{price || finalPrice} has been submitted to the customer. <br />
                Please confirm how you collected payment:
              </p>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={handlePaymentConfirmed}
                  className="bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition flex items-center justify-center space-x-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 9V7a2 2 0 00-2-2H7a2 2 0 00-2 2v2m0 0v6a2 2 0 002 2h6a2 2 0 002-2v-6m-6 0h6"
                    />
                  </svg>
                  <span>Payment Done (Cash)</span>
                </button>

                <button
                  onClick={handlePaymentConfirmed}
                  className="bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition flex items-center justify-center space-x-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Payment Done (Online)</span>
                </button>

                <button
                  onClick={handlePaymentConfirmed}
                  className="bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition flex items-center justify-center space-x-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Payment Not Collected Yet</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StartInspectionModal;
