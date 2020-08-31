function initModel() {
	var sUrl = "/OData_Org/V2/(S(fzk0cj25vbpedfgpyoup5jtg))/OData/OData.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}