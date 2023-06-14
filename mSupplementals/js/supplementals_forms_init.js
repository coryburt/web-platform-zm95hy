/*
 *  supplementals_forms_init.js
 *  
 *  Supplemental module declarations of forms for the global namespace
 * 
 * ***************************************************************************************** */

// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
//      INITIALIZE FORMS AND FORM-FIELDS
// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

SUP.formFlds.get(`ath`).set(
    `input`, 
    {
        supp_gu     : { id: `i_supp_gu`,         fname: `supp_gu`,            label : `` },
        supp_year   : { id: `i_supp_year`,       fname: `supp_year`,          label : `Fiscal Year` },
        supp_year_vc: { id: `i_supp_year_vc`,    fname: `supp_year_vc`,       label : `` },
        is_expr     : { 
                        id    : `i_is_expr`,      fname : `is_expr`,
                        label : `Is Experience?`, width : 280
                      },
        name        : { id: `i_name`,            fname: `name`,               label : `Name` },
        badge_id    : { id: `i_badge_id`,        fname: `badge_id`,           label : `Badge Number` },
        stipend     : { id: `i_stipend`,         fname: `stipend`,            label : `Program` },
        stipend_vc  : { 
                        id    : SUP.common.get(`ath`).get(`input`).stipend_vc_id,
                        fname : SUP.common.get(`ath`).get(`input`).stipend_vc_fname,
                        label : `` 
                      },
        location    : { id: `i_location`,        fname: `location`,           label : `Location` },
        location_vc : { id: `i_location_vc`,     fname: `location_vc`,        label : `` },
        gender      : { id: `i_gender`,          fname: `gender`,             label : `Gender` },
        gender_vc   : { id: `i_gender_vc`,       fname: `gender_vc`,          label : `` },
        non_cont    : { id: `i_non_cont`,        fname: `non_cont`,           label : `Non-Continuing?` },
        distrib     : { id: `i_distrib`,         fname: `distrib`,            label : `Distribution` },
        distrib_vc  : { id: `i_distrib_vc`,      fname: `distrib_vc`,         label : `` },
        freq        : { id: `i_freq`,            fname: `freq`,               label : `Frequency` },
        freq_vc     : { id: `i_freq_vc`,         fname: `freq_vc`,            label : `` },
        split       : { id: `i_split`,           fname: `split`,              label : `Split` },
        split_vc    : { id: `i_split_vc`,        fname: `split_vc`,           label : `` },
        split_amt   : { id: `i_split_amt`,       fname: `split_amt`,          label : `Split Amount` },
        comments    : { id: `i_comments`,        fname: `comments`,           label : `Comments` },
        stip_lookup : { id: `i_stip_lookup`,     fname: `stip_lookup`,        label : `` },
        stip_grid   : { id: `i_oth_stip_grid`,   fname: `oth_stip_grid`,      label : `` },
        exp_grid    : { id: `i_exper_grid`,      fname: `exper_grid`,         label : `` },
        actv_certs  : { id: `i_actv_certs_grid`, fname: `actv_certs_grid`,    label : `` },
        reqd_certs  : { id: `i_reqd_certs_grid`, fname: `reqd_certs_grid`,    label : `` },
        id_stamp    : { id: `i_id_stamp`,        fname: `id_stamp`,           label : `` },
        acct_code   : { id: `i_acct_code`,       fname: `acct_code`,          label : `` },
    }
);

//  ----------------------------------------------------------------------------------

SUP.formFlds.get(`ath`).set(
    `edit`,
    {
        supp_gu     : { id: `e_supp_gu`,         fname: `supp_gu`,            label : `` },
        supp_year   : { id: `e_supp_year`,       fname: `supp_year`,          label : `Fiscal Year` },
        supp_year_vc: { id: `e_supp_year_vc`,    fname: `supp_year_vc`,       label : `` },
        is_expr     : { 
                        id: `e_is_expr`,         fname: `is_expr`,            
                        label: `Is Experience?`, width: 280
                      },
        name        : { id: `e_name`,            fname: `name`,               label : `Name` },
        badge_id    : { id: `e_badge_id`,        fname: `badge_id`,           label : `Badge Number` },
        stipend     : { id: `e_stipend`,         fname: `stipend`,            label : `Program` },
        stipend_vc  : { 
                            id    : SUP.common.get(`ath`).get(`edit`).stipend_vc_id,
                            fname : SUP.common.get(`ath`).get(`edit`).stipend_vc_fname,
                            label : `` 
                      },
        location    : { id: `e_location`,        fname: `location`,           label : `Location` },
        location_vc : { id: `e_location_vc`,     fname: `location_vc`,        label : `` },
        gender      : { id: `e_gender`,          fname: `gender`,             label : `Gender` },
        gender_vc   : { id: `e_gender_vc`,       fname: `gender_vc`,          label : `` },
        non_cont    : { id: `e_non_cont`,        fname: `non_cont`,           label : `Non-Continuing?` },
        distrib     : { id: `e_distrib`,         fname: `distrib`,            label : `Distribution` },
        distrib_vc  : { id: `e_distrib_vc`,      fname: `distrib_vc`,         label : `` },
        freq        : { id: `e_freq`,            fname: `freq`,               label : `Frequency` },
        freq_vc     : { id: `e_freq_vc`,         fname: `freq_vc`,            label : `` },
        split       : { id: `e_split`,           fname: `split`,              label : `Split` },
        split_vc    : { id: `e_split_vc`,        fname: `split_vc`,           label : `` },
        split_amt   : { id: `e_split_amt`,       fname: `split_amt`,          label : `Split Amount` },
        comments    : { id: `e_comments`,        fname: `comments`,           label : `Comments` },
        stip_lookup : { id: `e_stip_lookup`,     fname: `stip_lookup`,        label : `` },
        stip_grid   : { id: `e_oth_stip_grid`,   fname: `oth_stip_grid`,      label : `` },
        exp_grid    : { id: `e_exper_grid`,      fname: `exper_grid`,         label : `` },
        actv_certs  : { id: `e_actv_certs_grid`, fname: `actv_certs_grid`,    label : `` },
        reqd_certs  : { id: `e_reqd_certs_grid`, fname: `reqd_certs_grid`,    label : `` },
        id_stamp    : { id: `e_id_stamp`,        fname: `id_stamp`,           label : `` },
        acct_code   : { id: `e_acct_code`,       fname: `acct_code`,          label : `` },
    }
);
//  ----------------------------------------------------------------------------------

