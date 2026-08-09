// ============================================================================
// ENGINE FRAMEWORK
// CORE ROUTER
// Arquivo: js/core/router.js
// ============================================================================
//
// Responsabilidades:
//
//   1. Resolver rota
//   2. Carregar a view HTML
//   3. Inserir a view no container
//   4. Executar o handler da rota
//
// O Router NÃO conhece regras de VEÍCULOS, EMPREGADOS etc.
// ============================================================================

const DEFAULT_ROUTE = "veiculos";

const routes = {

    "/":
        "veiculos",

    "/veiculos":
        "veiculos",

    "/empregados":
        "empregados"

};


// ============================================================================
// PATH
// ============================================================================

export function getPath() {

    const hash =
        window.location.hash
            .replace(/^#/, "")
            .trim();

    return hash || "/";

}


// ============================================================================
// ROTA
// ============================================================================

export function getRoute() {

    const path =
        getPath();

    return (
        routes[path] ||
        DEFAULT_ROUTE
    );

}


// ============================================================================
// NAVEGAÇÃO
// ============================================================================

export function navigate(
    route
) {

    const path =
        route.startsWith("/")
            ? route
            : `/${route}`;

    window.location.hash =
        path;

}


// ============================================================================
// CARREGAR VIEW
// ============================================================================

async function carregarView(
    route,
    options
) {

    const container =
        document.querySelector(
            options.container
        );


    if (!container) {

        throw new Error(
            `ENGINE ROUTER: container "${options.container}" não encontrado.`
        );

    }


    const url =
        `${options.viewsPath}/${route}/${route}.html`;


    console.log(
        "ENGINE ROUTER → View:",
        url
    );


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            `ENGINE ROUTER: não foi possível carregar "${url}".`
        );

    }


    const html =
        await response.text();


    container.innerHTML =
        html;


    return container;

}


// ============================================================================
// START ROUTER
// ============================================================================

export function startRouter(
    handlers,
    options = {}
) {

    const config = {

        container:
            options.container ||
            "#app",

        viewsPath:
            options.viewsPath ||
            "./pages"

    };


    if (
        !handlers ||
        typeof handlers !== "object"
    ) {

        throw new TypeError(
            "ENGINE ROUTER: handlers inválidos."
        );

    }


    let executando =
        false;


    const run =
        async () => {

            if (executando) {
                return;
            }


            executando =
                true;


            try {

                const route =
                    getRoute();


                console.log(
                    "ENGINE ROUTER →",
                    route
                );


                const handler =
                    handlers[route];


                if (
                    typeof handler !==
                    "function"
                ) {

                    throw new Error(
                        `ENGINE ROUTER: handler não encontrado para "${route}".`
                    );

                }


                // ------------------------------------------------------------
                // CARREGA O HTML PRIMEIRO
                // ------------------------------------------------------------

                await carregarView(
                    route,
                    config
                );


                // ------------------------------------------------------------
                // DEPOIS INICIALIZA O MÓDULO
                // ------------------------------------------------------------

                await handler();


            } catch (erro) {

                console.error(
                    "ENGINE ROUTER → Erro:",
                    erro
                );


                const container =
                    document.querySelector(
                        config.container
                    );


                if (container) {

                    container.innerHTML = `
                        <section class="engine-error">
                            <h2>Erro ao carregar página</h2>
                            <p>${erro.message}</p>
                        </section>
                    `;

                }


            } finally {

                executando =
                    false;

            }

        };


    window.addEventListener(
        "hashchange",
        run
    );


    run();


    return () => {

        window.removeEventListener(
            "hashchange",
            run
        );

    };

}
