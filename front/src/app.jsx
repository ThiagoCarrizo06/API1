import { useState } from "react";
import UsuarioForm from "./components/UsuarioForm.jsx";
import UsuarioList from "./components/UsuarioList.jsx";
import UsuarioDetail from "./components/UsuarioDetail.jsx";

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null); // Para editar
  const [detailUser, setDetailUser] = useState(null);     // Para ver detalles
  const [reload, setReload] = useState(false);            // Forzar recarga lista

  const refresh = () => setReload(!reload);
  const clear = () => setSelectedUser(null);

  const handleViewDetail = (usuario) => {
    setDetailUser(usuario);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Gestión de Usuarios</h1>

      {/* Formulario para crear/editar */}
      <UsuarioForm selectedUser={selectedUser} refresh={refresh} clear={clear} />

      {/* Lista de usuarios */}
      <UsuarioList 
        key={reload} 
        onEdit={setSelectedUser} 
        onView={handleViewDetail} 
      />

      {/* Detalle del usuario */}
      <UsuarioDetail usuario={detailUser} />
    </div>
  );
}