SUP.formFlds.get(`ath`).set(
    `view`,
    {
        supp_gu     : { id: `va_supp_gu`,         fname: `supp_gu`,            label : `` },
        supp_year   : { id: `va_supp_year`,       fname: `supp_year`,          label : `Fiscal Year` },
        supp_year_vc: { id: `va_supp_year_vc`,    fname: `supp_year_vc`,       label : `` },
        is_expr     : { 
                        id: `va_is_expr`,         fname: `is_expr`,            
                        label: `Is Experience?`, width: 280
                      },
        name        : { id: `va_name`,            fname: `name`,               label : `Name` },
        badge_id    : { id: `va_badge_id`,        fname: `badge_id`,           label : `Badge Number` },
        stipend     : { id: `va_stipend`,         fname: `stipend`,            label : `Program` },
        stipend_vc  : { 
                            id    : SUP.common.get(`ath`).get(`view`).stipend_vc_id,
                            fname : SUP.common.get(`ath`).get(`view`).stipend_vc_fname,
                            label : `` 
                      },
        location    : { id: `va_location`,        fname: `location`,           label : `Location` },
        location_vc : { id: `va_location_vc`,     fname: `location_vc`,        label : `` },
        gender      : { id: `va_gender`,          fname: `gender`,             label : `Gender` },
        gender_vc   : { id: `va_gender_vc`,       fname: `gender_vc`,          label : `` },
        non_cont    : { id: `va_non_cont`,        fname: `non_cont`,           label : `Non-Continuing?` },
        distrib     : { id: `va_distrib`,         fname: `distrib`,            label : `Distribution` },
        distrib_vc  : { id: `va_distrib_vc`,      fname: `distrib_vc`,         label : `` },
        freq        : { id: `va_freq`,            fname: `freq`,               label : `Frequency` },
        freq_vc     : { id: `va_freq_vc`,         fname: `freq_vc`,            label : `` },
        split       : { id: `va_split`,           fname: `split`,              label : `Split` },
        split_vc    : { id: `va_split_vc`,        fname: `split_vc`,           label : `` },
        split_amt   : { id: `va_split_amt`,       fname: `split_amt`,          label : `Split Amount` },
        comments    : { id: `va_comments`,        fname: `comments`,           label : `Comments` },
        stip_lookup : { id: `va_stip_lookup`,     fname: `stip_lookup`,        label : `` },
        stip_grid   : { id: `va_oth_stip_grid`,   fname: `oth_stip_grid`,      label : `` },
        exp_grid    : { id: `va_exper_grid`,      fname: `exper_grid`,         label : `` },
        actv_certs  : { id: `va_actv_certs_grid`, fname: `actv_certs_grid`,    label : `` },
        reqd_certs  : { id: `va_reqd_certs_grid`, fname: `reqd_certs_grid`,    label : `` },
        id_stamp    : { id: `va_id_stamp`,        fname: `id_stamp`,           label : `` },
        acct_code   : { id: `va_acct_code`,       fname: `acct_code`,          label : `` },
    }
);

// ----------------------------------------------------------------------------------

SUP.formCSS.get(`ath`).set( 
    `input`, 
    {
        main    : `sup-ath-input-form`,
        roInput : `readonly-input`,
        vo      : false,
    }
);

SUP.formCSS.get(`ath`).set( 
    `edit`,  
    {
        main    : `sup-ath-edit-form`,
        roInput : `reado,nly-input`,
        vo      : false,
    }
);

SUP.formCSS.get(`ath`).set( 
    `view`,
    {
        main    : `sup-ath-view-form`,
        roInput : `readonly-input`,
        vo      : true,
    }
);

SUP.formCSS.get(`oth`).set( 
    `input`, 
    {
        main    : `sup-oth-input-form`,
        roInput : `readonly-input`
    }
);

SUP.formCSS.get(`oth`).set( 
    `edit`,  
    {
        main    : `sup-oth-edit-form`,
        roInput : `readonly-input`
    }
);

SUP.formCSS.get(`oth`).set( 
    `view`,
    {
        main    : `sup-oth-view-form`,
        roInput : `readonly-input`,
        vo      : true,
    }
);

// ----------------------------------------------------------------------------------

SUP.scalar.get(`ath`).set(
    `input`,
    {
        labelWidth      : 125,
        fieldWidth      : 450,
        fieldPadding    : 3,
        roStatus        : false,
        vo              : false,
    }
);

SUP.scalar.get(`ath`).set(
    `edit`,
    {
        labelWidth      : 125,
        fieldWidth      : 450,
        fieldPadding    : 3,
        roStatus        : true,
        vo              : false,
    }
);

SUP.scalar.get(`ath`).set(
    `view`,
    {
        labelWidth      : 125,
        fieldWidth      : 450,
        fieldPadding    : 3,
        roStatus        : true,
        vo              : true,
    }
);

// ----------------------------------------------------------------------------------

