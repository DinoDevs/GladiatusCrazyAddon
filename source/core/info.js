/*
 * Game Info
 * Gladiatus Crazy Add On
 */

var info = {

	// Addon info
	addon : {},

	// Data
	data : {},

	// Resolve page
	page : {

		// Resolve Url
		resolveUrl : function() {
			// The full url
			this.url = info.data.document.location.href;

			// Resolve Url
			url_resolve = this.url.match(/https?:\/\/s(\d+)-(\w+)\.gladiatus\.gameforge\.com\/game\/(index|main).php\?(.*)/i);
			if(url_resolve){
				// Server
				this.server = url_resolve[1];
				// Country
				this.country = url_resolve[2];
				// Domain
				this.domain = "s" + this.server + "-" + this.country + ".gladiatus.gameforge.com";
				// Queries
				this.queries = this.resolveQueries(url_resolve[4]);

				// Ok
				return true;
			}

			// Failed
			return false;
		},

		// Resolve Queries
		resolveQueries : function(queries) {
			// Variable to save queries
			var queries_obj = {};
			// Split queries
			queries = queries.split('&');
			// For each query
			for (var i = queries.length - 1; i >= 0; i--) {
				// Split key - value
				queries[i] = queries[i].split('=');
				// Save key - value
				queries_obj[queries[i][0]] = queries[i][1];
			};
			// Return results
			return queries_obj;
		},

		// Resolve Player Id
		resolvePlayerId : function(queries) {
			// Resolve Player Id from cookies
			var cookiePlayerId = info.data.document.cookie.match(new RegExp("Gladiatus_" + this.country + "_" + this.server + "=(\\d+)","i"));
			// If cookie exist
			if(cookiePlayerId && cookiePlayerId[1]){
				this.playerId = cookiePlayerId[1];
			}
			// Else
			else{
				this.playerId = 0;
			}
		}

	}

}
