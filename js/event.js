$(function () {
    //管理者
    window.sessionStorage.setItem(['authority'],["0"]);
    //オペレーター
    // window.sessionStorage.setItem(['authority'],["1"]);
})

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


function displayHeaderMessage(status, message) {
    if (status == "0") {
        $('.alert-error').show();
        $('.alert-success').hide();
        $('.alert-error-message').text(message);
    } else {
        $('.alert-error').hide();
        $('.alert-success').show();
        $('.alert-success-message').text(message);
    }
}

function displayHeaderErrorMessage(status, message) {
    $('.alert-error').show();
    $('.alert-success').hide();
    $('.alert-error-message').text(message);
}

function parsley() {
    
}