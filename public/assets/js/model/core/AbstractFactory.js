//neogenz.utilities.defineNamespace(app, 'bean.factory');

(function init() {
    'use strict';
    app.beans.factory = new AbstractBeanFactory();
    //app.beans.AbstractBean = AbstractBean;

    function AbstractBeanFactory() {
    }

    AbstractBeanFactory.prototype.getBean = function (beanName, json) {
        if (beanName === 'Movement') {
            return new app.beans.Movement(json);
        } else if (beanName === 'ProvisionalPlan') {
            return new app.beans.ProvisionalPlan(json);
        } else if (beanName === 'User') {
            return new app.beans.User(json);
        }
    };
})
();