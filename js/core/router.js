// ============================================================================
// ENGINE FRAMEWORK
// CORE ROUTER
// Arquivo: js/core/router.js
// ============================================================================

const DEFAULT_ROUTE = "veiculos";

const routes = {
    "/": "veiculos",
    "/veiculos": "veiculos",
    "/empregados": "empregados"
};


// ============================================================================
// OBTER PATH
// ============================================================================

export function getPath() {

    const hash =
        window.location.hash
            .replace(/^#/, "")
            .trim();

    return hash || "/";

}


// ============================================================================
// OBTER ROTA
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
// NAVEGAR
// ============================================================================

export function navigate(route) {

    const path =
        route.startsWith("/")
            ? route
            : `/${route}`;

    window.location.hash =
        path;

}


// ============================================================================
// ROUTER
// ============================================================================

export function startRouter(
    onRoute
) {

    if (
        typeof onRoute !==
        "function"
    ) {

        throw new TypeError(
            "ENGINE ROUTER: onRoute deve ser uma função."
        );

    }


    const run =
        () => {

            const route =
                getRoute();

            console.log(
                "ENGINE ROUTER →",
                route
            );

            onRoute(
                route
            );

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
