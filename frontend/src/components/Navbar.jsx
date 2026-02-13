export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          🎧 PDF2Audio
        </h1>

        <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <span className="hover:text-blue-600 cursor-pointer">Features</span>
          <span className="hover:text-blue-600 cursor-pointer">Students</span>
          <span className="hover:text-blue-600 cursor-pointer">About</span>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </nav>
  );
}
