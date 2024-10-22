import React from 'react'; // Asegúrate de importar useState

export default function TopBar({ searchTerm, setSearchTerm}) { // Asegúrate de que onSearch se reciba como prop

    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
    };

  return (
    <div className="bg-transparent p-2 flex items-center justify-between w-full top-0 left-0 z-10">
      {/* Agrupación del menú y las flechas */}
      <div className="flex items-center space-x-2 pl-5">
        <button className="text-white hover:text-green-500 transition">
          <span className="iconify" data-icon="mdi:menu" />
        </button>
        <button className="text-white hover:text-green-500 transition">
          <span className="iconify" data-icon="mdi:keyboard-arrow-left" />
        </button>
        <button className="text-white hover:text-green-500 transition">
          <span className="iconify" data-icon="mdi:keyboard-arrow-right" />
        </button>
      </div>

      {/* Barra de búsqueda y botón Home */}
      <div className="flex items-center w-1/2 space-x-2">
        <button className="text-white hover:text-green-500 transition">
          <span className="iconify" data-icon="mdi:home" />
        </button>
        <input
          type="text"
          placeholder="Buscar canciones..."
          value={searchTerm}
          onChange={e => handleSearchChange(e)} // Llama a la función de cambio
          className="bg-neutral-700 text-white rounded-full pl-3 py-2 w-full focus:outline-none"
        />
      </div>

      {/* Iconos de usuario y notificaciones */}
      <div className="flex items-center space-x-4">
        <button className="text-white hover:text-green-500 transition">
          <span className="iconify" data-icon="mdi:account-circle" />
        </button>
        <button className="text-white hover:text-green-500 transition">
          <span className="iconify" data-icon="mdi:bell" />
        </button>
      </div>
    </div>
  );
}
