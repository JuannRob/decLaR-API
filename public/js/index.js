var filterId = 0;

const addFilter = () => {
    const filters = {
        "firman": "Firmantes",
        "ley_promul": "Ley promulgada",
        "tema": "Tema",
        "titulo": "Título"
    }

    const select = document.createElement("select");
    select.name = "column-names";
    select.id = `column-names-${filterId}`;
    select.setAttribute("inputid", `filter-value-input-${filterId}`);
    select.setAttribute("onchange", "changeInputValue(this.id)");

    for (let filter in filters) {
        let option = select.appendChild(document.createElement('option'));
        option.id = filter;
        option.value = filter;
        option.text = filters[filter];
    };
    select.options.selectedIndex = 2;

    const inputText = document.createElement("input");
    inputText.type = "search";
    inputText.id = `filter-value-input-${filterId}`;
    inputText.name = 'tema'
    inputText.setAttribute("form", "search-form");

    // const addFilterButton = document.getElementById("add-filter")
    const newDiv = document.createElement("div");
    newDiv.id = `div-${filterId}`
    document.getElementById("adv-filters").appendChild(newDiv);
    document.getElementById(`div-${filterId}`).appendChild(select);
    document.getElementById(`div-${filterId}`).appendChild(inputText);

    filterId = filterId + 1;
}
document.getElementById("add-filter").onclick = addFilter;

const changeInputValue = (selectId) => {
    const dropDown = document.getElementById(selectId);
    const input = document.getElementById(dropDown.getAttribute('inputid'));
    input.name = dropDown.value;
}

const verDecreto = (id) => {
    const location = window.location.origin
    window.location.href = `${location}/decretos/${id}`
};
