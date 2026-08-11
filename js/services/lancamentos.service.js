// ============================================================================
// Lançamentos SERVICE
// ============================================================================

import { API_URL, API_TIMEOUT} from "../config/api.js";


// ============================================================================
// JSONP
// ============================================================================

function jsonp(params = {}) {

  return new Promise(
    (resolve, reject) => {

      const callbackName =
        "__engine_jsonp_" +
        Date.now() +
        "_" +
        Math.random()
          .toString(36)
          .substring(2);

      const script =
        document.createElement("script");

      let finalizado = false;

      const timeout =
        setTimeout(() => {

          finalizar();

          reject(
            new Error(
              "Tempo limite da API excedido."
            )
          );

        }, API_TIMEOUT);


      function finalizar() {

        if (finalizado) return;

        finalizado = true;

        clearTimeout(timeout);

        delete window[callbackName];

        script.remove();

      }


      window[callbackName] =
        resposta => {

          finalizar();

          console.log(
            "ENGINE ← JSONP:",
            resposta
          );

          const sucesso =
            resposta?.success ??
            resposta?.sucesso;

          if (sucesso === false) {

            reject(
              new Error(
                resposta.erro ||
                resposta.error ||
                resposta.message ||
                "A API retornou um erro."
              )
            );

            return;

          }

          resolve(resposta);

        };


      const url =
        new URL(API_URL);

      Object.entries(params)
        .forEach(
          ([key, value]) => {

            if (
              value !== undefined &&
              value !== null &&
              value !== ""
            ) {

              url.searchParams.set(
                key,
                value
              );

            }

          }
        );


      url.searchParams.set(
        "prefix",
        callbackName
      );


      console.log(
        "ENGINE → API JSONP:",
        url.toString()
      );


      script.src =
        url.toString();

      script.async = true;





     
script.onerror = (evento) => {
    console.error("ENGINE → JSONP ERROR:", evento);
    console.error("URL:", url.toString());

  finalizar();  
  reject(new Error(
        "Não foi possível acessar a API JSONP."
    ));
};

      document
        .head
        .appendChild(script);

    }
  );

}


// ============================================================================
// EXTRAIR ARRAY
// ============================================================================

function extrairData(resposta) {

  let atual =
    resposta;


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    if (
      Array.isArray(atual)
    ) {

      return atual;

    }


    if (
      atual &&
      typeof atual === "object" &&
      "data" in atual
    ) {

      atual =
        atual.data;

      continue;

    }


    if (
      atual &&
      typeof atual === "object" &&
      "dados" in atual
    ) {

      atual =
        atual.dados;

      continue;

    }


    break;

  }


  return Array.isArray(atual)
    ? atual
    : null;

}


// ============================================================================
// EXTRAIR REGISTRO
// ============================================================================

function extrairRegistro(resposta) {

  let atual =
    resposta;


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    if (
      !atual ||
      typeof atual !== "object" ||
      Array.isArray(atual)
    ) {

      return atual;

    }


    if (
      "data" in atual
    ) {

      atual =
        atual.data;

      continue;

    }


    if (
      "dados" in atual
    ) {

      atual =
        atual.dados;

      continue;

    }


    return atual;

  }


  return atual;

}


// ============================================================================
// LISTAR
// ============================================================================

export async function obterLancamentos() {

  const resposta =
    await jsonp({

      acao: "listar",

      aba: "LANCAMENTOS"

    });


  const lista =
    extrairData(resposta);


  if (
    !Array.isArray(lista)
  ) {

    console.error(
      "ENGINE - resposta inesperada:",
      resposta
    );

    throw new Error(
      "A API não retornou uma lista de lançamentos."
    );

  }


  return lista;

}


// ============================================================================
// BUSCAR
// ============================================================================

export async function obterLancamento(id) {

  if (!id) {

    throw new Error(
      "ID do lançamentos não informado."
    );

  }


  const resposta =
    await jsonp({

      acao: "buscar",

      aba: "LANCAMENTOS",

      id

    });


  return extrairRegistro(
    resposta
  );

}


// ============================================================================
// SALVAR
// ============================================================================

export async function salvarLancamento(
  dados
) {

  return post(
    {
      acao: "criar",
      aba: "LANCAMENTOS",
      dados
    }
  );

}


// ============================================================================
// ATUALIZAR
// ============================================================================

export async function atualizarLancamento(
  id,
  dados
) {

  if (!id) {

    throw new Error(
      "ID do lançamentos não informado."
    );

  }


  return post(
    {
      acao: "atualizar",
      aba: "LANCAMENTOS",
      id,
      dados
    }
  );

}


// ============================================================================
// EXCLUIR
// ============================================================================

export async function excluirLancamento(id) {

  if (!id) {

    throw new Error(
      "ID do LANCAMENTOS não informado."
    );

  }


  return post(
    {
      acao: "excluir",
      aba: "LANCAMENTOS",
      id
    }
  );

}


// ============================================================================
// POST
// ============================================================================

async function post(body) {

  const response =
    await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(body)
      }
    );


  const text =
    await response.text();


  if (!text) {

    throw new Error(
      "A API retornou uma resposta vazia."
    );

  }


  let json;

  try {

    json =
      JSON.parse(text);

  } catch {

    throw new Error(
      "A API retornou uma resposta inválida."
    );

  }


  const sucesso =
    json.success ??
    json.sucesso;


  if (sucesso === false) {

    throw new Error(
      json.erro ||
      json.error ||
      json.message ||
      "A API retornou um erro."
    );

  }


  return extrairRegistro(
    json
  );

}
