const ImageResults = ({ results }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-w-4xl">
        {results.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.gambar}
              alt={item.judul}
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-blue-600 hover:underline text-center"
            >
              {item.judul}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageResults;
