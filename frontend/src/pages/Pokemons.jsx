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

  // ✅ BASE CORRECTA (NO pongas /pokemon aquí)
  const API_URL = "https://back-ubx7.onrender.com/api";

  // GET
  const fetchPokemons = async () => {
    const res = await fetch(`${API_URL}/pokemon`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setPokemons(data);
    } else {
      console.error("Error backend:", data);
      setPokemons([]);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // LIMPIAR
  const clearForm = () => {
    setEditId(null);
    setNombre("");
    setEspecie("");
    setAltura("");
    setPeso("");
    setDescripcion("");
  };

  // GUARDAR
  const savePokemon = async () => {
    if (!nombre || !especie) {
      setAlert("Nombre y especie obligatorios");
      return;
    }

    const payload = { nombre, especie, altura, peso, descripcion };

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/pokemon/${editId}`
      : `${API_URL}/pokemon`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    fetchPokemons();
    clearForm();
    setAlert(editId ? "Actualizado" : "Agregado");
  };

  // ELIMINAR
  const deletePokemon = async (id) => {
    await fetch(`${API_URL}/pokemon/${id}`, { method: "DELETE" });
    fetchPokemons();
    setAlert("Eliminado");
  };

  // EDITAR
  const editPokemon = (p) => {
    setEditId(p.num_pokedex);
    setNombre(p.nombre);
    setEspecie(p.especie);
    setAltura(p.altura);
    setPeso(p.peso);
    setDescripcion(p.descripcion);
  };

  return (
    <div>
      <h1>Pokemons</h1>

      {alert && <p>{alert}</p>}

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />

      <input
        value={especie}
        onChange={(e) => setEspecie(e.target.value)}
        placeholder="Especie"
      />

      <button onClick={savePokemon}>
        {editId ? "Actualizar" : "Guardar"}
      </button>

      <ul>
        {pokemons.map((p) => (
          <li key={p.num_pokedex}>
            {p.nombre}

            <button onClick={() => editPokemon(p)}>Editar</button>
            <button onClick={() => deletePokemon(p.num_pokedex)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}