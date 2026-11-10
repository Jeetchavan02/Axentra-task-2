import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginationRange } from "@src/utility/pagination/getPaginationRange";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const range = getPaginationRange(currentPage, totalPages);

    return (
        <div className="flex items-center space-x-2">
            {/* Previous Icon */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`p-1 ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <ChevronLeft size={16} />
            </button>

            {/* Page Numbers + Dots */}
            {range.map((item, index) => {
                if (item === "...") {
                    return (
                        <span key={index} className="px-1 text-gray-500">
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(item)}
                        className={`px-2 py-[2px] text-sm ${
                            currentPage === item
                                ? "text-black font-semibold"
                                : "text-gray-500"
                        }`}
                    >
                        {item}
                    </button>
                );
            })}

            {/* Next Icon */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`p-1 ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}