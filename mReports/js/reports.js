/*
 *
 *  reports.js
 * 
 * ***************************************************************************************** */

const RPT = {
    win     : {
        historyWin     : null,
    },
    grid    : {
        historyGrid    : null,
    },
    layout  : {
        rptScreen      : null,
        rptHeader      : null,
        rptBody        : null,
        historyScreen  : null,
    },
    form    : {
    },
    toolbar : {
        rptNavToolbar     : null,
        historyToolbar    : null,
    },
    scalars           : {
        toolbarCellID : {
            rptHeader       : `rpt_header_toolbar`,
            historyHeader   : `history_header_toolbar`,
        },
        contentCellID : {
            rptContent        : `rpt_content_grid`,
            historyContent    : `history_content_grid`,
        },
        current       : { 
            rType        : `type`,
            report       : `rpt`,
            reportCode   : `code`,
            location     : `loc`,
            email_att    : `email`
        },
    },
    reportInfo     : `
    <div>
        <div>
            <h1>Reports:</h1>
        </div>
        <div>
            <ul>
                <li>1. Select report in side bar picklist.</li>
                <li>2. View and ensure data meets expectations.</li>
                <li>3. Click send and the report will be sent to the building coordinator.</li>
            </ul>
        </div>
    </div>
    `,
    func                 : {},
};

function InitReport(contentCell) {
    const reportLayoutConfig = {
        type: "none",
        rows: [
            {
                id: RPT.scalars.toolbarCellID.rptHeader,
                css: "dhx_layout-cell--bordered",
                height: "content"
            },
            {
                id: RPT.scalars.contentCellID.rptContent,
                css:  "dhx_layout-cell--bordered"
            }
        ]
    };

    RPT.layout.rptScreen = new dhx.Layout(null, reportLayoutConfig);
    contentCell.attach(RPT.layout.rptScreen);
    RPT.layout.rptHeader = RPT.layout.rptScreen.getCell(RPT.scalars.toolbarCellID.rptHeader);
    RPT.layout.rptBody   = RPT.layout.rptScreen.getCell(RPT.scalars.contentCellID.rptContent);

    RPT.func.InitReportNav();
}
RPT.func.InitReportNav = function() {
    if( RPT.toolbar.rptNavToolbar == null ) {
        RPT.toolbar.rptNavToolbar = new dhx.Toolbar(null, {
            data: [
                {
                    "id": "generate",
                    "icon": "fa-solid fa-circle-plus",
                    "value": "Generate",
                    "type": "button",
                    "tooltip": "Fill form and generate report.",
                    "circle": true,
                    "color": "primary",
                },{
                    type: "separator",
                },{
                    "id": "send",
                    "icon": "fa-solid fa-circle-plus",
                    "value": "Send",
                    "type": "button",
                    "tooltip": "Send the report to the recipient",
                    "circle": true,
                    "color": "success",
                },{
                    type: "separator",
                },{
                    "id": "history",
                    "icon": "fa-solid fa-circle-plus",
                    "value": "History",
                    "type": "button",
                    "tooltip": "View prior run reports",
                    "circle": true,
                    "color": "secondary",
                },{
                    type: "spacer",
                },{
                    "id": "title",
                    "value": "Reports"
                },{
                    type: "spacer",
                },{
                    "id": "info",
                    "icon": "fa-solid fa-info-circle",
                    "type": "button",
                    "tooltip": "Info for current screen",
                    "circle": true,
                    "color": "secondary",
                }
            ]
        }); 

        RPT.func.buildHistory();

        RPT.toolbar.rptNavToolbar.events.on("click", function(id,e){

            if(id == "generate") {
                getReport(RPT.scalars.current.reportCode);
            } else if(id == "send") {
                RPT.func.sendReport();
            } else if(id == "history") {
                RPT.func.RPTRefreshHistoryGrid();
                RPT.win.historyWin.show();
            } else if(id == "info") {
                InfoIt(RPT.reportInfo);
            }
        });

        RPT.toolbar.rptNavToolbar.disable('send');
        RPT.layout.rptHeader.attach(RPT.toolbar.rptNavToolbar);
    }
}

