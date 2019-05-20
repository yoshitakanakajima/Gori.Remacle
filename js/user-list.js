$(function(){
    $('#user-list').DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            // console.log(nRow);
            // console.log(aData);
            if (aData.own_user_flg == '0') {
                $('td > button', nRow).prop("disabled", true);
            }

        },
        ajax: {
            url: "http://localhost:63342/Gori.Remacle/data/acct01-1.json",
            type: "POST",
            dataSrc: 'users'
        },
        columns: [
            {data: "own_user_flg"},
            {data: "user_no"},
            {data: "user_id"},
            {data: "user_name"},
            {data: "user_email"},
            {data: "permission_cd"},
        ],
        columnDefs: [
            {targets: [0], visible: false},
            {targets: [1], visible: false},
            {
                targets: [6],
                render: function (data, type, row) {
                    console.log(data);
                    console.log(type);
                    console.log(row);
                    return '<button type="submit" class="btn btn-primary btn-xs">変更</button>';
                },
                data: null,
                visible: true,
                sWidth: "60px",
                // defaultContent: "<button type=\"submit\" class=\"btn btn-primary btn-xs\">変更</button>"
            },
        ],
        language: {
            url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        },
        dom:"<'row'<'col-sm-6'l><'col-sm-12 right'p>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12'i>>"
    });
})