SUP.listOfActions.forEach(
    ACT => {
        let button_set = [];
        if( ACT == `input`) {
            button_set = [
                {
                    type: "button",
                    name: "save_and_close",
                    text: `Save & Close`,
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "cancel_and_close",
                    text: `Cancel`,
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "reset_form",
                    text: `Clear`,
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "form_info",
                    icon: "fa-solid fa-info-circle",
                    tooltip: "Input and Edit Form Info",
                    size: "medium",
                    circle: true,
                    color: "primary",
                    padding: "10px",
                    view: "link",
                }
            ];
        } else {
            button_set = [
                {
                    type: "button",
                    name: "save_and_close",
                    text: `Save & Close`,
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "cancel_and_close",
                    text: `Cancel`,
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "form_info",
                    icon: "fa-solid fa-info-circle",
                    tooltip: "Input and Edit Form Info",
                    size: "medium",
                    circle: true,
                    color: "primary",
                    padding: "10px",
                    view: "link",
                }
            ];
        }

        SUP.formCfg.get(`ath`).set(
            ACT, 
            {
                css: SUP.formCSS.get(`ath`).get(ACT).main,
                width: `100%`,
                padding: 5,
                rows: [
                    {
                        cols:[
                            {
                                align: "start",
                                padding: 5,
                                rows:[
                                    {
                                        type: "radioGroup",
                                        label: SUP.formFlds.get(`ath`).get(ACT).is_expr.label,
                                        labelPosition: "left",
                                        labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                        css: `custom-radio-button`,
                                        padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                        name: SUP.formFlds.get(`ath`).get(ACT).is_expr.fname, 
                                        id: SUP.formFlds.get(`ath`).get(ACT).is_expr.id,
                                        value: `0`,
                                        options: {
                                            cols: [
                                                {
                                                    type: `radioButton`,
                                                    text: `Yes`,
                                                    value: `1`,
                                                },{
                                                    type: `radioButton`,
                                                    text: `No`,
                                                    value: `0`,
                                                }
                                            ]
                                        }
                                    },{
                                        cols: [
                                            {
                                                type: `combo`,
                                                labelPosition: `left`,
                                                label: SUP.formFlds.get(`ath`).get(ACT).supp_year.label,
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                disabled: SUP.scalar.get(`ath`).get(ACT).roStatus,
                                                id: SUP.formFlds.get(`ath`).get(ACT).supp_year.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).supp_year.fname,
                                                multiselection: true,
                                                readOnly: SUP.formFlds.get(`ath`).get(ACT).roStatus &&
                                                            SUP.formFlds.get(`ath`).get(ACT).vo
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`ath`).get(ACT).supp_year_vc.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).supp_year_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols:[
                                            {
                                                type: "combo",
                                                label: SUP.formFlds.get(`ath`).get(ACT).name.label
                                                        + `/`
                                                        + SUP.formFlds.get(`ath`).get(ACT).badge_id.label,
                                                labelPosition: "left",
                                                required: true,
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                disabled : SUP.scalar.get(`ath`).get(ACT).roStatus,
                                                name: SUP.formFlds.get(`ath`).get(ACT).name.fname, 
                                                id: SUP.formFlds.get(`ath`).get(ACT).name.id
                                            },{
                                                type: "combo",
                                                width: 77,
                                                disabled: SUP.scalar.get(`ath`).get(ACT).roStatus,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).badge_id.fname, 
                                                id: SUP.formFlds.get(`ath`).get(ACT).badge_id.id
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "input",
                                                label: SUP.formFlds.get(`ath`).get(ACT).stipend.label,
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                readOnly: true,
                                                required: true,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).stipend.fname, 
                                                id: SUP.formFlds.get(`ath`).get(ACT).stipend.id
                                            },{
                                                type: "button",
                                                css: "custom-sup-form-button",
                                                size: "small",
                                                name: SUP.formFlds.get(`ath`).get(ACT).stip_lookup.fname,
                                                id: SUP.formFlds.get(`ath`).get(ACT).stip_lookup.id,
                                                icon: "dxi dxi-magnify",
                                                circle: true,
                                                padding: 8,
                                                view: "link",
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`ath`).get(ACT).stipend_vc.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).stipend_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: "Location",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                readOnly: true,
                                                required: true,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).location.fname, 
                                                id: SUP.formFlds.get(`ath`).get(ACT).location.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`ath`).get(ACT).location_vc.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).location_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                labelPosition: "left",
                                                required: true,
                                                label: SUP.formFlds.get(`ath`).get(ACT).gender.label,
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).gender.fname, 
                                                id: SUP.formFlds.get(`ath`).get(ACT).gender.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`ath`).get(ACT).gender_vc.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).gender_vc.fname
                                            }
                                        ]
                                    },{
                                        type: "radioGroup",
                                        label: SUP.formFlds.get(`ath`).get(ACT).non_cont.label,
                                        labelPosition: "left",
                                        labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                        css: `custom-radio-button`,
                                        // width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                        padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                        name: SUP.formFlds.get(`ath`).get(ACT).non_cont.fname, 
                                        id: SUP.formFlds.get(`ath`).get(ACT).non_cont.id,
                                        value: `0`,
                                        options: {
                                            cols: [
                                                {
                                                    type: `radioButton`,
                                                    text: `Yes`,
                                                    value: `1`,
                                                },{
                                                    type: `radioButton`,
                                                    text: `No`,
                                                    value: `0`,
                                                }
                                            ]
                                        }
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: SUP.formFlds.get(`ath`).get(ACT).distrib.label,
                                                labelPosition: "left",
                                                value: `OTH`,
                                                readOnly: true,
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).distrib.fname,
                                                id: SUP.formFlds.get(`ath`).get(ACT).distrib.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`ath`).get(ACT).distrib_vc.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).distrib_vc.fname,
                                                value: `OTH`,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: SUP.formFlds.get(`ath`).get(ACT).freq.label,
                                                labelPosition: "left",
                                                required: true,
                                                value: `OTH`,
                                                readOnly: true,
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).freq.fname, 
                                                id: SUP.formFlds.get(`ath`).get(ACT).freq.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`ath`).get(ACT).freq_vc.id,
                                                name: SUP.formFlds.get(`ath`).get(ACT).freq_vc.fname,
                                                value: `OTH`,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: SUP.formFlds.get(`ath`).get(ACT).split.label,
                                                labelPosition: "left",
                                                value: `NOT`,
                                                readOnly: true,
                                                labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`ath`).get(ACT).split.fname,
                                                id: SUP.formFlds.get(`ath`).get(ACT).split.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                value: `NOT`,
                                                name: SUP.formFlds.get(`ath`).get(ACT).split_vc.fname,
                                                id: SUP.formFlds.get(`ath`).get(ACT).split_vc.id
                                            }
                                        ]
                                    },{
                                        type: "input",
                                        label: SUP.formFlds.get(`ath`).get(ACT).split_amt.label,
                                        labelPosition: "left",
                                        labelWidth: SUP.scalar.get(`ath`).get(ACT).labelWidth,
                                        width: SUP.scalar.get(`ath`).get(ACT).fieldWidth,
                                        disabled: true,
                                        padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                        name: SUP.formFlds.get(`ath`).get(ACT).split_amt.fname, 
                                        id: SUP.formFlds.get(`ath`).get(ACT).split_amt.id
                                    },{
                                        type: "textarea",
                                        name: SUP.formFlds.get(`ath`).get(ACT).comments.fname, 
                                        id: SUP.formFlds.get(`ath`).get(ACT).comments.id,
                                        label: SUP.formFlds.get(`ath`).get(ACT).comments.label,
                                        labelWidth: "150px",
                                        width: 450,
                                        labelPosition: "left",
                                        disabled: false,
                                        required: false,
                                        readOnly: false,
                                        resizable: false,
                                        height: "150px",
                                        hidden: false,
                                        padding: SUP.scalar.get(`ath`).get(ACT).fieldPadding,
                                    }
                                ]
                            },{
                                align: "start",
                                padding: "10px",
                                rows: [
                                    {
                                        type: "container",
                                        name: "staff_image",
                                        height: 156,
                                        width: 185,
                                        css: "custom-sup-form-container",
                                    },{
                                        type: "container",
                                        name: SUP.formFlds.get(`ath`).get(ACT).stip_grid.fname,
                                        id: SUP.formFlds.get(`ath`).get(ACT).stip_grid.id,
                                        padding: "12px 0px",
                                        height: 200,
                                        width: 560,
                                    },{
                                        type: "container",
                                        name: SUP.formFlds.get(`ath`).get(ACT).exp_grid.fname,
                                        id: SUP.formFlds.get(`ath`).get(ACT).exp_grid.id,
                                        height: 174,
                                        width: 660,
                                    }
                                ]
                            }
                        ]
                    },{
                        align: "evenly",
                        padding: "8px",
                        cols: [
                            {
                                type: "container",
                                name: SUP.formFlds.get(`ath`).get(ACT).actv_certs.fname,
                                id: SUP.formFlds.get(`ath`).get(ACT).actv_certs.id,
                                padding: 12,
                                height: "300px",
                                width: "45%"
                            },{
                                type: "container",
                                name: SUP.formFlds.get(`ath`).get(ACT).reqd_certs.fname,
                                id: SUP.formFlds.get(`ath`).get(ACT).reqd_certs.id,
                                padding: 12,
                                height: "300px",
                                width: "45%"
                            }
                        ]
                    },{
                        type    : `input`,
                        id      : SUP.formFlds.get(`ath`).get(ACT).supp_gu.id,
                        name    : SUP.formFlds.get(`ath`).get(ACT).supp_gu.fname,
                        hidden  : true,
                        value   : ``,
                    },{
                        type    : "input",
                        name    : SUP.formFlds.get(`ath`).get(ACT).id_stamp.fname, 
                        id      : SUP.formFlds.get(`ath`).get(ACT).id_stamp.id,
                        hidden  : true,
                        value   : ``,
                    },{
                        type    : "input",
                        name    : SUP.formFlds.get(`ath`).get(ACT).acct_code.fname, 
                        id      : SUP.formFlds.get(`ath`).get(ACT).acct_code.id,
                        hidden  : true,
                        value   : ``,
                    },{
                        type: "spacer",
                    },{
                        align: "center",
                        padding: "8px",
                        css: "custom-sup-form-group",
                        cols: button_set,
                    }
                ]
            }
        );
    }
);

