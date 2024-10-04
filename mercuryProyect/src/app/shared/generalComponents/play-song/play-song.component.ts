import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaySongService } from '../../generalServices/play-song.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-song',
  standalone: true,
  imports: [NgIf],
  templateUrl: './play-song.component.html',
  styleUrl: './play-song.component.css'
})
export class PlaySongComponent implements OnDestroy {
  songSubscription: Subscription | null = null;
  imageSuscription: Subscription | null = null;
  selectedSong: string | null = null;
  selectedImage: string | null = null;

  audio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentTime: string = '0:00';
  totalTime: string = '0:00';
  progress: number = 0;
  volume: number = 1; 

  constructor(private playSongService: PlaySongService) { 
      this.playSongService.audio$.subscribe((audio) => {
        this.selectedSong = audio;
        if(audio){
          this.loadAudio(audio);
          this.audio?.play()
          this.isPlaying = true
        }
      });
  
      this.playSongService.image$.subscribe((image) => {
        this.selectedImage = image;
      });
  }

  loadAudio(file: string) {
    if (this.audio) {
      this.audio.pause();
    }

    this.audio = new Audio(file);
    this.audio.addEventListener('loadedmetadata', () => {
      this.totalTime = this.formatTime(this.audio?.duration || 0);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.progress = (this.audio!.currentTime / (this.audio?.duration || 1)) * 100;
      this.currentTime = this.formatTime(this.audio?.currentTime || 0);
    });


  }

  togglePlay() {
    if (this.audio) {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  changeProgress(event: any) {
    if (this.audio) {
      const newTime = (event.target.value / 100) * this.audio.duration;
      this.audio.currentTime = newTime;
    }
  }

  changeVolume(event: any) {
    if (this.audio) {
      this.audio.volume = event.target.value / 100;
      this.volume = this.audio.volume;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  ngOnDestroy() {
    if (this.songSubscription) {
      this.songSubscription.unsubscribe();
    }
    if (this.audio) {
      this.audio.pause();
    }
  }
}
