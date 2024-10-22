import React from 'react';

export default function SidebarDerecha({ currentSong }) {
  const currentSongCover = currentSong?.imageUrl || "bad.jpg"; // Imagen por defecto

  // Función para obtener el ID del video de YouTube
  const getYoutubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // Devuelve el ID o null
  };

  const youtubeID = currentSong?.youtubeUrl ? getYoutubeID(currentSong.youtubeUrl) : null;

  return (
    <div className="w-80 bg-neutral-900 text-white h-full p-2 pt-1">
      <div className='flex items-center mb-4'>
        <h2 className="text-sm font-bold">Sonando en este momento</h2>

        <button>
          <span className="iconify size-5 text-neutral-500 hover:text-white ml-20" data-icon="mdi:dots-horizontal" />
        </button>
        <button>
          <span className="iconify size-5 text-neutral-500 hover:text-white ml-2 mr-0" data-icon="mdi:arrow-right" />
        </button>
      </div>

      {/*<div className="flex justify-center mb-4 pl-1">
        <img 
          src={currentSongCover} 
          alt="Portada de la canción" 
          className="w-96 h-80 rounded-lg" 
        />
      </div>*/}

      <div className="">
        <h3 className="text-sm font-semibold">{currentSong?.title}</h3>
        <p className="text-xs text-gray-400">{currentSong?.artistName}</p>
      </div>

      {/* Reproductor de video de YouTube */}
      {youtubeID && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold">Video de YouTube:</h4>
          <iframe 
            width="100%" 
            height="315" 
            src={`https://www.youtube.com/embed/${youtubeID}`} 
            title={currentSong.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      )}
    </div>
  );
}
