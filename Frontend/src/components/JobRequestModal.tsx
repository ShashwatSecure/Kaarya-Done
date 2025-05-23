'use client';
import React, { useState, useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  serviceId: number | null;
  serviceTitle: string;
  category: string; 
  onSubmit: (data: {
    jobTitle: string;
    description: string;
    mediaFiles: File[];
    address: any;
    category: string; 
  }) => void;
};

const JobRequestModal = ({
  open,
  onClose,
  serviceId,
  serviceTitle,
  category,
  onSubmit,
}: Props) => {
  const [title, setTitle] = useState(serviceTitle ? `${serviceTitle}` : '');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [location, setLocation] = useState({
    state: '',
    city: '',
    pincode: '',
    locality: '',
    landmark: '',
  });
  const [isCustomPincode, setIsCustomPincode] = useState(false);
  const [customPincode, setCustomPincode] = useState('');

  useEffect(() => {
    if (serviceTitle) {
      setTitle(`${serviceTitle}`);
    } else {
      setTitle('');
    }
  }, [serviceTitle]);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + media.length > 5) return;
    setMedia([...media, ...files]);
  };

  const removeMedia = (index: number) => {
    const updated = [...media];
    updated.splice(index, 1);
    setMedia(updated);
  };

  const handleSubmit = () => {
    const finalPincode = isCustomPincode ? customPincode : location.pincode;
    onSubmit({
      jobTitle: title,
      description,
      mediaFiles: media,
      address: { ...location, pincode: finalPincode },
      category, // pass category along with other data
    });
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto px-4 py-10">
        <div className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-lg shadow-lg relative max-h-full overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Describe Your Issue</h2>

          {/* Title */}
          <input
            type="text"
            placeholder="Title (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-md"
          />

          {/* Description */}
          <textarea
            placeholder="Describe the problem..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-md h-24"
          />

          {/* Media Upload */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload images/videos of the damaged item:
          </label>
          <label
            htmlFor="media-upload"
            className="flex flex-col items-center justify-center w-full h-28 bg-white border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-[#ff9900] transition-colors mb-4"
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-4">
              <div className="text-4xl text-gray-400 mb-1">+</div>
              <p className="text-sm text-gray-600">Click or drag to upload image/video</p>
            </div>
            <input
              id="media-upload"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
            />
          </label>

          {/* Media Preview */}
          {media.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {media.map((file, index) => {
                const url = URL.createObjectURL(file);
                const isImage = file.type.startsWith('image');
                return (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => removeMedia(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10"
                      title="Remove"
                    >
                      &minus;
                    </button>
                    <div onClick={() => setSelectedMedia(url)} className="cursor-pointer">
                      {isImage ? (
                        <img
                          src={url}
                          alt={`preview-${index}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      ) : (
                        <video
                          src={url}
                          className="w-full h-24 object-cover rounded"
                          muted
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Location Fields */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* State */}
            <select
              value={location.state}
              onChange={(e) => setLocation({ ...location, state: e.target.value })}
              className="px-3 py-2 border rounded-md"
            >
              <option value="" disabled>
                Select State
              </option>
              <option value="West Bengal">West Bengal</option>
            </select>

            {/* City */}
            <select
              value={location.city}
              onChange={(e) => setLocation({ ...location, city: e.target.value })}
              className="px-3 py-2 border rounded-md"
            >
              <option value="" disabled>
                Select City
              </option>
              <option value="Kolkata">Kolkata</option>
            </select>

            {/* Pincode */}
            <select
              value={isCustomPincode ? 'other' : location.pincode}
              onChange={(e) => {
                if (e.target.value === 'other') {
                  setIsCustomPincode(true);
                  setLocation({ ...location, pincode: '' });
                } else {
                  setIsCustomPincode(false);
                  setLocation({ ...location, pincode: e.target.value });
                }
              }}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Pincode (Optional)</option>
              <option value="700102">700102</option>
              <option value="other">Other</option>
            </select>

            {/* Custom Pincode Input */}
            {isCustomPincode && (
              <input
                type="text"
                placeholder="Enter your pincode"
                value={customPincode}
                onChange={(e) => {
                  setCustomPincode(e.target.value);
                  setLocation({ ...location, pincode: e.target.value });
                }}
                className="mt-2 px-3 py-2 border rounded-md"
              />
            )}

            {/* Locality */}
            <input
              type="text"
              placeholder="Locality (Optional)"
              value={location.locality}
              onChange={(e) => setLocation({ ...location, locality: e.target.value })}
              className="px-3 py-2 border rounded-md"
            />

            {/* Landmark */}
            <input
              type="text"
              placeholder="Landmark (Optional)"
              value={location.landmark}
              onChange={(e) => setLocation({ ...location, landmark: e.target.value })}
              className="px-3 py-2 border rounded-md col-span-2"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-[#ff9900] text-white w-full py-2 rounded-md font-semibold hover:bg-orange-600"
          >
            Create Job Request
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="max-w-4xl w-full">
            {selectedMedia.includes('.mp4') || selectedMedia.includes('video') ? (
              <video src={selectedMedia} controls className="w-full rounded-lg" />
            ) : (
              <img src={selectedMedia} alt="Preview" className="w-full rounded-lg" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobRequestModal;
