module.exports = (function EchoManager(){

	var logs = [];
	var logsLength = 128;

	function logRequest(req, res, next){

		var dumpedRequest = dumpRequest(req);
		logs.push(dumpedRequest);
		if(logs.length > logsLength){
			logs = logs.splice(0, logs.length - logsLength);
		}

		next();
	}

	function dumpRequest(req){
		return {
			timestamp: Date.now(),
			method: req.method,
			url: req.originalUrl,
			query: JSON.stringify(req.query),
			params: JSON.stringify(req.params),
			cookies: JSON.stringify(req.cookies),
			headers: JSON.stringify(req.headers),
			body: JSON.stringify(req.body)
		};
	}

	function getLoggedRequests(){
		return logs.slice();
	}

	return {
		logRequest: logRequest,
		getLoggedRequests: getLoggedRequests
	};

})();
