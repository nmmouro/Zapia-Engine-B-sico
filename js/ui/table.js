export function renderTable(table, columns, rows, actions = {}) {
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  thead.innerHTML = `
    <tr>
      ${columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join("")}
      ${actions.edit || actions.remove ? "<th>Ações</th>" : ""}
    </tr>
  `;

  tbody.innerHTML = rows.map(row => `
    <tr>
      ${columns.map(c => `<td>${escapeHtml(formatValue(row[c.key], c))}</td>`).join("")}
      ${actions.edit || actions.remove ? `
        <td>
          <div class="actions">
            ${actions.edit ? `<button class="action action-edit" data-action="edit" data-id="${escapeAttr(row.ID)}">Editar</button>` : ""}
            ${actions.remove ? `<button class="action action-delete" data-action="remove" data-id="${escapeAttr(row.ID)}">Excluir</button>` : ""}
          </div>
        </td>` : ""}
    </tr>
  `).join("");
}

function formatValue(value, column) {
  if (value === null || value === undefined || value === "") return "—";
  if (column.type === "date") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toLocaleDateString("pt-BR");
  }
  return String(value);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
