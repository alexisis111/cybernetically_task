import React from "react";

function TableHeader() {
    return (
        <thead className="bg-gray-100 text-gray-600">
        <tr className="text-left">
            <th className="px-2 md:px-6 py-2">Headline</th>
            <th className="px-2 md:px-6 py-2">Source</th>
            <th className="px-2 md:px-6 py-2">Related</th>
            <th className="px-2 md:px-6 py-2">Date</th>
        </tr>
        </thead>
    );
}

export default TableHeader;