//  -----------------------------------------------------------------------------------------------------

SUP.formCfg.get(`ath`).set(
    `view`, 
    {
        css: SUP.formCSS.get(`ath`).get(`view`).main,
        width: `100%`,
        padding: 5,
        rows: [
            {
                cols:[
                    {
                        align: `start`,
                        padding: 5,
                        rows:[
                            {
                                type: `input`,
                                labelPosition: `left`,
                                label: SUP.formFlds.get(`ath`).get(`view`).supp_year.label,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                id: SUP.formFlds.get(`ath`).get(`view`).supp_year.id,
                                name: SUP.formFlds.get(`ath`).get(`view`).supp_year.fname,
                                readOnly : true,
                            },{
                                type: `input`,
                                labelPosition: `left`,
                                width: SUP.formFlds.get(`ath`).get(`view`).is_expr.width,
                                label: SUP.formFlds.get(`ath`).get(`view`).is_expr.label,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                id: SUP.formFlds.get(`ath`).get(`view`).is_expr.id,
                                name: SUP.formFlds.get(`ath`).get(`view`).is_expr.fname,
                                value: `NO`,
                                css: SUP.formCSS.get(`ath`).get(`view`).roInput,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).name.label
                                        + `/`
                                        + SUP.formFlds.get(`ath`).get(`view`).badge_id.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).name.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).name.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).stipend.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).stipend.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).stipend.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: `Location`,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).location.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).location.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                labelPosition: `left`,
                                label: SUP.formFlds.get(`ath`).get(`view`).gender.label,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).gender.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).gender.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).non_cont.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).non_cont.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).non_cont.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).distrib.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).distrib.fname,
                                id: SUP.formFlds.get(`ath`).get(`view`).distrib.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).freq.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).freq.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).freq.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).split.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).split.fname,
                                id: SUP.formFlds.get(`ath`).get(`view`).split.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`ath`).get(`view`).split_amt.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`ath`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`ath`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`ath`).get(`view`).split_amt.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).split_amt.id,
                                readOnly: true,
                            },{
                                type: `textarea`,
                                name: SUP.formFlds.get(`ath`).get(`view`).comments.fname, 
                                id: SUP.formFlds.get(`ath`).get(`view`).comments.id,
                                label: SUP.formFlds.get(`ath`).get(`view`).comments.label,
                                labelWidth: `150px`,
                                width: 450,
                                labelPosition: `left`,
                                disabled: false,
                                required: false,
                                readOnly: false,
                                resizable: false,
                                height: `150px`,
                                hidden: false,
                                padding: SUP.scalar.get(`ath`).get(`view`).fieldPadding,
                                readOnly: true,
                            }
                        ]
                    },{
                        align: `start`,
                        padding: `10px`,
                        rows: [
                            {
                                type: `container`,
                                name: `staff_image`,
                                height: 156,
                                width: 185,
                                css: `custom-sup-form-container`,
                            },{
                                type: `container`,
                                name: SUP.formFlds.get(`ath`).get(`view`).stip_grid.fname,
                                id: SUP.formFlds.get(`ath`).get(`view`).stip_grid.id,
                                padding: `12px 0px`,
                                height: 200,
                                width: 560,
                            },{
                                type: `container`,
                                name: SUP.formFlds.get(`ath`).get(`view`).exp_grid.fname,
                                id: SUP.formFlds.get(`ath`).get(`view`).exp_grid.id,
                                height: 174,
                                width: 660,
                            }
                        ]
                    }
                ]
            },{
                align: `evenly`,
                padding: `8px`,
                cols: [
                    {
                        type: `container`,
                        name: SUP.formFlds.get(`ath`).get(`view`).actv_certs.fname,
                        id: SUP.formFlds.get(`ath`).get(`view`).actv_certs.id,
                        padding: 12,
                        height: `300px`,
                        width: `45%`
                    },{
                        type: `container`,
                        name: SUP.formFlds.get(`ath`).get(`view`).reqd_certs.fname,
                        id: SUP.formFlds.get(`ath`).get(`view`).reqd_certs.id,
                        padding: 12,
                        height: `300px`,
                        width: `45%`
                    }
                ]
            },{
                type    : `input`,
                id      : SUP.formFlds.get(`ath`).get(`view`).supp_gu.id,
                name    : SUP.formFlds.get(`ath`).get(`view`).supp_gu.fname,
                hidden  : true,
                value   : ``,
            },{
                type    : `input`,
                name    : SUP.formFlds.get(`ath`).get(`view`).id_stamp.fname, 
                id      : SUP.formFlds.get(`ath`).get(`view`).id_stamp.id,
                hidden  : true,
                value   : ``,
            },{
                type    : `input`,
                name    : SUP.formFlds.get(`ath`).get(`view`).acct_code.fname, 
                id      : SUP.formFlds.get(`ath`).get(`view`).acct_code.id,
                hidden  : true,
                value   : ``,
            },{
                type    : `input`,
                name    : SUP.formFlds.get(`ath`).get(`view`).stipend_vc.fname, 
                id      : SUP.formFlds.get(`ath`).get(`view`).stipend_vc.id,
                hidden  : true,
                value   : ``,
            },{
                type    : `input`,
                name    : SUP.formFlds.get(`ath`).get(`view`).badge_id.fname, 
                id      : SUP.formFlds.get(`ath`).get(`view`).badge_id.id,
                hidden  : true,
                value   : ``,
            }
        ]
    }
);

