const StaticServer = require('static-server');
const server = new StaticServer({
	rootPath: './dist',
	port: 8080,
	name: 'my-http-server',
	host: 'localhost',
	cors: '*',
	followSymlink: true,
	templates: {
		index: 'index.html'
	}
});

server.start(function () {
	console.log('Server listening to', server.port);
});