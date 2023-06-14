/*
 *
 *  staffCert.js
 * 
 * ***************************************************************************************** */
const CERT = {
    win:
    {
        staffcertWindow     : null,
        staffcertInfoWindow : null,
    },
    layout: 
    {
        staffcertLayout  : null,
    },
    form: 
    {
        staffcertForm       : null,
        staffcertFormHeader : null,
        staffcertFormBody   : null,
    },
    toolbar: 
    {
        staffcertToolbar : null,
    },
    scalars: 
    {
        toolbarCellID : 
        {
            mainHeader : 'staffcert_header',
            formMenu   : 'staffcert_form_menu_area',
        },
        contentCellID : 
        {
            mainData : 'staffcert_data',
            certForm : `staffcert_form_area`,
        },
    },
    text: {
        info : `<div>
                    <div style='text-align:center;'>
                        <h1>Staff Certification Script</h1>
                        <div>Run the Staff Certification script manually. This will connect directly to Skyward and pull certification data into the HR stipends db tables.</div><br>
                        <div><b><font color='red'>This script also runs automatically every night.</font></b></div>
                    </div> 
                </div>`
    },
    func : {},
};

function InitStaffCerts(contentCell) {
    const staffcertLayoutConfig = {
        type: "none",
        rows: [
            {
                id: CERT.scalars.toolbarCellID.mainHeader,
                css: "dhx_layout-cell--bordered",
                height: "content"
            },{
                id: CERT.scalars.contentCellID.mainData,
                css: "dhx_layout-cell--bordered"

            }
        ]
    };

    CERT.layout.staffcertLayout = new dhx.Layout(null, staffcertLayoutConfig);
    contentCell.attach(CERT.layout.staffcertLayout);

    CERT.func.getStaffCertToolbar();
    CERT.func.getStaffCertForm();

}

CERT.func.getStaffCertToolbar = function() {
    const toolbar = new dhx.Toolbar(null, {
        data: [
            {
                type: "spacer",
            },{
                "id": "title",
                "type": "customHTML",
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

    // Assign/overwrite toolbar globally
    CERT.toolbar.staffcertToolbar = CERT.layout.staffcertLayout.getCell(CERT.scalars.toolbarCellID.mainHeader).attach(toolbar);

    CERT.toolbar.staffcertToolbar.data.update("title", 
        { html: `<div id="data-title-header" class="staffcert-toolbar-title">Staff Certification Script (Manual Run)</div>` }
    );

    CERT.toolbar.staffcertToolbar.events.on("click", function(id) {
        if (id == 'info') {
            CERT.func.openStaffCertInfo();
        }
    });
        
}

CERT.func.getStaffCertForm = function() {
    const config = {
        padding: 5,
        align: "evenly",
        cols:[
            {
                rows:[
                    {
                        align: "evenly",
                        padding: "5px",
                        cols: [
                            {
                                type: "button",
                                name: "execute",
                                text: "EXECUTE SCRIPT",
                                view: "flat",
                                padding: "5px",
                                circle: true,
                                color: "danger"
                            }
                        ]
                    }
                ]
            }
        ]
    };
    const staffcertForm = new dhx.Form(null, config);

    CERT.form.staffcertForm = CERT.layout.staffcertLayout.getCell(CERT.scalars.contentCellID.mainData).attach(staffcertForm);

    CERT.form.staffcertForm.events.on("click", function (id) {
        if (id === "execute") {
            dhx.confirm({
                header: "<b>Run Staff Certification Script Manually</b>",
                text: "Are you sure you want to run the staff certification script manually?<br></b>",
                buttons: ["Cancel", "Run"],
                buttonsAlignment: "center",
                css: "staffcert-popup",
            }).then(
                function (i) {
                    if (i) {
                        MessageIt('Not Yet Implemented', 'warning');
                        // CERT.form.staffcertForm.send("./mAdmin/php/.php", "POST", true);
                    }
                }
            );
        } 
    });

}

CERT.func.openStaffCertInfo = function() {
    if( CERT.win.staffcertInfoWindow != null ) CERT.win.staffcertInfoWindow.destructor();
    InfoIt(CERT.text.info);
}

//  ----------------------------------------------------------------------------------

// CERT.func.InitStaffCertForm = function() {

//     if( CERT.toolbar.certToolbar == null ) {
//         CERT.toolbar.certToolbar = new dhx.Toolbar(null, {
//             data: [
//                 {
//                     type: "separator",
//                 },{
//                     type: "spacer",
//                 },{
//                     "id": "title",
//                     "value": "Staff Certification Script (Manual Run)"
//                 },{
//                     type: "spacer",
//                 },{
//                     "id": "info",
//                     "icon": "fa-solid fa-info-circle",
//                     "type": "button",
//                     "tooltip": "Info for current screen",
//                     "circle": true,
//                     "color": "secondary",
//                 }
//             ]
//         });

//         CERT.toolbar.certToolbar.events.on("click", function(id,e){
//             if(id == "info") {
//                 CERT.func.openStaffCertInfo();
//             }
//         });


//         CERT.form.certFormHeader.attach(CERT.toolbar.certToolbar);
//         CERT.toolbar.certToolbar.data.update("title", 
//             { html: `<div id="experience-title-header">Staff Certification Script (Manual Run)</div>` }
//         );
//     }
// }

// //  -------------------------------------------------------------------------------

// async function openNewYearRollover(contentCell) {
//     contentCell.detach();
//     const newYearForm = new dhx.Form(
//         null, 
//         GetNewYearRolloverConfig("new-year-form")
//     );

//     const searchYearCombo = newYearForm.getItem('year').getWidget();

//     const config = {
//         header: "New Year Rollover",
//         text: "Are you sure you want to change the fiscal year?",
//         buttons: ["No", "Yes"],
//         buttonsAlignment: "center"
//     };

//     if( await searchYearCombo.data.load("./includes/php/getComboFutureYear.php") ) {
//         newYearForm.events.on("click", function (id) {
//             if (id === "save") {
//                 dhx.confirm(config).then(function(result){
//                     if(result) {
//                         newYearForm.send("./mAdmin/php/updateCurrentYear.php", "POST", true);
//                     }
//                 });
//             } 
//         });
//         contentCell.attach(newYearForm);
//         return true;
//     } else {
//         return false;
//     }
// }

// //  -------------------------------------------------------------------------------

// function GetNewYearRolloverConfig(new_class) {

//     const config = {
//         css: new_class,
//         padding: 5,
//         align: "evenly",
//         cols:[
//                 {
//                     rows:[
//                         {
//                             cols:[
//                                     {
//                                         rows:[
//                                             {
//                                                 type: "combo",
//                                                 label: "Year",
//                                                 labelPosition: "left",
//                                                 labelWidth: 25,
//                                                 width: 250,
//                                                 readOnly: true,
//                                                 padding: 5,
//                                                 name: "year", id: "year"
//                                             }
//                                         ]
//                                     }
//                             ]
//                         }
//                         ,{
//                             align: "evenly",
//                             padding: "5px",
//                             cols: [
//                                 {
//                                     type: "button",
//                                     name: "save",
//                                     text: "Save",
//                                     size: "medium",
//                                     view: "flat",
//                                     padding: "5px",
//                                     color: "primary"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//     };
    
//     return config;
// }

// //  -------------------------------------------------------------------------------