// ========================================================================================================

SUP.formFlds.get(`oth`).set(
    `input`, 
    {
        supp_gu     : { id: `oi_supp_gu`,         fname: `supp_gu`,            label : `` },
        supp_year   : { id: `oi_supp_year`,       fname: `supp_year`,          label : `Fiscal Year` },
        supp_year_vc: { id: `oi_supp_year_vc`,    fname: `supp_year_vc`,       label : `` },
        is_expr     : { 
                        id: `oi_is_expr`,         fname: `is_expr`,            
                        label: `Is Experience?`, width: 280
                      },
        name        : { id: `oi_name`,            fname: `name`,               label : `Name` },
        badge_id    : { id: `oi_badge_id`,        fname: `badge_id`,           label : `Badge Number` },
        stipend     : { id: `oi_stipend`,         fname: `stipend`,            label : `Program` },
        stipend_vc  : { id: `oi_stipend_vc`,      fname: `stipend_vc`,         label : `` },
        location    : { id: `oi_location`,        fname: `location`,           label : `Location` },
        location_vc : { id: `oi_location_vc`,     fname: `location_vc`,        label : `` },
        distrib     : { id: `oi_distrib`,         fname: `distrib`,            label : `Distribution` },
        distrib_vc  : { id: `oi_distrib_vc`,      fname: `distrib_vc`,         label : `` },
        freq        : { id: `oi_freq`,            fname: `freq`,               label : `Frequency` },
        freq_vc     : { id: `oi_freq_vc`,         fname: `freq_vc`,            label : `` },
        split       : { id: `oi_split`,           fname: `split`,              label : `Split` },
        split_vc    : { id: `oi_split_vc`,        fname: `split_vc`,           label : `` },
        split_amt   : { id: `oi_split_amt`,       fname: `split_amt`,          label : `Split Amount` },
        comments    : { id: `oi_comments`,        fname: `comments`,           label : `Comments` },
        stip_lookup : { id: `oi_stip_lookup`,     fname: `stip_lookup`,        label : `` },
        stip_grid   : { id: `oi_oth_stip_grid`,   fname: `oth_stip_grid`,      label : `` },
        exp_grid    : { id: `oi_exper_grid`,      fname: `exper_grid`,         label : `` },
        actv_certs  : { id: `oi_actv_certs_grid`, fname: `actv_certs_grid`,    label : `` },
        reqd_certs  : { id: `oi_reqd_certs_grid`, fname: `reqd_certs_grid`,    label : `` },
        id_stamp    : { id: `oi_id_stamp`,        fname: `id_stamp`,           label : `` },
        acct_code   : { id: `oi_acct_code`,       fname: `acct_code`,          label : `` },
    }
);

