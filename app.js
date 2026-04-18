document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://backend-filmeseseries.onrender.com/api/entries";

  const lista = document.getElementById("lista");
  const form = document.getElementById("form");
  const buscaInput = document.getElementById("busca");

  let midias = [];

  // FUNÇÃO DE BUSCAR DADOS
  async function carregarMidias() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      console.log("DADOS:", data);

      midias = data;

      aplicarFiltroErender();

    } catch (error) {
      console.error("Erro ao carregar mídias:", error);
    }
  }

  // CRIAR MÍDIA
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const genero = document.getElementById("genero").value;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: name,
          type: type === "filme" ? "Filme" : "Serie",
          gender: genero
        })
      });

      form.reset();

      carregarMidias();

    } catch (error) {
      console.error("Erro ao criar mídia:", error);
    }
  });

  // DELETAR MIDIA(FILME OU SÉRIE)
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

  // ALTERAR STATUS
  async function toggleStatus(item) {
    const novoStatus =
      item.status === "assistido" ? "nao_assistido" : "assistido";

    try {
      await fetch(`${API_URL}/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...item,
          status: novoStatus
        })
      });

      carregarMidias();

    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  // EDITAR MÍDIA
  function editarMidia(m) {
    const novoTitulo = prompt("Novo título:", m.titulo);
    const novoGenero = prompt("Novo gênero:", m.gender);
    const novoTipo = prompt("Tipo (Filme ou Serie):", m.type);

    if (!novoTitulo || !novoGenero || !novoTipo) return;

    atualizarMidia(m._id, {
      titulo: novoTitulo,
      gender: novoGenero,
      type: novoTipo
    });
  }

  async function atualizarMidia(id, dados) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      carregarMidias();

    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  // FILTRO + RENDER
  function aplicarFiltroErender() {
    const termo = buscaInput.value.toLowerCase();

    const listaFinal = termo
      ? midias.filter((m) =>
          m.titulo?.toLowerCase().includes(termo)
        )
      : midias;

    render(listaFinal);
  }

  // RENDER
  function render(listaFiltrada) {
    lista.innerHTML = "";

    listaFiltrada.forEach((m) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <div>
          <strong>${m.titulo}</strong> (${m.type}) - ${m.gender}
          | <b>${m.status}</b>
        </div>
        <div>
          <button class="btn-edit"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnElEQVR4nO2VsQnDMBBF3wIugvEwqZJJAsGDWKUnSCGPlIxgjxCMwb2MiAxCILvQqQjowRVq3r87hASFHy0wATOggQpBFGCC0rkDvhLi20HImCpXTqQiIU8JuYmEKEm5cdWnSM/ke93JKO+K3PyV3FIDr4g86Z77NDnkD+DqnS/eJCKdD8AShNSSa/m4btfgtRTD/kpvN4ldV4HsbKjbZsagJG6zAAAAAElFTkSuQmCC" alt="pencil--v1"></button>
          <button class="btn-status"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAACqklEQVR4nO2azWpTQRiGHzRVcOHCYGlo3fl7M9IiWuKqC7Giti4UFBfiBfjT3IOLogt31lxBtaUqiiD+XIGk0BjBaklk4AuEQw458z+h54V3E86cOc+ZyTfnm2+gVKlSpUrtX00Bl4EG0AS+AdvAX/G2/NaUa+rSZqxUBZaBTaBn6A1gSe6VrGaAFeC3BWjWHeApME1CmgBuAb8cgmatXuJD4HBs2DPAB4+gWb8HTseCveB5VPPcBuZCwy4A/yLA9r0HXAsFuxgRNGsVyb1P470EQAdHetYX7ElgJwHIrFUcOesa9lDgaKzrd7I8OtO9BKBG+Y4r2Gn54okNVGRq11wAryQAU9SPbWGrjr+Nfbtjm3AsJwCh6xs2wJsJALyUTEz5VYHr35rC1oBuZNhVoDLwTDMF2qhnnjQBricGq3SiYNt5E+BGYrAVmd5F2qtNA201I8E+HwJ7EHimcQ/1X9fWj4RGdlXzPmpjUFutMRzZvn+aAO+OKazynxDAnyU3vQh8jTCNrYFbmp2cG2ir1sFPkWCNp/R3jQ7UYn8k034UtC9Y46D1WrOTB0PukQftE9Z4WWpodtKVZGMUtG9Y4w+PukFHXalCZHUc+OghGuf5kgnwlGHykDfSxwKMrFXygFTxeg6hfcMqr2OhJcs3PWx6+5rGfV+3Aa5abuANG2lfI+tkiweJeLb/qfvAAeAo8MITrPIjEtqmbcsxB1+wbZfHJe56fFBXvo1DTUg5o5eot1yXWlIvpqmTCF40l2C59DyedTUB0H70v8I+OvKwSGDNylIQGnYnxDTO06nA0XtLgmdUVeSbuR3gYJo6iZCMasATx8XzjtR8kz5wWgVuAm8s8ul1KXuqHHqsNCmFLZWArAFfZDd0V9yS39bkmnmb5L1UqVKlSjHm+g8Rx4FbvBGmlQAAAABJRU5ErkJggg==" alt="ok--v1"></button>
          <button class="btn-delete"><img src="data:image/png;base64,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" alt="full-trash--v1"></button> 
      </div> `;

      li.querySelector(".btn-status").onclick = () => toggleStatus(m);
      li.querySelector(".btn-delete").onclick = () => deletar(m._id);
      li.querySelector(".btn-edit").onclick = () => editarMidia(m);

      lista.appendChild(li);
    });
  }

  // BUSCA
  buscaInput.addEventListener("input", aplicarFiltroErender);

  // SERVICE WORKER (PWA)

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  carregarMidias();

});