import { Injectable } from '@angular/core';
import { Genres } from './../../auth/interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class GetGendersService {
  private readonly musicGenres: Genres[] = [
    {
      id: '1',
      name: 'Rock',
      description: 'Un género caracterizado por el uso de guitarras eléctricas y un ritmo fuerte y enérgico.',
      image: 'https://example.com/images/rock.jpg'
    },
    {
      id: '2',
      name: 'Pop',
      description: 'Un género de música popular que se caracteriza por su estructura accesible y pegajosa.',
      image: 'https://example.com/images/pop.jpg'
    },
    {
      id: '3',
      name: 'Jazz',
      description: 'Un género musical que se originó en las comunidades afroamericanas y se caracteriza por la improvisación y el swing.',
      image: 'https://example.com/images/jazz.jpg'
    },
    {
      id: '4',
      name: 'Hip-Hop',
      description: 'Un género que combina ritmo y poesía hablada, popular en las culturas urbanas.',
      image: 'https://example.com/images/hiphop.jpg'
    },
    {
      id: '5',
      name: 'Reggae',
      description: 'Un género de música que se originó en Jamaica y se caracteriza por su ritmo relajado y letras sociales.',
      image: 'https://example.com/images/reggae.jpg'
    },
    {
      id: '6',
      name: 'Electronic',
      description: 'Un género basado en el uso de sonidos electrónicos y sintetizadores, común en la música de baile.',
      image: 'https://example.com/images/electronic.jpg'
    },
    {
      id: '7',
      name: 'Classical',
      description: 'Un género tradicional que abarca la música sinfónica, óperas y otras formas musicales académicas.',
      image: 'https://example.com/images/classical.jpg'
    },
    {
      id: '8',
      name: 'Reggaeton',
      description: 'Un género musical urbano que combina influencias del reggae y el rap, originario de Puerto Rico.',
      image: 'https://example.com/images/reggaeton.jpg'
    },
    {
      id: '9',
      name: 'Country',
      description: 'Un género popular estadounidense que se caracteriza por melodías simples y letras sobre la vida rural.',
      image: 'https://example.com/images/country.jpg'
    },
    {
      id: '10',
      name: 'Blues',
      description: 'Un género que se originó en las comunidades afroamericanas, caracterizado por su melancolía y estructuras repetitivas.',
      image: 'https://example.com/images/blues.jpg'
    },
    {
      id: '11',
      name: 'Metal',
      description: 'Un género musical derivado del rock que se caracteriza por su sonido pesado y potente.',
      image: 'https://example.com/images/metal.jpg'
    },
    {
      id: '12',
      name: 'Soul',
      description: 'Un género que combina elementos del gospel y el rhythm and blues, conocido por su emotividad y voces potentes.',
      image: 'https://example.com/images/soul.jpg'
    }
  ];

  constructor() {}

  getGenders(): Genres[] {
    return this.musicGenres;
  }
}