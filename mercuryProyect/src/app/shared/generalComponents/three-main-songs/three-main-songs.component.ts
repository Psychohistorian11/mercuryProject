import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { GetSongsService } from '../../artistServices/get-songs.service';
import { Song } from '../../../auth/interfaces/song.interface';
import { PlaySongService } from '../../generalServices/play-song.service';

@Component({
  selector: 'app-three-main-songs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './three-main-songs.component.html'
})
export class ThreeMainSongsComponent implements OnInit {

  constructor(private getSongsService: GetSongsService,
              private playSongService: PlaySongService
  ){}

  songs: Song[] = []; 
  currentIndex = 1;  

  leftSong = signal<Song | null>(null);
  currentSong = signal<Song | null>(null);
  rightSong = signal<Song | null>(null);

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(){
    this.songs = this.getSongsService.getRandomSongs();  
    if (this.songs.length >= 3) {
      this.updateDisplayedSongs();
    }
  }

  updateDisplayedSongs(){
    const total = this.songs.length;

    const leftIndex = (this.currentIndex - 1 + total) % total;
    const rightIndex = (this.currentIndex + 1) % total;

    this.leftSong.set(this.mapSongToThreeSongs(this.songs[leftIndex]));
    this.currentSong.set(this.mapSongToThreeSongs(this.songs[this.currentIndex]));
    this.rightSong.set(this.mapSongToThreeSongs(this.songs[rightIndex]));
  }

  mapSongToThreeSongs(song: Song): Song {
    return {
      name: song.name,
      by: song.by,
      image: song.image,
      audio: song.audio,
      datePublished: song.datePublished,
      id: song.id,
      time: song.time,
      idAlbum: song.idAlbum,
      idGenre: song.idGenre

    };
  }

  // Desplazar hacia la izquierda
  moveLeft() {
    const total = this.songs.length;
    this.currentIndex = (this.currentIndex - 1 + total) % total;
    this.updateDisplayedSongs();
  }

  // Desplazar hacia la derecha
  moveRight() {
    const total = this.songs.length;
    this.currentIndex = (this.currentIndex + 1) % total;
    this.updateDisplayedSongs();
  }

  playSong(song: Song | null) {
    if (song) {
      this.playSongService.setSong(song)
 
    }
  }
}
