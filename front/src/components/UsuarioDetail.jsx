export default function UsuarioDetail({ usuario }) {
  if (!usuario) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
      <h3>Detalle del Usuario</h3>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Apellido:</strong> {usuario.apellido}</p>
      <p><strong>Dirección:</strong> {usuario.direccion}</p>
      <p><strong>Teléfono:</strong> {usuario.telefono}</p>
      <p><strong>Celular:</strong> {usuario.celular}</p>
      <p><strong>Fecha de Nacimiento:</strong> {usuario.fecha_nacimiento}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
    </div>
  );
}