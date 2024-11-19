sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/library",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    'sap/ui/model/Filter'
], function (Controller, UIComponent, mobileLibrary, JSONModel, MessageBox, Filter) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;
    return Controller.extend("materialcreation.controller.loginPage", {     

        onInit: function () {

        },
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

    })()
});

