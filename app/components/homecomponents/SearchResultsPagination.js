const SearchResultsPagination = ({
  currentPage,
  totalPages,
  handlePaginationChange,
}) => {
  // Membuat array halaman (1 hingga totalPages)
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Menampilkan tombol pagination hanya jika ada lebih dari satu halaman
  if (totalPages <= 1) return null;

  // Mengatur agar hanya beberapa halaman yang terlihat sekaligus
  const maxVisiblePages = 5;
  const halfMaxVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfMaxVisible, 1);
  let endPage = Math.min(currentPage + halfMaxVisible, totalPages);

  if (currentPage - halfMaxVisible <= 0) {
    endPage = Math.min(maxVisiblePages, totalPages);
  }

  if (currentPage + halfMaxVisible > totalPages) {
    startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
  }

  const visiblePages = pages.slice(startPage - 1, endPage);

  return (
    <div className="flex justify-center gap-4 mt-6">
      {currentPage > 1 && (
        <button
          onClick={() => handlePaginationChange(currentPage - 1)}
          className="text-sm px-5 py-2 border rounded-full 
            text-gray-700 dark:text-gray-200 
            border-gray-300 dark:border-gray-600 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition duration-200"
        >
          Prev
        </button>
      )}

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePaginationChange(pageNumber)}
          className={`text-sm px-5 py-2 border rounded-full 
            transition duration-200 
            ${
              pageNumber === currentPage
                ? "bg-blue-800 text-white"
                : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => handlePaginationChange(currentPage + 1)}
          className="text-sm px-5 py-2 border rounded-full 
            text-gray-700 dark:text-gray-200 
            border-gray-300 dark:border-gray-600 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition duration-200"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default SearchResultsPagination;
