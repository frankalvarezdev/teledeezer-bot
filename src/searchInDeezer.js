import DeezerApi from '@muhimur/deezer-public-api';

const searchInDeezer = async (query) => {
    // apí publica de deezer
    const deezer = new DeezerApi();
    
    // busca los tracks del album
    let search = await deezer.search.track(query, null, 1);
    
    // comprueba si hay resultados
    if (search.total > 0 ) {
        return search.data[0].link;
    } else {
        return false;
    }
}

export default searchInDeezer;