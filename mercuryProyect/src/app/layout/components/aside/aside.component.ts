import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import { GetPlayListService } from '../../../shared/generalServices/get-play-list.service';
import { PlayList } from '../../../auth/interfaces/playLists.interface';
import { Song } from '../../../auth/interfaces/song.interface';
import { GetSongsService } from '../../../shared/artistServices/get-songs.service';
import { User } from '../../../auth/interfaces/user.interface';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [NgClass, NgIf, NgFor],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  openMenu: number | null = null;
  idUser: string = '';
  currentUser: User | null = null;
  playLists: PlayList[] = [];
  currentPlayList: PlayList | null = null;
  currentSongs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: GetUserService,
    private getPlayListService: GetPlayListService,
    private getSongService: GetSongsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.initializePlayLists();
  }

  private initializeUser(): void {
    this.currentUser = this.userService.getUser();
    this.route.params.subscribe(params => {
      this.idUser = params['id'];
    });
  }

  private initializePlayLists(): void {
    if (this.currentUser?.role === 'hearer') {
      this.playLists = this.getPlayListService.getPlayListsByIdUser(this.idUser);
    } else if (this.currentUser?.role === 'artist') {
      this.playLists = this.getPlayListService.getPlayListsByIdArtist(this.idUser);
    }
  }

  getSongsByIdPlayList(idPlayList: string): Song[] {
    return this.getSongService.getSongsByIdPlayList(idPlayList);
  }

  onCreatePlayList(): void {
    const basePath = this.currentUser?.role === 'artist' ? 'artist' : '';
    this.router.navigate([`/home/${basePath}/${this.currentUser?.id}/create-playList`]);
  }

  toggleMenu(buttonNumber: number, playList: PlayList): void {
    this.openMenu = this.openMenu === buttonNumber ? null : buttonNumber;
    this.currentPlayList = playList;
    this.currentSongs = this.getSongsByIdPlayList(playList.id);
  }

  closeMenu(): void {
    this.openMenu = null;
  }
}
