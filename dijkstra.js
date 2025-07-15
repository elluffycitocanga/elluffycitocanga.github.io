function dijkstra(nodes, edges, startId, endId) {
  // Convertir IDs a string para uniformidad
  startId = String(startId);
  endId = String(endId);

  const dist = {};
  const prev = {};
  const visited = new Set();

  // Inicializar distancias
  for (let node of nodes) {
    dist[String(node.id)] = Infinity;
    prev[String(node.id)] = null;
  }

  dist[startId] = 0;

  while (visited.size < nodes.length) {
    // Encontrar nodo no visitado con distancia mínima
    let u = null;
    let minDist = Infinity;

    for (let id in dist) {
      if (!visited.has(id) && dist[id] < minDist) {
        minDist = dist[id];
        u = id;
      }
    }

    if (u === null) break; // No quedan nodos accesibles

    // Si ya llegamos al destino, rompemos el ciclo
    if (u === endId) break;

    visited.add(u);

    // Revisar vecinos (aristas que parten o llegan a u para grafo no dirigido)
    for (let edge of edges) {
      // Normalizar IDs de arista
      const from = String(edge.from);
      const to = String(edge.to);

      let neighbor = null;
      if (from === u) {
        neighbor = to;
      } else if (to === u) {
        neighbor = from; // Grafo no dirigido: considerar aristas inversas también
      }

      if (neighbor && !visited.has(neighbor)) {
        const peso = parseFloat(edge.weight);
        const pesoValido = (!isNaN(peso) && peso > 0) ? peso : 1;

        const alt = dist[u] + pesoValido;

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
      }
    }
  }

  // Reconstruir camino
  const path = [];
  let u = endId;
  while (u !== null) {
    path.unshift(u);
    u = prev[u];
  }

  if (path[0] !== startId) return []; // No hay camino

  return path;
}