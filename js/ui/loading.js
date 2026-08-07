const elemento = document.getElementById("app-loading");

export function mostrarLoading() {
  elemento?.classList.remove("hidden");
}

export function esconderLoading() {
  elemento?.classList.add("hidden");
}
