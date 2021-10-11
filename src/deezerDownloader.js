import deemix from 'deemix';
import { Deezer } from 'deezer-js';
import checkUrl from './checkUrl.js';
import dotenv from 'dotenv';
dotenv.config();

const deezerDownloader = async (link) => {
    // comprueba y arrregla la url de deezer
    link = await checkUrl(link);

    if(!link) return false;

    const dz = new Deezer();
    const Downloader = deemix.downloader.Downloader
    const { Single } = deemix.types.downloadObjects
    let settings = deemix.settings.load('./temp/');

    // iniciamos sesion
    await dz.login_via_arl(process.env.DEEZER_ARL);

    let downloadObj

    try {
        downloadObj = await deemix.generateDownloadObject(dz, link);
        // let uuid = downloadObj.getEssentialDict();

        const savedObject = downloadObj.toDict()
        savedObject.status = 'inQueue';

        // volvemos a comprobar si el enlace realemte es de un track y no eld e un album
        if (downloadObj.__type__ == 'Single') {
            let downloadObject = new Single(downloadObj)
            let currentJob = new Downloader(dz, downloadObject, settings);

            try {
                // inicia la descarga del track
                await currentJob.start();
    
                if (!downloadObject.isCanceled) {
                    // Set status
                    if (downloadObject.failed === downloadObject.size && downloadObject.size !== 0) {
                        console.log('Fallo al descargar');
    
                        return false;
                    } else if (downloadObject.failed > 0) {
                        console.log('Hay errores');
    
                        return false;
                    } else {
                        const filePath = downloadObj.files[0].path;
    
                        // fs.unlinkSync(filePath);
                        return filePath;
                    }
                }
            } catch(e) {
                return false;
            }
        } else {
            return false;
        }

    } catch (e) {
        return false;
    }
}

export default deezerDownloader;