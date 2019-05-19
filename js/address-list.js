$(function(){
    $('#address-list').DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            if (aData.transmission_error_flg_list == '1') {
                $('td', nRow).css('background-color', 'Red');
            }

        },
        ajax: {
            url: "http://localhost:63342/Gori.Remacle/data/cust01-1.json",
            type: "POST",
            dataSrc: ''
        },
        columns: [
            {data: "customer_key_list"},
            {data: "customer_mobile_no_list"},
            {data: "customer_name_seimei_list"},
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
            {
                targets: [8],
                visible: true,
                sWidth: "300px"
            },
            {targets: [9], visible: false},
            {
                targets: [10],
                data: null,
                visible: true,
                sWidth: "60px",
                defaultContent: "<button type=\"submit\" class=\"btn btn-primary btn-xs\">削除</button>"
            },
        ],
        language: {
            url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        },
        dom:"<'row'<'col-sm-6'l><'col-sm-12 right'p>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12'i>>"
    });

    $("#address-init-button").on("click", function() {
        $('#address-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/cust01-1.json").load();
        $('#address-list').DataTable().ajax.reload();
    })

    $('#search-list').DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            if (aData.transmission_error_flg_list == '1') {
                $('td', nRow).css('background-color', 'Red');
            }

        },
        ajax: {
            url: "http://localhost:63342/Gori.Remacle/data/cust01-1.json",
            type: "POST",
            data: function (d) {
                d.keyword = $('#keyword').val();
            },
            dataSrc: ''
        },
        columns: [
            {data: "customer_key_list"},
            {data: "customer_mobile_no_list"},
            {data: "customer_name_seimei_list"},
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
            {
                targets: [8],
                visible: true,
                sWidth: "300px"
            },
            {targets: [9], visible: false},
            {
                targets: [10],
                data: null,
                visible: true,
                sWidth: "60px",
                defaultContent: "<button type=\"submit\" class=\"btn btn-primary btn-xs\">追加</button>"
            },
        ],
        language: {
            url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        },
        dom:"<'row'<'col-sm-6'l><'col-sm-12 right'p>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12'i>>"
    });

    $('#search-form').parsley().on('field:validated', function() {
        //alert($('.parsley-error').length);
        if ($('.parsley-error').length > 0) {
            $('#search-button').prop("disabled", true);
        } else {
            $('#search-button').prop("disabled", false);
        }
    })

    $("#search-button").on("click", function() {
        $('#search-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/cust01-2.json").load();
        $('#search-list').DataTable().ajax.reload();
        return false;
    })

    $("#phone-add-button").on("click", function() {
        var textarea = $('#phone-list').val();

        if (textarea == '') {
            displayHeaderMessage("0", "電話番号が未入力です。");
            return;
        }

        //改行をカンマに置換
        var str = textarea.replace(/\r|\n|\r\n/g, ',');

        //スペースをカンマに置換
        str = str.replace(/\s+/g, ',');

        var phoneList = str.split(',');

        $.each(phoneList, function (i, value) {
            if(!isPhoneNember(value)) {
                displayHeaderMessage("0", "電話番号形式が不正です。");
                return;
            }
        });
    })

    $("#file-add-button").on("click", function() {
        const ERROR_MSG = "追加に失敗した宛先が存在します。全:(__total__) 成功:(__success__) 失敗:(__error__）";
        $.ajax({
            url: "http://localhost:63342/Gori.Remacle/data/sms03-5.json",
            type: "POST",
            data: {
                "file": $('#file-name').val()
            },
            timeout: 10000,  // 単位はミリ秒
            dataType: "json",
            // 通信成功時の処理
            success: function (result, textStatus, xhr) {
                console.log(textStatus);
                var customerList = result["data"];

                if (result["property"]["error"] > 0) {
                    errorMsg = ERROR_MSG.replace("__total__", result["property"]["total"]);
                    errorMsg = errorMsg.replace("__success__", result["property"]["success"]);
                    errorMsg = errorMsg.replace("__error__", result["property"]["error"]);
                    displayHeaderMessage("0", errorMsg);
                }

                $.each(customerList, function (i, data) {
                    console.log(data);
                    $('#address-list').dataTable().fnAddData(data);
                })
            },

            // 通信失敗時の処理
            error: function (xhr, textStatus, error) {
                console.log(error);
                displayHeaderErrorMessage(textStatus, error)
            }

        });
    });

    $('#address-list tbody').on("click", "button", function() {
        if ($(this).find('.dataTables_empty').length == 0) {
            $('#address-list').DataTable().row($(this).parents('tr')).remove().draw();
            console.log("宛先一覧から削除しました。");
        }
    });

    $('#search-list tbody').on("click", "button", function() {
        if ($(this).find('.dataTables_empty').length == 0) {
            var data = $('#search-list').dataTable().fnGetData("#search-list > tbody > tr");

            console.log("宛先一覧へ追加しました。:" + data.customer_key_list);

            var filterData = $('#address-list').DataTable().column(1).data().filter(function (value, index) {
                return value === data.customer_mobile_no_list ? true : false;
            });

            if (filterData.length > 0) {
                $.confirm({
                    title: '宛先一覧へ追加',
                    content: '電話番号が重複している顧客を追加しようとしています。よろしいですか。',
                    type: 'orange',
                    buttons: {
                        info: {
                            text: '確認',
                            btnClass: 'btn-orange',
                            action: function(){
                                var selectedRow = [
                                    {
                                        "customer_key_list": data.customer_key_list,
                                        "customer_mobile_no_list": data.customer_mobile_no_list,
                                        "customer_name_seimei_list": data.customer_name_seimei_list,
                                        "customer_name_kana_sei_list": data.customer_name_kana_sei_list,
                                        "customer_name_kana_mei_list": data.customer_name_kana_mei_list,
                                        "customer_name_sei_list": data.customer_name_sei_list,
                                        "customer_name_mei_list": data.customer_name_mei_list,
                                        "customer_address_list": data.customer_address_list,
                                        "customer_remarks_list": data.customer_remarks_list,
                                        "transmission_error_flg_list": data.transmission_error_flg_list,
                                    }
                                ]
                                $('#address-list').dataTable().fnAddData(selectedRow);
                            }
                        },
                        danger: {
                            text: 'キャンセル',
                        },
                    }
                })
            }
        }
    });
})

