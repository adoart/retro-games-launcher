const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET"],
            allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
            preflightContinue: true
        },
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}