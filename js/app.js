import { startRouter } from "./core/router.js";
import { initVeiculos } from "./pages/veiculos/veiculos.js";
import { initEmpregados } from "./pages/empregados/empregados.js";

function atualizarRelogio() {
  const agora = new Date();
  document.getElementById("clock").textContent =
    agora.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium"
    });
}

function boot() {
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);

  startRouter(async route => {
    if (route === "veiculos") {
      await initVeiculos();
    }

  startRouter(async route => {
    if (route === "empregados") {
      await initEmpregados();
    }
    
  });
}

document.addEventListener("DOMContentLoaded", boot);
