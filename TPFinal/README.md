# TP Final — Vivir más sin ser más rico

Trabajo práctico final de Visualización de la Información sobre datos de [World Bank Data360](https://data360.worldbank.org/en/api).

**Integrantes:** Javier Peral Belmont · Pilar Frutos

**Nota publicada:** https://za0sec.github.io/infovis/TPFinal/

El ingreso por habitante explica alrededor del 74 % de las diferencias de esperanza de vida entre países. La nota se ocupa del resto: qué países viven más (o menos) de lo que predice su ingreso.

## Estructura

| Carpeta | Contenido |
|---|---|
| `exploracion/` | Notebooks (Colab) de la etapa exploratoria |
| `datos/` | Datos procesados que usan las visualizaciones |
| `index.html` | La nota con las tres visualizaciones interactivas (D3) |

## Notebooks

1. `01_exploracion_data360.ipynb` — qué bases, indicadores y dimensiones ofrece la API.
2. `02_datos.ipynb` — descarga y limpieza del panel país–año.
3. `03_analisis.ipynb` — curva ingreso–esperanza de vida, brecha por país, gasto en salud y trayectorias.

## Cómo correr los notebooks

Se pueden abrir directamente en Google Colab. Localmente:

```bash
pip install pandas requests duckdb altair babel pycountry
jupyter lab TPFinal/exploracion
```

## Visualizaciones

1. **Dispersión ingreso–esperanza de vida (2024).** Cada país coloreado según cuánto se aleja de la curva esperada. Permite buscar un país y filtrar por región.
2. **Ranking de la brecha.** Los países que más viven por encima y por debajo de lo esperado, con filtro por región y tabla completa ordenable.
3. **Trayectorias 1990–2024.** Recorrido de hasta tres países en el plano ingreso–esperanza de vida.

Para verla localmente hay que servir la carpeta (los datos se cargan con `fetch`):

```bash
python3 -m http.server
# abrir http://localhost:8000/TPFinal/
```
