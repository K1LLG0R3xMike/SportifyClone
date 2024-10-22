import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const getImageUrls = async (imagePaths) => {
  const urls = await Promise.all(
    imagePaths.map(async (path) => {
      const imageRef = ref(storage, path);
      try {
        const url = await getDownloadURL(imageRef);
        console.log(`URL for image:`, url);
        return url;
      } catch (error) {
        console.error(`Error getting image URL for ${path}:`, error);
        return null; // Retorna null si hay un error
      }
    })
  );

  return urls.filter(url => url !== null); // Filtra las URLs nulas
};

export const getAudioUrl = async (audioPath) => {
  if (typeof audioPath !== 'string') {
    console.error('Invalid audio path:', audioPath);
    return null; // Retorna null si la ruta no es válida
  }
  
  const audioRef = ref(storage, audioPath);
  try {
    const url = await getDownloadURL(audioRef);
    console.log('Audio URL for:', url);
    return url;
  } catch (error) {
    console.error('Error getting audio URL:', error);
    return null;
  }
};

// Función asíncrona para obtener URLs de audio
const fetchAudioUrls = async () => {
  const audioPaths = [
    'Y2meta.app - 07. Ice Cube  - It Was A Good Day (128 kbps).mp3',
    'Y2meta.app - Bad Bunny - DAKITI (Letra) ft. Jhayco (128 kbps) (1).mp3',
    'Y2meta.app - So What (128 kbps).mp3',
    'Y2meta.app - Quavo & Takeoff -_Hotel Lobby_ (Lyric Video) (128 kbps).mp3',
    'Y2meta.app - In Da Club (128 kbps).mp3',
    'Y2meta.app - r - Cali (128 kbps).mp3',
    'Y2meta.app - LOKERA - Rauw Alejandro x Lyanno x Brray (128 kbps).mp3',
    "Y2meta.app - Daddy Yankee - Salgo Pa' La Calle (128 kbps).mp3",
  ];

  const audioUrls = await Promise.all(audioPaths.map(path => getAudioUrl(path)));
  console.log('Fetched audio URLs:', audioUrls);
}

// Llama a la función para obtener las URLs
fetchAudioUrls();