SUP.formFlds.get(`oth`).set(
    `edit`, 
    {
        supp_gu     : { id: `oe_supp_gu`,         fname: `supp_gu`,            label : `` },
        supp_year   : { id: `oe_supp_year`,       fname: `supp_year`,          label : `Fiscal Year` },
        supp_year_vc: { id: `oe_supp_year_vc`,    fname: `supp_year_vc`,       label : `` },
        is_expr     : { 
                        id: `oe_is_expr`,         fname: `is_expr`,            
                        label: `Is Experience?`, width: 280
                      },
        name        : { id: `oe_name`,            fname: `name`,               label : `Name` },
        badge_id    : { id: `oe_badge_id`,        fname: `badge_id`,           label : `Badge Number` },
        stipend     : { id: `oe_stipend`,         fname: `stipend`,            label : `Program` },
        stipend_vc  : { id: `oe_stipend_vc`,      fname: `stipend_vc`,         label : `` },
        location    : { id: `oe_location`,        fname: `location`,           label : `Location` },
        location_vc : { id: `oe_location_vc`,     fname: `location_vc`,        label : `` },
        distrib     : { id: `oe_distrib`,         fname: `distrib`,            label : `Distribution` },
        distrib_vc  : { id: `oe_distrib_vc`,      fname: `distrib_vc`,         label : `` },
        freq        : { id: `oe_freq`,            fname: `freq`,               label : `Frequency` },
        freq_vc     : { id: `oe_freq_vc`,         fname: `freq_vc`,            label : `` },
        split       : { id: `oe_split`,           fname: `split`,              label : `Split` },
        split_vc    : { id: `oe_split_vc`,        fname: `split_vc`,           label : `` },
        split_amt   : { id: `oe_split_amt`,       fname: `split_amt`,          label : `Split Amount` },
        comments    : { id: `oe_comments`,        fname: `comments`,           label : `Comments` },
        stip_lookup : { id: `oe_stip_lookup`,     fname: `stip_lookup`,        label : `` },
        stip_grid   : { id: `oe_oth_stip_grid`,   fname: `oth_stip_grid`,      label : `` },
        exp_grid    : { id: `oe_exper_grid`,      fname: `exper_grid`,         label : `` },
        actv_certs  : { id: `oe_actv_certs_grid`, fname: `actv_certs_grid`,    label : `` },
        reqd_certs  : { id: `oe_reqd_certs_grid`, fname: `reqd_certs_grid`,    label : `` },
        id_stamp    : { id: `oe_id_stamp`,        fname: `id_stamp`,           label : `` },
        acct_code   : { id: `oe_acct_code`,       fname: `acct_code`,          label : `` },
    }
);

SUP.formFlds.get(`oth`).set(
    `view`, 
    {
        supp_gu     : { id: `vo_supp_gu`,         fname: `supp_gu`,            label : `` },
        supp_year   : { id: `vo_supp_year`,       fname: `supp_year`,          label : `Fiscal Year` },
        supp_year_vc: { id: `vo_supp_year_vc`,    fname: `supp_year_vc`,       label : `` },
        is_expr     : { 
                        id: `vo_is_expr`,         fname: `is_expr`,            
                        label: `Is Experience?`, width: 280
                      },
        name        : { id: `vo_name`,            fname: `name`,               label : `Name` },
        badge_id    : { id: `vo_badge_id`,        fname: `badge_id`,           label : `Badge Number` },
        stipend     : { id: `vo_stipend`,         fname: `stipend`,            label : `Program` },
        stipend_vc  : { id: `vo_stipend_vc`,      fname: `stipend_vc`,         label : `` },
        location    : { id: `vo_location`,        fname: `location`,           label : `Location` },
        location_vc : { id: `vo_location_vc`,     fname: `location_vc`,        label : `` },
        distrib     : { id: `vo_distrib`,         fname: `distrib`,            label : `Distribution` },
        distrib_vc  : { id: `vo_distrib_vc`,      fname: `distrib_vc`,         label : `` },
        freq        : { id: `vo_freq`,            fname: `freq`,               label : `Frequency` },
        freq_vc     : { id: `vo_freq_vc`,         fname: `freq_vc`,            label : `` },
        split       : { id: `vo_split`,           fname: `split`,              label : `Split` },
        split_vc    : { id: `vo_split_vc`,        fname: `split_vc`,           label : `` },
        split_amt   : { id: `vo_split_amt`,       fname: `split_amt`,          label : `Split Amount` },
        comments    : { id: `vo_comments`,        fname: `comments`,           label : `Comments` },
        stip_lookup : { id: `vo_stip_lookup`,     fname: `stip_lookup`,        label : `` },
        stip_grid   : { id: `vo_oth_stip_grid`,   fname: `oth_stip_grid`,      label : `` },
        exp_grid    : { id: `vo_exper_grid`,      fname: `exper_grid`,         label : `` },
        actv_certs  : { id: `vo_actv_certs_grid`, fname: `actv_certs_grid`,    label : `` },
        reqd_certs  : { id: `vo_reqd_certs_grid`, fname: `reqd_certs_grid`,    label : `` },
        id_stamp    : { id: `vo_id_stamp`,        fname: `id_stamp`,           label : `` },
        acct_code   : { id: `vo_acct_code`,       fname: `acct_code`,          label : `` },
    }
);

//  ------------------------------------------------------------------------------------------------------------------

SUP.scalar.get(`oth`).set(
    `input`,
    {
        labelWidth    : 125,
        fieldWidth    : 450,
        fieldPadding  : 3,
        roStatus      : false,
        vo            : false,
    }
);

SUP.scalar.get(`oth`).set(
    `edit`,
    {
        labelWidth    : 125,
        fieldWidth    : 450,
        fieldPadding  : 3,
        roStatus      : true,
        vo            : false,
    }
);

SUP.scalar.get(`oth`).set(
    `view`,
    {
        labelWidth    : 125,
        fieldWidth    : 450,
        fieldPadding  : 3,
        roStatus      : true,
        vo            : true,
    }
);

//  ------------------------------------------------------------------------------------------------------------------

