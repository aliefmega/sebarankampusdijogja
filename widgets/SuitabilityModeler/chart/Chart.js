// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/SuitabilityModeler/chart/Chart.html":'\x3cdiv class\x3d"jimu-widget-suitability-modeler-chart"\x3e\r\n  \x3cdiv class\x3d"header" data-dojo-attach-point\x3d"headerNode"\x3e\r\n    \x3ch4 data-dojo-attach-point\x3d"promptNode"\x3e\x3c/h4\x3e\r\n    \x3cdiv class\x3d"tools-section" data-dojo-attach-point\x3d"toolsSection"\x3e\r\n      \x3cspan class\x3d"working" data-dojo-attach-point\x3d"workingNode"\x3e\x3c/span\x3e\r\n      \x3ca class\x3d"icon icon-polygon"\r\n        href\x3d"javascript:void(0)"\r\n        data-tool\x3d"polygon"\r\n        data-dojo-attach-point\x3d"polygonTool"\r\n        data-dojo-attach-event\x3d"onclick: _activateDrawPolygon"\r\n        \x3e\x3c/a\x3e\r\n      \x3ca class\x3d"icon icon-freehand-polygon"\r\n        href\x3d"javascript:void(0)"\r\n        data-tool\x3d"freehandPolygon"\r\n        data-dojo-attach-point\x3d"freehandPolygonTool"\r\n        data-dojo-attach-event\x3d"onclick: _activateDrawFreehandPolygon"\r\n        \x3e\x3c/a\x3e\r\n      \x3ca class\x3d"icon icon-select-features"\r\n        href\x3d"javascript:void(0)"\r\n        data-tool\x3d"select"\r\n        data-dojo-attach-point\x3d"selectTool"\r\n        data-dojo-attach-event\x3d"onclick: _activateSelect"\r\n        \x3e\x3c/a\x3e\r\n      \x3ca class\x3d"icon icon-pan"\r\n        href\x3d"javascript:void(0)"\r\n        data-tool\x3d"pan"\r\n        data-dojo-attach-point\x3d"panTool"\r\n        data-dojo-attach-event\x3d"onclick: _activatePan"\r\n        \x3e\x3c/a\x3e\r\n      \x3ca class\x3d"clear-button"\r\n        href\x3d"javascript:void(0)"\r\n        data-dojo-attach-point\x3d"clearButton"\r\n        data-dojo-attach-event\x3d"onclick: _clearGraphics"\r\n        \x3e\x3c/a\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"select-layer-section" style\x3d"clear:both;"\r\n      data-dojo-attach-point\x3d"selectContainer"\x3e\r\n      \x3cselect id\x3d"${id}_subjectLayerSelect" class\x3d"select-layer"\r\n        data-dojo-type\x3d"dijit/form/Select"\r\n        data-dojo-attach-point\x3d"subjectLayerSelect"\x3e\r\n      \x3c/select\x3e\r\n      \x3cdiv class\x3d"info" data-dojo-attach-point\x3d"noSubjectLayersNode"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"chart-section"\x3e\r\n    \x3cp class\x3d"info" data-dojo-attach-point\x3d"noModelLayerNode"\x3e\x3c/p\x3e\r\n    \x3cdiv class\x3d"chart-div" data-dojo-attach-point\x3d"echartDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"tableNode"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-class dojo/on dojo/query dojo/string dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./Chart.html dojo/i18n!../nls/strings ./chart-util libs/echarts/echarts esri/Color esri/graphic esri/layers/FeatureLayer esri/layers/GraphicsLayer esri/symbols/SimpleLineSymbol esri/symbols/SimpleFillSymbol esri/tasks/query esri/toolbars/draw dijit/form/RadioButton dijit/form/Select".split(" "),function(u,v,h,p,w,
x,n,y,z,A,B,c,k,C,f,D,E,q,r,t,F,m){return u([y,z,A],{baseClass:"jimu-widget-suitability-modeler-chart",i18n:c,templateString:B,map:null,wroWidget:null,_activeDfd:null,_activeMode:null,_activeTool:null,_draw:null,_echart:null,_graphicsLayer:null,_isActive:!1,_polygonSymbol:null,_polygonSelectionSymbol:null,_selGraphicsLayer:null,_seriesData:null,_subjectLayerId:null,postCreate:function(){this.inherited(arguments);this._seriesData={};this.promptNode.innerHTML=c.chart.prompt;this.workingNode.title=c.chart.working;
this.polygonTool.title=c.chart.polygonTool;this.freehandPolygonTool.title=c.chart.freehandPolygonTool;this.selectTool.title=c.chart.selectTool;this.panTool.title=c.chart.panTool;this.clearButton.innerHTML=c.chart.clearButton;this.clearButton.title=c.chart.clearButton;this.noModelLayerNode.innerHTML=c.chart.noModelLayer;this.noSubjectLayersNode.innerHTML=c.chart.noSubjectLayers},startup:function(){this._started||(this.inherited(arguments),this._init())},destroy:function(){try{this._graphicsLayer&&
(this._graphicsLayer.clear(),this.map&&this.map.removeLayer(this._graphicsLayer)),this._selGraphicsLayer&&(this._selGraphicsLayer.clear(),this.map&&this.map.removeLayer(this._selGraphicsLayer)),this._clearImageLayerHandles(),this._clearSubjectLayerHandles()}catch(a){console.warn("Error destroying SuitabilityChart"),console.error(a)}this.inherited(arguments)},activate:function(){this._isActive=!0;this._deactivateDraw();var a=this._getModelLayer();a?(this._watchImageLayer(a),this.headerNode.style.display=
"",this.noModelLayerNode.style.display="none",this._echart||this._initEChart(),this._populateSubjectLayers(),"draw"===this._activeMode?this._activateDraw():"select"===this._activeMode&&this._activateSelect(),this._reorderGraphicsLayer(),this._refreshChartIfRequired()):(this.headerNode.style.display="none",this.noModelLayerNode.style.display="",this._updateSeries())},deactivate:function(){this._isActive=!1;this._deactivateDraw()},_activateDraw:function(){this._activeTool||(this._activeTool="polygon");
"polygon"===this._activeTool?this._activateDrawPolygon():"freehandPolygon"===this._activeTool?this._activateDrawFreehandPolygon():"pan"===this._activeTool&&this._activatePan();this._activeMode="draw"},_activateDrawFreehandPolygon:function(){this._clearSelectionIf();this._toggleSelect(!1);this._draw.activate(m.FREEHAND_POLYGON);this._disableInfoWindow();this._highlightTool("freehandPolygon");this._activeTool="freehandPolygon";this._updateMode("draw")},_activateDrawPolygon:function(){this._clearSelectionIf();
this._toggleSelect(!1);this._draw.activate(m.POLYGON);this._disableInfoWindow();this._highlightTool("polygon");this._activeTool="polygon";this._updateMode("draw")},_activatePan:function(){this._deactivateDraw();this._highlightTool("pan");this._activeTool="pan"},_activateSelect:function(){this._toggleSelect(!0);this._draw.activate(m.EXTENT);this._disableInfoWindow();this._highlightTool("select");this._activeTool="select";this._updateMode("select")},_clearGraphics:function(){if("draw"===this._activeMode)this._graphicsLayer&&
(this._graphicsLayer.clear(),this._refreshChart());else if("select"===this._activeMode){var a=this._getSubjectLayer();a&&"function"===typeof a.clearSelection&&(a.clearSelection(),this._refreshChart())}this._toggleWorking(!1)},_clearHandles:function(a){a&&(v.isArray(a)?h.forEach(a,function(a){a.remove()}):a.remove())},_clearImageLayerHandles:function(){this._clearHandles(this._imageLayerHandles);this._imageLayerHandles=this._watchingImageLayer=null},_clearSelectionIf:function(){if("select"===this._activeMode)try{var a=
null,b=this._subjectLayerId;this.map&&"string"===typeof b&&0<b.length&&(a=this.map.getLayer(b));if(a&&"function"===typeof a.clearSelection&&"function"===typeof a.getSelectedFeatures){var d=a.getSelectedFeatures();d&&0<d.length&&a.clearSelection()}}catch(e){console.warn("SuitabilityModeler: Error clearing selection"),console.error(e)}},_clearSubjectLayerHandles:function(){this._clearHandles(this._subjectLayerHandles);this._subjectLayerHandles=this._watchingSubjectLayer=null},_deactivateDraw:function(){this._draw&&
this._draw.deactivate();this._enableInfoWindow()},_disableInfoWindow:function(){this.map&&this.map.setInfoWindowOnClick(!1)},_enableInfoWindow:function(){this.map&&this.map.setInfoWindowOnClick(!0)},_getGraphics:function(){if("draw"===this._activeMode){if(this._graphicsLayer)return this._graphicsLayer.graphics}else if("select"===this._activeMode){var a;if(a=this._getSubjectLayer()){if(this._subjectLayerId=a.id,"function"===typeof a.getSelectedFeatures&&(a=a.getSelectedFeatures())&&0<a.length)return a}else this._subjectLayerId=
null}return null},_getLayerName:function(a){return a.name},_getModelLayer:function(){if(this.wroWidget){var a=this.wroWidget.imageServiceLayer;if(a&&k.isWROModelLayer(a))return a}return null},_getSeriesItem:function(a){a.hex||(a.hex="transparent");return{name:a.value,value:a.count,pct:a.pct,label:a.label,itemValue:a.value,hex:a.hex,itemStyle:{normal:{color:a.hex},emphasis:{color:a.hex}}}},_getSubjectLayer:function(){if(this.map){var a=this.subjectLayerSelect.get("value");if("string"===typeof a&&0<
a.length)return this.map.getLayer(a)}return null},_highlightTool:function(a){x(".icon",this.toolsSection).forEach(function(b){b.getAttribute("data-tool")===a?p.add(b,"selected"):p.remove(b,"selected")})},_init:function(){var a=this;this._polygonSymbol=new t("solid",new r("solid",new f([0,0,0,.6]),2),new f([0,255,255,.4]));this._polygonSelectionSymbol=new t("solid",new r("solid",new f([0,0,0,.6]),2),new f([0,255,255,.4]));this._graphicsLayer=new q;this.map.addLayer(this._graphicsLayer);this._selGraphicsLayer=
new q;this.map.addLayer(this._selGraphicsLayer);this._draw=new m(this.map,{});this.own(this._draw.on("draw-complete",function(b){b&&b.geometry&&a._whenDrawComplete(b.geometry)}));this._toggleWorking(!1);this._activeMode="draw";this.own(w(this.subjectLayerSelect,"change",function(){a._clearSelectionIf();a._seriesData.select=null;a._watchSubjectLayer(a._getSubjectLayer());"select"===a._activeMode&&a._refreshChart()}));this.own(this.map.on("layer-add",function(b){b&&k.isPolygonLayer(b.layer)&&a._populateSubjectLayers()}));
this.own(this.map.on("layer-remove",function(b){if(b&&k.isPolygonLayer(b.layer)){var d=a._getSubjectLayer();a._populateSubjectLayers();d&&d!==b.layer||(a._seriesData.select=null,"select"===a._activeMode&&a._refreshChart())}}))},_initEChart:function(){var a;this._echart=C.init(this.echartDiv,"light");this._echart.setOption({title:{show:!1},tooltip:{trigger:"item",confine:!0,formatter:function(b){if(b&&b.data&&"string"===typeof b.data.label)return a=c.chart.tipPattern,a=n.substitute(a,{category:b.data.itemValue,
label:b.data.label,percent:b.data.pct});a=c.chart.tipPattern2;return a=n.substitute(a,{category:b.name,percent:b.percent})}},series:[{name:"Series",type:"pie",radius:"55%",center:["50%","60%"],data:[]}]},!0)},_populateSubjectLayers:function(){var a=this,b=this.map,d=[],c=this._subjectLayerId;if(b){var g=b.graphicsLayerIds.slice(0).reverse();h.forEach(g,function(e){e=b.getLayer(e);if(k.isPolygonLayer(e)){var g={label:a._getLayerName(e),value:e.id};c===e.id&&(g.selected="selected");d.push(g)}});this.subjectLayerSelect.removeOption(this.subjectLayerSelect.getOptions());
this.subjectLayerSelect.addOption(d)}b&&0<d.length?(this.subjectLayerSelect.domNode.style.display="",this.noSubjectLayersNode.style.display="none"):(this.subjectLayerSelect.domNode.style.display="none",this.noSubjectLayersNode.style.display="");this._watchSubjectLayer(this._getSubjectLayer())},_refreshChart:function(){if(this._isActive){var a=this,b=[],d=[],e=this._activeMode||"unknown",g=this._getModelLayer(),f=this._getGraphics();this._seriesData[e]=null;if(g&&f&&0<f.length){this._toggleWorking(!0);
var l=this._activeDfd=k.computeHistograms(c,g,f);l.then(function(c){l.isCanceled()||l!==a._activeDfd||(a._toggleWorking(!1),h.forEach(c.colorCounts,function(c){0<c.count&&(b.push(a._getSeriesItem(c)),d.push(c.label))}),a._seriesData[e]=b,a._updateSeries(b,d))}).otherwise(function(b){console.warn("SuitabilityChart: Error computing histograms");console.error(b);l.isCanceled()||l!==a._activeDfd||(a._toggleWorking(!1),a._updateSeries())})}else this._updateSeries()}},_refreshChartIfRequired:function(){var a=
this._activeMode||"_";this._seriesData[a]?this._updateSeries(this._seriesData[a]):this._refreshChart()},_reorderGraphicsLayer:function(){var a;this.map&&this._selGraphicsLayer&&(a=this.map.graphicsLayerIds.length,this.map.reorderLayer(this._selGraphicsLayer,a));this.map&&this._graphicsLayer&&(a=this.map.graphicsLayerIds.length,this.map.reorderLayer(this._graphicsLayer,a))},_toggleSelect:function(a){a?(this.selectContainer.style.visibility="visible",this._graphicsLayer.setVisibility(!1)):(this.selectContainer.style.visibility=
"hidden",this._graphicsLayer.setVisibility(!0))},_toggleWorking:function(a){this.workingNode.style.visibility=a?"visible":"hidden"},_updateMode:function(a){this._activeMode!==a&&(this._activeMode=a,this._refreshChartIfRequired())},_updateSeries:function(a){a=a||[];this._echart&&this._echart.setOption({series:[{data:a}]});var b,d,e;d="\x3ctable class\x3d'series-table'\x3e\x3ctbody\x3e";h.forEach(a,function(a){e=n.substitute(c.chart.labelPattern,{category:a.itemValue,label:a.label});b="\x3ctr\x3e";
b+="\x3ctd class\x3d'color-cell'";b+=" style\x3d'background-color:"+a.hex+";'";b+="\x3e\x3c/td\x3e";b+="\x3ctd\x3e"+e+"\x3c/td\x3e";b+="\x3ctd class\x3d'num'\x3e"+a.pct+"%\x3c/td\x3e";b+="\x3c/tr\x3e";d+=b});d+="\x3c/tbody\x3e\x3c/table\x3e";this.tableNode.innerHTML=d},_watchImageLayer:function(a){if(!a||a!==this._watchingImageLayer){var b=this;this._clearImageLayerHandles();a?(this._watchingImageLayer=a,this._imageLayerHandles=[],this._imageLayerHandles.push(a.on("rendering-change",function(){b._seriesData=
{}}))):this._watchingImageLayer=null}},_watchSubjectLayer:function(a){if(!a||a!==this._watchingSubjectLayer){var b=this;this._clearSubjectLayerHandles();a?(this._watchingSubjectLayer=a,this._subjectLayerHandles=[],this._subjectLayerHandles.push(a.on("selection-complete",function(d){b._seriesData.select=null;"select"===b._activeMode&&b._refreshChart();a.hasWebGLSurface()&&(d=d&&d.features)&&(b._selGraphicsLayer.clear(),h.forEach(d,function(a){b._selGraphicsLayer.add(a.clone())}),b._selGraphicsLayer.setVisibility(!0),
b._reorderGraphicsLayer())})),this._subjectLayerHandles.push(a.on("selection-clear",function(){b._selGraphicsLayer.clear();b._seriesData.select=null;"select"===b._activeMode&&b._refreshChart()})),this._subjectLayerHandles.push(a.on("edits-complete",function(){b._selGraphicsLayer.clear();b._seriesData.select=null;"select"===b._activeMode&&b._refreshChart()}))):this._watchingSubjectLayer=null}},_whenDrawComplete:function(a){if("draw"===this._activeMode)a=new D(a,this._polygonSymbol),this._graphicsLayer.add(a),
this._refreshChart();else if("select"===this._activeMode){var b=this._getSubjectLayer();if(b&&"function"===typeof b.selectFeatures){b.getSelectionSymbol()||b.setSelectionSymbol(this._polygonSelectionSymbol);var d=E.SELECTION_NEW,c=new F;c.geometry=a;b.selectFeatures(c,d).then(function(){}).otherwise(function(a){console.warn("Error selecting features.");console.error(a)})}}}})});