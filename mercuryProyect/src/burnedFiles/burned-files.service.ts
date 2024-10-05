import { Injectable } from '@angular/core';
import { Artist, User } from '../app/auth/interfaces/user.interface';
import { Song } from '../app/auth/interfaces/song.interface';
import { Album } from '../app/auth/interfaces/album.interface';
import { albumsOfArtist, songsOfArtist } from '../app/auth/interfaces/idRelated.interface';


@Injectable({
    providedIn: 'root'
})
export class BurnedFilesService {

    private readonly Users: User[] = [
        {
            dateOfBirth: "2024-08-15",
            email: "juanperez@gmail.com",
            id: "846b89a5-d9ee-4ae6-adb1-867380e2cdbf",
            location: "Colombia",
            password: "1234",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/JuanPerez.jpg",
            role: "hearer",
            userName: "Juan Perez"
        },
        {
            dateOfBirth: "2024-05-22",
            email: "maria.gonzalez@gmail.com",
            id: "123e4567-asdsd-12d43er56-426614174001",
            location: "Colombia",
            password: "1234",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/123e4567-asdsd-12d43er56-426614174001/MariaGonzales.jpg",
            role: "hearer",
            userName: "Maria Gonzalez"
        }
    ]

    private readonly Artists: Artist[] = [
        {
            biography: "Soy cantante y productor musical apasionado por el rock.",
            dateOfBirth: "2024-07-10",
            email: "andresrock@gmail.com",
            id: "846b89a5asdfgbv34ef80e2cdbf",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5asdfgbv34ef80e2cdbf/AndresRock.jpg",
            role: "artist",
            userName: "AndresRock"
        },
        {
            biography: "Mi música es una mezcla de sonidos latinos y electrónicos.",
            dateOfBirth: "2024-02-20",
            email: "mora@gmail.com",
            id: "123e4567-e89b-12d3-a456-426614174003",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/123e4567-e89b-12d3-a456-426614174003/SofiaElectro.jpg",
            role: "artist",
            userName: "Mora"
        },
        {
            biography: "Cantante de baladas y ritmos románticos.",
            dateOfBirth: "2024-03-30",
            email: "danielviolin@gmail.com",
            id: "123asdsfsdv324556sdvsasasdasd174004",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/123asdsfsdv324556sdvsasasdasd174004/DanielBalada.jpg",
            role: "artist",
            userName: "DanielViolin"
        }
    ]



    // SONGS -----------------------------------------------------------------------------------------------

