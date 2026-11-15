# TP Final — Vivir más sin ser más rico

Trabajo práctico final de Visualización de la Información sobre datos de [World Bank Data360](https://data360.worldbank.org/en/api).

**Integrantes:** Javier Peral Belmont · Pilar Frutos

**Nota publicada:** https://za0sec.github.io/infovis/TPFinal/

La nota compara el PIB por habitante, el acceso básico al agua y la exposición a partículas finas con la esperanza de vida. Parte del contraste entre Costa Rica y Estados Unidos y sigue a Nigeria en las comparaciones de agua y aire.

## Estructura

| Carpeta | Contenido |
|---|---|
| `exploracion/` | Notebooks (Colab) de la etapa exploratoria |
| `datos/` | Datos procesados que usan las visualizaciones |
| `index.html` | La nota con las tres visualizaciones interactivas (D3) |
| `vivir_mas_sin_ser_mas_rico.ipynb` | Notebook de entrega para Colab: exploración y los tres gráficos interactivos |

## Notebooks

**Entrega:** [`vivir_mas_sin_ser_mas_rico.ipynb`](vivir_mas_sin_ser_mas_rico.ipynb) ([abrir en Colab](https://colab.research.google.com/github/za0sec/infovis/blob/main/TPFinal/vivir_mas_sin_ser_mas_rico.ipynb)). Explora el catálogo de Data360, descarga los datos de la API, analiza la cobertura de los indicadores y arma con Altair los tres gráficos: PIB por habitante y esperanza de vida, acceso básico al agua potable y exposición a partículas finas PM2,5. El gráfico de PIB tiene un deslizador de 1990 a 2024 y ajusta el modelo para cada año. Las vistas de agua potable y el mapa de PM2,5 también tienen un deslizador de años. Corre con «Ejecutar todo» en una sesión nueva.

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

1. **PIB por habitante y esperanza de vida (2024).** Dispersión con escala logarítmica para el PIB, área proporcional a la población y color según la distancia al modelo. Incluye búsqueda, región y filtros de brecha.
2. **Acceso básico al agua y esperanza de vida (2000–2024).** Dispersión con selector de año y de economía. La misma figura permite acercar el tramo del 90 % al 100 %.
3. **Exposición a PM2,5 y esperanza de vida (2000–2023).** Dispersión con selector de año y de economía, centrada en la comparación entre Nigeria y Bangladés.

La nota usa los datos guardados en el repositorio. El CSV de agua y aire se extrajo de los datos embebidos en las visualizaciones del notebook del Grupo 3. El navegador carga D3 por CDN y consulta los CSV del sitio.

Para verla localmente hay que servir la carpeta (los datos se cargan con `fetch`):

```bash
python3 -m http.server
# abrir http://localhost:8000/TPFinal/
```

## Hallazgos principales

- En 2024, Costa Rica tenía 2,1 años más de esperanza de vida que Estados Unidos con el 36 % de su PIB por habitante. El ajuste de 2024 da cuenta del 74,4 % de la variación observada entre las 195 economías incluidas.
- En 2024, Nigeria y Camboya tenían cerca de 83 % de acceso básico al agua y aproximadamente 16 años de diferencia en esperanza de vida.
- En 2023, Nigeria y Bangladés tenían exposiciones a PM2,5 de 65,7 y 69,3 µg/m³ y aproximadamente 20 años de diferencia en esperanza de vida.
