const filters = {
    "firmantes": "Firmantes",
    "ley_promulgada": "Ley promulgada",
    "tema": "Tema",
    "titulo": "Título"
}

const addFilter = () => {

    const advFilterCont = document.getElementById("adv-filters");
    const addFilterButton = document.getElementById("add-filter");

    const select = document.createElement("select");
    select.name = "column-names";
    select.id = "column-names";

    for (let filter in filters) {
        let option = select.appendChild(document.createElement('option'));
        option.id = filter;
        option.value = filter;
        option.text = filters[filter];
    };

    select.options.selectedIndex = 0;


    const inputText = document.createElement("input");

    inputText.type = "search";
    inputText.id = "filter-value-input"
    inputText.setAttribute("form", "search-form");

    advFilterCont.insertBefore(select, addFilterButton);
    advFilterCont.insertBefore(inputText, addFilterButton);
}

document.getElementById("add-filter").onclick = addFilter;

const changeValues = (value, text) => {
    console.log('Se cambió de item!');
    const filterValueInput = document.getElementById("filter-value-input");
    filterValueInput.name = value;
    filterValueInput.placeholder = text;
}

document.getElementById("column-names").onload = function () {
    dropDown.onselect = changeValues(dropDown.value, dropDown.options[dropDown.selectedIndex].text);
}

// const selectText = select.options[select.selectedIndex].text;
// const selectValue = select.value;