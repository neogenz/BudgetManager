'user strict';

__.namespace(app, 'httpRequestOptions');

app.httpRequestOptions = {
    urlHeader: app.config.webApi.protocol + '://' + app.config.webApi.domain + ':' + app.config.webApi.port,
    buildPostRequestOptToCallThisUrl: _buildPostRequestOptToCallThisUrl,
    buildGetRequestOptToCallThisUrl: _buildGetRequestOptToCallThisUrl,
    buildPutRequestOptToCallThisUrl: _buildPutRequestOptToCallThisUrl,
    buildDeleteRequestOptToCallThisUrl: _buildDeleteRequestOptToCallThisUrl
};

//Private functions
function _buildPostRequestOptToCallThisUrl(url, bodyRequest) {
    return req = {
        method: 'POST',
        url: url,
        hearders: {
            'Content-Type': 'application/json'
        },
        data: bodyRequest
    };
}

function _buildGetRequestOptToCallThisUrl(url) {
    return req = {
        method: 'GET',
        url: url
    };
}

function _buildPutRequestOptToCallThisUrl(url, bodyRequest) {
    return req = {
        method: 'PUT',
        url: url,
        hearders: {
            'Content-Type': 'application/json'
        },
        data: bodyRequest
    };
}

function _buildDeleteRequestOptToCallThisUrl(url) {
    return req = {
        method: 'DELETE',
        url: url
    };
}