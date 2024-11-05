import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { GetPlayListService } from '../../../shared/generalServices/get-play-list.service';
import { PlayList } from '../../../auth/interfaces/playLists.interface';
import { Song } from '../../../auth/interfaces/song.interface';
import { GetSongsService } from '../../../shared/artistServices/get-songs.service';
import { User } from '../../../auth/interfaces/user.interface';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MusicPlayerFooterComponent } from "../../../shared/generalComponents/music-player-footer/music-player-footer.component";
import { GetTokenService } from '../../../shared/generalServices/get-token.service';
import { PlayListAPIService } from '../../../API/playList/play-list-api.service';
import { SongAPIService } from '../../../API/song/song-api.service';
import { MusicPlayerService } from '../../../shared/generalServices/music-player.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, MusicPlayerFooterComponent],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  openMenu: number | null = null;
  currentSong: any = null
  idUser: string = '';
  token: any;
  playLists = signal<any[]>([]);
  currentPlayList: any;
  currentSongs =  signal<any[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getToken: GetTokenService,
    private playListAPIService: PlayListAPIService,
    private songAPIService: SongAPIService,
    private musicPlayerService: MusicPlayerService
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.initializePlayLists();
  }

  private initializeUser(): void {
    this.token = this.getToken.getToken();
    this.route.params.subscribe(params => {
      this.idUser = params['id'];
    });
  }

  private initializePlayLists(): void {
    if (this.token.role === 'user') {
      this.getPlayListsByIdUser(this.idUser);
    } /*else if (this.token.role === 'artist') {
      this.getPlayListService.getPlayListsByIdArtist(this.idUser);
    }*/
  }

  getPlayListsByIdUser(userId: string){
      this.playListAPIService.getPlayListByUserId(parseFloat(userId)).subscribe({
        next: (response) => {
          this.playLists.set(response.data)
          console.log("playList: ", response)
        }
      })
  }

  getSongsByIdPlayList(idPlayList: string) {
    this.songAPIService.getSongsFromPlaylist(idPlayList).subscribe({
      next: (response) => {
          console.log("canciones de playlist: ", response)
          this.currentSongs.set(response.data)
      }
    })
  }

  onCreatePlayList(): void {
    const basePath = this.token.role === 'artist' ? 'artist' : '';
    this.router.navigate([`/home/${basePath}/${this.token.sub}/create-playList/${this.token.sub}`]);
  }

  toggleMenu(buttonNumber: number, playList: PlayList): void {
    this.openMenu = this.openMenu === buttonNumber ? null : buttonNumber;
    this.currentPlayList = playList;
    this.getSongsByIdPlayList(playList.id);
  }

  closeMenu(): void {
    this.openMenu = null;
  }

  playSong(song: Song){
    this.currentSong = song; 
    this.musicPlayerService.setCurrentSong(song)
  }
}
