export interface Album {
    id: string;
    name: string;
    image: string;
    by: string;
    genero: Gender;
    datePublished: string;
}

export interface Gender{
    id: string;
    name: string;
    description: string;
    image: string
}