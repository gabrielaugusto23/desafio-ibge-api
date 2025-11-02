const ufSelect = document.getElementById("ufSelect");
const tableBody = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");

let municipios = [];
let currentPage = 1;
const itemsPerPage = 10;

// Load UFs when the page loads
async function carregarUFs() {
  try {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const estados = await response.json();

    estados.sort((a, b) => a.nome.localeCompare(b.nome));

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

// Load municipalities when a UF is selected
async function carregarMunicipios(uf) {
  tableBody.innerHTML = "";
  pagination.innerHTML = "";
  municipios = [];

  if (!uf) return;

  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    municipios = await response.json();

    if (municipios.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="2" class="text-center">Nenhum município encontrado.</td></tr>`;
      return;
    }

    currentPage = 1;
    renderTable();
    renderPagination();
  } catch (error) {
    alert("Erro ao carregar municípios. Verifique sua conexão.");
    console.error(error);
  }
}

// Render municipalities for the current page
function renderTable() {
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const municipiosPagina = municipios.slice(start, end);

  municipiosPagina.forEach(municipio => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${municipio.id}</td>
      <td>${municipio.nome}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Render pagination controls
function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(municipios.length / itemsPerPage);

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
  prevLi.addEventListener("click", () => changePage(currentPage - 1));
  pagination.appendChild(prevLi);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", () => changePage(i));
    pagination.appendChild(li);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="page-link" href="#">Próxima</a>`;
  nextLi.addEventListener("click", () => changePage(currentPage + 1));
  pagination.appendChild(nextLi);
}

// Change current page
function changePage(page) {
  const totalPages = Math.ceil(municipios.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
  renderPagination();
}

// Events
ufSelect.addEventListener("change", (e) => {
  const uf = e.target.value;
  carregarMunicipios(uf);
});

// Initialize
carregarUFs();
