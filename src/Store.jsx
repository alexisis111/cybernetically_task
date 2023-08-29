const initialState = {
    stocks: [],
    currentPage: 1,
    newsFilter: "",
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_STOCKS":
            return {
                ...state,
                stocks: action.payload,
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload,
            };
        case "SET_FILTER":
            return {
                ...state,
                newsFilter: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
