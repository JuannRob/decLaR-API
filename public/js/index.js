let filterId = 0;

const addFilter = (event) => {
    event.preventDefault();

    if (filterId < 5) {
        const filters = {
            "firma": "Firmante",
            "otros_firman": "Otros firmantes",
            "num_ed_pub": "Núm. Ed. Pub.",
            "pag_pub": "Pág. Pub.",
            "anho_tomo": "Año del Tomo",
            "nro_tomo": "Núm. del Tomo",
            "ley_promul": "Ley promulgada",
            "ley_vetada": "Ley vetada",
            "ratif_x_ley": "Ratif. por ley",
            "reglamenta_ley": "Reglamenta ley",
            "tema": "Tema",
            "titulo": "Título",
            "estado": "Estado",
            "modif_por": "Modificada por",
            "modif_a": "Modifica a",
            "ref_norm": "Ref. normativas",
            "deroga_dec": "Deroga decreto",
            "derogado_por": "Derogada por",
            "pendiente": "Pendiente"
        };

        const select = document.createElement("select");
        select.id = `column-names-${filterId}`;
        select.className = 'form-select w-25';
        select.setAttribute("inputid", `filter-value-input-${filterId}`);
        select.setAttribute("onchange", "changeInputValue(this.id)");

        for (let filter in filters) {
            let option = select.appendChild(document.createElement('option'));
            option.id = filter;
            option.value = filter;
            option.text = filters[filter];
        };
        select.options.selectedIndex = 0;

        const inputText = document.createElement("input");
        inputText.type = "search";
        inputText.className = "form-control w-75";
        inputText.id = `filter-value-input-${filterId}`;
        inputText.name = 'tema';
        inputText.setAttribute("form", "search-form");

        const newDiv = document.createElement("div");
        newDiv.id = `filters-group-${filterId}`;
        newDiv.className = "input-group my-3";
        document.getElementById("adv-filters").appendChild(newDiv);
        document.getElementById(`filters-group-${filterId}`).appendChild(select);
        document.getElementById(`filters-group-${filterId}`).appendChild(inputText);

        filterId = filterId + 1;
    } else {
        document.getElementById('add-filter').setAttribute('disabled', '');
    }
}

const changeInputValue = (selectId) => {
    const dropDown = document.getElementById(selectId);
    const input = document.getElementById(dropDown.getAttribute('inputid'));
    input.name = dropDown.value;
}

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', () => {
    const allInputs = myForm.getElementsByTagName('input');
    for (input of allInputs) {
        if (!input.value) input.name = '';
    }
});