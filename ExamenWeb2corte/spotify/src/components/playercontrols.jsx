import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function PlayerControls({ song }) {
  const [audio, setAudio] = useState(new Audio(song?.audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);  // Tiempo actual del audio
  const [duration, setDuration] = useState(0);  // Duración total del audio
  const [volume, setVolume] = useState(100);  // Estado para el volumen (inicial en 100%)

  useEffect(() => {
    // Verificar si hay una canción seleccionada
    if (song?.audioUrl) {
      const newAudio = new Audio(song.audioUrl);
      setAudio(newAudio);

      // Actualizar la duración del audio cuando esté cargada
      newAudio.onloadedmetadata = () => {
        setDuration(newAudio.duration);
      };

      // Actualizar el tiempo actual mientras el audio se reproduce
      newAudio.ontimeupdate = () => {
        setCurrentTime(newAudio.currentTime);
      };

      // Manejar el evento onended
      newAudio.onended = () => {
        setIsPlaying(false);
      };

      return () => {
        newAudio.pause();  // Detener el audio cuando se desmonte
        newAudio.src = ''; // Limpiar la fuente
      };
    }
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error al reproducir el audio:", error);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  // Cambiar el volumen del audio cuando el valor del estado de volumen cambie
  useEffect(() => {
    audio.volume = volume / 100;  // Convertir el valor del rango (0-100) a 0-1 para el volumen
  }, [volume, audio]);

  // Convertir segundos a formato mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Manejar el cambio en el slider de progreso
  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audio.currentTime = newTime;  // Actualizar el tiempo del audio
    setCurrentTime(newTime);      // Actualizar el estado del tiempo
  };

  // Manejar el cambio en el slider de volumen
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);  // Actualizar el estado del volumen
  };

  if (!song) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center">
          <p>No hay canción seleccionada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center">
        <img
          src={song.imageUrl}
          alt="Album cover"
          className="w-12 h-12 mr-4 rounded-lg"
        />
        <div>
          <h3 className="text-sm font-semibold">{song.title}</h3>
          <p className="text-xs text-gray-400">{song.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/2 mx-4 space-y-2">
        <div className="flex items-center space-x-4">
          <Icon
            icon="ri:skip-back-line"
            className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition"
            title="Rewind"
          />
          <Icon
            icon={isPlaying ? "ri:pause-line" : "ri:play-line"}
            className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition"
            onClick={() => setIsPlaying(prev => !prev)}  // Alternar la reproducción
          />
          <Icon
            icon="ri:skip-forward-line"
            className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition"
            title="Forward"
          />
        </div>

        {/* Slider de progreso */}
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}  // El valor máximo es la duración del audio
            value={currentTime}  // El valor actual es el tiempo actual del audio
            onChange={handleSliderChange}  // Actualizar el tiempo cuando el usuario mueve el slider
            className="w-full h-1 bg-neutral-700 rounded-lg cursor-pointer appearance-none"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Icon icon="ri:mist-fill" className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition" title="Lyrics" />
        <Icon icon="ri:volume-up-line" className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition" title="Volumen" />
        
        {/* Slider de volumen */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}  // El valor del slider es el valor del volumen actual
          onChange={handleVolumeChange}  // Actualizar el volumen cuando el usuario mueve el slider
          className="w-full h-1 bg-neutral-700 rounded-lg cursor-pointer appearance-none"
        />
        <Icon icon="ri:expand-diagonal-line" className="text-green-500 text-2xl cursor-pointer hover:text-green-400 transition" title="FullScreen" />
      </div>
    </div>
  );
}
