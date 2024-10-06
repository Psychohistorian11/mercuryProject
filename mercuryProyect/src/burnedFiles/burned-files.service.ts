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
            id: "846b89a5-d9ee-4ae6-adb1-867380e2cdbf",
            dateOfBirth: "2024-08-15",
            email: "juanperez@gmail.com",
            location: "Colombia",
            password: "1234",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5-d9ee-4ae6-adb1-867380e2cdbf/JuanPerez.jpg",
            role: "hearer",
            userName: "Juan Perez"
        },
        {
            id: "123e4567-asdsd-12d43er56-426614174001",
            dateOfBirth: "2024-05-22",
            email: "maria.gonzalez@gmail.com",
            location: "Colombia",
            password: "1234",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/123e4567-asdsd-12d43er56-426614174001/MariaGonzales.jpg",
            role: "hearer",
            userName: "Maria Gonzalez"
        }
    ]

    private readonly Artists: Artist[] = [
        {
            id: "846b89a5asdfgbv34ef80e2cdbf",
            biography: "Soy cantante y productor musical apasionado por el rock.",
            dateOfBirth: "2024-07-10",
            email: "andresrock@gmail.com",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/846b89a5asdfgbv34ef80e2cdbf/AndresRock.jpg",
            role: "artist",
            userName: "AndresRock"
        },
        {
            id: "123e4567-e89b-12d3-a456-426614174003",
            biography: "Mi música es una mezcla de sonidos latinos y electrónicos.",
            dateOfBirth: "2024-02-20",
            email: "mora@gmail.com",
            location: "Colombia",
            password: "123",
            profilePicture: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Users/profilePicture/123e4567-e89b-12d3-a456-426614174003/JuanPerez.jpg",
            role: "artist",
            userName: "Mora"
        },
        {
            id: "123asdsfsdv324556sdvsasasdasd174004",
            biography: "Cantante de baladas y ritmos románticos.",
            dateOfBirth: "2024-03-30",
            email: "danielviolin@gmail.com",
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
            id: "6dd9cc7e-f80e-439f-a785-81cf724d6319",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/6dd9cc7e-f80e-439f-a785-81cf724d6319/512.mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/6dd9cc7e-f80e-439f-a785-81cf724d6319/512.jpg",
            by: "Mora",
            name: "512",
            time: "3m 13s",
            datePublished: "2024-10-05",
            idAlbum: ["8087aee5-555d-4d94-b2b7-a9c977eb7375"],
            idGenre: "8",
        },
        {
            id: "a93f1272-0860-4a9c-a997-0bd6f0cb8f3e",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/a93f1272-0860-4a9c-a997-0bd6f0cb8f3e/Y2meta.app%20-%20Tuyo%20(128%20kbps).mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/a93f1272-0860-4a9c-a997-0bd6f0cb8f3e/512.jpg",
            by: "Mora",
            datePublished: "2024-10-05",
            name: "Tuyo",
            time: "4m 29s",
            idAlbum: ["8087aee5-555d-4d94-b2b7-a9c977eb7375", "90abb70e-8383-4366-93aa-1953bd8512ba"],
            idGenre: "8",
        },
        {
            id: "414726b1-52ce-4fd3-b60e-d6a64b042d32",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/414726b1-52ce-4fd3-b60e-d6a64b042d32/Y2meta.app%20-%20Sci-Fi%20(128%20kbps).mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/414726b1-52ce-4fd3-b60e-d6a64b042d32/DATA.jpg",
            by: "Mora",
            datePublished: "2024-10-05",
            name: "Sci-Fi",
            time: "3m 17s",
            idAlbum: ["90abb70e-8383-4366-93aa-1953bd8512ba"],
            idGenre: "8",
        },
        {
            id: "ef210e56-eb86-4609-9e0d-a31eaff5c89e",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/ef210e56-eb86-4609-9e0d-a31eaff5c89e/Y2meta.app%20-%20Lo%20Siento%20BB__%20(128%20kbps).mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/ef210e56-eb86-4609-9e0d-a31eaff5c89e/DATA.jpg",
            by: "Mora",
            name: "Lo siento BB:/",
            time: "3m 26s",
            datePublished: "2024-10-05",
            idAlbum: ["90abb70e-8383-4366-93aa-1953bd8512ba"],
            idGenre: "5",
        },
        {
            id: "f504bea2-2a16-4134-ab88-1b9912e7b49f",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/f504bea2-2a16-4134-ab88-1b9912e7b49f/Y2meta.app%20-%20Feid,%20ICON%20-%20FERXXO%20151%20(Official%20Video)%20(128%20kbps).mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/f504bea2-2a16-4134-ab88-1b9912e7b49f/512.jpg",
            by: "Mora",
            name: "151",
            time: "3m 47s",
            datePublished: "2024-10-05",
            idAlbum: ["8087aee5-555d-4d94-b2b7-a9c977eb7375"],
            idGenre: "8",
        },
        {
            id: "2cfd4443-282d-48d3-9435-e17bca45b44b",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/2cfd4443-282d-48d3-9435-e17bca45b44b/BurnItDown.mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/2cfd4443-282d-48d3-9435-e17bca45b44b/hybrid.jpg",
            by: "AndresRock",
            name: "BurnItDown",
            time: "3m 53s",
            datePublished: "2024-10-05",
            idAlbum: ["b5487f15-78bb-4e12-abf3-16f396a35e36"],
            idGenre: "1",
        },
        {
            id: "351d251b-ea11-4c6c-84d4-e701acb229ba",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/351d251b-ea11-4c6c-84d4-e701acb229ba/NewDivide.mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/351d251b-ea11-4c6c-84d4-e701acb229ba/hybrid.jpg",
            by: "AndresRock",
            name: "New Divide",
            time: "4m 29s",
            datePublished: "2024-10-05",
            idAlbum: ["b5487f15-78bb-4e12-abf3-16f396a35e36"],
            idGenre: "1",
        },
        {
            id: "1152911f-bf5d-44eb-9117-b5eb72359f55",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/1152911f-bf5d-44eb-9117-b5eb72359f55/thechain.mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/1152911f-bf5d-44eb-9117-b5eb72359f55/512.jpg",
            by: "AndresRock",
            name: "TheChain",
            time: "4m 29s",
            datePublished: "2024-10-05",
            idAlbum: ["b5487f15-78bb-4e12-abf3-16f396a35e36"],
            idGenre: "8",
        },
        {
            id: "c057df78-390e-4b3d-a4b0-085301b2629a",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/c057df78-390e-4b3d-a4b0-085301b2629a/Y2meta.app%20-%20Jujutsu%20Kaisen_%20Gojo%20vs%20Toji%20(Riko%20in%20the%20Aquarium)%20Theme%20_%20EPIC%20VERSION%20(Season%202%20Soundtrack)%20(128%20kbps).mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/c057df78-390e-4b3d-a4b0-085301b2629a/violinClasic.jpg",
            by: "DanielViolin",
            name: "Violin",
            time: "3m 53s",
            datePublished: "2024-10-05",
            idAlbum: ["224bf211-03c3-4a57-b859-362347cabedf"],
            idGenre: "7",
        },
        {
            id: "d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c/Vivaldi%20-%20Concerto%20No.%204%20in%20F%20minor,%20Op.%208,%20RV%20297,%20_Winter_%20(128%20kbps).mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c/violinClasic.jpg",
            by: "DanielViolin",
            name: "Winter",
            time: "9m 31s",
            datePublished: "2024-10-05",
            idAlbum: ["224bf211-03c3-4a57-b859-362347cabedf"],
            idGenre: "7",
        },
        {
            id: "b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db",
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db/Porch.mp3",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db/violinClasic.jpg",
            by: "DanielViolin",
            name: "Porch",
            time: "0m 58s",
            datePublished: "2024-10-05",
            idAlbum: ["224bf211-03c3-4a57-b859-362347cabedf"],
            idGenre: "7",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/a3dafacb-e452-481c-b49b-e6f48eb06ecd/main.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "a3dafacb-e452-481c-b49b-e6f48eb06ecd",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/a3dafacb-e452-481c-b49b-e6f48eb06ecd/juegodetronos.jpg",
            name: "Main",
            time: "1m 52s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/8cbbf8f3-1318-4794-8e9d-b7ee4608213f/theRainOfCastemire.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "8cbbf8f3-1318-4794-8e9d-b7ee4608213f",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/8cbbf8f3-1318-4794-8e9d-b7ee4608213f/juegodetronos.jpg",
            name: "The rain Of Castemire",
            time: "3m 44s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/8ed12b67-7878-47c6-8e58-2010fcdaf545/ASongOfIceAndFire.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "8ed12b67-7878-47c6-8e58-2010fcdaf545",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/8ed12b67-7878-47c6-8e58-2010fcdaf545/juegodetronos.jpg",
            name: "A song of ice and fire",
            time: "2m 12s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/cb4d3da5-38fc-4605-9a1a-1b33adf5cbe3/DeadBeforetheDawn.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "cb4d3da5-38fc-4605-9a1a-1b33adf5cbe3",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/cb4d3da5-38fc-4605-9a1a-1b33adf5cbe3/juegodetronos.jpg",
            name: "Dead before the dawn",
            time: "4m 14s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/9abc54e7-4b41-40a1-aa4b-e0590625839a/ForCersi.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "9abc54e7-4b41-40a1-aa4b-e0590625839a",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/9abc54e7-4b41-40a1-aa4b-e0590625839a/juegodetronos.jpg",
            name: "For Cersi",
            time: "4m 24s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/af50eb04-d95a-46d7-a54d-e9a47e8f30d9/HeirtotheThrone.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "af50eb04-d95a-46d7-a54d-e9a47e8f30d9",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/af50eb04-d95a-46d7-a54d-e9a47e8f30d9/juegodetronos.jpg",
            name: "Heir to the throne",
            time: "2m 27s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/0c2107fd-f13d-4814-ae69-269d48fb92c9/theLastOfTheStark.mp3",
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "0c2107fd-f13d-4814-ae69-269d48fb92c9",
            idAlbum: ["4130ebba-5823-45c5-9e69-d3404bfef495"],
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/0c2107fd-f13d-4814-ae69-269d48fb92c9/juegodetronos.jpg",
            name: "The last of the Stark ",
            time: "4m 52s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/9cd55eb3-b158-46eb-9fa6-b19eb1ba0b31/Breathe.mp3",
            by: "AndresRock",
            datePublished: "2024-10-06",
            id: "9cd55eb3-b158-46eb-9fa6-b19eb1ba0b31",
            idAlbum: ["97e1ed0b-73f4-4614-93b2-b82982cc0146"],
            idGenre: "1",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/9cd55eb3-b158-46eb-9fa6-b19eb1ba0b31/thedark.jpeg",
            name: "Breathe",
            time: "2m 46s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/60de9b04-c628-4a5b-8723-4cc02d333b3c/SpeakToMe.mp3",
            by: "AndresRock",
            datePublished: "2024-10-06",
            id: "60de9b04-c628-4a5b-8723-4cc02d333b3c",
            idAlbum: ["97e1ed0b-73f4-4614-93b2-b82982cc0146"],
            idGenre: "1",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/60de9b04-c628-4a5b-8723-4cc02d333b3c/thedark.jpeg",
            name: "Speak to me",
            time: "1m 7s",
        },
        {

            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/6166c5a1-12ae-4c53-b57c-1c5f2d1ed94a/%20Chop%20Suey!.mp3",
            by: "AndresRock",
            datePublished: "2024-10-06",
            id: "6166c5a1-12ae-4c53-b57c-1c5f2d1ed94a",
            idAlbum: ["16a34f0f-be2e-4cd9-a379-9851a6662132"],
            idGenre: "1",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/6166c5a1-12ae-4c53-b57c-1c5f2d1ed94a/toxicity.jpg",
            name: "Chop Suey",
            time: "3m 28s",
        },
        {
            audio: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/audios/a0148ce3-cb03-40ed-aa45-422da0a23c6a/Aerials.mp3",
            by: "AndresRock",
            datePublished: "2024-10-06",
            id: "a0148ce3-cb03-40ed-aa45-422da0a23c6a",
            idAlbum: ["16a34f0f-be2e-4cd9-a379-9851a6662132"],
            idGenre: "1",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Songs/images/a0148ce3-cb03-40ed-aa45-422da0a23c6a/toxicity.jpg",
            name: "Aerials",
            time: "4m 3s",
        }


    ]

    private readonly Albums: Album[] = [
        {
            id: "224bf211-03c3-4a57-b859-362347cabedf",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/224bf211-03c3-4a57-b859-362347cabedf/violinClasic.jpg",
            name: "Música Clasica",
            by: "DanielViolin",
            datePublished: "2024-10-05",
            idGenre: "7",
        },
        {
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/8087aee5-555d-4d94-b2b7-a9c977eb7375/512.jpg",
            id: "8087aee5-555d-4d94-b2b7-a9c977eb7375",
            name: "Primer dia de clase",
            by: "Mora",
            datePublished: "2024-10-05",
            idGenre: "8",
        },
        {
            id: "90abb70e-8383-4366-93aa-1953bd8512ba",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/90abb70e-8383-4366-93aa-1953bd8512ba/DATA.jpg",
            name: "DATA",
            by: "Mora",
            datePublished: "2024-10-05",
            idGenre: "8",
        },
        {

            id: "b5487f15-78bb-4e12-abf3-16f396a35e36",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/b5487f15-78bb-4e12-abf3-16f396a35e36/hybrid.jpg",
            name: "Rock",
            by: "AndresRock",
            datePublished: "2024-10-05",
            idGenre: "1",
        },
        {
            by: "DanielViolin",
            datePublished: "2024-10-06",
            id: "4130ebba-5823-45c5-9e69-d3404bfef495",
            idGenre: "7",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/4130ebba-5823-45c5-9e69-d3404bfef495/juegodetronos.jpg",
            name: "Game Of Thrones",
        },
        {
            by: "AndresRock",
            datePublished: "2024-10-06",
            id: "97e1ed0b-73f4-4614-93b2-b82982cc0146",
            idGenre: "1",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/97e1ed0b-73f4-4614-93b2-b82982cc0146/thedark.jpeg",
            name: "The Dark Side of the Moon",
        },
        {
            by: "AndresRock",
            datePublished: "2024-10-06",
            id: "16a34f0f-be2e-4cd9-a379-9851a6662132",
            idGenre: "1",
            image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/16a34f0f-be2e-4cd9-a379-9851a6662132/toxicity.jpg",
            name: "Toxicity",
        }
    ]

    public readonly songsArtist: songsOfArtist[] = [
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "2cfd4443-282d-48d3-9435-e17bca45b44b"
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "351d251b-ea11-4c6c-84d4-e701acb229ba"
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
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
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "b5ac6017-b6bc-4e70-b3b4-5ab7c04a36db"
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "d73eb3c5-f3eb-4f78-8fcf-d682c022ed3c",
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "c057df78-390e-4b3d-a4b0-085301b2629a"
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "a3dafacb-e452-481c-b49b-e6f48eb06ecd",
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "8cbbf8f3-1318-4794-8e9d-b7ee4608213f",
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "8ed12b67-7878-47c6-8e58-2010fcdaf545",
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "cb4d3da5-38fc-4605-9a1a-1b33adf5cbe3",
        }, {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "9abc54e7-4b41-40a1-aa4b-e0590625839a",
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "af50eb04-d95a-46d7-a54d-e9a47e8f30d9",
        }, {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idSong: "0c2107fd-f13d-4814-ae69-269d48fb92c9",
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "9cd55eb3-b158-46eb-9fa6-b19eb1ba0b31",
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "60de9b04-c628-4a5b-8723-4cc02d333b3c",
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "be84bbb7-3f46-4869-bc0b-0591692471d5",
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "6166c5a1-12ae-4c53-b57c-1c5f2d1ed94a",
        },
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
            idSong: "a0148ce3-cb03-40ed-aa45-422da0a23c6a",
        }
    ]

    private readonly albumsArtist: albumsOfArtist[] = [
        {
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
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
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idAlbum: "224bf211-03c3-4a57-b859-362347cabedf"
        },
        {
            idArtist: "123asdsfsdv324556sdvsasasdasd174004",
            idAlbum: "4130ebba-5823-45c5-9e69-d3404bfef495",
        },
        {
            idAlbum: "97e1ed0b-73f4-4614-93b2-b82982cc0146",
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
        },
        {
            idAlbum: "16a34f0f-be2e-4cd9-a379-9851a6662132",
            idArtist: "846b89a5asdfgbv34ef80e2cdbf",
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
