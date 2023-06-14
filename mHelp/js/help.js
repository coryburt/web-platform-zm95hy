/*
 *
 *  help.js
 * 
 * ***************************************************************************************** */

const HELP = {
    layout:
    {
        helpLayout : null,
        helpLayoutForm : null,
    },
    scalars:
    {
        toolbarID :
        {
            mainHeader : 'help_header',
            formMenu   : 'help_form_menu_area',
        },
        contentCellID :
        {
            mainData : 'help_data',
            formData   : 'help_form_menu_area',
        }
    },
    html:
    {
        helpHtml : 
        `<div class="help_content_area">`+
            `<div class="help_col">`+
                `<div class="help_icon_box">`+
                    `<div class="help_icon-box-icon" style="background-image: url('./includes/images/dev1.png'); background-size:contain; width:100px;"></div>`+
                    `<h3 class="help_icon-box-title">Blake <br>Ponte-Larson</h3>`+
                    `<p class="help_icon-box-content"><span style="color: #ffffff;"><b>Senior Systems Analyst</b><br>Ext.6726</span></p>`+
                `</div>`+
            `</div>`+
            `<div class="help_col">`+
                `<div class="help_icon_box">`+
                    `<div class="help_icon-box-icon" style="background-image: url('./includes/images/dev2.png'); background-size:contain; width:100px;"></div>`+
                    `<h3 class="help_icon-box-title">Lucas <br>Harlor</h3>`+
                    `<p class="help_icon-box-content"><span style="color: #ffffff;"><b>System Analyst</b><br>Ext.6725</span></p>`+
                `</div>`+
            `</div>`+
            `<div class="help_col">`+
                `<div class="help_icon_box">`+
                    `<div class="help_icon-box-icon" style="background-image: url('./includes/images/dev3.png'); background-size:contain; width:100px;"></div>`+
                    `<h3 class="help_icon-box-title">Cory <br>Burt</h3>`+
                    `<p class="help_icon-box-content"><span style="color: #ffffff;"><b>System Analyst</b><br>Ext.6727</span></p>`+
                `</div>`+
            `</div>`+
            `<div class="help_col">`+
                `<div class="help_icon_box">`+
                    `<div class="help_icon-box-icon" style="background-image: url('./includes/images/dev4.png'); background-size:contain; width:100px;"></div>`+
                    `<h3 class="help_icon-box-title">Matthew <br>Litwin</h3>`+
                    `<p class="help_icon-box-content"><span style="color: #ffffff;"><b>Senior Systems Analyst</b><br>Ext.6724</span></p>`+
                `</div>`+
            `</div>`+
       `</div>`,
    },
    func : {},
};

function InitHelp(contentCell) {
    const helpLayoutConfig = {
        type: "space",
        css: "help-layout",
        rows: [
            {
                id: "toolbar",
                html: "Need Help? Contact the developers.",
                css: "help-layout-header",
                height: "60px"
            },
            {
                id: "content",
                css: "help-layout-content",
                html: HELP.html.helpHtml,
            },
        ]
    };

    HELP.layout.helpLayout = new dhx.Layout(null, helpLayoutConfig);
    contentCell.attach(HELP.layout.helpLayout);

    // HELP.layout.helpLayout.data.update("content", {html:`<div></div>`});
    // { html: `<div>`+
    //         `<div>`+
    //             `<div>`+
    //                 `<div>`+
    //                     `<div></div>`+
    //                     `<h3>Address</h3>`+
    //                     `<p><span><b>Blake Ponte-Larson</b><br>CONTACT NUMBER</span></p>`+
    //                 `</div>`+
    //             `</div>`+
    //         `</div>`+
    //    `</div>` }
    // );

}

function getHelp(id) {
    MessageIt('Not Yet Implemented', 'warning');

}