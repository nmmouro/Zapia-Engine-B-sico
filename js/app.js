import { startRouter } from "./core/router.js";
import { initVeiculos } from "./pages/veiculos/veiculos.js";
import { initEmpregados } from "./pages/empregados/empregados.js";

function atualizarRelogio() {
  const agora = new Date();

  const clock = document.getElementById("clock");

  if (clock) {
    clock.textContent = agora.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium"
    });
  }
}

async function boot() {
  atualizarRelogio();

  setInterval(atualizarRelogio, 1000);

  startRouter(async route => {

    if (route === "veiculos") {
      await initVeiculos();
      return;
    }

    if (route === "empregados") {
      await initEmpregados();
      return;
    }

  });
}

document.addEventListener(
  "DOMContentLoaded",
  boot
);
