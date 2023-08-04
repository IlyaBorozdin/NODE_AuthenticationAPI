const gracefulShutdown = require('graceful-shutdown-express');

const exit = (exitCode) => {
    console.log('Server is closed');
    process.exit(exitCode);
};

function shutdown(server) {
    
    process.on('uncaughtException', (err) => {
        console.error('Uncaught exception:', err);
        gracefulShutdown(server, () => {
            exit(1);
        });
    });
    
    process.on('unhandledRejection', (reason) => {
        console.error('Unhandled rejection, reason:', reason);
        gracefulShutdown(server, () => {
            exit(1);
        });
    });
    
    process.on('SIGINT', () => {
        console.log('Server is shutting down');
        gracefulShutdown(server, {
            timeout: 30000,
            forceExit: true,
            onShutdown: (err) => {
                if (err) {
                    console.error('Error during server shutdown:', err);
                    exit(1);
                } else {
                    exit(0);
                }
            },
        });
    });
}

module.exports = shutdown;