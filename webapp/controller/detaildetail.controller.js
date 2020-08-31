sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller, MessageBox, History, JSONModel, Fragment, Filter, MessageToast) {
	"use strict";

	return Controller.extend("demo.ZMasterDetaikPro.controller.detaildetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetaikPro.view.detaildetail
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detaildetail").attachPatternMatched(this._onDetailMatched, this);

			var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(fzk0cj25vbpedfgpyoup5jtg))/OData/OData.svc/", true);
			this.getView().setModel(oModel);
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnNavBack: function () {
			this.getRouter().navTo("FirstPage", {}, true);
		},

		_onDetailMatched: function (oEvent) {

			var oParameters = oEvent.getParameters();
			var pId = this.getView().byId("txtProID");
			var pName = this.getView().byId("txtpronm");
			var pDesc = this.getView().byId("txtProDesc");
			var pRelDate = this.getView().byId("txtRdate");
			var pRating = this.getView().byId("txtRating");
			var pPrice = this.getView().byId("txtPrice");
			var btnSave = this.getView().byId("btnSave");
			var btnUpdate = this.getView().byId("btnUpdate");

			var that = this;
			var oModel = this.getView().getModel();

			if (oParameters.arguments.ID !== "" || oParameters.arguments.ID !== null) {
				this.ID = oParameters.arguments.ID;

				pId.setEnabled(false);
				btnSave.setVisible(false);
				btnUpdate.setVisible(true);

				oModel.read("/Products(" + this.ID + ")", {
					success: function (odata, oResponse) {
						pId.setValue(oResponse.data.ID);
						pName.setValue(oResponse.data.Name);
						pDesc.setValue(oResponse.data.Description);
						pRelDate.setValue(oResponse.data.ReleaseDate);
						pRating.setValue(oResponse.data.Rating);
						pPrice.setValue(oResponse.data.Price);

						//	pRelDate.setValue(oResponse.data.Pcity);
					},
					error: function (e) {
						MessageBox.error("error");
					}
				});
			} else {
				MessageBox.error("Please select correct Personal Info Id", {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: "Error",
					onClose: function (oAction) {
						that._onNavBack();
					}
				});
			}
		},

		/*OnSave: function () {
			var that = this;
			//	var ProdId = this.getView().byId("txtProID");
			that._onSaveData();
			if (ProdId.getValue() === "0") {
				that._onSaveData();

			} else {
				that._onUpdateData();
			}
		},
*/
		OnSave: function () {
			var oModel = this.getView().getModel();

			var pId = this.getView().byId("txtProID");
			var pName = this.getView().byId("txtpronm");
			var pProDescp = this.getView().byId("txtProDesc");
		
			var pRelDate = this.getView().byId("txtRdate");
			var pRating = this.getView().byId("txtRating");
			var pPrice = this.getView().byId("txtPrice");

			if (pId.getValue() === 0 || pId.getValue() === "" || pName.getValue() === "" || pProDescp.getValue() === "" || pRelDate.getValue() ===
				"" || pRating.getValue() === "0" || pPrice.getValue() === "0") {
				MessageToast.show("Please Enter all required of data");
				return false;
			} else {

				var oItems = {};
				var that = this;
				oItems.ID = pId.getValue();
				oItems.Name = pName.getValue();
				oItems.Description = pProDescp.getValue();
				oItems.ReleaseDate = pRelDate.getValue();
				oItems.Rating = pRating.getValue();
				oItems.Price = pPrice.getValue();

				var oList = sap.ui.getCore().byId("__xmlview0--productList");

				oModel.create("/Products", oItems, {
					success: function (oData, oResponse) {
						MessageBox.success("Record Created Successfully", {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Success",

							onClose: function (oAction) {

								that.OnReset();
								oList.setModel(oModel);
								//	oModel.refresh(true);
								that.OnNavBack();

							}
						});
					},
					error: function (err) {
						MessageBox.error("Error : " + err);
					}
				});
			}
		},

		OnUpdate: function () {
			var oModel = this.getView().getModel();

			var pId = this.getView().byId("txtProID");
			var pName = this.getView().byId("txtpronm");
			var pProDescp = this.getView().byId("txtProDesc");
			var pRelDate = this.getView().byId("txtRdate");
			var pRating = this.getView().byId("txtRating");
			var pPrice = this.getView().byId("txtPrice");

			if (pId.getValue() === 0 || pId.getValue() === "" || pName.getValue() === "" || pProDescp.getValue() === "" || pRelDate.getValue() ===
				"" || pRating.getValue() === "0" || pPrice.getValue() === "0") {
				MessageToast.show("Please Enter all required of data");
				return false;
			} else {

				var oItems = {};
				var that = this;
				oItems.ID = pId.getValue();
				oItems.Name = pName.getValue();
				oItems.Description = pProDescp.getValue();
				oItems.ReleaseDate = new Date(pRelDate.getValue());
				oItems.Rating = pRating.getValue();
				oItems.Price = pPrice.getValue();

				var oList = sap.ui.getCore().byId("__xmlview0--productList"); //to get list id from master view

				oModel.update("/Products(" + pId.getValue() + ")", oItems, {
					success: function (oData, oResponse) {
						MessageBox.success("Record Updated Successfully", {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Success",

							onClose: function (oAction) {

							//	that.OnReset();
							//	that.OnNavBack();
								oList.setModel(oModel);
								that.onPressok(pId);

							}
						});
					},

					error: function (oError) {
						MessageBox.error("Error : " + oError);
					}
				});
			}
		},

		onPressok: function (pId) {
			//	var oModel = this.getView().getModel();
			this.getRouter().navTo("detailD", {
				ID: pId
			});
		},

		OnReset: function () {
			var pId = this.getView().byId("txtProID");
			var pName = this.getView().byId("txtpronm");
			var pProDescp = this.getView().byId("txtProDesc");
			var pRelDate = this.getView().byId("txtRdate");
			var pRating = this.getView().byId("txtRating");
			var pPrice = this.getView().byId("txtPrice");

			pId.setValue("");
			pName.setValue("");
			pProDescp.setValue("");
			pRelDate.setValue("");
			pRating.setValue("");
			pPrice.setValue("");

		},
		onRefresh: function () {
			var oListBinding = this.byId("productList").getBinding("items");

			// remove all sort on gridlist
			oListBinding.sort();

			// refresh model
			this.getView().getModel().refresh();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetaikPro.view.detaildetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetaikPro.view.detaildetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetaikPro.view.detaildetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});