sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("materialcreation.controller.MaterialDetails", {
            onInit: function () {
                this.getOwnerComponent().getRouter()
                    .getRoute("MaterialDetails")
                    .attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function () {
                this._oViewModel();
                this._dataModel = this.getOwnerComponent().getModel("CreationDataModel");

            },
           
        });

    });