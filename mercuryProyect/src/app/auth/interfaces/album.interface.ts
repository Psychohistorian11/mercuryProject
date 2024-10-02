export interface Album {
    id: string;
    name: string;
    image: string;
    by: string;
    idGenre: string;
    datePublished: string;
}

export interface Genres{
    id: string;
    name: string;
    description: string;
    image: string
}