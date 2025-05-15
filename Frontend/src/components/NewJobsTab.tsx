import React from 'react';

type NewJobsTabProps = {
  onBidNow: () => void;
  onStartInspection: () => void;
};

const NewJobsTab: React.FC<NewJobsTabProps> = ({ onBidNow, onStartInspection }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">New Job Requests</h2>
      
      {/* Example Job Card */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="text-gray-800 mb-2">Fix kitchen sink leak</p>
        <div className="flex gap-3">
          <button
            className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
            onClick={onBidNow}
          >
            Bid Now
          </button>
          <button
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            onClick={onStartInspection}
          >
            Start Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewJobsTab;
