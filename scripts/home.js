// Playlists
let playlists = [
    { name: "Nevermind", owner: "Nirvana", img: "../images/nevermind.png" },
    { name: "inUtero", owner: "Nirvana", img: "../images/inUtero.png"},
    { name: "Hybrid Theory", owner: "Linkin Park", img: "../images/hybridTheory.png"},
    { name: "Meteora", owner: "Linkin Park", img: "../images/meteora.png"},
    { name: "David Bowie", owner: "Artista", img: "../images/davidBowie.png"},
    { name: "Dream", owner: "Fleetwood Mac", img: "../images/dream.png"}
];  

function renderPlaylists() {
    const playlistContainer = document.getElementById('playlistContainer');
    playlistContainer.innerHTML = '';  

    playlists.forEach(playlist => {
        const playlistItem = document.createElement('li');
        playlistItem.innerHTML = `
            <img src="${playlist.img}" alt="${playlist.name}">
            <div>
                ${playlist.name}<br>
                <span>${playlist.owner}</span>
            </div>
        `;
        playlistContainer.appendChild(playlistItem);
    });
}

window.onload = renderPlaylists;

function createAlert(){
    Swal.fire({
        title: 'Nombre de la Playlist',
        input: 'text',
        inputLabel: 'Por favor ingresa el nombre de la nueva playlist:',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return '¡Necesitas escribir un nombre!'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let nombrePlaylist = result.value;
            addPlaylist(nombrePlaylist);
        }
    });
}

function addPlaylist(nombrePlaylist) {
    playlists.push({ name: nombrePlaylist, owner: "Santiago", img: "../images/nada.png" });
    renderPlaylists();
}
