appBudgetManager.factory('authenticateWebApi', function ($http, $localStorage, $q) {
    return {
        signup: _signup,
        signin: _signin,
        logout: _logout,
        getUserFromToken: _getUserFromToken,
        getUserFromLocalStorageToken: _getUserFromLocalStorageToken,
        checkIfThisPasswordIsGood: _checkIfThisPasswordIsGood,
        changePassword: _changePassword
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

    function _getUserFromLocalStorageToken() {
        var token = $localStorage.token;
        var user = {};
        if (!myLib.technical.isUndefinedOrNull(token)) {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        } else {
            myLib.technical.logInfo('authenticate.factory.js', '_getUserFromLocalStorageToken()', 'The token in local storage is null or undefined.');
        }
        return user;
    }

    function _getUserFromToken(token) {
        var token = token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    //getUserFromToken();

    //Web API
    /**
     * @name _signup
     * Signup the user in database.
     * @param {User} beanUser User to signup
     * @returns {d.promise|*|promise}
     */
    function _signup(beanUser) {
        var def = $q.defer();
        var requestOptions = myLib.technical.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/signup', beanUser);
        var promise = $http(requestOptions);
        promise.success(function (data) {
            $localStorage.token = data.token;
            def.resolve(data);
        }).error(function (data) {
            def.reject(data.message);
        });
        return def.promise;
    }

    function _signin(formData) {
        var def = $q.defer();
        var requestOptions = myLib.technical.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/signin', formData);
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

    function _logout() {
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

    function _checkIfThisPasswordIsGood(password) {
        var def = null,
            requestOptions = null,
            promise = null;
        def = $q.defer();
        requestOptions = myLib.technical.buildGetRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/checkPassword/' + password);
        promise = $http(requestOptions);
        promise.then(function () {
            def.resolve();
        }, function (err) {
            def.reject(err.data.message);
        });

        return def.promise;
    }

    function _changePassword(formData) {
        var def = null,
            requestOptions = null,
            promise = null;
        def = $q.defer();
        def = $q.defer();
        requestOptions = myLib.technical.buildPostRequestOptToCallThisUrl(app.budgetManager.endpoints['nodeEndpoint'] + '/changePassword', formData);
        promise = $http(requestOptions);
        promise.success(function (data) {
            $localStorage.token = data.token;
            def.resolve(data);
        }).error(function (err) {
            debugger;
            def.reject(err.message);
        });
        return def.promise;
    }
});