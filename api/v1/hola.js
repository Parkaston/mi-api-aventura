export default function handler(req, res) {
  const mensaje = process.env.MENSAJE_BIENVENIDA || "Mensaje por defecto cuando no leemos de la variable en .env";
  res.status(200).json({ mensaje });
}