SUP.listOfActions.forEach(
    ACT => {
        let button_set = [];
        if( ACT == `input` ) {
            button_set = [
                {
                    type: "button",
                    name: "save_and_close",
                    text: "Save & Close",
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "save_and_continue",
                    text: "Save & Continue",
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"                    
                },{
                    type: "button",
                    name: "cancel_and_close",
                    text: "Cancel",
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "reset_form",
                    text: `Reset`,
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "form_info",
                    icon: "fa-solid fa-info-circle",
                    tooltip: "Input and Edit Form Info",
                    size: "medium",
                    circle: true,
                    color: "primary",
                    padding: "10px",
                    view: "link",
                }
            ];
        } else {
            button_set = [
                {
                    type: "button",
                    name: "save_and_close",
                    text: "Save & Close",
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "save_and_continue",
                    text: "Save & Continue",
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"                    
                },{
                    type: "button",
                    name: "cancel_and_close",
                    text: "Cancel",
                    size: "medium",
                    view: "flat",
                    padding: "10px",
                    color: "primary"
                },{
                    type: "button",
                    name: "form_info",
                    icon: "fa-solid fa-info-circle",
                    tooltip: "Input and Edit Form Info",
                    size: "medium",
                    circle: true,
                    color: "primary",
                    padding: "10px",
                    view: "link",
                }
            ];
        }

        SUP.formCfg.get(`oth`).set(
            ACT,
            {
                css: SUP.formCSS.get(`oth`).get(ACT).main,
                width: "100%",
                padding: 5,
                rows: [
                    {
                        align: "evenly",
                        cols:[
                            {
                                padding: 5,
                                rows:[
                                    {
                                        cols: [
                                            {
                                                type: `combo`,
                                                labelPosition: `left`,
                                                label: SUP.formFlds.get(`oth`).get(ACT).supp_year.label,
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                                disabled: SUP.scalar.get(`oth`).get(ACT).roStatus,
                                                id: SUP.formFlds.get(`oth`).get(ACT).supp_year.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).supp_year.fname,
                                                readOnly: SUP.formFlds.get(`oth`).get(ACT).roStatus &&
                                                            SUP.formFlds.get(`oth`).get(ACT).vo
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`oth`).get(ACT).supp_year_vc.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).supp_year_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols:[
                                            {
                                                type: "combo",
                                                label: "Name/Badge Number",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                                disabled : SUP.scalar.get(`oth`).get(ACT).roStatus,
                                                name: SUP.formFlds.get(`oth`).get(ACT).name.fname, 
                                                id: SUP.formFlds.get(`oth`).get(ACT).name.id
                                            },{
                                                type: "combo",
                                                width: 77,
                                                disabled: SUP.scalar.get(`oth`).get(ACT).roStatus,
                                                padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`oth`).get(ACT).badge_id.fname, 
                                                id: SUP.formFlds.get(`oth`).get(ACT).badge_id.id,
                                                readOnly: SUP.formFlds.get(`oth`).get(ACT).roStatus &&
                                                            SUP.formFlds.get(`oth`).get(ACT).vo
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "input",
                                                label: "Stipend",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                readOnly: true,
                                                padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`oth`).get(ACT).stipend.fname, 
                                                id: SUP.formFlds.get(`oth`).get(ACT).stipend.id,
                                            },{
                                                type: "button",
                                                css: "custom-sup-form-button",
                                                size: "small",
                                                name: SUP.formFlds.get(`oth`).get(ACT).stip_lookup.fname,
                                                id: SUP.formFlds.get(`oth`).get(ACT).stip_lookup.id,
                                                icon: "dxi dxi-magnify",
                                                circle: true,
                                                padding: 8,
                                                view: "link",
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`oth`).get(ACT).stipend_vc.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).stipend_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: "Location",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                readOnly: true,
                                                padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                                name: SUP.formFlds.get(`oth`).get(ACT).location.fname, 
                                                id: SUP.formFlds.get(`oth`).get(ACT).location.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`oth`).get(ACT).location_vc.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).location_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: "Distribution",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                padding: 3,
                                                name: SUP.formFlds.get(`oth`).get(ACT).distrib.fname,
                                                id: SUP.formFlds.get(`oth`).get(ACT).distrib.id
                                            },{
                                                type: "text",
                                                hidden: true,
                                                name: SUP.formFlds.get(`oth`).get(ACT).distrib_vc.fname,
                                                id: SUP.formFlds.get(`oth`).get(ACT).distrib_vc.id,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: "Frequency",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                padding: 3,
                                                id: SUP.formFlds.get(`oth`).get(ACT).freq.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).freq.fname, 
                                            },{
                                                type: "text",
                                                hidden: true,
                                                id: SUP.formFlds.get(`oth`).get(ACT).freq_vc.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).freq_vc.fname,
                                            }
                                        ]
                                    },{
                                        cols: [
                                            {
                                                type: "combo",
                                                label: "Split",
                                                labelPosition: "left",
                                                labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                                width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                                padding: 3,
                                                id: SUP.formFlds.get(`oth`).get(ACT).split.id,
                                                name: SUP.formFlds.get(`oth`).get(ACT).split.fname,
                                            },{
                                                type: "text",
                                                hidden: true,
                                                name: SUP.formFlds.get(`oth`).get(ACT).split_vc.fname,
                                                id: SUP.formFlds.get(`oth`).get(ACT).split_vc.id,
                                            }
                                        ]
                                    },{
                                        type: "input",
                                        label: "Split Amount",
                                        labelPosition: "left",
                                        labelWidth: SUP.scalar.get(`oth`).get(ACT).labelWidth,
                                        width: SUP.scalar.get(`oth`).get(ACT).fieldWidth,
                                        disabled: true,
                                        padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                        name: SUP.formFlds.get(`oth`).get(ACT).split_amt.fname, 
                                        id: SUP.formFlds.get(`oth`).get(ACT).split_amt.id
                                    },{
                                        type: "textarea",
                                        name: SUP.formFlds.get(`oth`).get(ACT).comments.fname, 
                                        id: SUP.formFlds.get(`oth`).get(ACT).comments.id,
                                        label: SUP.formFlds.get(`oth`).get(ACT).comments.label,
                                        labelWidth: "150px",
                                        width: 450,
                                        labelPosition: "left",
                                        disabled: false,
                                        required: false,
                                        readOnly: false,
                                        resizable: false,
                                        height: "150px",
                                        hidden: false,
                                        padding: SUP.scalar.get(`oth`).get(ACT).fieldPadding,
                                    }
                                ]
                            },{
                                width: "content",
                                align: "start",
                                padding: "10px",
                                cols: [
                                    {
                                        type: "container",
                                        name: "staff_image",
                                        height: 156,
                                        width: 185,
                                        css: "custom-sup-form-container",                                    }
                                ]
                            }
                        ]
                    },{
                        type    : `input`,
                        id      : SUP.formFlds.get(`oth`).get(ACT).supp_gu.id,
                        name    : SUP.formFlds.get(`oth`).get(ACT).supp_gu.fname,
                        hidden  : true,
                        value   : ``,
                    },{
                        type    : "input",
                        name    : SUP.formFlds.get(`oth`).get(ACT).id_stamp.fname, 
                        id      : SUP.formFlds.get(`oth`).get(ACT).id_stamp.id,
                        hidden  : true,
                    },{
                        type    : "input",
                        name    : SUP.formFlds.get(`oth`).get(ACT).acct_code.fname, 
                        id      : SUP.formFlds.get(`oth`).get(ACT).acct_code.id,
                        hidden  : true,
                        value   : ``,
                    },{
                        align: "center",
                        padding: "8px",
                        css: "custom-sup-form-group",
                        cols: button_set,
                    }
                ]
            }
        );
    }
)

