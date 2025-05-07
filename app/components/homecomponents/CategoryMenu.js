import { MoreHorizontal} from "lucide-react";
const CategoryMenu = ({
  searchPerformed,
  handleCategoryChange,
  selectedCategory,
}) => (
  <>
    {/* Menampilkan kategori Cough, Influenza, Cramps, dan Headaches sebelum pencarian */}
    {!searchPerformed && (
      <div className="flex flex-wrap justify-center gap-1 max-w-lg mt-2 mb-6">
        {["Cough", "Influenza", "Cramps", "Headaches"].map((item) => (
          <button
            key={item}
            className="text-sm px-5 py-2 border rounded-full 
              text-gray-700 dark:text-white 
              border-gray-300 dark:border-gray-600 
              hover:bg-gray-100 dark:hover:bg-gray-700 
              hover:border-blue-600 transition duration-200"
          >
            {item}
          </button>
        ))}
        <button
          className="text-sm px-5 py-2 border rounded-full 
          text-gray-700 dark:text-white 
          border-gray-300 dark:border-gray-600 
          flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 
          hover:border-blue-600 transition duration-200"
        >
          More <MoreHorizontal size={18} className="ml-1" />
        </button>
      </div>
    )}

    {/* Menampilkan menu Images, All, dan Documents setelah pencarian */}
    {/* Menu kategori setelah pencarian */}
    {searchPerformed && (
      <div className="w-full border-b border-gray-300 dark:border-gray-600">
        <div className="w-[50%] mx-auto flex justify-start gap-2 mb-2 mt-2">
          {[
            { label: "All", value: "all" },
            { label: "Images", value: "image" },
            { label: "Documents", value: "document" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleCategoryChange(value)}
              className={`text-sm font-semibold px-5 py-2 transition duration-200
                ${
                  selectedCategory === value
                    ? "text-blue-800 dark:text-blue-400 border-b-2 border-blue-800 dark:border-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    )}
  </>
);

export default CategoryMenu;
