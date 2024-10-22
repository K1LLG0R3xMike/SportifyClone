import React, { useState, useEffect } from 'react';

export default function Sidebar({ onPlaylistSelect }) {  // Recibe la función onPlaylistSelect
  const [playlists, setPlaylists] = useState([]);
  const uniquePlaylists = [...new Set(playlists.map(playlist => playlist._id))];

  // Función para obtener playlists de la API
  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/playlists'); // Cambia esta URL si es necesario
      if (!response.ok) {
        throw new Error('Error al obtener playlists');
      }
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // useEffect para llamar a fetchPlaylists cuando el componente se monta
  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="w-40 bg-neutral-900 text-white h-full p-4 pt-1">
      <div className='flex items-center'>
        <span className="flex items-center text-neutral-500 hover:text-white text-1xl">
          <span className="iconify size-5" data-icon="mdi:music-box-multiple" />
          <span className="text-sm font-bold ml-2">Tu Biblioteca</span> {/* ml-2 para separar */}
        </span>
        <button>
        <span className="iconify size-5 text-neutral-500 hover:text-white ml-10" data-icon="mdi:plus-circle-outline" />
      </button>
      <button>
        <span className="iconify size-5 text-neutral-500 hover:text-white ml-2" data-icon="mdi:arrow-right" />
      </button>
      </div>
        <div className="flex items-center pt-5">
          <input
          type="text"
          placeholder="Buscar en biblioteca"
          className="bg-neutral-700 text-white rounded-full pl-3 w-44 focus:outline-none"
          />
    </div>
      <div className="flex flex-col pt-3 space-y-1">
        {playlists.map((playlist, index) => (
          <div 
            key={playlist._id || `${playlist.name}-${index}`}
            className="flex flex-col p-2 pl-1 rounded-lg hover:bg-neutral-800 transition-colors"
            onClick={() => onPlaylistSelect(playlist)}  // Añadimos onClick aquí para que al hacer clic se seleccione la playlist
          >
            <div className="flex items-center">
              <img src={playlist.cover} alt={`Portada de ${playlist.name}`} className="w-12 h-12 object-cover rounded-lg mr-3" />
              <div>
                <h3 className="text-sm font-semibold">{playlist.name}</h3>
                <p className="text-xs text-gray-400">{playlist.artist}</p>
              </div>
            </div>

            {/* Mostrar canciones dentro de la playlist */}
            <ul className="pl-4 pt-2 text-xs">
              {playlist.songs.length > 0 ? (
                playlist.songs.map((song, index) => (
                  <li key={song._id} className="text-gray-300">
                    {/* Botón para añadir la canción a la playlist */}
                    {/*song.title*/}
                  </li>
                ))
              ) : (
                <li className="text-gray-500"></li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
