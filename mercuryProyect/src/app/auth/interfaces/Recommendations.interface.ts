export interface Recommendations{
    name: string;
    nameArtist: string;
    type: string
    image: string;

}

export interface threeSongs extends Recommendations{
    
}

export interface Song extends Recommendations{
        time: string    
}