import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SongFirstContent, SongSecondContent } from '../../auth/interfaces/CreateSong.interface';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GetSongsService {


    private readonly SONG_STORAGE_KEY = enviroment.songsConfig.key;
    private readonly SONG_ARTIST_STORAGE_KEY = enviroment.songs_ArtistConfig.key
    private supabase: SupabaseClient;

    constructor() { 
    this.supabase = createClient(
      enviroment.supabaseConfig.url,
      enviroment.supabaseConfig.apikey
    );
  }

    getSongsByArtist(idArtist: string): SongFirstContent[] {
        const songsArtistData = localStorage.getItem(this.SONG_ARTIST_STORAGE_KEY);
        const songsData = localStorage.getItem(this.SONG_STORAGE_KEY);

        console.log("Artista: ", songsArtistData);
        console.log("Canciones: ", songsData);

        if (songsArtistData && songsData) {
            const songsArtist = JSON.parse(songsArtistData);
            const allSongs = JSON.parse(songsData);

            // Encuentra las entradas de songsArtist que coinciden con el idArtist
            const artistEntries = songsArtist.filter((entry: any) => entry.idArtist === idArtist);

            if (artistEntries.length > 0) {
                // Obtiene los ids de las canciones asociadas al artista
                const songIds = artistEntries.map((entry: any) => entry.idSong);

                // Filtra las canciones en 'songs' usando los ids obtenidos
                const songs: SongFirstContent[] = allSongs.filter((song: any) => songIds.includes(song.id))
                    .map((song: any) => ({
                        id: song.id,
                        name: song.name,
                        time: song.time || '',  // Algunos datos parecen no tener 'time', por lo que es mejor evitar errores
                        datePublished: song.datePublished
                    }));

                return songs;
            }
        }
        return [];
    }

    async getImageFileSupabase(songs: SongFirstContent[]): Promise<SongSecondContent[]> {
        const bucket = 'Songs'; 
        const songList: SongSecondContent[] = [];
      
        try {
          for (const song of songs) {
            const { id } = song;
            console.log("id: ", id)
            console.log("song: ", song)

      
            // Obtener el archivo de audio desde Supabase
            const { data: fileBlob, error: fileError } = await this.supabase.storage
              .from(bucket)
              .download(`audios/${id}/`); // Asegúrate de que el nombre sea correcto
      
            if (fileError) throw fileError;
      
            // Convertir el Blob a File
            const audioFile = new File([fileBlob], `${id}.mp3`, { type: fileBlob.type });
      
            // Obtener la imagen desde Supabase
            const { data: imageBlob, error: imageError } = await this.supabase.storage
              .from(bucket)
              .download(`images/${id}/`); // Asegúrate de que el nombre sea correcto
      
            if (imageError) throw imageError;
      
            // Convertir el Blob a File
            const imageFile = new File([imageBlob], `${id}.jpg`, { type: imageBlob.type });
      
            // Crear un objeto SongSecondContent con los archivos obtenidos
            songList.push({
              id: id,
              file: audioFile,  // El archivo de audio convertido a File
              image: imageFile  // La imagen convertida a File
            });
          }
      
          console.log('Archivos y imágenes recuperados correctamente de Supabase.');
          return songList;
        } catch (error) {
          console.error('Error recuperando archivos desde Supabase:', error);
          return [];
        }
      }
      
      

}
 