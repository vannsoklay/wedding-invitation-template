import { WeddingDetails } from "../types";

// components/WeddingDetailsCard.tsx
interface WeddingDetailsCardProps {
  details: WeddingDetails;
}

export const WeddingDetailsCard: React.FC<WeddingDetailsCardProps> = ({ details }) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
    <div className="text-center space-y-6 mb-12">
      <div>
        <h2 className="text-2xl font-semibold text-red-800 mb-2">{details.date}</h2>
        <p className="text-xl text-gray-600">{details.time}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-red-700 mb-1">{details.venue}</h3>
        <p className="text-gray-600">{details.address}</p>
      </div>
    </div>
  </div>
);