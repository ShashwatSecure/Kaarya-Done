import React, { useEffect, useState } from "react";
import BidModal from "./BidModal";
import StartInspectionModal from "./StartInspectionModal";

type JobRequest = {
  id: number;
  customerName: string;
  profileImage: string;
  title: string;
  description: string;
  media: { type: "image" | "video"; url: string }[];
  city: string;
  state: string;
  locality: string;
  createdAt: string;
  status: string;
};

interface NewJobsTabProps {
  onBidNow: () => void;
  onStartInspection: () => void;
}

const NewJobsTab: React.FC<NewJobsTabProps> = ({ onBidNow, onStartInspection }) => {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [activeModal, setActiveModal] = useState<"otp" | "bid" | null>(null);
  const [activeJob, setActiveJob] = useState<JobRequest | null>(null);
  const [biddingJobId, setBiddingJobId] = useState<number | null>(null);
  const [bidSubmittedJobIds, setBidSubmittedJobIds] = useState<Set<number>>(new Set());
  const [mediaIndexMap, setMediaIndexMap] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:8080/api/freelancer/jobs", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  const openModal = (modal: "otp" | "bid", job: JobRequest) => {
    setActiveJob(job);
    setActiveModal(modal);
    if (modal === "bid") setBiddingJobId(job.id);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveJob(null);
    setBiddingJobId(null);
  };

  const handleBidSubmit = (minPrice: number, maxPrice: number) => {
    if (activeJob) {
      alert(`Bid submitted for job #${activeJob.id} — ₹${minPrice} - ₹${maxPrice}`);
      setBidSubmittedJobIds((prev) => new Set(prev).add(activeJob.id));
      setBiddingJobId(null);
      closeModal();
    }
  };

  const setActiveMedia = (jobId: number, index: number) => {
    setMediaIndexMap((prev) => ({ ...prev, [jobId]: index }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">New Job Requests</h2>

      {jobs.length === 0 && <p className="text-gray-500">No job requests available.</p>}

      {jobs.map((job) => {
        const isBidSubmitted = bidSubmittedJobIds.has(job.id);
        const isBidding = biddingJobId === job.id;
        const activeMediaIndex = mediaIndexMap[job.id] ?? 0;

        return (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <img
                  src={job.profileImage?.trim() ? job.profileImage : "/default-avatar.webp"}
                  alt="Customer"
                  className="w-10 h-8 rounded-full mr-3 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-avatar.webp";
                  }}
                />
                <div>
                  <p className="font-medium text-gray-900">{job.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {job.city}, {job.locality}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Title & Description */}
            <div className="mb-3">
              <p className="text-base font-bold text-gray-900 mb-1">{job.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {/* Media */}
            {job.media?.length > 0 && (
              <>
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                  {job.media[activeMediaIndex]?.type === "image" ? (
                    <img
                      src={job.media[activeMediaIndex].url}
                      alt={`media-${activeMediaIndex}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ) : (
                    <video
                      controls
                      className="w-full h-40 object-cover rounded-md"
                      key={job.media[activeMediaIndex].url}
                    >
                      <source src={job.media[activeMediaIndex].url} type="video/mp4" />
                    </video>
                  )}
                </div>

                <div className="flex space-x-3 mb-4 overflow-x-auto">
                  {job.media.map((media, i) => (
                    <button
                      key={i}
                      className={`flex-shrink-0 rounded-md border ${
                        i === activeMediaIndex
                          ? "border-orange-500 ring-2 ring-orange-400"
                          : "border-gray-300"
                      } focus:outline-none`}
                      onClick={() => setActiveMedia(job.id, i)}
                      aria-label={`View media ${i + 1}`}
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt={`thumb-${i}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        <video
                          className="w-20 h-20 object-cover rounded-md"
                          muted
                          playsInline
                        >
                          <source src={media.url} type="video/mp4" />
                        </video>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium capitalize">
                {job.status === "FREELANCER_BOOKED" ? "Booked by User" : job.status.toLowerCase()}
              </span>

              <div className="flex gap-3 items-center">
                {isBidSubmitted ? (
                  <span className="text-blue-600 font-semibold text-sm">Bid submitted</span>
                ) : (
                  <button
                    onClick={() => openModal("bid", job)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                    disabled={isBidding}
                  >
                    {isBidding ? "Bidding..." : "Bid Now"}
                  </button>
                )}

                <button
                  onClick={() => openModal("otp", job)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Start Inspection
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modals */}
      {activeJob && (
        <>
          <StartInspectionModal
            isOpen={activeModal === "otp"}
            onClose={closeModal}
            title={activeJob.title}
            bookedBy={activeJob.customerName}
          />

          <BidModal
            isOpen={activeModal === "bid"}
            onClose={closeModal}
            title={activeJob.title}
            requestedBy={activeJob.customerName}
            onSubmit={handleBidSubmit}
          />
        </>
      )}
    </div>
  );
};

export default NewJobsTab;
