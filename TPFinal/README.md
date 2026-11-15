# TP Final — Vivir más sin ser más rico

Trabajo práctico final de Visualización de la Información sobre datos de [World Bank Data360](https://data360.worldbank.org/en/api).

**Integrantes:** Javier Peral Belmont · Pilar Frutos

**Nota publicada:** https://za0sec.github.io/infovis/TPFinal/

La nota compara el PIB por habitante, el acceso básico al agua y la exposición a partículas finas con la esperanza de vida. Parte del contraste entre Costa Rica y Estados Unidos y sigue a Nigeria en las comparaciones de agua y aire.

## Estructura

| Carpeta | Contenido |
|---|---|
| `exploracion/` | Notebooks (Colab) de la etapa exploratoria |
| `datos/` | Datos y resultados de la etapa exploratoria |
| `index.html` | La nota con las tres visualizaciones interactivas del notebook del Grupo 3 |
| `TPFinal_InfoVis_Grupo_3.ipynb` | Notebook de entrega para Colab: exploración y los tres gráficos interactivos |

## Notebooks

**Entrega:** [`TPFinal_InfoVis_Grupo_3.ipynb`](TPFinal_InfoVis_Grupo_3.ipynb) ([abrir en Colab](https://colab.research.google.com/github/za0sec/infovis/blob/main/TPFinal/TPFinal_InfoVis_Grupo_3.ipynb)). Explora el catálogo de Data360, descarga los datos de la API, analiza la cobertura de los indicadores y arma con Altair los tres gráficos: PIB por habitante y esperanza de vida, acceso básico al agua potable y exposición a partículas finas PM2,5. Los tres gráficos permiten cambiar el año.

Notebooks de trabajo, en `exploracion/`:

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

1. **PIB por habitante y esperanza de vida (1990–2024).** Dispersión coloreada por continente con controles de año, región y búsqueda.
2. **Acceso básico al agua y esperanza de vida (2000–2024).** Dispersión coloreada por continente con controles de año y búsqueda. Al buscar un país se muestra su recorrido.
3. **Exposición a PM2,5 y esperanza de vida (2000–2023).** Mapa de exposición y dispersión enlazados por país, con selector de año.

`index.html` incrusta las salidas Altair guardadas en `TPFinal_InfoVis_Grupo_3.ipynb` (celdas 20, 24 y 28). La nota usa Vega por CDN y el mapa carga las geometrías de World Atlas que referencia el notebook.

Para verla localmente, iniciá un servidor desde la raíz del repositorio.

```bash
python3 -m http.server
# abrir http://localhost:8000/TPFinal/
```

## Hallazgos principales

- En 2024, Costa Rica tenía 2,1 años más de esperanza de vida que Estados Unidos con el 36 % de su PIB por habitante.
- En 2024, Nigeria y Camboya tenían cerca de 83 % de acceso básico al agua y aproximadamente 16 años de diferencia en esperanza de vida.
- En 2023, Nigeria y Bangladés tenían exposiciones a PM2,5 de 65,7 y 69,3 µg/m³ y aproximadamente 20 años de diferencia en esperanza de vida.