    private readonly Songs: Song[] = [
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/6dd9cc7e-f80e-439f-a785-81cf724d6319/Y2meta.app%20-%20512%20(128%20kbps).mp3",
            by: "Mora",
            datePublished: "2024-10-05",
            id: "6dd9cc7e-f80e-439f-a785-81cf724d6319",
            idAlbum: ["8087aee5-555d-4d94-b2b7-a9c977eb7375"],
            idGenre: "8",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/6dd9cc7e-f80e-439f-a785-81cf724d6319/512.jpg",
            name: "512",
            time: "3m 13s"
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/a93f1272-0860-4a9c-a997-0bd6f0cb8f3e/Y2meta.app%20-%20Tuyo%20(128%20kbps).mp3",
            by: "Mora",
            datePublished: "2024-10-05",
            id: "a93f1272-0860-4a9c-a997-0bd6f0cb8f3e",
            idAlbum
                :
                ["8087aee5-555d-4d94-b2b7-a9c977eb7375", "90abb70e-8383-4366-93aa-1953bd8512ba"],
            idGenre: "8",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/a93f1272-0860-4a9c-a997-0bd6f0cb8f3e/512.jpg",
            name: "Tuyo",
            time: "4m 29s"
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/414726b1-52ce-4fd3-b60e-d6a64b042d32/Y2meta.app%20-%20Sci-Fi%20(128%20kbps).mp3",
            by: "Mora",
            datePublished: "2024-10-05",
            id: "414726b1-52ce-4fd3-b60e-d6a64b042d32",
            idAlbum
                :
                ["90abb70e-8383-4366-93aa-1953bd8512ba"],
            idGenre: "8",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/414726b1-52ce-4fd3-b60e-d6a64b042d32/DATA.jpg",
            name: "Sci-Fi",
            time: "3m 17s"
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/ef210e56-eb86-4609-9e0d-a31eaff5c89e/Y2meta.app%20-%20Lo%20Siento%20BB__%20(128%20kbps).mp3",
            by: "Mora",
            datePublished: "2024-10-05",
            id: "ef210e56-eb86-4609-9e0d-a31eaff5c89e",
            idAlbum: ["90abb70e-8383-4366-93aa-1953bd8512ba"],
            idGenre: "5",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/ef210e56-eb86-4609-9e0d-a31eaff5c89e/DATA.jpg",
            name: "Lo siento BB:/",
            time: "3m 26s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/f504bea2-2a16-4134-ab88-1b9912e7b49f/Y2meta.app%20-%20Feid,%20ICON%20-%20FERXXO%20151%20(Official%20Video)%20(128%20kbps).mp3",
            by: "Mora",
            datePublished: "2024-10-05",
            id: "f504bea2-2a16-4134-ab88-1b9912e7b49f",
            idAlbum: ["8087aee5-555d-4d94-b2b7-a9c977eb7375"],
            idGenre: "8",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/f504bea2-2a16-4134-ab88-1b9912e7b49f/512.jpg",
            name: "151",
            time: "3m 47s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/2cfd4443-282d-48d3-9435-e17bca45b44b/BurnItDown.mp3",
            by: "AndresRock",
            datePublished: "2024-10-05",
            id
                :
                "2cfd4443-282d-48d3-9435-e17bca45b44b",
            idGenre
                :
                "1",
            idAlbum
                :
                ["b5487f15-78bb-4e12-abf3-16f396a35e36"],
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/2cfd4443-282d-48d3-9435-e17bca45b44b/hybrid.jpg",
            name
                :
                "BurnItDown",
            time
                :
                "3m 53s",
        },
        {

            audio
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/351d251b-ea11-4c6c-84d4-e701acb229ba/NewDivide.mp3",
            by
                :
                "AndresRock",
            datePublished
                :
                "2024-10-05",
            id
                :
                "351d251b-ea11-4c6c-84d4-e701acb229ba",
            idAlbum
                :
                ["b5487f15-78bb-4e12-abf3-16f396a35e36"],
            idGenre
                :
                "1",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/351d251b-ea11-4c6c-84d4-e701acb229ba/hybrid.jpg",
            name
                :
                "New Divide",
            time
                :
                "4m 29s",
        },
        {
            audio
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/1152911f-bf5d-44eb-9117-b5eb72359f55/thechain.mp3",
            by
                :
                "AndresRock",
            datePublished
                :
                "2024-10-05",
            id
                :
                "1152911f-bf5d-44eb-9117-b5eb72359f55",
            idGenre
                :
                "8",
            idAlbum
                :
                ["b5487f15-78bb-4e12-abf3-16f396a35e36"],
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/1152911f-bf5d-44eb-9117-b5eb72359f55/512.jpg",
            name
                :
                "TheChain",
            time
                :
                "4m 29s",
        },
        {
            audio
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/c057df78-390e-4b3d-a4b0-085301b2629a/Y2meta.app%20-%20Jujutsu%20Kaisen_%20Gojo%20vs%20Toji%20(Riko%20in%20the%20Aquarium)%20Theme%20_%20EPIC%20VERSION%20(Season%202%20Soundtrack)%20(128%20kbps).mp3",
            by
                :
                "DanielViolin",
            datePublished
                :
                "2024-10-05",
            id
                :
                "c057df78-390e-4b3d-a4b0-085301b2629a",
            idAlbum
                :
                ["224bf211-03c3-4a57-b859-362347cabedf"],
            idGenre
                :
                "7",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/c057df78-390e-4b3d-a4b0-085301b2629a/violinClasic.jpg",
            name
                :
                "Violin",
            time
                :
                "3m 53s",
        },
        {
            audio
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c/Vivaldi%20-%20Concerto%20No.%204%20in%20F%20minor,%20Op.%208,%20RV%20297,%20_Winter_%20(128%20kbps).mp3",
            by
                :
                "DanielViolin",
            datePublished
                :
                "2024-10-05",
            id
                :
                "d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c",
            idAlbum
                :
                ["224bf211-03c3-4a57-b859-362347cabedf"],
            idGenre
                :
                "7",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c/violinClasic.jpg",
            name
                :
                "Winter",
            time
                :
                "9m 31s",
        },
        {
            audio
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db/Porch.mp3",
            by
                :
                "DanielViolin",
            datePublished
                :
                "2024-10-05",
            id
                :
                "b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db",
            idAlbum
                :
                ["224bf211-03c3-4a57-b859-362347cabedf"],
            idGenre
                :
                "7",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db/violinClasic.jpg",
            name
                :
                "Porch",
            time
                :
                "0m 58s",
        }

    ]

    private readonly Albums: Album[] = [
        {
            by
                :
                "DanielViolin",
            datePublished
                :
                "2024-10-05",
            id
                :
                "224bf211-03c3-4a57-b859-362347cabedf",
            idGenre
                :
                "7",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/224bf211-03c3-4a57-b859-362347cabedf/violinClasic.jpg",
            name
                :
                "Música Clasica",
        },
        {
            by
                :
                "Mora",
            datePublished
                :
                "2024-10-05",
            id
                :
                "8087aee5-555d-4d94-b2b7-a9c977eb7375",
            idGenre
                :
                "8",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/8087aee5-555d-4d94-b2b7-a9c977eb7375/512.jpg",
            name
                :
                "Primer dia de clase",
        },
        {
            by
                :
                "Mora",
            datePublished
                :
                "2024-10-05",
            id
                :
                "90abb70e-8383-4366-93aa-1953bd8512ba",
            idGenre
                :
                "8",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/90abb70e-8383-4366-93aa-1953bd8512ba/DATA.jpg",
            name
                :
                "DATA",
        },
        {

            by
                :
                "AndresRock",
            datePublished
                :
                "2024-10-05",
            id
                :
                "b5487f15-78bb-4e12-abf3-16f396a35e36",
            idGenre
                :
                "1",
            image
                :
                "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/b5487f15-78bb-4e12-abf3-16f396a35e36/hybrid.jpg",
            name
                :
                "Rock",
        }
    ]

    public readonly songsArtist: songsOfArtist[] = [
        {
            idArtist: "846b89a5-d9ee-4ae6-adb1-867380e2cdbf",
            idSong: "2cfd4443-282d-48d3-9435-e17bca45b44b"
        },
        {
            idArtist: "846b89a5-d9ee-4ae6-adb1-867380e2cdbf",
            idSong: "351d251b-ea11-4c6c-84d4-e701acb229ba"
        },
        {
            idArtist: "846b89a5-d9ee-4ae6-adb1-867380e2cdbf",
            idSong: "1152911f-bf5d-44eb-9117-b5eb72359f55"
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idSong: "6dd9cc7e-f80e-439f-a785-81cf724d6319"
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idSong: "a93f1272-0860-4a9c-a997-0bd6f0cb8f3e"
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idSong: "414726b1-52ce-4fd3-b60e-d6a64b042d32",
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idSong: "ef210e56-eb86-4609-9e0d-a31eaff5c89e",
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idSong: "f504bea2-2a16-4134-ab88-1b9912e7b49f"
        },
        {
            idArtist: "123e4567-e89b-14d3-a456-426624174004",
            idSong: "b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db"
        },
        {
            idArtist: "123e4567-e89b-14d3-a456-426624174004",
            idSong: "d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c",
        },
        {
            idArtist: "123e4567-e89b-14d3-a456-426624174004",
            idSong: "c057df78-390e-4b3d-a4b0-085301b2629a"
        }
    ]

    private readonly albumsArtist: albumsOfArtist[] = [
        {
            idArtist: "846b89a5-d9ee-4ae6-adb1-867380e2cdbf",
            idAlbum: "b5487f15-78bb-4e12-abf3-16f396a35e36"
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idAlbum: "90abb70e-8383-4366-93aa-1953bd8512ba"
        },
        {
            idArtist: "123e4567-e89b-12d3-a456-426614174003",
            idAlbum: "8087aee5-555d-4d94-b2b7-a9c977eb7375"
        },
        {
            idArtist: "123e4567-e89b-14d3-a456-426624174004",
            idAlbum: "224bf211-03c3-4a57-b859-362347cabedf"
        }
    ]


    getBurnedUsers() {
        return this.Users
    }

    getBurnedArtist() {
        return this.Artists
    }

    getBurnedSongs() {
        return this.Songs
    }

    getBurnedAlbums() {
        return this.Albums
    }

    getBurnedAlbumsArtist() {
        return this.albumsArtist
    }

    getBurnedSongsArtist() {
        return this.songsArtist
    }


}
