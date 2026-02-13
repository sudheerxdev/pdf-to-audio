import UploadForm from "../components/UploadForm";
import AudioPlayer from "../components/AudioPlayer";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">
            Convert Study PDFs into Audiobooks
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Learn anytime, anywhere. Perfect for revision, multitasking,
            and accessibility.
          </p>
          <p className="text-sm text-blue-200">
            Built for students • Powered by AI
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <UploadForm />
        <AudioPlayer />
      </section>

      {/* FEATURES */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">
            Why Students Love This
          </h3>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl shadow">
              🎧
              <h4 className="font-semibold mt-3">Audio Learning</h4>
              <p className="text-gray-600 text-sm mt-2">
                Listen while travelling, walking, or revising before exams.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow">
              ⚡
              <h4 className="font-semibold mt-3">Speed Control</h4>
              <p className="text-gray-600 text-sm mt-2">
                Learn faster with adjustable playback speed.
              </p>
            </div>

            <div className="p-6 rounded-xl shadow">
              🌍
              <h4 className="font-semibold mt-3">Multi-Language</h4>
              <p className="text-gray-600 text-sm mt-2">
                Supports multiple languages for better understanding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
