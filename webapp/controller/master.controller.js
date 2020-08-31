sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("demo.ZMasterDetaikPro.controller.master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetaikPro.view.master
		 */
		onInit: function () {

			var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(fzk0cj25vbpedfgpyoup5jtg))/OData/OData.svc/", true);
			this.getView().setModel(oModel);

			//	var oBinding =	this.getView().byId("productList").getBinding("items");

		/*	var oList = this.getView().byId("productList");
			var items = oList.getSelectedItems();
			if (items === "") {
				oList.attachUpdateFinished(function (oEvent) {

					oEvent.getSource().getItems()[0].firePress();
				});
			}else {
					var oProID = sap.ui.getCore().byId("__xmlview1--txtProID-inner");
			}*/

	var oList = this.getView().byId("productList");
			oList.attachUpdateFinished(function (oEvent) {

				oEvent.getSource().getItems()[0].firePress();
			});
		},

		onSearch: function (oEvent) {
			var sQuery = oEvent.getParameter("query");

			var oFilter = new sap.ui.model.Filter({
				// two filters
				filters: [
					new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery), // filter for value 1
					new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, sQuery) // filter for value 2
				]
			});
			var oBinding = this.byId("productList").getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},

		/*onSortProductByPrice: function () {

			var oListBinding = this.byId("productList").getBinding("items"); // gridlist aggreagation binding items
			// apply sorter to gridlist items
			oListBinding.sort(new sap.ui.model.Sorter("Price", "desc"));

		},*/

		onSortProductByPrice: function (oEvent) {

			/*	var oList = this.getView().byId("list123");
				var oBinding = oList.getBinding("items");*/
			var oListBinding = this.byId("productList").getBinding("items");
			var SORTKEY = "ID";

			var flag = this.flagval;
			var DESCENDING = "";
			if (this.flagval === 0 || this.flagval === undefined) {
				DESCENDING = true;
				this.flagval = 1;
			} else if (flag === 1) {
				DESCENDING = false;
				this.flagval = 0;
			}

			var GROUP = false;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUP));
			oListBinding.sort(aSorter);

		},

		onGrouping: function (oEvent) {
			var oListBinding = this.byId("productList").getBinding("items");
			var SORTKEY = "Rating";

			var flag = this.flagval;
			var GROUPING = "";
			if (this.flagval === 0 || this.flagval === undefined) {
				GROUPING = true;
				this.flagval = 1;
			} else if (flag === 1) {
				GROUPING = false;
				this.flagval = 0;
			}

			var DESCENDING = false;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUPING));
			oListBinding.sort(aSorter);

		},

		onRefresh: function () {
			var oListBinding = this.byId("productList").getBinding("items");

			// remove all sort on gridlist
			oListBinding.sort();
			//	oListBinding.sort(new sap.ui.model.Sorter("Price", "desc"));

			// refresh model
			this.getView().getModel().refresh();
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onListItemPress: function (oEvent) {
			var obj = oEvent.getSource().getBindingContext().getObject();
			this.getRouter().navTo("detail", {
				ID: obj.ID
			});
		},

		onAdd: function () {
			this.getRouter().navTo("DetailDetail", {}, true);
		},

		onSwitchGridListMode: function (oEvent) {
			var oButton = oEvent.getSource(),
				sMode = this.byId("productList").getMode(),
				sNewMode = "None",
				sType = "Transparent";

			if (sMode === "None") {
				sNewMode = "Delete";
				sType = "Emphasized";
			}

			oButton.setType(sType);
			this.byId("productList").setMode(sNewMode);
		},

		/*	onDeleteProduct: function(oEvent) {
				var oModel = new sap.ui.model.odata.ODataModel("/OData_Org/V2/(S(r4cabdnhuwyhfkiwml100kg0))/OData/OData.svc/", true);
				this.getView().setModel(oModel);
				var oProduct = this.getView().byId("productList");

				var deleteRecord = oEvent.getSource().getBindingContext().getObject();
				oModel.remove("/Products(" + deleteRecord.ID + ")", {
					method: "DELETE",
					success: function(odata) {
						oProduct.setModel(oModel);
						MessageBox.success("Record Delete Successfully");
					},
					error: function(e) {
						MessageBox.error("error");
					}
				});
			}, */

		/*	onDeleteProduct: function (oEvent) {
				var oProduct = oEvent.getParameter("productList"), // get product marked for delete operation
					oModel = this.getView().getModel(),
					sPath;

				// get the binding path for the item
					sPath = this.byId("productList").getElementBinding().getPath();
				//	sPath = oProduct.getBindingContext().getPath();
			//	var deleteRecord = oEvent.getSource().getBindingContext().getObject();
				// use remove() method to delete an entry
				oModel.remove(sPath, {
					success: function (res) {
						MessageToast.show("Product deleted");
					},
					error: function (err) {
						MessageToast.show("Failed to delete product");
					}
				});
			}, */

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetaikPro.view.master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetaikPro.view.master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetaikPro.view.master
		 */
		//	onExit: function() {
		//
		//	}

	});

});