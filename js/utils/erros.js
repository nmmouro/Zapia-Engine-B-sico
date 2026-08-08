export function tratarErro(error) {
  console.error(error);
  alert(error?.message || "Erro ao processar a operação.");
}
