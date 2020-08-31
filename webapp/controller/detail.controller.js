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

	return Controller.extend("demo.ZMasterDetaikPro.controller.detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetaikPro.view.detail
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detail").attachPatternMatched(this._onDetailMatched, this);
			

			var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(fzk0cj25vbpedfgpyoup5jtg))/OData/OData.svc/", true);
			this.getView().setModel(oModel);
		},

		_onDetailMatched: function (oEvent) {

			var oParameters = oEvent.getParameters();
			var pId = this.getView().byId("txtid");
			var pName = this.getView().byId("Txtname");
			var pDesc = this.getView().byId("txtdesc");
			var pRelDate = this.getView().byId("txtdate");
			var pRating = this.getView().byId("txtrate");
			var pPrice = this.getView().byId("txtprice");

			var pNameN = this.getView().byId("txtNAmeN");
			var pDescN = this.getView().byId("txtdescp");

			var pRatingN = this.getView().byId("txtRating");
			var pPriceN = this.getView().byId("txtPrice");
			var that = this;
			var oModel = this.getView().getModel();

			if (oParameters.arguments.ID !== "" || oParameters.arguments.ID !== null) {
				this.ID = oParameters.arguments.ID;

				oModel.read("/Products(" + this.ID + ")", {
					success: function (odata, oResponse) {
						pId.setText(oResponse.data.ID);
						pName.setText(oResponse.data.Name);
						pDesc.setText(oResponse.data.Description);
						pRelDate.setText(oResponse.data.ReleaseDate);
						pRating.setText(oResponse.data.Rating);
						pPrice.setText(oResponse.data.Price);

						pNameN.setText(oResponse.data.Name);
						pDescN.setText(oResponse.data.Description);

						pRatingN.setText(oResponse.data.Rating);
						pPriceN.setText(oResponse.data.Price);
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
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnEdit: function (oEvent) {

			//	var obj = oEvent.getSource().getBindingContext().getObject();
			var ProId = this.getView().byId("txtid").getText();
			//Get the Model. 
			this.getRouter().navTo("detaildetail", {
				ID: ProId
			});
		},

		onDelete: function (oEvent) {
			//	delete operation
			var oModel = this.getView().getModel();
			var that = this;

			var ProId = this.getView().byId("txtid").getText();

			var oList = sap.ui.getCore().byId("__xmlview0--productList");
      
			//	var oModelList = oList.getModel().getData();

			oModel.remove("/Products(" + ProId + ")", {

				method: "DELETE",
				success: function (res) {
					MessageBox.success("Record Delete Successfully", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Success",
						onClose: function (oAction) {
							that.OnReset();
							oList.setModel(oModel);
					
						}
					});

				},

				error: function (err) {
					MessageBox.error("error");
				}
			});

		},

		OnReset: function () {
			var pId = this.getView().byId("txtid");
			var pName = this.getView().byId("Txtname");
			var pProDescp = this.getView().byId("txtdesc");
			var pRelDate = this.getView().byId("txtdate");
			var pRating = this.getView().byId("txtrate");
			var pPrice = this.getView().byId("txtprice");

			var pNameN = this.getView().byId("txtNAmeN");
			var pDescN = this.getView().byId("txtdescp");

			var pRatingN = this.getView().byId("txtRating");
			var pPriceN = this.getView().byId("txtPrice");

			pId.setText("");
			pName.setText("");
			pProDescp.setText("");
			pRelDate.setText("");
			pRating.setText("");
			pPrice.setText("");
			pNameN.setText("");
			pDescN.setText("");

			pRatingN.setText("");
			pPriceN.setText("");

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetaikPro.view.detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetaikPro.view.detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetaikPro.view.detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});