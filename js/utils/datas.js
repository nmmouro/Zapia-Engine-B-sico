export function hoje() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function dataBR(value) {
  if (!value) return "";
  const [ano, mes, dia] = value.split("-");
  return `${dia}/${mes}/${ano}`;
}
