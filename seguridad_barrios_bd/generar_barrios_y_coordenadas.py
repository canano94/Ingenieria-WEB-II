# Paso 1: pip intall pandas, pip install pyproj
# Paso 2: python generar_barrios_y_coordenadas.py 
# NOTA: Todo tiene que estar en la misma ruta

import json
import random
from pyproj import Transformer

# Configurar el transformador: de EPSG:3116 (Bogotá) a EPSG:4326 (lat/lon)
transformer = Transformer.from_crs("EPSG:3116", "EPSG:4326", always_xy=True)

with open("barriolegalizado.json", "r", encoding="utf-8") as f:
    data = json.load(f)

barrios = []
coordenadas = []

for i, feature in enumerate(data["features"], start=1):
    props = feature.get("attributes", {})
    nombre = props.get("NOMBRE", f"Barrio_{i}")
    geometry = feature.get("geometry", {}).get("rings", [[]])[0]

    if geometry:
        # Separar las coordenadas originales (X, Y en metros)
        xs = [p[0] for p in geometry]
        ys = [p[1] for p in geometry]

        # Convertir cada punto a lat/lon
        lons, lats = transformer.transform(xs, ys)

        cor_occ = min(lons)
        cor_ori = max(lons)
        cor_sur = min(lats)
        cor_nor = max(lats)

        barrios.append({
            "id": i,
            "nam_bar": nombre.replace("'", "''"),
            "ind_seg": random.randint(1, 10),
            "porcentaje": f"{random.randint(50, 100)}%"
        })

        coordenadas.append({
            "id_barrio": i,
            "cor_sur": round(cor_sur, 6),
            "cor_nor": round(cor_nor, 6),
            "cor_ori": round(cor_ori, 6),
            "cor_occ": round(cor_occ, 6)
        })

# Guardar INSERTS para barrio
with open("insert_barrio.sql", "w", encoding="utf-8") as f:
    for b in barrios:
        f.write(
            f"INSERT INTO public.barrio (id, ind_seg, nam_bar, porcentaje) "
            f"VALUES ({b['id']}, {b['ind_seg']}, '{b['nam_bar']}', '{b['porcentaje']}');\n"
        )

# Guardar INSERTS para coordenadas
with open("insert_coordenadas.sql", "w", encoding="utf-8") as f:
    for c in coordenadas:
        f.write(
            f"INSERT INTO public.coordenadas (id_barrio, cor_sur, cor_nor, cor_ori, cor_occ) "
            f"VALUES ({c['id_barrio']}, {c['cor_sur']}, {c['cor_nor']}, {c['cor_ori']}, {c['cor_occ']});\n"
        )

print("✅ Archivos insert_barrio.sql e insert_coordenadas.sql generados correctamente.")

