var filterId = 0;

const addFilter = (event) => {
    event.preventDefault();

    const filters = {
        "otros_firman": "Firmantes",
        "ley_promul": "Ley promulgada",
        "tema": "Tema",
        "titulo": "Título"
    }

    const select = document.createElement("select");
    select.name = "column-names";
    select.id = `column-names-${filterId}`;
    select.className = 'form-select w-25'
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
    inputText.className = "form-control w-75"
    inputText.id = `filter-value-input-${filterId}`;
    inputText.name = 'tema'
    inputText.setAttribute("form", "search-form");

    const newDiv = document.createElement("div");
    newDiv.id = `filters-group-${filterId}`;
    newDiv.className = "input-group my-3";
    document.getElementById("adv-filters").appendChild(newDiv);
    document.getElementById(`filters-group-${filterId}`).appendChild(select);
    document.getElementById(`filters-group-${filterId}`).appendChild(inputText);

    filterId = filterId + 1;
}

const changeInputValue = (selectId) => {
    const dropDown = document.getElementById(selectId);
    const input = document.getElementById(dropDown.getAttribute('inputid'));
    input.name = dropDown.value;
}

const goToImport = () => {
    let pass = prompt("Ingrese contraseña");
    console.log(pass);
    location.replace(`/importar?pwd=${pass}`);
}