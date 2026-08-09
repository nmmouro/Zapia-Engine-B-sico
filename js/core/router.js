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
// Cada página informa:
//   - view
//   - init
//
// ============================================================================

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const DEFAULT_ROUTE = "dashboard";

// ============================================================================
// ROTAS
// ============================================================================

const ENGINE_ROOT = "..";

const routes = {

    dashboard: {
        path: "/",
        view: `${ENGINE_ROOT}/pages/dashboard/dashboard.html`,
        init: `${ENGINE_ROOT}/pages/dashboard/dashboard.js`,
        initFunction: "initDashboard"
    },

    lancamentos: {
        path: "/lancamentos",
        view: `${ENGINE_ROOT}/pages/lancamentos/lancamentos.html`,
        init: `${ENGINE_ROOT}/pages/lancamentos/lancamentos.js`,
        initFunction: "initLancamentos"
    },

    veiculos: {
        path: "/veiculos",
        view: `${ENGINE_ROOT}/pages/veiculos/veiculos.html`,
        init: `${ENGINE_ROOT}/pages/veiculos/veiculos.js`,
        initFunction: "initVeiculos"
    },

    empregados: {
        path: "/empregados",
        view: `${ENGINE_ROOT}/pages/empregados/empregados.html`,
        init: `${ENGINE_ROOT}/pages/empregados/empregados.js`,
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
// OBTER CONFIGURAÇÃO DA ROTA
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
        route.startsWith("/")
            ? route.substring(1)
            : route;


    const config =
        routes[nome];


    if (!config) {

        console.warn(
            `ENGINE ROUTER: rota "${route}" não encontrada.`
        );

        window.location.hash =
            `#/${DEFAULT_ROUTE}`;

        return;

    }

    window.location.hash =
        config.path;

}

// ============================================================================
// CARREGAR VIEW
// ============================================================================

async function carregarView(
    config,
    container
) {

    console.log(
        "ENGINE ROUTER → View:",
        config.view
    );


    const response =
        await fetch(
            config.view
        );


    if (!response.ok) {

        throw new Error(
            `ENGINE ROUTER: não foi possível carregar "${config.view}".`
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
    config
) {

    if (!config.init) {

        return null;

    }

    console.log(
        "ENGINE ROUTER → Module:",
        config.init
    );

    const modulo =
        await import(
            config.init
        );

    if (
        !config.initFunction
    ) {

        return modulo;

    }

    const init =
        modulo[
            config.initFunction
        ];

    if (
        typeof init !==
        "function"
    ) {

        throw new Error(
            `ENGINE ROUTER: função "${config.initFunction}" não encontrada em "${config.init}".`
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

    // ------------------------------------------------------------------------
    // EXECUTAR ROTA
    // ------------------------------------------------------------------------

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

                const routeConfig =
                    getRouteConfig(
                        route
                    );

                if (!routeConfig) {

                    throw new Error(
                        `ENGINE ROUTER: configuração da rota "${route}" não encontrada.`
                    );

                }

                console.log(
                    "ENGINE ROUTER →",
                    route
                );

                // ------------------------------------------------------------
                // NÃO RECARREGAR A MESMA ROTA
                // ------------------------------------------------------------

                if (
                    rotaAtual === route
                ) {

                    return;

                }

                // ------------------------------------------------------------
                // CLEANUP DA ROTA ANTERIOR
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
                    route;

                // ------------------------------------------------------------
                // CARREGAR VIEW
                // ------------------------------------------------------------

                await carregarView(
                    routeConfig,
                    container
                );

                // ------------------------------------------------------------
                // CARREGAR INIT
                // ------------------------------------------------------------

                const init =
                    await carregarModulo(
                        routeConfig
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
                    // OPCIONAL:
                    // O módulo pode retornar uma função cleanup()
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

    // ------------------------------------------------------------------------
    // HASHCHANGE
    // ------------------------------------------------------------------------

    window.addEventListener(
        "hashchange",
        run
    );

    // ------------------------------------------------------------------------
    // BOOT
    // ------------------------------------------------------------------------

    run();

    // ------------------------------------------------------------------------
    // DESTROY ROUTER
    // ------------------------------------------------------------------------

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
// EXPORTAR ROTAS
// ============================================================================

export {
    routes,
    DEFAULT_ROUTE
};
