export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border border-gray-500">
        {page > 1 && (
          <button
            onClick={() => onPageChange(page - 1)}
            className="pr-1 bg-blue-600 p-1"
          >
            Prev
          </button>
        )}
        {pageNumbers.map((number) => (
          <li
            className={`px-2 py-1 border border-gray-500 ${
              page === number ? "bg-gray-200" : ""
            }`}
          >
            <button
              onClick={() => {
                return onPageChange(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
        {page < pages && (
          <button
            onClick={() => onPageChange(page + 1)}
            className="p-1 bg-blue-500"
          >
            Next
          </button>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
