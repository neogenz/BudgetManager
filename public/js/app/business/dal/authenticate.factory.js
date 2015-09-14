appBudgetManager.factory('authenticateWebApi', function ($http, $localStorage, $q) {
    return {
        signup: signup,
        signin: signin,
        logout: logout
    };

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    getUserFromToken();

    //Web API
    function signup(formData) {
        var def = $q.defer();
        var requestOptions = app.httpRequestOptions.buildPostRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/signup', formData);
        var promise = $http(requestOptions);
        promise.success(function (data) {
            $localStorage.token = data.token;
            def.resolve(data);
        }).error(function (data) {
            def.reject(data.message);
        });
        return def.promise;
    }

    function signin(formData) {
        var def = $q.defer();
        var requestOptions = app.httpRequestOptions.buildPostRequestOptToCallThisUrl(app.httpRequestOptions.urlHeader + '/signin', formData);
        var promise = $http(requestOptions);
        promise.success(function (data) {
            $localStorage.token = data.token;
            def.resolve(data);
        }).error(function (data) {
            var message = 'Adresse mail ou mot de passe invalide';
            def.reject(message);
        });
        return def.promise;
    }

    function logout() {
        var def = $q.defer();
        try {
            delete $localStorage.token;
            def.resolve();
        }
        catch (e) {
            def.reject('An error has occured on logout.');
        }
        return def.promise;
    }
});