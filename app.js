document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://backend-filmeseseries.onrender.com/api/entries";

  const lista = document.getElementById("lista");
  const form = document.getElementById("form");

  let midias = [];

  // Buscar dados
  async function carregarMidias() {
    try {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();

      console.log("DADOS:", data);

      midias = data;
      render();
    } catch (error) {
      console.error("Erro ao carregar mídias:", error);
    }
  }

  // Criar
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const genero = document.getElementById("genero").value;

    try {
      await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, type, genero })
      });

      form.reset();
      carregarMidias();
    } catch (error) {
      console.error("Erro ao criar mídia:", error);
    }
  });

  // Deletar
  async function deletar(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      carregarMidias();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  // Atualizar status
  async function toggleStatus(item) {
    const novoStatus =
      item.status === "assistido" ? "nao_assistido" : "assistido";

    try {
      await fetch(`${API_URL}/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...item, status: novoStatus })
      });

      carregarMidias();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  // Renderizar lista
  function render() {
    lista.innerHTML = "";

    midias.forEach((m) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${m.name}</strong> (${m.type}) - ${m.genero}
        | <b>${m.status}</b>
        <button class="btn-status">✔</button>
        <button class="btn-delete">❌</button>
      `;

      li.querySelector(".btn-status").onclick = () => toggleStatus(m);
      li.querySelector(".btn-delete").onclick = () => deletar(m._id);

      lista.appendChild(li);
    });
  }

  // Inicializar
  carregarMidias();

});