import React from "react";
import { formatDate } from "./FormatDate";

function NewsItem({ newsItem, onClick }) {


    return (
        <>
            <td className="px-4 py-2">{newsItem.headline}</td>
            <td className="px-4 py-2">{newsItem.source}</td>
            <td className="px-4 py-2">{newsItem.related}</td>
            <td className="px-4 py-2">{formatDate(newsItem.datetime)}</td>
        </>
    );
}

export default NewsItem;
