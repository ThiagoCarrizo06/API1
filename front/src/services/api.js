import axios from "axios";

const API = "http://localhost:3001/api/usuarios"; // tu backend

// Obtener todos los usuarios
export const getUsuarios = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Agregar un nuevo usuario
export const addUsuario = async (usuario) => {
  const res = await axios.post(API, usuario);
  return res.data;
};

// Actualizar un usuario existente
export const updateUsuario = async (id, usuario) => {
  const res = await axios.put(`${API}/${id}`, usuario);
  return res.data;
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};