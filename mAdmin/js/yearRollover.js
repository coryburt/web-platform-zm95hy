/*
 *
 *  yearRollover.js
 * 
 * ***************************************************************************************** */
const YR = {
    layout  : {
        yrScreen  : null,
        yrHeader  : null,
        yrBody    : null,
    },
    form    : {
        yrForm     : null,
    },
    toolbar : {
        yrToolbar     : null,
    },
    scalars           : {
        toolbarCellID : {
            expList         : `yr_toolbar_area`,
        },
        contentCellID : {
            yrForm         : `exp_list_content_area`,
        },
    },
    yrInfo     : `
                            <div>
                                <div>
                                    <h1>New Year Rollover:</h1>
                                </div>
                                <div>
                                    <ul>
                                        <li>1. Search prior year experience using the form.</li>
                                        <li>2. Return to the form using the search button on the toolbar</li>
                                        <li>3. Add experience by selecting the add button on the toolbar.</li>
                                    </ul>
                                </div>
                            </div>
    `,
    func                 : {},
};

function InitYearRollover(contentCell) {
    const yearRolloverLayoutConfig = {
        type: "none",
        rows: [
            {
                id: "exp_header",
                css: "dhx_layout-cell--bordered",
                height: "content"
            },
            {
                id: "exp_body",
                css:  "dhx_layout-cell--bordered"
            }
        ]
    };

    YR.layout.yrScreen = new dhx.Layout(null, yearRolloverLayoutConfig);
    contentCell.attach(YR.layout.yrScreen);
    YR.layout.yrHeader = YR.layout.yrScreen.getCell("exp_header");
    YR.layout.yrBody   = YR.layout.yrScreen.getCell("exp_body");

    YR.func.InitNewYearNav();
    if( !YR.func.openNewYearRollover() ) {
        MessageIt("Error Initializing New Year Rollover");
    }
}

//  ----------------------------------------------------------------------------------

YR.func.InitNewYearNav = function() {

    if( YR.toolbar.yrToolbar == null ) {
        YR.toolbar.yrToolbar = new dhx.Toolbar(null, {
            data: [
                {
                    type: "separator",
                },{
                    type: "spacer",
                },{
                    "id": "title",
                    "value": "New Year Rollover"
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

        YR.toolbar.yrToolbar.events.on("click", function(id,e){

            if(id == "info") {
                InfoIt(YR.yrInfo);
            }
        });


        YR.layout.yrHeader.attach(YR.toolbar.yrToolbar);
        YR.toolbar.yrToolbar.data.update("title", 
            { html: `<div id="rollover-title-header">New Year Rollover</div>` }
        );
    }
}

//  -------------------------------------------------------------------------------

YR.func.openNewYearRollover = async function() {
    YR.layout.yrBody.detach();
    YR.form.yrForm = new dhx.Form(
        null, 
        YR.func.GetNewYearRolloverConfig()
    );

    const searchYearCombo = YR.form.yrForm.getItem('year').getWidget();

    const config = {
        header: "New Year Rollover",
        text: "Are you sure you want to change the fiscal year?",
        buttons: ["No", "Yes"],
        buttonsAlignment: "center"
    };

    if( await searchYearCombo.data.load("./includes/php/getComboFutureYear.php") ) {
        YR.form.yrForm.events.on("click", function (id) {
            if (id === "save") {
                if(YR.form.yrForm.validate()) {
                    dhx.confirm(config).then(function(result){
                        if(result) {
                            YR.form.yrForm.send("./mAdmin/php/updateCurrentYear.php", "POST", true);
                        } else {
                            YR.form.yrForm.clear();
                        }
                    });
                }
            } 
        });
        YR.layout.yrBody.attach(YR.form.yrForm);
        return true;
    } else {
        return false;
    }
}

//  -------------------------------------------------------------------------------

YR.func.GetNewYearRolloverConfig = function() {

    const config = {
        css: "new-year-form",
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
                                                label: "Year",
                                                labelPosition: "left",
                                                labelWidth: 25,
                                                width: 250,
                                                readOnly: true,
                                                padding: 5,
                                                name: "year", id: "year",
                                                required: true,
                                                errorMessage: "Invalid year",
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
                                    name: "save",
                                    text: "Save",
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