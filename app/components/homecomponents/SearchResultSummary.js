const SearchResultSummary = ({ summary }) => (
  <div className="w-full max-w-2xl">
    <div className="mb-4 p-4">
      <h2 className="font-bold">Ringkasan:</h2>
      <p>{summary}</p>
    </div>
  </div>
);

export default SearchResultSummary;
