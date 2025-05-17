document.getElementById("filtrar-btn").addEventListener("click", function() {
    let categoriaSeleccionada = document.getElementById("categoria").value;
    
    let reportes = [
        { tipo: "robo", descripcion: "Robo en tienda local." },
        { tipo: "violencia", descripcion: "Agresión en la vía pública." },
        { tipo: "accidente", descripcion: "Choque entre dos vehículos." },
        { tipo: "medica", descripcion: "Persona con síntomas graves en la calle." }
    ];

    let listaReportes = document.getElementById("listaReportes");
    listaReportes.innerHTML = ""; // Limpiar la lista antes de actualizar

    let reportesFiltrados = categoriaSeleccionada === "todos" ? reportes : reportes.filter(r => r.tipo === categoriaSeleccionada);
    
    if (reportesFiltrados.length === 0) {
        listaReportes.innerHTML = "<p>⚠️ No hay reportes en esta categoría.</p>";
    } else {
        reportesFiltrados.forEach(r => {
            let reporteHTML = `<li>${r.descripcion}</li>`;
            listaReportes.innerHTML += reporteHTML;
        });
    }
});
