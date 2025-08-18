import { useState, useEffect } from "react";
import { addUsuario, updateUsuario } from "../services/api.js";

export default function UsuarioForm({ selectedUser, refresh, clear }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    celular: "",
    fecha_nacimiento: "",
    email: ""
  });

  useEffect(() => {
    if (selectedUser) setForm(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateUsuario(form.id, form);
      } else {
        await addUsuario(form);
      }
      setForm({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        celular: "",
        fecha_nacimiento: "",
        email: ""
      });
      clear();
      refresh();
    } catch (error) {
      console.error("Error en el formulario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
      <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
      <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
      <input name="celular" value={form.celular} onChange={handleChange} placeholder="Celular" />
      <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">{form.id ? "Actualizar" : "Crear"}</button>
    </form>
  );
}