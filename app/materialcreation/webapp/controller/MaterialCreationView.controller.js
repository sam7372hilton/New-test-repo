sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("materialcreation.controller.MaterialCreationView", {
            onInit: function () {
                this.getOwnerComponent().getRouter()
                    .getRoute("MaterialCreationView")
                    .attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function () {
                this._oViewModel();
                this._dataModel = this.getOwnerComponent().getModel("CreationDataModel");

            },
            _oViewModel: function () {
                var viewModel = new JSONModel({
                    busy: false,
                });
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
                    },
                    error: function (oerror) {
                        alert("Login Invalid")
                    },
                });
            },
            onSave: function () {
                console.log("ON SAVE")
                var oModel = this.getView().getModel();
                var oPayload = {
                    MaterialNumber: "13",
                    Description: "Test Material",
                    IndustrySector: "001000",
                    MaterialType: "001001",
                    Plant: "PL01",
                    StorageLocation: "ST01",
                    UOM: "EA",
                    MaterialGroup: "MOHE"
                };
                oModel.create("/createMaterial", oPayload, {
                    success: function (oResponse) {
                        console.log("oResponse", oResponse);
                        MessageToast.show("Record Created successfully");
                        this.clearData();
                    }.bind(this),

                    error: function (oError) {
                        console.log("oError", oError);
                        MessageToast.show("Record not Created");
                    }.bind(this),
                });
            },
            onMaterialListDetails: function () {

            }
        });

    });