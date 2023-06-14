/*
 *
 *  experience.js
 * 
 * ***************************************************************************************** */

const EXP = {
    win     : {
        stipList     : null,
        expAddFormWindow : null,
        expInfoWindow :  null,
        expStipendWindow  :  null,

    },
    layout  : {
        expFormLayout  : null,
        expStipendList : null,
        expHeader      : null,
        expBody        : null,
        expSrchGrid    : null,
        expSrchPagntn  : null,
    },
    form    : {
        addForm     : null,
        searchForm  : null,
    },
    toolbar : {
        expNavToolbar     : null,
        expStipendToolbar : null,
    },
    grid    : {
        expStipendGrid  : null,
        expSrchGrid     : null,
    },
    scalars           : {
        toolbarCellID : {
            expList         : `exp_list_toolbar_area`,
            addForm         : `exp_form_menu_area`,
            srchGridList    : `exp_search_grid_list`,
            stipList        : `exp_stipend_list_toolbar`,
        },
        contentCellID : {
            expList         : `exp_list_content_area`,
            addForm         : `exp_add_form_area`,
            srchGridPagntn  : `exp_search_pagination`,
            stipList        : `exp_stipend_list_body`,
        },
        current       : { 
            formId       : `expSrch`,
        },
    },
    experienceInfo     : `
    <div>
        <div>
            <h1>Experience:</h1>
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


function InitExpVerification (contentCell) {
    const experienceLayoutConfig = {
        type: "none",
        rows: [
            {
                id: EXP.scalars.toolbarCellID.expList,
                css: "dhx_layout-cell--bordered",
                height: "content"
            },
            {
                id: EXP.scalars.contentCellID.expList,
                css:  "dhx_layout-cell--bordered"
            }
        ]
    };

    EXP.layout.expScreen = new dhx.Layout(null, experienceLayoutConfig);
    contentCell.attach(EXP.layout.expScreen);
    EXP.layout.expHeader = EXP.layout.expScreen.getCell(EXP.scalars.toolbarCellID.expList);
    EXP.layout.expBody   = EXP.layout.expScreen.getCell(EXP.scalars.contentCellID.expList);

    EXP.func.InitExperienceNav();
    EXP.func.openExpSearch();

    EXP.func.InitExperienceFormWindow();
    EXP.func.ExpBuildPicklistWindows();

}

//  -------------------------------------------------------------------------------

EXP.func.GetExpSearchFormConfig = function() {

    const config = {
        css: "exp-search-form",
        padding: 5,
        align: "evenly",
        cols:[
                {
                    padding: 5,
                    rows:[
                        {
                            cols:[
                                    {
                                        rows:[
                                            {
                                                type: "combo",
                                                label: "Name/Badge Number",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                padding: 3,
                                                readOnly : true,
                                                name: "name", id: "name"
                                            },{
                                                cols: [
                                                    {
                                                        type: "input",
                                                        label: "Stipend",
                                                        labelPosition: "left",
                                                        labelWidth: 150,
                                                        width: 350,
                                                        readOnly: true,
                                                        padding: 3,
                                                        name: "stipend", id: "stipend"
                                                    },{
                                                        type: "button",
                                                        css: "custom-supp-form-button",
                                                        size: "small",
                                                        name: "stipend_lookup",
                                                        id: "stipend_lookup",
                                                        icon: "dxi dxi-magnify",
                                                        circle: true,
                                                        padding: 8,
                                                        view: "link",
                                                    },{
                                                        type: "text",
                                                        hidden: true,
                                                        id: "stipend_gu",
                                                        name: "stipend_gu",
                                                    }
                                                ]
                                            },{
                                                type: "combo",
                                                label: "Year",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "year", id: "year"
                                            },{
                                                type: "combo",
                                                label: "Location",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "location", id: "location"
                                            },{
                                                type: "combo",
                                                label: "Gender",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "gender", id: "gender"
                                            }
                                        ]
                                    },
                                    {
                                        rows:[
                                            {
                                                type: "combo",
                                                label: "Non-Continuing",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "non_continuing", id: "non_continuing",
                                                data: [
                                                    { value: "No", id: "0" },
                                                    { value: "Yes", id: "1" }
                                                ]
                                            },{
                                                type: "combo",
                                                label: "Distribution",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "distribution", id: "distribution"
                                            },{
                                                type: "combo",
                                                label: "Frequency",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "frequency", id: "frequency"
                                            },{
                                                type: "combo",
                                                label: "Split",
                                                labelPosition: "left",
                                                labelWidth: 150,
                                                width: 400,
                                                readOnly: true,
                                                padding: 3,
                                                name: "split", id: "split"
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
                                    name: "search",
                                    text: "Search",
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

//  ----------------------------------------------------------------------------------

EXP.func.InitExperienceNav = function() {

    if( EXP.toolbar.expNavToolbar == null ) {
        EXP.toolbar.expNavToolbar = new dhx.Toolbar(null, {
            data: [
                {
                    "id": "search",
                    "icon": "fa-solid fa-pen-to-square",
                    "value": "Search",
                    "type": "button",
                    "tooltip": "Search for prior year experience",
                    "circle": true,
                    "color": "primary",
                },{
                    type: "separator",
                },{
                    "id": "add",
                    "icon": "fa-solid fa-circle-plus",
                    "value": "Add",
                    "type": "button",
                    "tooltip": "Add new experience",
                    "circle": true,
                    "color": "success",
                },{
                    type: "spacer",
                },{
                    "id": "title",
                    "value": "Search Experience"
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

        EXP.toolbar.expNavToolbar.events.on("click", function(id,e){

            if(id == "search") {
                EXP.func.openExpSearch();
            } else if(id == "add") {
                EXP.func.openExpAdd();
            } else if(id == "info") {
                InfoIt(EXP.experienceInfo);
            }
        });

        // console.log("attaching");
        EXP.layout.expHeader.attach(EXP.toolbar.expNavToolbar);
        EXP.toolbar.expNavToolbar.data.update("title", 
            { html: `<div id="experience-title-header">Search Experience</div>` }
        );
    }
}

//  ----------------------------------------------------------------------------------

EXP.func.InitExperienceFormWindow = function() {
    if( EXP.win.expAddFormWindow != null ) EXP.win.expAddFormWindow.destructor();

    if( EXP.layout.expFormLayout == null) {
        const layoutConfig = {
            type: "none",
            rows: [
                {
                    id: EXP.scalars.toolbarCellID.addForm,
                    height: "content",
                },
                {
                    id: EXP.scalars.contentCellID.addForm,
                }
            ]
        };
        EXP.layout.expFormLayout = new dhx.Layout(null, layoutConfig);
    }

    const offsetWidth = parseInt(0.60 * browserSize.width);
    const offsetHeight = browserSize.height - 200;
    const offsetLeft = parseInt((0.35 * browserSize.width) - (0.135 * browserSize.width));

    EXP.win.expAddFormWindow = new dhx.Window(
        {
            width: offsetWidth,
            height: offsetHeight,
            top: 80,
            left: offsetLeft,
            modal: true,
            resizable: true,
            closable: true,
            movable: true,
            header: false,
            footer: true,
            css: "custom-window-fit",
        }
    );

    EXP.win.expAddFormWindow.footer.data.add({
        type: "spacer",
    });
    
    EXP.win.expAddFormWindow.footer.data.add({
        type: "button",
        view: "link",
        size: "medium",
        color: "primary",
        value: "cancel",
        id: "cancel"
    });
    
    EXP.win.expAddFormWindow.footer.events.on("click", function (id) {
        if (id === "cancel") {
            EXP.win.expAddFormWindow.hide();
        } else if (id === "save") {
            EXP.form.addForm.send("./mExperience/php/saveExperience.php", "POST");
        }
    });

    EXP.win.expAddFormWindow.events.on("beforeHide", function(position, events){
        EXP.scalars.current.formId = "expSrch";
    });
    
    EXP.win.expAddFormWindow.footer.data.add({
        type: "button",
        view: "flat",
        size: "medium",
        color: "primary",
        value: "save",
        id: "save",
    });

    EXP.win.expAddFormWindow.attach(EXP.layout.expFormLayout);
}

//  ----------------------------------------------------------------------------------

EXP.func.openExpSearch = function() {
    EXP.layout.expBody.detach();
    EXP.form.searchForm = new dhx.Form(
        null, 
        EXP.func.GetExpSearchFormConfig()
    );

    EXP.form.searchForm.getItem("search").events.on("click", function(events) {
        EXP.func.generateGrid();
    });

    EXP.layout.expBody.attach(EXP.form.searchForm);

    const searchYearCombo = EXP.form.searchForm.getItem('year').getWidget();
    searchYearCombo.data.load("./includes/php/getComboNonCurrentYear.php");

    const searchNameCombo = EXP.form.searchForm.getItem('name').getWidget();
    searchNameCombo.data.load("./includes/php/getComboStaff.php");
    
    const searchLocationCombo = EXP.form.searchForm.getItem('location').getWidget();
    searchLocationCombo.data.load("./includes/php/getComboSecondaryLocations.php");

    const searchGenderCombo = EXP.form.searchForm.getItem('gender').getWidget();
    searchGenderCombo.data.load("./includes/php/getComboLookup.php?id=GENDER");

    const searchDistributionCombo = EXP.form.searchForm.getItem('distribution').getWidget();
    searchDistributionCombo.data.load("./includes/php/getComboLookup.php?id=DISTRIBUTION");

    const searchFrequencyCombo = EXP.form.searchForm.getItem('frequency').getWidget();
    searchFrequencyCombo.data.load("./includes/php/getComboLookup.php?id=FREQUENCY");

    const searchSplitCombo = EXP.form.searchForm.getItem('split').getWidget();
    searchSplitCombo.data.load("./includes/php/getComboLookup.php?id=SPLIT");

    EXP.form.searchForm.getItem("stipend_lookup").events.on("click",
        function(events) {
            EXP.win.expStipendWindow.show();
        }
    );

}

//  ----------------------------------------------------------------------------------

EXP.func.openExpAdd = function() {
    EXP.win.expAddFormWindow.show();
    EXP.scalars.current.formId = "expAdd";
    const cell = EXP.layout.expFormLayout.getCell("exp_add_form_area");
    EXP.func.ReloadExperienceAdd();
}

//  ----------------------------------------------------------------------------------

EXP.func.GetExpAddformConfig = function() {

    const config = {
        css: "exp-add-form",
        padding: 5,
        align: "evenly",
        title: "Add Experience:",
        cols:[
            {
                padding: 5,
                rows:[
                    {
                        cols:[
                                {
                                    rows:[
                                        {
                                            type: "combo",
                                            label: "Name/Badge Number",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            padding: 3,
                                            readOnly: true,
                                            name: "name", id: "name"
                                        },{
                                            cols: [
                                                {
                                                    type: "input",
                                                    label: "Stipend",
                                                    labelPosition: "left",
                                                    labelWidth: 150,
                                                    width: 350,
                                                    readOnly: true,
                                                    padding: 3,
                                                    name: "stipend", id: "stipend"
                                                },{
                                                    type: "button",
                                                    css: "custom-supp-form-button",
                                                    size: "small",
                                                    name: "stipend_lookup",
                                                    id: "stipend_lookup",
                                                    icon: "dxi dxi-magnify",
                                                    circle: true,
                                                    padding: 8,
                                                    view: "link",
                                                },{
                                                    type: "text",
                                                    hidden: true,
                                                    id: "stipend_gu",
                                                    name: "stipend_gu",
                                                }
                                            ]
                                        },{
                                            type: "combo",
                                            label: "Year",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "year", id: "year"
                                        },{
                                            type: "combo",
                                            label: "Location",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "location", id: "location"
                                        },{
                                            type: "combo",
                                            label: "Gender",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "gender", id: "gender"
                                        }
                                    ]
                                },
                                {
                                    rows:[
                                        {
                                            type: "combo",
                                            label: "Non-Continuing",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "non_continuing", id: "non_continuing",
                                            data: [
                                                { value: "No", id: "0" },
                                                { value: "Yes", id: "1" }
                                            ]
                                        },{
                                            type: "combo",
                                            label: "Distribution",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "distribution", id: "distribution"
                                        },{
                                            type: "combo",
                                            label: "Frequency",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "frequency", id: "frequency"
                                        },{
                                            type: "combo",
                                            label: "Split",
                                            labelPosition: "left",
                                            labelWidth: 150,
                                            width: 400,
                                            readOnly: true,
                                            padding: 3,
                                            name: "split", id: "split"
                                        }
                                    ]
                                }
                        ]
                    },{
                        align: "evenly",
                        padding: "10px",
                        cols: [{
                            type: "textarea",
                            name:"comments", id: "comments",
                            label: "Comments",
                            labelWidth: 145,
                            width:790,
                            labelPosition: "left",
                            disabled: false,
                            required: false,
                            readOnly: false,
                            resizable: false,
                            height: "150px",
                            hidden: false,
                        }]
                    }
                ]
            }
        ]
    };
    
    return config;
}

//  ----------------------------------------------------------------------------------

EXP.func.ReloadExperienceAdd = function() {

    EXP.form.addForm = new dhx.Form(null, EXP.func.GetExpAddformConfig());
    
    const addNameCombo = EXP.form.addForm.getItem('name').getWidget();
    addNameCombo.data.load("./includes/php/getComboStaff.php");

    const addYearCombo = EXP.form.addForm.getItem('year').getWidget();
    addYearCombo.data.load("./includes/php/getComboNonCurrentYear.php");

    const addLocationCombo = EXP.form.addForm.getItem('location').getWidget();
    addLocationCombo.data.load("./includes/php/getComboSecondaryLocations.php");

    const addGenderCombo = EXP.form.addForm.getItem('gender').getWidget();
    addGenderCombo.data.load("./includes/php/getComboLookup.php?id=GENDER");

    const addDistributionCombo = EXP.form.addForm.getItem('distribution').getWidget();
    addDistributionCombo.data.load("./includes/php/getComboLookup.php?id=DISTRIBUTION");

    const addFrequencyCombo = EXP.form.addForm.getItem('frequency').getWidget();
    addFrequencyCombo.data.load("./includes/php/getComboLookup.php?id=FREQUENCY");

    const addSplitCombo = EXP.form.addForm.getItem('split').getWidget();
    addSplitCombo.data.load("./includes/php/getComboLookup.php?id=SPLIT");

    EXP.form.addForm.getItem("stipend_lookup").events.on("click",
        function(events) {
            EXP.win.expStipendWindow.show();
        }
    );

    EXP.win.expAddFormWindow.attach(EXP.form.addForm);

}

//  ----------------------------------------------------------------------------------

EXP.func.generateGrid = function() {

    const formresult = EXP.form.searchForm.getValue();

    EXP.layout.expBody.detach();

    const experienceSearchGridLayout = {
        type: "none",
        rows: [
            {
                id: EXP.scalars.toolbarCellID.srchGridList,
                css: "dhx_layout-cell--bordered",
            },
            {
                id: EXP.scalars.contentCellID.srchGridPagntn,
                css:  "dhx_layout-cell--bordered"
            }
        ]
    };

    EXP.layout.expSearchLayout  = new dhx.Layout(EXP.layout.expBody, experienceSearchGridLayout);
    EXP.layout.expSrchGrid      = EXP.layout.expSearchLayout.getCell(EXP.scalars.toolbarCellID.srchGridList);
    EXP.layout.expSrchPagntn    = EXP.layout.expSearchLayout.getCell(EXP.scalars.contentCellID.srchGridPagntn);


    EXP.grid.expSrchGrid = new dhx.Grid(null, {
        autoWidth: true,
        selection: "row",
        editable: false,
        columns: [
            { id: "BADGE_NUM",      header: [{ text: "STAFF ID" }] },
            { id: "COACH",          header: [{ text: "COACH" }] },
            { id: "LOCATION_NAME",  header: [{ text: "LOCATION" }] },
            { id: "PROGRAM_DESC",   header: [{ text: "PROGRAM" }] },
            { id: "GENDER",         header: [{ text: "GENDER" }] },
            { id: "POSITION_DESC",  header: [{ text: "POSITION" }] },
            { id: "YEAR_RANGE",     header: [{ text: "YEAR" }] }
        ]
    });
    
    const lazyDataProxy = new dhx.LazyDataProxy("./mExperience/php/getExperience.php?query="+JSON.stringify(formresult), {
        from: 0,
        limit: 50,
        prepare: 0,
        delay: 50
    });
    
    
    EXP.grid.expSrchGrid.data.load(lazyDataProxy);
    
    const pagination = new dhx.Pagination(null, {
        css: "dhx_widget--bordered dhx_widget--no-border_top",
        data: EXP.grid.expSrchGrid.data,
        pageSize: 50
    });

    EXP.layout.expSrchGrid.attach(EXP.grid.expSrchGrid);
    EXP.layout.expSrchPagntn .attach(pagination);
}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // STIPEND PICKLISTS

EXP.func.ExpBuildPicklistWindows = function() {
    const offsetWidth = parseInt(0.75 * browserSize.width);
    const offsetHeight = browserSize.height-200;
    const offsetLeft = parseInt((0.275 * browserSize.width) - (0.135 * browserSize.width));

    if( EXP.win.expStipendWindow == null ) {  // True the first time...
        EXP.win.expStipendWindow = new dhx.Window(
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

        EXP.layout.expStipendList = new dhx.Layout(null, {
            type: "none",
            rows: [
                {
                    id : EXP.scalars.toolbarCellID.stipList,
                    height: "content",
                },{
                    id : EXP.scalars.contentCellID.stipList,
                    css: "dhx_layout_cell--border-top"
                }
            ]
        });

        EXP.toolbar.expStipendToolbar = new dhx.Toolbar(null, {
            css: "toolbar-custom",
            data: [
                {
                    id: "popup-title",
                    type: "customHTML",
                    html: "Stipends Picklist",
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

        EXP.toolbar.expStipendToolbar.events.on("click",
            (id) => { 
                switch(id) {
                    case "popup-grid-refresh":
                        EXP.func.ExpRefreshStipendPicklistGrid();
                        break;
                    case "popup-window-close":
                        EXP.win.expStipendWindow.hide();
                        break;
                    case "popup-title":
                        break;
                    default:
                        MessageIt("Not Yet Implemented");
                }
            }
        );

        EXP.func.ExpRefreshStipendPicklistGrid();
    }
}


EXP.func.ExpRefreshStipendPicklistGrid = function() {
    let url = 'mExperience/php/getStipendPicklist.php';
    dhx.ajax.get(url).then(
        json => {
            EXP.grid.expStipendGrid = new dhx.Grid(null,{
                // columns : MakeGridColumns(json.columns),
                columns : json.columns,
                selection: "row",
                autoWidth: true,
                editable: false,
                data: json.data,
            });

            EXP.layout.expStipendList
                .getCell(EXP.scalars.toolbarCellID.stipList)
                .attach(EXP.toolbar.expStipendToolbar);

            EXP.layout.expStipendList
                .getCell(EXP.scalars.contentCellID.stipList)
                .attach(EXP.grid.expStipendGrid);
    
            EXP.win.expStipendWindow
                .attach(EXP.layout.expStipendList);
        }
    )
}

EXP.func.InsertStipendGU = function(stipend_gu, activity) {

    if(EXP.scalars.current.formId == "expAdd") {
        EXP.form.addForm.getItem("stipend_gu").setValue(stipend_gu);
        EXP.form.addForm.getItem("stipend").setValue(activity);
    } else if (EXP.scalars.current.formId == "expSrch") {
        EXP.form.searchForm.getItem("stipend_gu").setValue(stipend_gu);
        EXP.form.searchForm.getItem("stipend").setValue(activity);
    }
    
    EXP.win.expStipendWindow.hide();
}