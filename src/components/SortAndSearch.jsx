import React from "react";

function SortAndSearch({ sortOption, setSortOption, localFilter, handleFilterChange }) {
    return (
        <div className="flex items-center mb-4">
            <select
                className="border-gray-300 bg-gray-100 py-4 px-3 rounded mr-2 flex-grow flex-shrink h-full"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="default">Sort by (Default)</option>
                <option value="dateAsc">Date (Ascending)</option>
                <option value="dateDesc">Date (Descending)</option>
                <option value="sourceAsc">Source (A-Z)</option>
                <option value="sourceDesc">Source (Z-A)</option>
            </select>
            <div className="w-full">
                <div
                    className="flex items-center border-gray-300 bg-gray-100 py-2 px-3 rounded relative h-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 absolute"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>
                    <input
                        type="text"
                        className="border-gray-300 bg-gray-100 py-2 pl-8 pr-3 rounded flex-grow flex-shrink h-full"
                        placeholder="Filter news by keywords"
                        value={localFilter}
                        onChange={(e) => handleFilterChange(e)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SortAndSearch;
