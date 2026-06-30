export function notFound(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid ID format: ${err.value}` });
  }

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(422).json({ error: "Validation failed", details });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "A record with that value already exists." });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Something went wrong on our end. Please try again.",
  });
}