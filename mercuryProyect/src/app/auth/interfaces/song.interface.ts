export interface SongSupabase {
    id: string;
    file: File;
    image: File;
  }

export interface Song{
    id: string;//bien
    audio: string;//bien
    image: string;//bien
    by?: string;//juanes
    name: string;//bien
    time: string;//juanes
    datePublished: string;//juanes
    idAlbum?: string[];//se va 
    idGenre?: string //bien 
}

export interface DeleteSong extends Song{

}

export interface EditSong extends Song{
    
}
