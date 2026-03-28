import { useEffect, useState } from "react";

export default function PokemonGen1() {

  const [pokemons, setPokemons] = useState([]);

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [generacion, setGeneracion] = useState("");

  const API_URL = "https://back-ubx7.onrender.com/api";

  // GET
  const fetchPokemons = async () => {
    const res = await fetch(`${API_URL}/pokemon`);
    const data = await res.json();

    // 🔥 FILTRO SEGURO
    const filtrados = data.filter(p => Number(p.generacion) === 1);

    setPokemons(filtrados);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // LIMPIAR
  const clearForm = () => {
    setNombre("");
    setEspecie("");
    setAltura("");
    setPeso("");
    setDescripcion("");
    setGeneracion("");
  };

  // GUARDAR
  const savePokemon = async () => {
    try {
      await fetch(`${API_URL}/pokemon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          especie,
          altura,
          peso,
          descripcion,
          generacion: Number(generacion), // 🔥 IMPORTANTE
        }),
      });

      fetchPokemons();
      clearForm();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Pokemon Gen 1</h2>

      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Especie" value={especie} onChange={e => setEspecie(e.target.value)} />
      <input placeholder="Altura" value={altura} onChange={e => setAltura(e.target.value)} />
      <input placeholder="Peso" value={peso} onChange={e => setPeso(e.target.value)} />
      <input placeholder="Generacion" value={generacion} onChange={e => setGeneracion(e.target.value)} />
      <input placeholder="Descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)} />

      <button onClick={savePokemon}>Guardar</button>

      <hr />

      {pokemons.map(p => (
        <div key={p.num_pokedex}>
          {p.nombre} - Gen {p.generacion}
        </div>
      ))}

    </div>
  );
}