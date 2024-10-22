import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import MainView from './components/mainview';
import PlayerControls from './components/playercontrols';
import TopBar from './components/topbar';
import SidebarDerecha from './components/sidebarDerecha';

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSong, setCurrentSong] = useState(null);
    const [playlists, setPlaylists] = useState([
        { id: 1, title: "Mike List", songs: [] },
        { id: 2, title: "Rico List", songs: [] },
        { id: 3, title: "Castro List", songs: [] },
        { id: 4, title: "Nuñez List", songs: [] },
      ]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Manejar la selección de una playlist
    const handlePlaylistSelect = (playlist) => {
        setSelectedPlaylist(playlist);  // Aquí actualizamos el estado con la playlist seleccionada
    };

    
      // Lógica para añadir la canción a la playlist
      const addSongToPlaylist = (playlistId, song) => {
        setPlaylists((prevPlaylists) => {
          return prevPlaylists.map((playlist) => {
            if (playlist.id === playlistId) {
              return { ...playlist, songs: [...playlist.songs, song] }; // Añade la canción a la playlist
            }
            return playlist;
          });
        });
      };

    const handleSongSelect = (song) => {
        setCurrentSong(song);
    };


    return (
        <div className="h-screen flex flex-col bg-neutral-900 pb-20">
            <div className='bg-neutral-950 pt-1'>
                <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="flex flex-1 p-4 bg-neutral-950 space-x-1.5 overflow-hidden">
                <div className="w-1/6 bg-neutral-900 rounded-lg pt-4">
                    <Sidebar onPlaylistSelect={handlePlaylistSelect} />
                </div>

                <div className="flex-1 bg-gradient-to-b from-green-800 to-neutral-900 rounded-lg pt-1">
                    <MainView searchTerm={searchTerm} onSongSelect={handleSongSelect} addSongToPlaylist={addSongToPlaylist} selectedPlaylist={selectedPlaylist} />
                </div>


                <div className="w-1/4 bg-neutral-900 rounded-lg pt-4">
                    <SidebarDerecha currentSong={currentSong} />
                </div>
            </div>

            <PlayerControls song={currentSong} />
        </div>
    );
}
