// ============================================================================
// ENGINE FRAMEWORK
// CORE ROUTER
// Arquivo: js/core/router.js
// ============================================================================
//
// Responsabilidades:
//
//   1. Resolver rota
//   2. Carregar a View HTML
//   3. Inserir a View no container
//   4. Carregar o módulo JS da rota
//   5. Executar a função de inicialização
//
// O Router NÃO conhece regras de negócio.
//
// ============================================================================

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const DEFAULT_ROUTE = "dashboard";

const ENGINE = {

    // Caminho das páginas a partir do index.html
    pagesPath: "./js/pages",

    // Caminho dos módulos a partir de js/core/router.js
    modulesPath: "../pages"

};

// ============================================================================
// ROTAS
// ============================================================================

const routes = {

    dashboard: {

        path: "/",
        page: "dashboard",
        initFunction: "initDashboard"

    },

    lancamentos: {

        path: "/lancamentos",
        page: "lancamentos",
        initFunction: "initLancamentos"

    },

    veiculos: {

        path: "/veiculos",
        page: "veiculos",
        initFunction: "initVeiculos"

    },

    empregados: {

        path: "/empregados",
        page: "empregados",
        initFunction: "initEmpregados"

    }

};

// ============================================================================
// PATH
// ============================================================================

export function getPath() {

    const hash =
        window.location.hash
            .replace(/^#/, "")
            .trim();

    if (!hash) {

        return "/";

    }

    return hash.startsWith("/")
        ? hash
        : `/${hash}`;

}

// ============================================================================
// RESOLVER ROTA
// ============================================================================

export function getRoute() {

    const path =
        getPath();


    for (
        const [name, route]
        of Object.entries(routes)
    ) {

        if (
            route.path === path
        ) {

            return name;

        }

    }


    return DEFAULT_ROUTE;

}


// ============================================================================
// CONFIGURAÇÃO DA ROTA
// ============================================================================

export function getRouteConfig(
    route
) {

    return routes[route] || null;

}


// ============================================================================
// NAVEGAÇÃO
// ============================================================================

export function navigate(
    route
) {

    const nome =
        String(route)
            .replace(/^#/, "")
            .replace(/^\//, "");


    const config =
        routes[nome];


    if (!config) {

        console.warn(
            `ENGINE ROUTER: rota "${route}" não encontrada.`
        );


        window.location.hash =
            "#/";

        return;

    }


    window.location.hash =
        config.path;

}


// ============================================================================
// GERAR URL DA VIEW
// ============================================================================

function obterViewUrl(
    route
) {

    return (
        `${ENGINE.pagesPath}/` +
        `${route.page}/` +
        `${route.page}.html`
    );

}


// ============================================================================
// GERAR URL DO MÓDULO
// ============================================================================

function obterModuloUrl(
    route
) {

    return (
        `${ENGINE.modulesPath}/` +
        `${route.page}/` +
        `${route.page}.js`
    );

}


// ============================================================================
// CARREGAR VIEW
// ============================================================================

async function carregarView(
    route,
    container
) {

    const url =
        obterViewUrl(route);


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
// CARREGAR MÓDULO
// ============================================================================

async function carregarModulo(
    route
) {

    const url =
        obterModuloUrl(route);


    console.log(
        "ENGINE ROUTER → Module:",
        url
    );


    const modulo =
        await import(url);


    const nomeFuncao =
        route.initFunction;


    if (!nomeFuncao) {

        return modulo;

    }


    const init =
        modulo[nomeFuncao];


    if (
        typeof init !==
        "function"
    ) {

        throw new Error(
            `ENGINE ROUTER: função "${nomeFuncao}" não encontrada em "${url}".`
        );

    }


    return init;

}


// ============================================================================
// START ROUTER
// ============================================================================

export function startRouter(
    options = {}
) {

    const config = {

        container:
            options.container ||
            "#app"

    };


    const container =
        document.querySelector(
            config.container
        );


    if (!container) {

        throw new Error(
            `ENGINE ROUTER: container "${config.container}" não encontrado.`
        );

    }


    let executando =
        false;


    let rotaAtual =
        null;


    let cleanupAtual =
        null;


    // ========================================================================
    // EXECUTAR ROTA
    // ========================================================================

    const run =
        async () => {

            if (executando) {

                return;

            }


            executando =
                true;


            try {

                const routeName =
                    getRoute();


                const route =
                    getRouteConfig(
                        routeName
                    );


                if (!route) {

                    throw new Error(
                        `ENGINE ROUTER: configuração da rota "${routeName}" não encontrada.`
                    );

                }


                console.log(
                    "ENGINE ROUTER →",
                    routeName
                );


                // ------------------------------------------------------------
                // EVITA RECARREGAR A MESMA ROTA
                // ------------------------------------------------------------

                if (
                    rotaAtual ===
                    routeName
                ) {

                    return;

                }


                // ------------------------------------------------------------
                // CLEANUP
                // ------------------------------------------------------------

                if (
                    typeof cleanupAtual ===
                    "function"
                ) {

                    try {

                        await cleanupAtual();

                    } catch (erro) {

                        console.warn(
                            "ENGINE ROUTER → Erro no cleanup:",
                            erro
                        );

                    }

                }


                cleanupAtual =
                    null;


                rotaAtual =
                    routeName;


                // ------------------------------------------------------------
                // CARREGAR VIEW
                // ------------------------------------------------------------

                await carregarView(
                    route,
                    container
                );


                // ------------------------------------------------------------
                // CARREGAR MÓDULO
                // ------------------------------------------------------------

                const init =
                    await carregarModulo(
                        route
                    );


                // ------------------------------------------------------------
                // EXECUTAR INIT
                // ------------------------------------------------------------

                if (
                    typeof init ===
                    "function"
                ) {

                    const resultado =
                        await init();


                    // --------------------------------------------------------
                    // CLEANUP OPCIONAL
                    // --------------------------------------------------------

                    if (
                        typeof resultado ===
                        "function"
                    ) {

                        cleanupAtual =
                            resultado;

                    }

                }


            } catch (erro) {

                console.error(
                    "ENGINE ROUTER → Erro:",
                    erro
                );


                container.innerHTML = `

                    <section
                        class="engine-error"
                    >

                        <h2>
                            Erro ao carregar página
                        </h2>

                        <p>
                            ${
                                erro?.message ||
                                "Erro desconhecido."
                            }
                        </p>

                    </section>

                `;

            } finally {

                executando =
                    false;

            }

        };


    // ========================================================================
    // HASHCHANGE
    // ========================================================================

    window.addEventListener(
        "hashchange",
        run
    );


    // ========================================================================
    // BOOT
    // ========================================================================

    run();


    // ========================================================================
    // DESTROY
    // ========================================================================

    return () => {

        window.removeEventListener(
            "hashchange",
            run
        );


        if (
            typeof cleanupAtual ===
            "function"
        ) {

            cleanupAtual();

        }

    };

}


// ============================================================================
// EXPORTS
// ============================================================================

export {
    routes,
    DEFAULT_ROUTE
};
