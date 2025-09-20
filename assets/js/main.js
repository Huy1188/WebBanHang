function toggleHistory(show) {
    const history = document.getElementById("search-history");
    history.style.display = show ? "block" : "none";
    const btn_close = document.getElementById("close-search");
    btn_close.style.display = show ? "block" : "none";
}

function closeHistory() {
    const btn_close = document.getElementById("search-history");
    btn_close.style.display = "none";
}

