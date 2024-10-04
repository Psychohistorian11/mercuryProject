export interface SongSupabase {
    id: string;
    file: File;
    image: File;
  }

export interface Song{
    id: string;
    audio: string;
    image: string;
    by: string;
    name: string;
    time: string;
    datePublished: string;
    idAlbum?: string[];
    idGenre?: string
}

export interface DeleteSong extends Song{

}

export interface EditSong extends Song{
    
}
