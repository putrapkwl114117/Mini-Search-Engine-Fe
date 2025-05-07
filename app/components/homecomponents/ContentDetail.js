
import { ArrowLeft } from "lucide-react";

export default function ContentDetail({ content, onBack }) {
  return (
    <div className="w-full max-w-2xl mt-6">
      <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
        {content.gambar && (
          <img
            src={content.gambar}
            alt={content.judul}
            className="mt-4 w-full object-cover rounded-lg"
          />
        )}
        <h2 className="text-xl font-semibold text-black mt-4">
          {content.judul}
        </h2>

        <p
          className=" text-gray-700 dark:text-gray-200 
            border-gray-300 dark:border-gray-600 "
        >
          {content.content}
        </p>

        <button
          className="flex items-center gap-1 text-blue-500 mt-6 hover:underline"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
      </div>
    </div>
  );
}
