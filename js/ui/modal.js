const modal = document.getElementById("modal");

export function abrirModal() {
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("placa")?.focus(), 0);
}

export function fecharModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

export function configurarModal() {
  document.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", fecharModal);
  });

  document.getElementById("btnFecharModal")?.addEventListener("click", fecharModal);
  document.getElementById("btnCancelar")?.addEventListener("click", fecharModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) fecharModal();
  });
}
