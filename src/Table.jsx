import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import "tailwindcss/tailwind.css";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "react-beautiful-dnd";
import {fetchNews} from "./components/Аpi";
import Loader from "./components/Loader";
import SortAndSearch from "./components/SortAndSearch";
import TableHeader from "./components/TableHeader";
import NewsItem from "./components/NewsItem";
import Modal from "./components/Modal";

const maxNews = 100;
const pageSize = 10;



function Table() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const filter = useSelector((state) => state.newsFilter);
    const [sortOption, setSortOption] = useState("default");
    const [activeNewsItem, setActiveNewsItem] = useState(null);
    const dispatch = useDispatch();
    const news = useSelector((state) => state.stocks);
    const [localFilter, setLocalFilter] = useState(filter);

    useEffect(() => {
        setLoading(true);
        fetchNews((currentPage - 1) * pageSize, pageSize)
            .then((data) => {
                dispatch({
                    type: "SET_STOCKS",
                    payload: data,
                });
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [dispatch, currentPage]);

    useEffect(() => {
        localStorage.setItem("newsFilter", JSON.stringify(filter));
    }, [filter]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= maxNews / pageSize) {
            setCurrentPage(newPage);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newNews = [...news];
        const [removed] = newNews.splice(result.source.index, 1);
        newNews.splice(result.destination.index, 0, removed);
        dispatch({
            type: "SET_STOCKS",
            payload: newNews,
        });
    };

    const filteredNews = news.filter((item) =>
        item.headline.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedNews = [...filteredNews].sort((a, b) => {
        switch (sortOption) {
            case "dateAsc":
                return new Date(a.datetime) - new Date(b.datetime);
            case "dateDesc":
                return new Date(b.datetime) - new Date(a.datetime);
            case "sourceAsc":
                return a.source.localeCompare(b.source);
            case "sourceDesc":
                return b.source.localeCompare(a.source);
            default:
                return 0;
        }
    });

    const handleNewsItemClick = (newsItem) => {
        setActiveNewsItem(newsItem);
    };
    const handleFilterChange = (e) => {
        setLocalFilter(e.target.value);
        dispatch({
            type: "SET_FILTER",
            payload: e.target.value,
        });
    };

    return (
        <div
            className="w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-2"
        >
            <div className="w-full md:w-3/4 p-4 bg-white shadow-md rounded-lg overflow-x-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader/>
                    </div>
                ) : (
                    <>
                        <SortAndSearch
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            localFilter={localFilter}
                            handleFilterChange={handleFilterChange}
                        />
                        <DragDropContext onDragEnd={onDragEnd}>
                            <table className="min-w-full">
                                <TableHeader/>
                                <Droppable droppableId="news">
                                    {(provided) => (
                                        <tbody
                                            className="divide-y divide-gray-200"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                        {sortedNews.map((item, index) => (
                                            <Draggable key={item.url} draggableId={item.url} index={index}>
                                                {(provided) => (
                                                    <tr
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleNewsItemClick(item)}
                                                    >
                                                        <NewsItem newsItem={item} onClick={handleNewsItemClick} />
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            </table>
                        </DragDropContext>
                        {activeNewsItem && (
                            <Modal activeNewsItem={activeNewsItem} onClose={() => setActiveNewsItem(null)} />
                        )}
                        <div className="mt-4 mb-4 sm:mb-0 flex justify-center items-center">
                            {Array.from({length: maxNews / pageSize}, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                                        currentPage === page ? "bg-blue-700" : ""
                                    } mx-1`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Table;
