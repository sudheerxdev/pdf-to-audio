import { useState } from "react";

export default function AudioPlayer() {
  const [speed, setSpeed] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-semibold mb-4">
        Audiobook Player
      </h3>

      <audio controls className="w-full mb-4">
        <source src="/sample.mp3" type="audio/mpeg" />
      </audio>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm mr-2">Speed</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>

        <a
          href="/sample.mp3"
          download
          className="text-blue-600 underline"
        >
          Download MP3
        </a>
      </div>
    </div>
  );
}
