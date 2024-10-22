import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrls, getAudioUrl } from './mediadisplay.jsx';
import { Icon } from '@iconify/react';

export default function MainView({ searchTerm, onSongSelect }) {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [audioUrls, setAudioUrls] = useState([]);
  const [playlistId, setPlaylistId] = useState('');
  const [songId, setSongId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  
  // Estado para almacenar la playlist seleccionada
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres from API', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists from API', error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/songs');
        setSongs(response.data);
        const urls = response.data.map(song => song.imageUrl);
        setImageUrls(urls);
        
        const audioUrls = response.data.map(song => song.audioUrl);
        setAudioUrls(audioUrls);
        console.log('Fetched audio URLs:', audioUrls);
      } catch (error) {
        console.error('Error fetching songs from API', error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/playlists/');
        if (!response.ok) {
          throw new Error('Error al obtener playlists');
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPlaylists();
    fetchGenres();
    fetchArtists();
    fetchSongs();
  }, []);

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist._id === artistId);
    return artist ? artist.name : 'Artista desconocido';
  };

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToPlaylistClick = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  const handleAddSongToPlaylist = async () => {
    if (!songId || !playlistId) {
        console.error('Playlist ID o Song ID no son válidos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/playlists/add-song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId, playlistId }),
        });

        if (!response.ok) {
            throw new Error('Error al añadir la canción a la playlist.');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        
        // Cierra el modal si la canción se añadió correctamente
        setIsModalOpen(false);
    } catch (error) {
        console.error('Error al añadir canción:', error);
    }
  };

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist); // Actualiza la playlist seleccionada
  };

  return (
    <div className="flex-1 text-white p-4 overflow-y-auto">
      <h2 className="text-1xl font-bold mb-2">Bienvenido a tu música</h2>

      {selectedPlaylist ? (
        <div>
          <h3 className="text-md font-bold mb-4">Playlist: {selectedPlaylist.name}</h3>
          <div className="bg-neutral-800 p-4 pl-2 w-86 h-16 flex items-center rounded-lg hover:bg-neutral-700 transition-colors">
            <h4 className="font-bold">Canciones:</h4>
            <ul>
              {selectedPlaylist.songs.length > 0 ? (
                selectedPlaylist.songs.map((songId) => {
                  const song = songs.find(s => s._id === songId); // Encuentra la canción por ID
                  return (
                    <li key={songId} className="mb-2">
                      {song ? song.title : 'Canción no encontrada'}
                    </li>
                  );
                })
              ) : (
                <li>No hay canciones en esta playlist</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <>
          {searchTerm ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1">
              <h3 className="text-md font-bold mb-4">Resultados de la búsqueda:</h3>
              <div className="bg-neutral-800 p-4 pl-2 w-86 h-16 flex items-center rounded-lg hover:bg-neutral-700 transition-colors">
                <h4 className="font-bold">Géneros:</h4>
                <ul>
                  {filteredGenres.length > 0 ? (
                    filteredGenres.map((genre) => (
                      <li key={`genre-${genre.id}`} className="mb-2">
                        {genre.name}
                      </li>
                    ))
                  ) : (
                    <li>No se encontraron géneros</li>
                  )}
                </ul>
              </div>

              <div className="bg-neutral-800 p-4 pl-2 w-86 h-16 flex items-center rounded-lg hover:bg-neutral-700 transition-colors">
                <h4 className="font-bold">Artistas:</h4>
                <ul>
                  {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist) => (
                      <li key={`artist-${artist._id}`} className="mb-2">
                        {artist.name}
                      </li>
                    ))
                  ) : (
                    <li>No se encontraron artistas</li>
                  )}
                </ul>
              </div>

              <div className="bg-neutral-800 p-4 pl-2 w-86 h-16 flex items-center rounded-lg hover:bg-neutral-700 transition-colors">
                <h4 className="font-bold">Canciones:</h4>
                <div>
                  <div className="flex flex-col">
                    {filteredSongs.length > 0 ? (
                      filteredSongs.map((song, index) => (
                        <div key={`song-${song._id}`} className="flex items-center mb-2">
                          <img src={imageUrls[index]} alt={`Cover of ${song.title}`} className="w-12 h-12 mr-2" />
                          <span>{song.title}</span>
                          <p className="text-sm text-gray-400">
                            {getArtistName(song.artist)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <li>No se encontraron canciones</li>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1">
              {filteredSongs.map((song, index) => (
                <div key={song._id} onClick={() => onSongSelect(song)} className="bg-neutral-800 p-4 pl-2 w-86 h-16 flex items-center rounded-lg hover:bg-neutral-700 transition-colors">
                  <img src={imageUrls[index]} alt={`Cover of ${song.title}`} className="w-12 h-12 mr-2" />
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-md font-bold">{song.title}</h3>
                    <p className="text-sm text-gray-400">
                      {getArtistName(song.artist)}
                    </p>
                  </div>
                  <Icon onClick={() => handleAddToPlaylistClick(song)} icon="mdi:bookmark-outline" className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition ml-auto" />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-neutral-800 p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Selecciona una Playlist</h2>
            <ul>
              {playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => {
                    setSongId(selectedSong._id);
                    setPlaylistId(playlist._id);
                    handleAddSongToPlaylist();
                  }}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
