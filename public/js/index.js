const filter = false;

const addFilter = () => {
    const form = document.getElementById("search-form");
    const searchButton = document.getElementById("search-button");
    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Firmantes"
    input.name = "firmantes"
    form.insertBefore(input, searchButton);
}

document.getElementById("add-filter").onclick = addFilter;