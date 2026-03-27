import { useEffect, useState } from "react";

export default function PokemonGen1() {
  const [pokemons, setPokemons] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState("");

 
const API_URL = import.meta.env.VITE_API_URL + "/pokemon";
  const fetchPokemons = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPokemons(data);
      } else {
        console.error("Error backend:", data);
        setPokemons([]);
      }
    } catch (error) {
      console.error("Error conexión:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const clearForm = () => {
    setEditId(null);
    setNombre("");
    setEspecie("");
    setAltura("");
    setPeso("");
    setDescripcion("");
  };

  const savePokemon = async () => {
    if (!nombre || !especie) {
      setAlert("Nombre y especie son obligatorios");
      return;
    }

    const payload = { nombre, especie, altura, peso, descripcion };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      fetchPokemons();
      clearForm();
      setAlert(editId ? "Actualizado" : "Agregado");
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  const deletePokemon = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchPokemons();
      setAlert("Eliminado");
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const editPokemon = (p) => {
    setEditId(p.num_pokedex);
    setNombre(p.nombre);
    setEspecie(p.especie);
    setAltura(p.altura);
    setPeso(p.peso);
    setDescripcion(p.descripcion);
  };

  return (
    <div className="min-h-screen p-6" style={{
      backgroundImage: 'url(/fondo4.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-6xl mx-auto p-6 bg-white/80 backdrop-blur rounded-2xl shadow-2xl border border-slate-200">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-700">
              {editId ? "Editar" : "Pokémon Gen 1"}
            </h1>
            <p className="text-sm text-slate-600">
              Administra pokémons de la generación 1.
            </p>
          </div>

          <button
            onClick={clearForm}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Nuevo Pokemon
          </button>
        </div>

        {alert && (
          <div className="mb-4 px-3 py-2 bg-amber-100 text-amber-900 rounded">
            {alert}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">

          {/* FORM */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="w-full border px-3 py-2 rounded"
            />

            <input
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              placeholder="Especie"
              className="w-full border px-3 py-2 rounded"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Altura"
                className="border px-3 py-2 rounded"
              />
              <input
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Peso"
                className="border px-3 py-2 rounded"
              />
            </div>

            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={savePokemon}
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
              >
                {editId ? "Actualizar" : "Guardar"}
              </button>

              <button
                onClick={clearForm}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* TABLA */}
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Especie</th>
                  <th className="px-4 py-2">Altura</th>
                  <th className="px-4 py-2">Peso</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {pokemons.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-4">
                      No hay pokémons.
                    </td>
                  </tr>
                ) : (
                  pokemons.map((p) => (
                    <tr key={p.num_pokedex}>
                      <td className="px-4 py-2">{p.num_pokedex}</td>
                      <td className="px-4 py-2">{p.nombre}</td>
                      <td className="px-4 py-2">{p.especie}</td>
                      <td className="px-4 py-2">{p.altura}</td>
                      <td className="px-4 py-2">{p.peso}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button onClick={() => editPokemon(p)}>
                          Editar
                        </button>
                        <button onClick={() => deletePokemon(p.num_pokedex)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}