RPT.func.buildHistory = function() {

    const offsetWidth = parseInt(0.75 * browserSize.width);
    const offsetHeight = browserSize.height-200;
    const offsetLeft = parseInt((0.275 * browserSize.width) - (0.135 * browserSize.width));

    if( RPT.win.historyWin == null ) {  // True the first time...
        RPT.win.historyWin = new dhx.Window(
            {
                width: offsetWidth,
                height: offsetHeight,
                top: 100,
                left: offsetLeft,
                modal: true,
                resizable: true,
                closable: true,
                movable: true,
                header: false,
                css: "custom-window-fit",
            }
        );

        RPT.layout.historyScreen = new dhx.Layout(null, {
            type: "none",
            rows: [
                {
                    id : RPT.scalars.toolbarCellID.historyHeader,
                    height: "content",
                },{
                    id : RPT.scalars.contentCellID.historyContent,
                    css: "dhx_layout_cell--border-top"
                }
            ]
        });

        RPT.toolbar.historyToolbar = new dhx.Toolbar(null, {
            css: "toolbar-custom",
            data: [
                {
                    id: "popup-title",
                    type: "customHTML",
                    html: "Report History",
                    css: "toolbar-title",
                },{
                    type: "spacer",
                },{
                    icon: "fas fa-arrows-rotate", 
                    id: "popup-grid-refresh",
                    tooltip: "Refresh This Pick-list",
                    type: "button",
                    size: "small",
                    circle: true,
                    color: "primary",
                },{
                    icon: "dxi dxi-close", 
                    id: "popup-window-close",
                    tooltip: "Close Picklist",
                    type: "button",
                    size: "small",
                    circle: true,
                    color: "primary",
                }
            ]
        });

        RPT.toolbar.historyToolbar.events.on("click",
            (id) => { 
                switch(id) {
                    case "popup-grid-refresh":
                        RPT.func.RPTRefreshHistoryGrid();
                        break;
                    case "popup-window-close":
                        RPT.win.historyWin.hide();
                        break;
                    case "popup-title":
                        break;
                    default:
                        MessageIt("Not Yet Implemented");
                }
            }
        );

        RPT.func.RPTRefreshHistoryGrid();
    }
}
    
    
RPT.func.RPTRefreshHistoryGrid = function() {

    let url = 'mReports/php/getReportHistory.php';
    dhx.ajax.get(url).then(
        json => {
            RPT.grid.historyGrid = new dhx.Grid(null,{
                // columns : MakeGridColumns(json.columns),
                columns : json.columns,
                selection: "row",
                autoWidth: true,
                editable: false,
                data: json.data,
            });

            RPT.layout.historyScreen
                .getCell(RPT.scalars.toolbarCellID.historyHeader)
                .attach(RPT.toolbar.historyToolbar);

            RPT.layout.historyScreen
                .getCell(RPT.scalars.contentCellID.historyContent)
                .attach(RPT.grid.historyGrid);
    
            RPT.win.historyWin
                .attach(RPT.layout.historyScreen);
        }
    )
}

RPT.func.InsertReportLink = function(report) {
    RPT.layout.rptBody.detach();
    RPT.scalars.current.report = report;
    RPT.toolbar.rptNavToolbar.disable('send');
    RPT.layout.rptBody.attachHTML('<iframe height="100%" width="100%" src="' + RPT.scalars.current.report + '" title="Cert Report PDF"></iframe>')
    
    RPT.win.historyWin.hide();
}

//-----

