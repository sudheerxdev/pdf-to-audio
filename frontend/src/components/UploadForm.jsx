export default function UploadForm() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-semibold mb-4">
        Upload Your PDF
      </h3>

      <p className="text-gray-600 text-sm mb-6">
        Upload study material and convert it into an audiobook.
      </p>

      <input
        type="file"
        className="w-full border p-2 rounded mb-4"
      />

      <select className="w-full border p-2 rounded mb-4">
        <option>English</option>
        <option>Hindi</option>
      </select>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Convert to Audio
      </button>
    </div>
  );
}
