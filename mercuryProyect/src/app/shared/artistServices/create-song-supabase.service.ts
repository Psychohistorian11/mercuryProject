import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../../enviroments/enviroment';
import { SongSecondContent } from '../../auth/interfaces/CreateSong.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateSongSupabaseService {
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(
      enviroment.supabaseConfig.url,
      enviroment.supabaseConfig.apikey
    );
  }

  async addSongSupabase(song: SongSecondContent){
    const { id, file, image } = song;

    const bucket = 'Songs'; 

    try {
      // Subir archivo de audio
      const { error: fileError } = await this.supabase.storage.from(bucket).upload(`audios/${id}/${file.name}`, file);
        
      if (fileError) throw fileError;

      // Subir imagen
      const { error: imageError } = await this.supabase.storage.from(bucket).upload(`images/${id}/${image.name}`, image);
        
      if (imageError) throw imageError;


      console.log('Archivo y imagen subidos a Supabase correctamente.');
    } catch (error) {
      console.error('Error subiendo archivos a Supabase:', error);
    }
  }

  

  
}
