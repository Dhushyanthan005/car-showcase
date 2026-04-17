export default function DealerCard({ dealer, onContact }) {
  return (
    <div className="card p-5 hover:border-violet-500/50 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {dealer.name?.charAt(0) || "D"}
        </div>
        <div>
          <h3 className="font-semibold text-white">{dealer.name}</h3>
          <p className="text-gray-400 text-sm">{dealer.location}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>📞</span>
          <span>{dealer.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>🚗</span>
          <span>{dealer.cars || 0} cars listed</span>
        </div>
      </div>

      <button
        onClick={() => onContact?.(dealer)}
        className="w-full btn-primary text-sm py-2"
      >
        Contact Dealer
      </button>
    </div>
  );
}
