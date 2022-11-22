var filterId = 0;

const addFilter = () => {
    const filters = {
        "firmantes": "Firmantes",
        "ley_promulgada": "Ley promulgada",
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
    inputText.setAttribute("form", "search-form");

    const addFilterButton = document.getElementById("add-filter")
    document.getElementById("adv-filters").insertBefore(select, addFilterButton);
    document.getElementById("adv-filters").insertBefore(inputText, addFilterButton);

    filterId = filterId + 1;
}

document.getElementById("add-filter").onclick = addFilter;

const changeInputValue = (selectId) => {

    const dropDown = document.getElementById(selectId);
    const input = document.getElementById(dropDown.getAttribute('inputid'));
    input.name = dropDown.value;
    console.log('Se cambió del item: ', dropDown.getAttribute('inputid'));
    console.log('dropdown:', dropDown);
    console.log('input:', input);
}

// const selectText = select.options[select.selectedIndex].text;
// const selectValue = select.value;