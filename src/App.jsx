// src/App.jsx
import React, { useEffect, useState } from "react";

function App() {
  const [clientes, setClientes] = useState([]);

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    fetch(process.env.Api_url) // tu endpoint del backend
      .then((response) => response.json())
      .then((data) => {
        setClientes(data); // asumimos que el backend devuelve un array de objetos
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tabla de Clientes</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

