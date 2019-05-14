function clearForm (form) {
    $(form)
        .find("input, select, textarea")
        .not(":button, :submit, :reset, :hidden")
        .val("")
        .prop("checked", false)
        .prop("selected", false)
    ;

    $(form).find(":radio").filter("[data-default]").prop("checked", true);
}


$('#customer-form').submit(function(event) {
    console.log('submit!!');
});