import Decree from '../models/Decree.js'
import { toRegex, toString } from 'diacritic-regex'; //turns string into diacritic insensitive regex

let queries = {};
let options = {
    limit: 10,
    page: 1,
    sort: { 'num': 1 }
};

const filterDecs = (limit = 10, page = 1, sortBy = 'num', order = 1) => {
    const parsedPage = parseInt(page)
    const parsedLimit = parseInt(limit)
    const parsedOrder = parseInt(order)

    options.page = parsedPage;
    options.sort = { [sortBy]: parsedOrder };

    if (parsedLimit !== options.limit) {
        options.limit = parsedLimit;
        options.page = 1;
    }
};

export const getDecs = async (query) => {
    const { limit, page, sortBy, order } = query
    filterDecs(limit, page, sortBy, order)

    const deleteKeys = ['limit', 'page', 'sortBy', 'order'];
    deleteKeys.forEach(key => { if (query.hasOwnProperty(key)) delete query[key] });

    queries = {};
    if (Object.keys(query).length) {
        for (const entry in query) {
            if (query[entry].charAt(0) === ':') { //":" at the beginning of the query means exact match
                queries[entry] = new RegExp(
                    `^${toString()(query[entry]).replace(':', '')}$`
                );
            } else {
                queries[entry] = toRegex({ flags: 'i' })(query[entry]);
            }
        }
    }

    try {
        let decrees = await Decree.paginate(queries, options);
        return decrees;
    } catch (error) {
        return error;
    }
}; 