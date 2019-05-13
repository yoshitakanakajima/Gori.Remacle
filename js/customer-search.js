$(function(){
    $('.datatables').DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        // ajax: {
        //     url: "http://localhost:63342/Gori.Remacle/data/cust01-1.json",
        //     type: "GET",
        //     data: function (d) {
        //         d.keyword = $('#keyword').val();
        //     }
        // },
        ajax: { url: "http://localhost:63342/Gori.Remacle/data/cust01-1.json", dataSrc: '' },
        columns: [
            {data: "customer_key_list"},
            {data: "customer_name_seimei_list"},
            {data: "customer_mobile_no_list"},
            {data: "customer_name_kana_sei_list"},
            {data: "customer_name_kana_mei_list"},
            {data: "customer_name_sei_list"},
            {data: "customer_name_mei_list"},
            {data: "customer_address_list"},
            {data: "customer_remarks_list"},
            {data: "transmission_error_flg_list"},
        ],
        columnDefs: [
            {targets: [3], visible: false},
            {targets: [4], visible: false},
            {targets: [5], visible: false},
            {targets: [6], visible: false},
            {targets: [7], visible: false},
            {targets: [8], visible: false},
            {targets: [9], visible: false},
        ],
        language: {
            url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        },
        dom:"<'row'<'col-sm-6'l><'col-sm-12 right'p>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12'i>>"
    });
})
