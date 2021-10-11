import path from 'path';
import fs from 'fs';

const createConfigFile = () => {

    const dir = './temp';

    if (!fs.existsSync(`${dir}/config.json`)) {
        const config = {
            downloadLocation: path.resolve() + '\\temp\\',
            tracknameTemplate: '%artist% - %title%',
            albumTracknameTemplate: '%tracknumber% - %title%',
            playlistTracknameTemplate: '%position% - %artist% - %title%',
            createPlaylistFolder: true,
            playlistNameTemplate: '%playlist%',
            createArtistFolder: false,
            artistNameTemplate: '%artist%',
            createAlbumFolder: true,
            albumNameTemplate: '%artist% - %album%',
            createCDFolder: true,
            createStructurePlaylist: false,
            createSingleFolder: false,
            padTracks: true,
            paddingSize: '0',
            illegalCharacterReplacer: '_',
            queueConcurrency: 3,
            maxBitrate: '3',
            fallbackBitrate: true,
            fallbackSearch: false,
            logErrors: true,
            logSearched: false,
            overwriteFile: 'n',
            createM3U8File: false,
            playlistFilenameTemplate: 'playlist',
            syncedLyrics: false,
            embeddedArtworkSize: 800,
            embeddedArtworkPNG: false,
            localArtworkSize: 1200,
            localArtworkFormat: 'jpg',
            saveArtwork: true,
            coverImageTemplate: 'cover',
            saveArtworkArtist: false,
            artistImageTemplate: 'folder',
            jpegImageQuality: 80,
            dateFormat: 'Y-M-D',
            albumVariousArtists: true,
            removeAlbumVersion: false,
            removeDuplicateArtists: false,
            featuredToTitle: '0',
            titleCasing: 'nothing',
            artistCasing: 'nothing',
            executeCommand: '',
            tags: {
                title: true,
                artist: true,
                album: true,
                cover: true,
                trackNumber: true,
                trackTotal: false,
                discNumber: true,
                discTotal: false,
                albumArtist: true,
                genre: true,
                year: true,
                date: true,
                explicit: false,
                isrc: true,
                length: true,
                barcode: true,
                bpm: true,
                replayGain: false,
                label: true,
                lyrics: false,
                syncedLyrics: false,
                copyright: false,
                composer: false,
                involvedPeople: false,
                source: false,
                rating: false,
                savePlaylistAsCompilation: false,
                useNullSeparator: false,
                saveID3v1: true,
                multiArtistSeparator: 'default',
                singleAlbumArtist: false,
                coverDescriptionUTF8: false
            }
        };

        if (!fs.existsSync(dir)) {
            fs.mkdirSync('temp');
        }

        fs.writeFileSync(`${dir}/config.json`, JSON.stringify(config));
    }
}

export default createConfigFile;