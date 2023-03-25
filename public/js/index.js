//contador para asociar los 'select' con su 'input'
let filterId = 0;

//Agrega un nuevo filtro al presionar el botón
const addFilter = (event) => {
    event.preventDefault();

    //agrega filtros hasta un limite de 5
    //pasado el limite convierte el botón en 'disabled'
    const filters = {
        "fecha_pub": "Fecha de publicación",
        "firma": "Gobernador",
        "otros_firman": "Otros firmantes",
        "num_ed_pub": "N° Ed. Pub.",
        "pag_pub": "Pág. Pub.",
        "anho_tomo": "Año del Tomo",
        "nro_tomo": "N° del Tomo",
        "anexo": "Anexo",
        "ley_promul": "Ley promulgada",
        "ley_vetada": "Ley vetada",
        "parte_vetada": "Parte Vetada",
        "ratif_x_ley": "Ratif. por ley",
        "dnu": "DNU",
        "reglamenta_ley": "Reglamenta ley",
        "tema": "Tema",
        "titulo": "Título",
        "estado": "Estado",
        "modif_por": "Modificada por",
        "modif_a": "Modifica a",
        "ref_norm": "Ref. normativas",
        "fecha_carga": "Fecha Carga",
        "deroga_dec": "Deroga decreto",
        "derogado_por": "Derogada por",
        "pendiente": "Pendiente"
    };

    //crea un 'select' que contendrá los filtros
    const select = document.createElement("select");
    select.id = filterId;
    select.className = 'form-select w-25';
    select.setAttribute("onchange", "changeInputValue(this.id)");

    //agrega los filtros del 'filters' como options
    for (let filter in filters) {
        let option = select.appendChild(document.createElement('option'));
        option.id = filter;
        option.value = filter;
        option.text = filters[filter];
    };
    select.options.selectedIndex = 0;

    //crea el input que acompaña al select
    const inputText = document.createElement("input");
    inputText.type = "search";
    inputText.className = "form-control w-75";
    inputText.id = `filter-value-input-${filterId}`;
    inputText.name = 'fecha';
    inputText.setAttribute("form", "search-form");

    const newDiv = document.createElement("div");
    newDiv.id = `filters-group-${filterId}`;
    newDiv.className = "input-group my-3";
    document.getElementById("adv-filters").appendChild(newDiv);
    document.getElementById(`filters-group-${filterId}`).appendChild(select);
    document.getElementById(`filters-group-${filterId}`).appendChild(inputText);

    filterId++;
    if (filterId === 5) document.getElementById('add-filter').setAttribute('disabled', '');
}

//Cambia el 'name' del input según el filtro seleccionado
const changeInputValue = (selectId) => {
    const dropDown = document.getElementById(selectId);
    const input = document.getElementById(`filter-value-input-${selectId}`);
    input.name = dropDown.value;
    input.value = ''

    if (dropDown.value === 'fecha' ||
        dropDown.value === 'fecha_pub' ||
        dropDown.value === 'fecha_carga') {
        input.type = "date";
    } else {
        input.type = "text";
    }
}

// Elimina de las queries los campos que se envían vacíos
const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', () => {
    const allInputs = myForm.getElementsByTagName('input');
    for (input of allInputs) {
        if (!input.value) input.name = '';
    }


});

const $data = $('#sv-data').attr('svData');
const dataObj = JSON.parse($data);
console.log(dataObj);

const resNum = document.getElementById('res-num');
resNum.setAttribute('action', window.location.pathname + window.location.search)