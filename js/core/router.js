const routes = {
  "/": "veiculos",
  "/veiculos": "veiculos"
};

export function getRoute() {
  const path = window.location.hash.replace("#", "") || "/";
  return routes[path] || "veiculos";
}

export function startRouter(onRoute) {
  const run = () => onRoute(getRoute());
  window.addEventListener("hashchange", run);
  run();
}
