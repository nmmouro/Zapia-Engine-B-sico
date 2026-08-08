export function valor(id) {
  return document.getElementById(id)?.value?.trim() ?? "";
}

export function preencher(id, value) {
  const campo = document.getElementById(id);
  if (campo) campo.value = value ?? "";
}
