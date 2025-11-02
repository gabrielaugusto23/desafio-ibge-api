const ufSelect = document.getElementById("ufSelect");
const tableBody = document.querySelector("#municipiosTable tbody");

// Load UFs on page load
async function carregarUFs() {
  try {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const estados = await response.json();

    estados.sort((a, b) => a.nome.localeCompare(b.nome)); // sort alphabetically

    estados.forEach(uf => {
      const option = document.createElement("option");
      option.value = uf.sigla;
      option.textContent = `${uf.nome} (${uf.sigla})`;
      ufSelect.appendChild(option);
    });
  } catch (error) {
    alert("Erro ao carregar UFs. Tente novamente mais tarde.");
    console.error(error);
  }
}

// Load municipalities when UF is selected
async function carregarMunicipios(uf) {
  tableBody.innerHTML = ""; // clear previous data

  if (!uf) return;

  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const municipios = await response.json();

    municipios.forEach(municipio => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${municipio.id}</td>
        <td>${municipio.nome}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    alert("Erro ao carregar municípios. Verifique sua conexão.");
    console.error(error);
  }
}

// Events
ufSelect.addEventListener("change", (e) => {
  const uf = e.target.value;
  carregarMunicipios(uf);
});

// Initialize
carregarUFs();
