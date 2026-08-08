/**
 * ENGINE - API Google Apps Script
 * Tabela única: VEÍCULOS
 *
 * Crie uma planilha com uma aba chamada VEÍCULOS.
 * A primeira linha deve conter exatamente os cabeçalhos definidos abaixo.
 */

const CONFIG = {
  ABA: "VEÍCULOS",
  CABECALHOS: ["ID", "Data", "Placa", "Modelo", "Marca", "Ano", "Cor", "Status"],
  TIMEZONE: Session.getScriptTimeZone() || "America/Sao_Paulo"
};

function doGet(e) {
  return resposta_(processar_(parametrosGet_(e)));
}

function doPost(e) {
  try {
    const body = e?.postData?.contents || "{}";
    return resposta_(processar_(JSON.parse(body)));
  } catch (erro) {
    return resposta_({ sucesso: false, status: 400, erro: erro.message, dados: null });
  }
}

function processar_(req) {
  try {
    const acao = String(req.acao || "").toLowerCase();
    const aba = req.aba || CONFIG.ABA;

    if (aba !== CONFIG.ABA) {
      throw new Error(`Aba não permitida: ${aba}`);
    }

    switch (acao) {
      case "listar":
        return ok_(listar_());
      case "buscar":
        return ok_(buscar_(req.id));
      case "criar":
        return ok_(criar_(req.dados));
      case "atualizar":
        return ok_(atualizar_(req.id, req.dados));
      case "excluir":
        return ok_(excluir_(req.id));
      default:
        throw new Error(`Ação inválida: ${acao}`);
    }
  } catch (erro) {
    return { sucesso: false, status: 400, erro: erro.message, dados: null };
  }
}

function parametrosGet_(e) {
  return e?.parameter || {};
}

function planilha_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.ABA);
  if (!sheet) throw new Error(`Aba "${CONFIG.ABA}" não encontrada.`);
  garantirCabecalhos_(sheet);
  return sheet;
}

function garantirCabecalhos_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CONFIG.CABECALHOS.length)
      .setValues([CONFIG.CABECALHOS]);
    return;
  }

  const atual = sheet.getRange(1, 1, 1, CONFIG.CABECALHOS.length).getValues()[0];
  const diferente = CONFIG.CABECALHOS.some((v, i) => atual[i] !== v);

  if (diferente) {
    throw new Error(
      `Cabeçalhos inválidos. Esperado: ${CONFIG.CABECALHOS.join(", ")}`
    );
  }
}

function listar_() {
  const sheet = planilha_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return [];

  const values = sheet
    .getRange(2, 1, lastRow - 1, CONFIG.CABECALHOS.length)
    .getValues();

  return values
    .filter(row => row.some(v => v !== "" && v !== null))
    .map(registro_);
}

function buscar_(id) {
  if (!id) throw new Error("ID não informado.");

  const sheet = planilha_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) {
      const row = sheet.getRange(i + 2, 1, 1, CONFIG.CABECALHOS.length).getValues()[0];
      return registro_(row);
    }
  }

  return null;
}

function criar_(dados) {
  validar_(dados);

  const sheet = planilha_();
  const id = Utilities.getUuid();
  const data = new Date();

  const row = [
    id,
    data,
    dados.Placa || "",
    dados.Modelo || "",
    dados.Marca || "",
    dados.Ano || "",
    dados.Cor || "",
    dados.Combustivel || "",
    dados.Status || "ATIVO"
  ];

  sheet.appendRow(row);
  return registro_(row);
}

function atualizar_(id, dados) {
  if (!id) throw new Error("ID não informado.");
  validar_(dados);

  const sheet = planilha_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) throw new Error("Veículo não encontrado.");

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) {
      const linha = i + 2;
      const atual = sheet.getRange(linha, 1, 1, CONFIG.CABECALHOS.length).getValues()[0];

      const row = [
        atual[0],
        atual[1] || new Date(),
        dados.Placa || "",
        dados.Modelo || "",
        dados.Marca || "",
        dados.Ano || "",
        dados.Cor || "",
        dados.combustivel || "",
        dados.Status || "ATIVO"
      ];

      sheet.getRange(linha, 1, 1, CONFIG.CABECALHOS.length).setValues([row]);
      return registro_(row);
    }
  }

  throw new Error("Veículo não encontrado.");
}

function excluir_(id) {
  if (!id) throw new Error("ID não informado.");

  const sheet = planilha_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) throw new Error("Veículo não encontrado.");

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) {
      sheet.deleteRow(i + 2);
      return { ID: id };
    }
  }

  throw new Error("Veículo não encontrado.");
}

function validar_(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do veículo não informados.");
  }

  if (!String(dados.Placa || "").trim()) {
    throw new Error("Placa é obrigatória.");
  }

  if (!String(dados.Modelo || "").trim()) {
    throw new Error("Modelo é obrigatório.");
  }

  const status = String(dados.Status || "");
  if (!["ATIVO", "INATIVO", "MANUTENÇÃO"].includes(status)) {
    throw new Error("Status inválido.");
  }
}

function registro_(row) {
  return {
    ID: row[0],
    Data: formatarData_(row[1]),
    Placa: row[2],
    Modelo: row[3],
    Marca: row[4],
    Ano: row[5],
    Cor: row[6],
    Combustivel: row[7],
    Status: row[8]
  };
}

function formatarData_(valor) {
  if (!valor) return "";
  if (Object.prototype.toString.call(valor) === "[object Date]") {
    return Utilities.formatDate(valor, CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss");
  }
  return String(valor);
}

function ok_(dados) {
  return {
    sucesso: true,
    status: 200,
    message: "Operação realizada com sucesso.",
    data: dados
  };
}

function resposta_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
