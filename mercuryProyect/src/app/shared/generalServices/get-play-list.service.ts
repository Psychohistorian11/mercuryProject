import { Injectable } from '@angular/core';
import {User} from './../../auth/interfaces/user.interface'

@Injectable({
  providedIn: 'root'
})
export class GetPlayListService {

  constructor() { }

  getPlayListsByIdUser(idUser: string){
      return [{id: "1",
        userId: "1",
        name: "Un verano sin ti",
        isPublic: true,
        datePublished: "01-11-2024",
        image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/16a34f0f-be2e-4cd9-a379-9851a6662132/toxicity.jpg?t=2024-11-01T19%3A16%3A43.717Z"
      }]
  }

  getPlayListsByIdArtist(idUser: string){
    return [{id: "1",
      userId: "1",
      name: "Un verano sin ti",
      isPublic: true,
      datePublished: "01-11-2024",
      image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/224bf211-03c3-4a57-b859-362347cabedf/violinClasic.jpg"
    },
    {id: "2",
      userId: "2",
      name: "Un verano sin ti12122",
      isPublic: true,
      datePublished: "01-11-2024",
      image: "https://qgjoyydixskkohmjmcme.supabase.co/storage/v1/object/public/Albums/images/16a34f0f-be2e-4cd9-a379-9851a6662132/toxicity.jpg?t=2024-11-01T19%3A16%3A43.717Z"
    }]
  }
}
