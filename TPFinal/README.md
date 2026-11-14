# TP Final — Vivir más sin ser más rico

Trabajo práctico final de Visualización de la Información sobre datos de [World Bank Data360](https://data360.worldbank.org/en/api).

**Integrantes:** Javier Peral Belmont · Pilar Frutos

**Nota publicada:** https://za0sec.github.io/infovis/TPFinal/

El modelo basado en el PIB per cápita da cuenta del 74,4 % de la variación observada en la esperanza de vida entre 195 economías. La nota se ocupa de las economías que viven más o menos de lo que estima el modelo.

## Estructura

| Carpeta | Contenido |
|---|---|
| `exploracion/` | Notebooks (Colab) de la etapa exploratoria |
| `datos/` | Datos procesados que usan las visualizaciones |
| `index.html` | La nota con las tres visualizaciones interactivas (D3) |

## Notebooks

1. `01_exploracion_data360.ipynb` — qué bases, indicadores y dimensiones ofrece la API, su cobertura temporal y cómo cambia un mismo indicador entre bases.
2. `02_datos.ipynb` — descarga y limpieza del panel país–año.
3. `03_analisis.ipynb` — curva ingreso–esperanza de vida, brecha por país, robustez del modelo, mortalidad de menores de 5 años, diferencias por sexo, gasto en salud y trayectorias.

## Cómo correr los notebooks

Se pueden abrir directamente en Google Colab. Localmente:

```bash
pip install pandas requests duckdb altair babel pycountry
jupyter lab TPFinal/exploracion
```

## Visualizaciones

1. **Dispersión ingreso–esperanza de vida (2024).** Cada país se colorea según cuánto se aleja de la curva esperada. Las vistas «La regla», «Por encima» y «Por debajo» rotulan ejemplos elegidos para la nota. Al resaltar una región se proponen etiquetas para las brechas de al menos 3 años en cualquier dirección. El espacio disponible determina qué etiquetas se muestran. También se puede buscar un país por nombre.
2. **Ranking de la brecha.** Los países que más viven por encima y por debajo de lo esperado, con Argentina como referencia, filtro por región, opción de incluir microestados y tabla completa ordenable.
3. **Trayectorias 1990–2024.** Recorrido de hasta tres países en el plano ingreso–esperanza de vida, con comparaciones sugeridas (Rusia, Polonia y Ucrania; Argentina y vecinos; China e India; petroleras) y un resumen del cambio de cada país.

Para verla localmente hay que servir la carpeta (los datos se cargan con `fetch`):

```bash
python3 -m http.server
# abrir http://localhost:8000/TPFinal/
```

## Hallazgos principales

- Entre las 186 economías con datos completos, el modelo basado en el PIB per cápita da cuenta del 73,4 % de la variación observada en la esperanza de vida. Al incorporar la mortalidad de menores de 5 años, la proporción sube al 84,5 %. Parte de esa mejora refleja que la esperanza de vida al nacer ya incorpora la mortalidad en esas edades. La comparación mide el ajuste dentro de la muestra y no permite estimar un efecto causal.
- Cada vez que el ingreso se duplica, la esperanza de vida esperada sube unos 3,6 años.
- Costa Rica y Chile viven más que Estados Unidos con entre un tercio y un 40 % de su ingreso. Estados Unidos gasta siete veces más en salud por persona que Costa Rica.
- El fondo del ranking es mayormente África subsahariana (VIH y economías petroleras). Rusia es la excepción, con un déficit concentrado en los varones.
- Las brechas son robustas a la especificación del modelo (correlación > 0,99) y anteriores a la pandemia (correlación 0,86 con 2019).
