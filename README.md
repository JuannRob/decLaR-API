# API Decretos - Tribunal Sup. Just. LR

**API para obtener decretos de la base de datos del Tribunal Superior de Justicia de La Rioja.**

- Permite realizar busquedas personalizadas.
- Respuesta con paginación y ordenamiento.

*Incluye algunos tests*


## Instalación
```
npm install 
```

```
npm start
```

## Endpoints
### Obtener todos los documentos

GET `http://localhost:5000/decretos`

  **Respuesta: **
  ```
  {
  "status": "OK",
  "data": {
    "docs": [], // <--- DECRETOS
    "totalDocs": int,
    "limit": int,
    "totalPages": int,
    "page": int,
    "pagingCounter": int,
    "hasPrevPage": bool,
    "hasNextPage": bool,
    "prevPage": int,
    "nextPage": int
    }
  }
  ```

**Formato de documento:**
```
{
"_id": str,
"num": str,
"anho": str,
"fecha": Date,
"fecha_pub": Date,
"cant_arts": str,
"firma": str,
"otros_firman": [str],
"pub": str,
"num_ed_pub": str,
"pag_pub": str,
"anho_tomo": str,
"nro_tomo": str,
"anexo": str,
"ley_promul": str,
"ley_vetada": str,
"parte_vetada": str,
"ratif_x_ley": str,
"dnu": str,
"art_126_12": bool,
"reglamenta_ley": str,
"tema": str,
"titulo": str,
"estado": str,
"modif_por": str,
"modif_a": str,
"modif_por_ley": str,
"modif_a_ley": str,
"link_pub": str,
"ref_norm": str,
"obs": "",
"fecha_carga": Date,
"tipeo_dictado": str,
"deroga_dec": str,
"derogado_por": str,
"pendiente": str,
"obs_tomo": str,
"claves": str,
"__v": int
}
```

### Búsquedas personalizadas:

GET `http://localhost:5000/decretos?limit=15&page=1&sortBy=firma&order=-1&tema=salud&anho=2011`

**Filtros**
```
limit: int   // cant. de documentos por página
page: int    // página 
sortBy: str  // atributo del documento utilizado para ordenar
order: int  // 1: ascendente | -1: descendente
-
{cualquier atributo del documento} : str // búsqueda por contenido
```
