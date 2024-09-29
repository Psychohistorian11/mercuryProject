export interface CreateNewSongSupabase {
    id: string;
    file: File;
    image: File;
  }

export interface GetSongs{
    file: string | undefined;
    image: string | undefined;
    role: string;
    type: string;
    id: string;
    name: string;
    time: string;
    nameFile: string;
    nameImage: string;
    datePublished: string;
}

export interface DeleteSong extends GetSongs{

}

export interface EditSong extends GetSongs{
    
}

export interface CreateNewSong{
    id: string,
    name: string,
    time:string,
    role: string,
    type: string,
    datePublished: string;
    nameFile: string, 
    nameImage: string, 
}

export interface getSongLocalstorage extends CreateNewSong{

}