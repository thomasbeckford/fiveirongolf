export default function LoadingLocationDetail() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Spinning loader */}
        <div className="w-12 h-12 border-4 border-gray-700 border-t-lime-400 rounded-full animate-spin mx-auto mb-4"></div>

        {/* Loading text */}
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    </div>
  );
}
