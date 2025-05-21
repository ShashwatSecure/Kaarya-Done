import React from "react";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  requestedBy: string;
  onSubmit: (minPrice: number, maxPrice: number) => void;
}

const BidModal: React.FC<BidModalProps> = ({
  isOpen,
  onClose,
  title,
  requestedBy,
  onSubmit,
}) => {
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (min > 0 && max >= min) {
      onSubmit(min, max);
      onClose();
    } else {
      alert("Please enter valid price range.");
    }
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
        aria-labelledby="bid-modal-title"
      >
        <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 id="bid-modal-title" className="text-xl font-bold text-gray-900">
              Place Your Bid
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              &#x2715;
            </button>
          </div>

          {/* Service info */}
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Service:</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">{title}</p>
              <p className="text-sm text-gray-500">Requested by {requestedBy}</p>
            </div>
          </div>

          {/* Bid form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="minPrice"
                className="block text-gray-700 mb-2 font-medium"
              >
                Minimum Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  id="minPrice"
                  type="number"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min price"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="maxPrice"
                className="block text-gray-700 mb-2 font-medium"
              >
                Maximum Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  id="maxPrice"
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max price"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                The user will see the range you provide and may respond with a
                counter offer.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Submit Bid
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BidModal;