//  -----------------------------------------------------------------------------------------------------

SUP.formCfg.get(`oth`).set(
    `view`, 
    {
        css: SUP.formCSS.get(`oth`).get(`view`).main,
        width: `100%`,
        padding: 5,
        rows: [
            {
                align: `center`,
                cols:[
                    {
                        align: `start`,
                        padding: 5,
                        rows:[
                            {
                                type: `input`,
                                labelPosition: `left`,
                                label: SUP.formFlds.get(`oth`).get(`view`).supp_year.label,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                id: SUP.formFlds.get(`oth`).get(`view`).supp_year.id,
                                name: SUP.formFlds.get(`oth`).get(`view`).supp_year.fname,
                                readOnly : true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`oth`).get(`view`).name.label
                                        + `/`
                                        + SUP.formFlds.get(`oth`).get(`view`).badge_id.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).name.fname, 
                                id: SUP.formFlds.get(`oth`).get(`view`).name.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`oth`).get(`view`).stipend.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).stipend.fname, 
                                id: SUP.formFlds.get(`oth`).get(`view`).stipend.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: `Location`,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).location.fname, 
                                id: SUP.formFlds.get(`oth`).get(`view`).location.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`oth`).get(`view`).distrib.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).distrib.fname,
                                id: SUP.formFlds.get(`oth`).get(`view`).distrib.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`oth`).get(`view`).freq.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).freq.fname, 
                                id: SUP.formFlds.get(`oth`).get(`view`).freq.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`oth`).get(`view`).split.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).split.fname,
                                id: SUP.formFlds.get(`oth`).get(`view`).split.id,
                                readOnly: true,
                            },{
                                type: `input`,
                                label: SUP.formFlds.get(`oth`).get(`view`).split_amt.label,
                                labelPosition: `left`,
                                labelWidth: SUP.scalar.get(`oth`).get(`view`).labelWidth,
                                width: SUP.scalar.get(`oth`).get(`view`).fieldWidth,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                name: SUP.formFlds.get(`oth`).get(`view`).split_amt.fname, 
                                id: SUP.formFlds.get(`oth`).get(`view`).split_amt.id,
                                readOnly: true,
                            },{
                                type: `textarea`,
                                name: SUP.formFlds.get(`oth`).get(`view`).comments.fname, 
                                id: SUP.formFlds.get(`oth`).get(`view`).comments.id,
                                label: SUP.formFlds.get(`oth`).get(`view`).comments.label,
                                labelWidth: `150px`,
                                width: 450,
                                labelPosition: `left`,
                                disabled: false,
                                required: false,
                                readOnly: false,
                                resizable: false,
                                height: `150px`,
                                hidden: false,
                                padding: SUP.scalar.get(`oth`).get(`view`).fieldPadding,
                                readOnly: true,
                            }
                        ]
                    },{
                        type: `container`,
                        name: `staff_image`,
                        height: 156,
                        width: 185,
                        css: `custom-sup-form-container`,
                    }
                ]
            }
        ]
    }
);

// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|
//      INITIALIZE EXPERIENCE CONTAINER HTML
// |=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|

SUP.html[`expr`] = 
    `<div class="expr-row">
        <div class="expr-column expr-extras" id="expr-col-1-id" style="background-color:transparent">
            <div class="expr-table">
                <div class="expr-table-row">
                    <div class="expr-table-cell expr-label">EXPERIENCE</div>
                </div>
                <div class="expr-table-row">
                    <div id="${SUP.htmlCfg.expr.id}" class="expr-table-cell expr-data"></div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell expr-label">STEP</div>
                </div>
                <div class="expr-table-row">
                    <div id="${SUP.htmlCfg.step.id}" class="expr-table-cell expr-data"></div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell expr-label">BASE</div>
                </div>
                <div class="expr-table-row">
                    <div id="${SUP.htmlCfg.base.id}" class="expr-table-cell expr-data"></div>
                </div>
            </div>
        </div>
        <div class="expr-column expr-extras" id="expr-col-2-id" style="background-color:transparent;">
            <div class="expr-table">
                <div class="expr-table-row">
                    <div class="expr-table-cell expr-label">LONGEVITY</div>
                </div>
                <div class="expr-table-row">
                    <div id="${SUP.htmlCfg.long.id}" class="expr-table-cell expr-data"></div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell expr-label">LONGEVITY AMT</div>
                </div>
                <div class="expr-table-row">
                    <div id="${SUP.htmlCfg.lamt.id}" class="expr-table-cell expr-data"></div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell expr-label">TOTAL</div>
                </div>
                <div class="expr-table-row">
                    <div id="${SUP.htmlCfg.tot.id}" class="expr-table-cell expr-data"></div>
                </div>
            </div>
        </div>
        <div class="expr-column expr-extras" id="expr-col-3-id" style="background-color:transparent;">
            <div class="expr-table">
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2021-22" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2021-22
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2020-21" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2020-21
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2019-20" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2019-20
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2018-19" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2018-19
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2017-18" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2017-18
                    </div>
                </div>
            </div>
        </div>
        <div class="expr-column expr-extras" id="expr-col-3-id" style="background-color:transparent">
            <div class="expr-table">
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2016-17" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2016-17
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2015-16" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2015-16
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2014-15" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2014-15
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2013-14" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2013-14
                    </div>
                </div>
                <div class="expr-table-row">
                    <div class="expr-table-cell">
                        <img id="expr-fid-2012-13" src="includes/images/redButton1.png" width="13" height="13" />
                        &nbsp;2012-13
                    </div>
                </div>
            </div>
        </div>
    </div>`;


