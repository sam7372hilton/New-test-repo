sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("materialcreation.controller.loginPage", {
            onInit: function () {
                this.getOwnerComponent().getRouter()
                    .getRoute("RouteloginPage")
                    .attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function () {
                this._oDataModel = this.getOwnerComponent().getModel();
                this._pageModel = this.getOwnerComponent().getModel("dataModel");
                this._oViewModel();
            },
            _oViewModel: function () {
                var viewModel = new JSONModel({
                    busy: false,
                });
            },
            onLoginPress: function (oEvent) {
                this._authUser()
            },
            _authUser: function () {
                let userName = this._pageModel.getProperty("/UserName")
                let password = this._pageModel.getProperty("/Password")

                var filters = [];
                var oModel = this.getView().getModel();
                filters.push(new sap.ui.model.Filter("UserName", sap.ui.model.FilterOperator.EQ,
                    userName));
                filters.push(new sap.ui.model.Filter("Password", sap.ui.model.FilterOperator.EQ,
                    password));

                let encodedUserName = encodeURIComponent(userName);
                let encodePassword = encodeURIComponent(password);

                let sUrl = "/v2/odata/v4/MaterialSrv/AuthUser?$filter=UserName eq '" + encodedUserName + "' and  Password eq '" + encodePassword + "' "
                $.ajax({
                    url: sUrl,
                    method: "GET",
                    success: function (oData) {
                        alert("Login Successfull")
                        this.getOwnerComponent().getRouter().navTo("MaterialCreationView");
                    }.bind(this),
                    error: function (oerror) {
                        alert("Login Invalid")
                    },
                });
            }
        });
    });