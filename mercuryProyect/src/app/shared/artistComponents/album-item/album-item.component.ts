import { Component, OnInit, signal } from '@angular/core';
import { Album } from '../../../auth/interfaces/album.interface';
import { ActivatedRoute } from '@angular/router';
import { GetAlbumsService } from '../../artistServices/get-albums.service';
import { NgFor, NgIf } from '@angular/common';
import { Song } from '../../../auth/interfaces/song.interface';

@Component({
  selector: 'app-album-item',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './album-item.component.html'
})
export class AlbumItemComponent implements OnInit {
  album = signal<Album | null>(null);
  songs = signal<Song[] | null>(null)

  constructor(
    private route: ActivatedRoute,
    private getAlbumsService: GetAlbumsService
  ) { }

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.loadAlbum(albumId);
    }
  }

  loadAlbum(id: string) {
    const albumData = this.getAlbumsService.getAlbumById(id);
    const songsData = this.getAlbumsService.getSongByAlbumId(albumData!.id)
    console.log(albumData)
    console.log(songsData)

    this.album.set(albumData);
    this.songs.set(songsData)
  }

  isSongAdded(song: Song): boolean {
    // Lógica para verificar si la canción está añadida al álbum
    return true;
  }

  onAddSong() {

  }


  handleDblClick(song: Song) {

  }

  onDeleteSong(song: Song) {

  }

  onEditSong(song: Song) {

  }

  onAddToAlbumSong(song: Song) {

  }

  onRemoveToAlbumSong(song: Song) {

  }

}
