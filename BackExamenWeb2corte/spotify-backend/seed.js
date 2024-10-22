// seed.js
const connectDB = require('./config/db'); // Importar la función de conexión a la base de datos

// Importar modelos
const Artist = require('./models/artist');
const Genre = require('./models/genre');
const Song = require('./models/song');
const Playlist = require('./models/playlists');

const seedData = async () => {
  // Conectar a la base de datos
  await connectDB();

  // Limpiar la base de datos
  await Artist.deleteMany({});
  await Genre.deleteMany({});
  await Song.deleteMany({});
  await Playlist.deleteMany({}); // Limpiar las playlists


  // Crear nuevos géneros
  const rock = await Genre.create({ name: 'Rock' });
  const pop = await Genre.create({ name: 'Pop' });
  const hipHop = await Genre.create({ name: 'Hip-Hop' });
  const reggaeton = await Genre.create({ name: 'Reggaeton' });

  // Crear nuevos artistas
  const artist1 = await Artist.create({ name: 'Rauw Alejandro', genre: reggaeton._id });
  const artist2 = await Artist.create({ name: 'Ice Cube', genre: hipHop._id });
  const artist3 = await Artist.create({ name: 'A$AP Rocky', genre: hipHop._id });
  const artist4 = await Artist.create({ name: 'Daddy Yankee', genre: reggaeton._id });
  const artist5 = await Artist.create({ name: 'Bad Bunny', genre: reggaeton._id });
  const artist6 = await Artist.create({ name: '50 Cent', genre: hipHop._id });
  const artist7 = await Artist.create({ name: 'The Beatles', genre: rock._id });
  const artist8 = await Artist.create({ name: 'Taylor Swift', genre: pop._id });
  const artist9 = await Artist.create({ name: 'Quavo', genre: hipHop._id });

  // Crear nuevas canciones
  await Song.create([

    {
      title: 'Hey Jude',
      artist: artist7._id,
      genre: rock._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/heyjude.jpg?alt=media&token=cb7e1e0d-a0c4-4ed0-ba4e-668b49bc45b4',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20So%20What%20(128%20kbps).mp3?alt=media&token=7cc03bd8-b474-4b3c-a341-89fa4bf801fc",
      youtubeUrl: 'URL de YouTube de Hey Jude',
    },
    {
      title: 'In Da Club',
      artist: artist6._id,
      genre: hipHop._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/50cent.jpg?alt=media&token=ad02bda3-1200-4f94-acba-e5febd11902c',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20In%20Da%20Club%20(128%20kbps).mp3?alt=media&token=f7a08df2-3247-465d-b46d-aaa5149d1e93",
      youtubeUrl: 'https://youtu.be/5qm8PH4xAss',
    },
    {
      title: 'Shake It Off',
      artist: artist8._id,
      genre: pop._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/tailor.jpg?alt=media&token=5eff0cb1-5ea2-4385-b7be-a1f49d5ac24c',
      audioUrl: 'URL del audio de Shake It Off', 
      youtubeUrl: 'URL de YouTube de Shake It Off',
    },
    {
      title: 'Salgo Pa La Calle',
      artist: artist4._id,
      genre: reggaeton._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/salgo_pa_la_calle.jpg?alt=media&token=a2d7e0cb-42c4-4082-b9f1-79800dd1b879',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20Daddy%20Yankee%20-%20Salgo%20Pa'%20La%20Calle%20(128%20kbps).mp3?alt=media&token=12170528-cade-42cd-b931-9685a4aef757",
      youtubeUrl: 'https://youtu.be/HGaIqPKaLkA',
    },
    {
      title: 'DAKITI',
      artist: artist5._id,
      genre: reggaeton._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/dakiti.jpg?alt=media&token=9181a3b3-cc0c-4e8c-8f84-c7591efcb5ea',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20Bad%20Bunny%20-%20DAKITI%20(Letra)%20ft.%20Jhayco%20(128%20kbps)%20(1).mp3?alt=media&token=19cfcaae-844c-4135-bb3f-72ff250ce9e5",
      youtubeUrl: 'https://www.youtube.com/watch?v=TmKh7lAwnBI&pp=ygUGZGFraXRp',
    },
    {
      title: 'It Was A Good Day',
      artist: artist2._id,
      genre: hipHop._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/it_was_good_day.jpg?alt=media&token=a51e664d-4add-473d-be37-ff591be40dd1',  
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%2007.%20Ice%20Cube%20%20-%20It%20Was%20A%20Good%20Day%20(128%20kbps).mp3?alt=media&token=89b7f55a-aef8-4a9c-9966-dc0dcc2c55a4",
      youtubeUrl: 'https://www.youtube.com/watch?v=h4UqMyldS7Q&pp=ygURaXQgd2FzIGEgZ29vZCBkYXk%3D',
    },
    {
      title: 'R Cali',
      artist: artist3._id,
      genre: hipHop._id,
      imageUrl: ' https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/r_cali_asaprocky.jpg?alt=media&token=43500141-ebf3-4a46-99f8-31b114147e79',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20r%20-%20Cali%20(128%20kbps).mp3?alt=media&token=4223e0cd-bb8f-4724-a3f6-d68bb63261a0",
      youtubeUrl: 'https://youtu.be/Kbj2Zss-5GY',
    },
    {
      title: 'HOTEL LOBBY',
      artist: artist9._id,
      genre: reggaeton._id,
      imageUrl: ' https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/hotel_lobby.jpg?alt=media&token=2f4c59ee-5eaa-4a80-a81f-954720534cd1',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20Quavo%20%26%20Takeoff%20-_Hotel%20Lobby_%20(Lyric%20Video)%20(128%20kbps).mp3?alt=media&token=4847c474-5bdf-4db3-a55f-2a6bc6b74d5f",
      youtubeUrl: 'https://youtu.be/WEQ2wR_9rpc',
    },
    {
      title: 'LOKERA',
      artist: artist1._id,
      genre: reggaeton._id,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/lokera.jpg?alt=media&token=9f12c0aa-2186-4bb4-b7fd-15d2e029dedf',
      audioUrl: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Y2meta.app%20-%20LOKERA%20-%20Rauw%20Alejandro%20x%20Lyanno%20x%20Brray%20(128%20kbps).mp3?alt=media&token=557d2a36-ac59-49f5-b80e-1da4bb40cc20",
      youtubeUrl: 'https://youtu.be/0JeughwzfR0',
    },
  ]);

  const playlist1 = await Playlist.create({
    name: 'Mikelist',
    cover: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/diablito.jpg?alt=media&token=4054fc84-c6c8-45df-ac5e-afbba1349396",
    songs: [], // Agregar canciones a la playlist
  });

  const playlist2 = await Playlist.create({
    name: 'CastroList',
    cover: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/weed.jpg?alt=media&token=8db8cf36-d661-437b-bafa-84cd1f8b4816",
    songs: [],
  });
  const playlist3 = await Playlist.create({
    name: 'NuñezList',
    cover: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Nuñez.jpg?alt=media&token=b37fb185-ecf4-4301-973d-0b33b94e73e8",
    songs: [],
  });
  const playlist4 = await Playlist.create({
    name: 'RicoList',
    cover: "https://firebasestorage.googleapis.com/v0/b/spotifymike-847b1.appspot.com/o/Rico.jpg?alt=media&token=c231d202-fd72-4148-aba1-607cd931e271",
    songs: [],
  });

  console.log('Datos sembrados exitosamente');

  // Cerrar la conexión a la base de datos
  process.exit();
};

// Ejecutar la función de semilla
seedData().catch(err => {
  console.error(`Error al sembrar datos: ${err.message}`);
  process.exit(1);
});
