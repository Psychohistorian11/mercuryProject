import { Injectable } from '@angular/core';
import { Artist, User } from '../app/auth/interfaces/user.interface';
import { Song } from '../app/auth/interfaces/song.interface';


@Injectable({
    providedIn: 'root'
})
export class BurnedFilesService {

    private readonly Users: User[] = [
        {
            dateOfBirth: "2024-08-15",
            email: "juanperez@gmail.com",
            id: "123e4567-e89b-12d3-a456-426614174000",
            location: "Colombia",
            password: "1234",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/JuanPerez.jpg",
            role: "hearer",
            userName: "Juan Perez"
        },
        {
            dateOfBirth: "2024-05-22",
            email: "maria.gonzalez@gmail.com",
            id: "123e4567-e89b-12d3-a456-426614174001",
            location: "Colombia",
            password: "1234",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/MariaGonzales.jpg",
            role: "hearer",
            userName: "Maria Gonzalez"
        }
    ]

    private readonly Artists: Artist[] = [
        {
            biography: "Soy cantante y productor musical apasionado por el rock.",
            dateOfBirth: "2024-07-10",
            email: "andresrock@gmail.com",
            id: "123e4567-e89b-12d3-a456-426614174002",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/AndresRock.jpg",
            role: "artist",
            userName: "AndresRock"
        },
        {
            biography: "Mi música es una mezcla de sonidos latinos y electrónicos.",
            dateOfBirth: "2024-02-20",
            email: "sofiaelectro@gmail.com",
            id: "123e4567-e89b-12d3-a456-426614174003",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/SofiaElectro.jpg",
            role: "artist",
            userName: "Mora"
        },
        {
            biography: "Cantante de baladas y ritmos románticos.",
            dateOfBirth: "2024-03-30",
            email: "danielbalada@gmail.com",
            id: "123e4567-e89b-14d3-a456-426624174004",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/DanielBalada.jpg",
            role: "artist",
            userName: "DanielViolin"
        }
    ]

    private readonly Songs: Song[] = [
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/6dd9cc7e-f80e-439f-a785-81cf724d6319/Y2meta.app%20-%20512%20(128%20kbps).mp3",
            by: "Mora",
            datePublished: "2024-10-05",
            id: "6dd9cc7e-f80e-439f-a785-81cf724d6319",
            idGenre: "8",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/6dd9cc7e-f80e-439f-a785-81cf724d6319/512.jpg",
            name: "512",
            time: "3m 13s"
        },
        {
            audio:"https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/a93f1272-0860-4a9c-a997-0bd6f0cb8f3e/Y2meta.app%20-%20Tuyo%20(128%20kbps).mp3",
            by:"Cristian",
            datePublished:"2024-10-05",
            id:"a93f1272-0860-4a9c-a997-0bd6f0cb8f3e",
            idGenre:"8",
            image:"https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/a93f1272-0860-4a9c-a997-0bd6f0cb8f3e/512.jpg",
            name:"Tuyo",
            time:"4m 29s"}

    ]


    getBurnedUsers() {
        return this.Users
    }

    getBurnedArtist() {
        return this.Artists
    }


}
