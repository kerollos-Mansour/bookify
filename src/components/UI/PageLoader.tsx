export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <img
        src="logo.svg"
        alt="Logo"
        className="w-20 h-20 animate-pulse"
      />
      <div className="text-gray-600 mt-4 text-lg font-medium">
        Loading...
      </div>
    </div>
  );
}
