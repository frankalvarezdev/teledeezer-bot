import deemix from 'deemix';
import DeezerApi from '@muhimur/deezer-public-api';

const checkUrl = async (link) => {
    // usa la herramienta de deemix para parsear la url
    let parse = await deemix.parseLink(link);

    // comprueba si el enlace es de un album
    if (parse[1] === 'album') {

        // apí publica de deezer
        const deezer = new DeezerApi();
        
        // busca los tracks del album
        let album = await deezer.album.tracks(parse[2]);

        // devuelve el enlace del primer track del album
        return album.data[0].link; 

    } else {
        return parse[0];
    }
}

export default checkUrl;