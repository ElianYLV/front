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

  // 🔥 GET DESDE LA TABLA CORRECTA
  const fetchPokemons = async () => {
    const res = await fetch(`${API_URL}/pokemongen1`);
    const data = await res.json();
    setPokemons(data);
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

  // 🔥 GUARDAR EN LA TABLA CORRECTA
  const savePokemon = async () => {
    try {
      await fetch(`${API_URL}/pokemongen1`, {
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
          generacion: Number(generacion),
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

      <h2>Pokemon Gen1 (tabla separada)</h2>

      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={especie} onChange={e => setEspecie(e.target.value)} placeholder="Especie" />
      <input value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura" />
      <input value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso" />
      <input value={generacion} onChange={e => setGeneracion(e.target.value)} placeholder="Generación" />
      <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />

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