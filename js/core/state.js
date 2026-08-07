let state = {
  registros: [],
  registroEditando: null,
  carregando: false
};

export function getState() {
  return { ...state };
}

export function setState(patch) {
  state = { ...state, ...patch };
  return getState();
}
