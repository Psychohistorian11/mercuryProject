export const enviroment = {
   localStorageConfig: {
      songs: {
         key: 'songs'
      },
      albums: {
         key: 'albums'
      },
      songsArtist: {
         key: 'songsArtist'
      },
      albumsArtist: {
         key: 'albumsArtist'
      },
      users: {
         key: 'users'
      },
      currentUser: {
         key: 'user'
      },
      temporaryDate: {
         key: 'temporaryData'
      }
   },

   supabaseConfig: {
      url: 'https://qgjoyydixskkohmjmcme.supabase.co',
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnam95eWRpeHNra29obWptY21lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzA0MDc2MCwiZXhwIjoyMDQyNjE2NzYwfQ.rvp4l4nIm1itUz5arDgX2m0vBFsKRODhcuvdua8W2d0',

   },

   supabaseBucket: {
      Songs: {
         name: "Songs",
         audios: "audios",
         images: "images"
      },

      Users: {
         name: "Users",
         profilePicture: "profilePicture"
      },

      Albums: {
         name: "Albums",
         images: "images"
      },

      PlayList: {
         name: "PlayList",
         images: "images"
      }

   }

}

