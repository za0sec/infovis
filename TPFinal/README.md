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

1. `01_exploracion_data360.ipynb` — qué bases, indicadores y dimensiones ofrece la API, su cobertura temporal y cómo cambia un mismo indicador entre bases.
2. `02_datos.ipynb` — descarga y limpieza del panel país–año.
3. `03_analisis.ipynb` — curva ingreso–esperanza de vida, brecha por país, robustez del modelo, mortalidad infantil, diferencias por sexo, gasto en salud y trayectorias.

## Cómo correr los notebooks

Se pueden abrir directamente en Google Colab. Localmente:

```bash
pip install pandas requests duckdb altair babel pycountry
jupyter lab TPFinal/exploracion
```

## Visualizaciones

1. **Dispersión ingreso–esperanza de vida (2024).** Cada país coloreado según cuánto se aleja de la curva esperada. Tiene un recorrido guiado en cuatro pasos (la regla, los que viven más, los que viven menos, Estados Unidos frente a Costa Rica) y permite buscar un país o filtrar por región.
2. **Ranking de la brecha.** Los países que más viven por encima y por debajo de lo esperado, con Argentina como referencia, filtro por región, opción de incluir microestados y tabla completa ordenable.
3. **Trayectorias 1990–2024.** Recorrido de hasta tres países en el plano ingreso–esperanza de vida, con comparaciones sugeridas (Rusia, Polonia y Ucrania; Argentina y vecinos; China e India; petroleras) y un resumen del cambio de cada país.

Para verla localmente hay que servir la carpeta (los datos se cargan con `fetch`):

```bash
python3 -m http.server
# abrir http://localhost:8000/TPFinal/
```

## Hallazgos principales

- El ingreso por habitante explica el 74 % de las diferencias de esperanza de vida entre países; sumando la mortalidad infantil, el 85 %.
- Cada vez que el ingreso se duplica, la esperanza de vida esperada sube unos 3,6 años.
- Costa Rica y Chile viven más que Estados Unidos con entre un tercio y un 40 % de su ingreso. Estados Unidos gasta siete veces más en salud por persona que Costa Rica.
- El fondo del ranking es mayormente África subsahariana (VIH y economías petroleras). Rusia es la excepción, con un déficit concentrado en los varones.
- Las brechas son robustas a la especificación del modelo (correlación > 0,99) y anteriores a la pandemia (correlación 0,86 con 2019).
