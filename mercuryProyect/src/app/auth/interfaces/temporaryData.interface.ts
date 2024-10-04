import { Genres } from "./album.interface";

export interface TemporaryData{
    isArtist: boolean;
    isCreateAlbum: boolean;
    currentInput: string;
    currentAudioInPlay: string;
    currentImageInPlay: string;
    currentGenreFiltred: string;
    currentPublicationDateFiltred: string
}