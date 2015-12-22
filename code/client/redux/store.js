import create_store from '../../react-isomorphic-render/redux/store'

import create_routes from '../routes'

export default function(data, { development, development_tools, server, http_request })
{
	const options =
	{
		development       : development,
		development_tools : development_tools,

		get_reducers() { return require('../model') },

		data,
		create_routes
	}

	if (server)
	{
		options.server = true

		// authentication cookie will be copied from this Http request
		options.http_request = http_request

		// Http host and port for data fetching when `preload`ing pages on the server
		options.host = configuration.web_server.http.host
		options.port = configuration.web_server.http.port
	}

	const { store, reload } = create_store(options)

	// client side hot module reload for Redux reducers
	// http://webpack.github.io/docs/hot-module-replacement.html#accept
	if (development && module.hot)
	{
		// this path must be equal to the path in `get_reducers` function above
		module.hot.accept('../model', reload)
	}

	return store
}