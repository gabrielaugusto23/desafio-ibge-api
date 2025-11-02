const ufSelect = document.getElementById("ufSelect");
const tableBody = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const rowsPerPageSelect = document.getElementById("rowsPerPage");

let municipios = [];
let currentPage = 1;
let itemsPerPage = parseInt(rowsPerPageSelect.value);

// Carregar UFs
async function carregarUFs() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";

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
  } finally {
    // Sempre ocultar a mensagem de carregamento
    loading.style.display = "none";
  }
}

// Carregar municípios
async function carregarMunicipios(uf) {
  tableBody.innerHTML = "";
  pagination.innerHTML = "";
  municipios = [];

  const loading = document.getElementById("loading");

  if (!uf) {
    loading.style.display = "none";
    return;
  }

    try {
    hideError();
    loading.style.display = "block";
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);

    if (!response.ok) throw new Error("Erro de rede");

    municipios = await response.json();
    loading.style.display = "none";

    if (municipios.length === 0) {
        showError("Nenhum município encontrado para esta UF.");
        return;
    }

    renderTable();
    renderPagination();
    } catch (error) {
    loading.style.display = "none";
    showError("Erro ao carregar municípios. Verifique sua conexão e tente novamente.");
    console.error(error);
    }
}

// Render tabela
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

// Render paginação
function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(municipios.length / itemsPerPage);

  // Botão anterior
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
  prevLi.addEventListener("click", () => changePage(currentPage - 1));
  pagination.appendChild(prevLi);

  // Container scrollável dos números
  const numbersContainer = document.createElement("div");
  numbersContainer.className = "page-numbers-container d-flex flex-nowrap overflow-auto";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", () => changePage(i));
    numbersContainer.appendChild(li);
  }

  pagination.appendChild(numbersContainer);

  // Botão próxima
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  nextLi.innerHTML = `<a class="page-link" href="#">Próxima</a>`;
  nextLi.addEventListener("click", () => changePage(currentPage + 1));
  pagination.appendChild(nextLi);
}

function changePage(page) {
  const totalPages = Math.ceil(municipios.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
  renderPagination();

  // Mantém a página atual visível ao clicar
  document.querySelector(".page-item.active")?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });
}

// Atualiza ao mudar linhas por página
rowsPerPageSelect.addEventListener("change", () => {
  itemsPerPage = parseInt(rowsPerPageSelect.value);
  currentPage = 1;
  renderTable();
  renderPagination();
});

// Evento de mudança da UF
ufSelect.addEventListener("change", (e) => {
  const uf = e.target.value;

  if (!uf) {
    showError("Por favor, selecione uma UF para ver os municípios.");
    tableBody.innerHTML = "";
    pagination.innerHTML = "";
    return;
  }

  hideError();
  carregarMunicipios(uf);
});

const errorMessage = document.getElementById("error-message");

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.style.display = "none";
}

carregarUFs();
