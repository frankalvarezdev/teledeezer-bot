import createConfigFile from "./src/createConfigFile.js";
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import deezerDownloader from "./src/deezerDownloader.js";
import searchInDeezer from "./src/searchInDeezer.js";
import validateUrl from "./src/validateUrl.js";
import fs from 'fs';
dotenv.config();

// crea el archivo de configuracion de deezer
createConfigFile();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Bienvenido, envia el enlace o nombre de la cancion que quieres descargar'));

bot.on('message', async (ctx) => {
    let text = ctx.message.text;

    const validate = validateUrl(text);

    // comprueba si el texto es un enlace de deezer valido
    if (!validate) {

        // En caso de que no sea un enlace se reliza un busqueda
        const result = await searchInDeezer(text);
        
        if (result) {
            text = result;
        } else {
            ctx.reply('No se encontraron resultados para: ' + text);
        }
    }

    if (text) {
        // inicia la descarga
        const file = await deezerDownloader(text);

        if (file) {
            ctx.telegram.sendChatAction(ctx.chat.id, 'upload_document');

            ctx.telegram.sendAudio(ctx.chat.id, {source: file}, {reply_to_message_id: ctx.message.message_id}).then(() => {
                // borra el archivo
                fs.unlinkSync(file);
            });
        } else {
            ctx.reply('Error')
        }
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

process.on('uncaughtException', (error, origin) => {
    console.error('ERROR: Uncaught exception')
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('ERROR: Unhandled Rejection');
})