function getReport(id) {

    let reportTitle = '';

    if(RPT.layout.rptBody) {
        RPT.layout.rptBody.detach();
        RPT.scalars.current.location = '';
        RPT.scalars.current.report = '';
        RPT.scalars.current.email_att = '';
        RPT.scalars.current.rType = '';
    }

    console.log(id);

    RPT.scalars.current.reportCode = id;
    if(id == 'sb_rpt_certifcation') {
        reportTitle = 'Certification Report';
        RPT.scalars.current.rType = 'CERT';
        RPT.func.GenerateCertReport();
    } else if(id == 'sb_rpt_stipend') {
        reportTitle = 'Stipend Report';
        RPT.scalars.current.rType = 'STI';
        dhx.message({
            text:"Not yet implemented.", 
            icon:"dxi-clock", 
            css:"custom-dhx-message-warning", 
            expire:1500
        });
    } else if(id == 'sb_rpt_supplemental') {
        reportTitle = 'Supplemental Report';
        RPT.scalars.current.rType = 'SUP';
        dhx.message({
            text:"Not yet implemented.", 
            icon:"dxi-clock", 
            css:"custom-dhx-message-warning", 
            expire:1500
        });
    }

    RPT.toolbar.rptNavToolbar.data.update("title", 
        { html: `<div id="report-title-header"> `+ reportTitle + ` </div>` }
    );
}


RPT.func.sendReport = function() {

    RPT.toolbar.rptNavToolbar.disable('send');
    RPT.layout.rptBody.progressShow();
    if(RPT.scalars.current.rType == 'CERT' && RPT.scalars.current.location != '' && RPT.scalars.current.email_att != '') {
        fetch('./mReports/php/cert_report_email_smtp2go.php?l='+RPT.scalars.current.location+'&a='+RPT.scalars.current.email_att)
        .then(response => response.text())
        .then(data => {
            RPT.layout.rptBody.progressHide();
        });
    }
}

RPT.func.certFormConfig = function() {
    const config = {
        css: "cert-form",
        padding: 5,
        align: "evenly",
        cols:[
                {
                    rows:[
                        {
                            cols:[
                                    {
                                        rows:[
                                            {
                                                type: "combo",
                                                label: "Season",
                                                labelPosition: "left",
                                                labelWidth: 50,
                                                width: 300,
                                                readOnly: true,
                                                padding: 5,
                                                name: "season", id: "season",
                                                required: true,
                                                errorMessage: "Invalid season",
                                            },
                                            {
                                                type: "combo",
                                                label: "Location",
                                                labelPosition: "left",
                                                labelWidth: 50,
                                                width: 300,
                                                readOnly: true,
                                                padding: 5,
                                                name: "location", id: "location",
                                                required: true,
                                                errorMessage: "Invalid location",
                                            }
                                        ]
                                    }
                            ]
                        }
                        ,{
                            align: "evenly",
                            padding: "5px",
                            cols: [
                                {
                                    type: "button",
                                    name: "generate",
                                    text: "Generate",
                                    size: "medium",
                                    view: "flat",
                                    padding: "5px",
                                    color: "primary"
                                }
                            ]
                        }
                    ]
                }
            ]
    };
    
    return config;
}

RPT.func.GenerateCertReport = function() {

    const certForm = new dhx.Form(
        null, 
        RPT.func.certFormConfig()
    );

    let HTML = `
    <html>
    <body>
        <object data="XXX" type="application/pdf">
            <div>No online PDF viewer installed</div>
        </object>
    </body>
    </html>
    `;

    RPT.layout.rptBody.attach(certForm);

    const formSeasonCombo = certForm.getItem('season').getWidget();
    formSeasonCombo.data.load("./includes/php/getComboSeasons.php");

    const formLocationCombo = certForm.getItem('location').getWidget();
    formLocationCombo.data.load("./includes/php/getComboSecondaryLocations.php");


    certForm.events.on("click", function (id) {
        if (id === "generate") {
            if(certForm.validate()) {
                RPT.layout.rptBody.progressShow();
                certForm.send("./mReports/php/cert_report_pdf.php","POST").then(function(data) {
                    let returns = JSON.parse(data);

                    
                    RPT.layout.rptBody.detach();
                    RPT.scalars.current.report = returns['iframe'];
                    RPT.scalars.current.email_att = returns['email'];
                    RPT.scalars.current.location = returns['location'];
                    RPT.layout.rptBody.progressHide();
                    RPT.toolbar.rptNavToolbar.enable('send');
                    RPT.layout.rptBody.attachHTML('<iframe height="100%" width="100%" src="' + RPT.scalars.current.report + '" title="Cert Report PDF"></iframe>')
                });
            }
        } 
    });
}

RPT.func.displayCertReport = function() {

}
