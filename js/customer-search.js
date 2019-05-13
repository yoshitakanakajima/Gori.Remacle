$(function(){
    $('.datatables').DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        ajax: {
            url: "",
            type: "GET",
            data: function (d) {
                d.keyword = $('#keyword').val();
            }
        },
        colums: [
            {data: "customer_key_list"},
            {data: "customer_name_sei_list"},
            {data: "customer_mobile_no_list"},
        ],
        language: {
            url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        },
        dom:"<'row'<'col-sm-6'l><'col-sm-12 right'p>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12'i>>"
    });
})
