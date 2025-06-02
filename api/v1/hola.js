export default function handler(req, res) {
  res.status(200).json({ mensaje: "¡Bienvenido a la versión 1 de nuestra API!" });
}