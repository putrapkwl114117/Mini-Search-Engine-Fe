export default function SearchResults({ results, onTitleClick }) {
  return (
    <div className="w-full max-w-2xl ">
      <ul className="space-y-1">
        {results.map((result, index) => (
          <li key={index} className="p-4 transition duration-200">
            {/* Sumber dan Tanggal di atas judul */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <a
                  href={result.url}
                  className="px-2 py-1 text-sm text-black dark:text-white bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sumber
                </a>
                <span className="text-sm text-gray-500">{result.tanggal}</span>
              </div>
            </div>

            {/* Judul yang bisa di-klik */}
            <div className="flex justify-between items-center">
              <h3
                className="text-lg font-semibold text-black dark:text-white cursor-pointer hover:text-blue-800 dark:hover:text-blue-400"
                onClick={() => onTitleClick(result)}
              >
                {result.judul}
              </h3>
            </div>

            {/* Potongan konten */}
            <p className="text-gray-700 dark:text-gray-300">
              {result.content.substring(0, 150)}...
            </p>

            {/* Gambar jika ada */}
            {result.gambar && (
              <img
                src={result.gambar}
                alt={result.judul}
                className="w-12 h-12 object-cover rounded-lg mt-4"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
