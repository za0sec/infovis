async function cargarComparaciones() {
  const configuraciones = [
    {
      id: "agua",
      casos: new Map([["NGA", "izquierda"], ["KHM", "izquierda"], ["NRU", "izquierda"]]),
      dominio: [0, 100],
      dominioDetalle: [90, 100],
      tituloX: "Acceso básico al agua (%)",
      unidad: "%",
    },
    {
      id: "aire",
      casos: new Map([["BGD", "derecha"], ["NGA", "derecha"]]),
      dominio: [0, 130],
      tituloX: "Exposición a PM2,5 (µg/m³)",
      unidad: "µg/m³",
    },
  ];

  try {
    const observaciones = await d3.csv("datos/agua_aire.csv", d3.autoType);
    const porIndicador = d3.group(observaciones, d => d.indicador);
    for (const config of configuraciones) {
      dibujarComparacion(config, porIndicador.get(config.id));
    }
  } catch (error) {
    for (const { id } of configuraciones) {
      const estado = document.getElementById("estado-" + id);
      if (!estado.hidden) {
        estado.textContent = "No se pudo cargar el gráfico. Podés consultar el CSV en Datos y método.";
      }
    }
    console.error(error);
  }
}

function dibujarComparacion(config, datos) {
  const { id, casos, dominio, dominioDetalle, tituloX, unidad } = config;
  const contenedor = document.getElementById(id);
  const estado = document.getElementById("estado-" + id);
  const controles = document.getElementById("controles-" + id);
  const anio = document.getElementById("anio-" + id);
  const anioVisible = controles.querySelector("output");
  const pais = document.getElementById("pais-" + id);
  const ficha = document.getElementById("ficha-" + id);
  const acercar = document.getElementById("detalle-" + id);
  const porAnio = d3.group(datos, d => d.anio);
  const ordenar = new Intl.Collator("es");
  let enDetalle = false;

  const numero = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  function mostrarFicha(d, cantidad) {
    if (d) {
      const nombre = document.createElement("strong");
      nombre.textContent = d.pais;
      ficha.replaceChildren(nombre, " · " + d.anio + " · " + numero.format(d.valor) + " " + unidad
        + " · " + numero.format(d.vida) + " años de esperanza de vida");
    } else {
      ficha.textContent = cantidad + " economías en " + anio.value
        + ". Elegí un país para consultar sus valores.";
    }
  }

  function dibujar() {
    const seleccion = pais.value;
    const dominioX = enDetalle ? dominioDetalle : dominio;
    const visibles = (porAnio.get(Number(anio.value)) ?? [])
      .filter(d => d.valor >= dominioX[0] && d.valor <= dominioX[1])
      .sort((a, b) => ordenar.compare(a.pais, b.pais));
    anioVisible.value = anio.value;

    const opciones = [{ iso3: "", pais: "Casos de la nota" }, ...visibles];
    d3.select(pais).selectAll("option").data(opciones, d => d.iso3).join("option")
      .attr("value", d => d.iso3)
      .text(d => d.pais);
    pais.value = visibles.some(d => d.iso3 === seleccion) ? seleccion : "";
    const elegido = visibles.find(d => d.iso3 === pais.value);

    const ancho = contenedor.clientWidth;
    const alto = ancho < 560 ? 330 : 430;
    const margen = { arriba: 16, derecha: 18, abajo: 48, izquierda: 47 };
    const fondo = alto - margen.abajo;
    const x = d3.scaleLinear(dominioX, [margen.izquierda, ancho - margen.derecha]);
    const y = d3.scaleLinear([10, 90], [fondo, margen.arriba]);

    d3.select(contenedor).select("svg").remove();
    const svg = d3.select(contenedor).append("svg")
      .attr("viewBox", "0 0 " + ancho + " " + alto)
      .attr("role", "img")
      .attr("aria-labelledby", "titulo-" + id)
      .attr("aria-describedby", "ficha-" + id);

    const marcasX = enDetalle ? [90, 92, 94, 96, 98, 100]
      : id === "agua" ? (ancho < 420 ? [0, 25, 50, 75, 100] : d3.range(0, 101, 10))
        : (ancho < 420 ? [0, 30, 60, 90, 120] : d3.range(0, 121, 20));
    const marcasY = y.ticks(8);
    svg.append("g").attr("class", "grilla").selectAll("line").data(marcasY).join("line")
      .attr("x1", margen.izquierda).attr("x2", ancho - margen.derecha)
      .attr("y1", d => y(d)).attr("y2", d => y(d));
    svg.append("g").attr("class", "eje")
      .attr("transform", "translate(0," + fondo + ")")
      .call(d3.axisBottom(x).tickValues(marcasX).tickSizeOuter(0));
    svg.append("g").attr("class", "eje")
      .attr("transform", "translate(" + margen.izquierda + ",0)")
      .call(d3.axisLeft(y).tickValues(marcasY).tickSizeOuter(0));
    svg.append("text").attr("class", "titulo-eje")
      .attr("x", (margen.izquierda + ancho - margen.derecha) / 2).attr("y", alto - 8)
      .attr("text-anchor", "middle").text(tituloX);
    svg.append("text").attr("class", "titulo-eje")
      .attr("transform", "translate(12," + (margen.arriba + fondo) / 2 + ") rotate(-90)")
      .attr("text-anchor", "middle").text("Esperanza de vida (años)");

    const puntos = svg.append("g").selectAll("circle").data(visibles, d => d.iso3).join("circle")
      .attr("cx", d => x(d.valor)).attr("cy", d => y(d.vida))
      .attr("r", d => casos.has(d.iso3) || d === elegido ? 5.5 : 3.1)
      .attr("fill", d => casos.has(d.iso3) || d === elegido ? "var(--acento)" : "var(--texto-3)")
      .attr("opacity", d => casos.has(d.iso3) || d === elegido ? 1 : .55);
    puntos.filter(d => casos.has(d.iso3) || d === elegido)
      .attr("stroke", "var(--superficie)").attr("stroke-width", 1.2).raise();

    const etiquetas = svg.append("g");
    const ocupadas = [];
    const destacados = elegido ? [elegido] : visibles.filter(d => casos.has(d.iso3));
    for (const d of destacados) {
      const cx = x(d.valor);
      const cy = y(d.vida);
      const preferencia = casos.get(d.iso3) ?? "derecha";
      const etiqueta = etiquetas.append("text").attr("class", "etiqueta").text(d.pais);
      let ubicada = false;
      for (const lado of [preferencia, preferencia === "izquierda" ? "derecha" : "izquierda", "arriba", "abajo"]) {
        const centrado = lado === "arriba" || lado === "abajo";
        etiqueta.attr("x", centrado ? cx : cx + (lado === "izquierda" ? -9 : 9))
          .attr("y", cy + (lado === "arriba" ? -9 : lado === "abajo" ? 16 : 4))
          .attr("text-anchor", centrado ? "middle" : lado === "izquierda" ? "end" : "start");
        const caja = etiqueta.node().getBBox();
        const dentro = caja.x >= 1 && caja.x + caja.width <= ancho - 1
          && caja.y >= 0 && caja.y + caja.height < fondo;
        const solapa = ocupadas.some(o => caja.x < o.x + o.width + 3 && caja.x + caja.width + 3 > o.x
          && caja.y < o.y + o.height + 3 && caja.y + caja.height + 3 > o.y);
        if (dentro && !solapa) {
          ocupadas.push(caja);
          ubicada = true;
          break;
        }
      }
      if (!ubicada) etiqueta.remove();
    }

    const anillo = svg.append("circle").attr("r", 8).attr("fill", "none")
      .attr("stroke", "var(--texto)").attr("stroke-width", 1.5);
    function consultar(d) {
      anillo.attr("visibility", d ? "visible" : "hidden");
      if (d) anillo.attr("cx", x(d.valor)).attr("cy", y(d.vida));
      mostrarFicha(d, visibles.length);
    }
    consultar(elegido);

    const cercanos = d3.Delaunay.from(visibles, d => x(d.valor), d => y(d.vida));
    svg.append("rect").attr("x", margen.izquierda).attr("y", margen.arriba)
      .attr("width", Math.max(0, ancho - margen.izquierda - margen.derecha))
      .attr("height", fondo - margen.arriba).attr("fill", "transparent")
      .on("pointermove click", evento => {
        if (evento.type === "pointermove" && evento.pointerType === "touch") return;
        const [px, py] = d3.pointer(evento, svg.node());
        const d = visibles[cercanos.find(px, py)];
        const cerca = d && Math.hypot(x(d.valor) - px, y(d.vida) - py) <= 18;
        if (evento.type === "click" && cerca) {
          pais.value = d.iso3;
          dibujar();
        } else {
          consultar(cerca ? d : elegido);
        }
      })
      .on("pointerleave", () => consultar(elegido));
  }

  anio.addEventListener("input", dibujar);
  pais.addEventListener("change", dibujar);
  acercar?.addEventListener("click", () => {
    enDetalle = !enDetalle;
    acercar.setAttribute("aria-pressed", enDetalle);
    dibujar();
  });

  controles.hidden = false;
  contenedor.hidden = false;
  ficha.hidden = false;
  dibujar();
  estado.hidden = true;
  redibujarAlCambiarAncho(contenedor, dibujar);
}

cargarComparaciones();
