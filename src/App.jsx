// src/App.jsx
import React, { useEffect, useState } from "react";

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    async function fetchClientes() {
      try {
        const response = await fetch(apiUrl+"/clientes");
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("Clientes obtenidos:", data);
        setClientes(Array.isArray(data.datos) ? data.datos : []);
      } catch (err) {
        console.error("Error al obtener clientes:", err);
        setError("No se pudo cargar la lista de clientes.");
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Cargando clientes...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tabla de Clientes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.ciudad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

