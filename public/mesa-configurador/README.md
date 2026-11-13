# Configurador de Mesa

## Cómo abrir

Este proyecto requiere un servidor local porque los navegadores no permiten
cargar archivos GLB/imágenes directamente desde el sistema de archivos (política CORS).

### Opción A — VS Code (recomendado)
1. Abre la carpeta en VS Code
2. Instala la extensión "Live Server"
3. Clic derecho en index.html → "Open with Live Server"

### Opción B — Node.js
```
npx http-server . -p 8080
```
Luego abre: http://localhost:8080

### Opción C — Python
```
python -m http.server 8080
```
Luego abre: http://localhost:8080

---

## Estructura
```
mesa-configurador/
  index.html                  ← Configurador principal
  models/
    Midgard.glb
    Asgard.glb
  textures/
    madera/
      roble.jpg, nogal.jpg, wengue.jpg, pino.jpg, cerezo.jpg, maple.jpg
    tapiz/
      azul_marino.jpg, verde_billar.jpg, bordo.jpg, negro.jpg, gris.jpg, cafe.jpg
```

## Agregar texturas nuevas

1. Coloca el .jpg en la carpeta correspondiente (textures/madera/ o textures/tapiz/)
2. Abre index.html y agrega una entrada al objeto MADERA o TAPIZ:

```js
nueva_madera: {
  label: 'Mi Madera',
  ruta:  'textures/madera/nueva_madera.jpg',
  repeat: [2, 2],   // cuántas veces repite la textura
  rot:    0         // rotación en radianes (Math.PI/2 = 90°)
}
```

## Materiales detectados en los modelos

| Nombre en SketchUp | Función         |
|--------------------|-----------------|
| Madera             | Textura de madera (intercambiable) |
| Tapiz              | Textura del tapiz (intercambiable) |
| Luz                | Superficie emisiva LED             |
| default material   | Herrajes / accesorios (fijo)       |
