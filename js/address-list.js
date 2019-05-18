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

    $("#search-button").on("click", function() {
        $('#search-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/cust01-2.json").load();
        $('#search-list').DataTable().ajax.reload();
        return false;
    })

    $("#btn-register > button").on("click", function() {
        // 操作対象のフォーム要素を取得
        var $form = $('#customer-form');

        // 送信ボタンを取得
        var $button = $("#btn-register > button");

        // 送信
        $.ajax({
            url: "http://localhost:63342/Gori.Remacle/data/cust01-3.json",
            type: "POST",
            data: $form.serialize(),
            timeout: 10000,  // 単位はミリ秒

            // 送信前
            beforeSend: function(xhr, settings) {
                // ボタンを無効化し、二重送信を防止
                $button.attr('disabled', true);
            },
            // 応答後
            complete: function(xhr, textStatus) {
                // ボタンを有効化し、再送信を許可
                $button.attr('disabled', false);
            },

            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                // 入力値を初期化
                $form[0].reset();

                displayHeaderMessage(result["status"], result["message"]);

            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {
                displayHeaderErrorMessage(textStatus, error)
            }
        });
    })

    $("#btn-modify > button").on("click", function() {
        $.confirm({
            title: '顧客情報を更新しますがよろしいですか？',
            content: '登録を行う場合はクリアボタンを押下してください。',
            type: 'orange',
            buttons: {
                info: {
                    text: '確認',
                    btnClass: 'btn-orange',
                    action: function(){
                        // 操作対象のフォーム要素を取得
                        var $form = $('#customer-form');

                        // 送信ボタンを取得
                        var $button = $("#btn-modify > button");

                        // 送信
                        $.ajax({
                            url: "http://localhost:63342/Gori.Remacle/data/cust01-4.json",
                            type: "POST",
                            data: $form.serialize(),
                            timeout: 10000,  // 単位はミリ秒

                            // 送信前
                            beforeSend: function(xhr, settings) {
                                // ボタンを無効化し、二重送信を防止
                                $button.attr('disabled', true);
                            },
                            // 応答後
                            complete: function(xhr, textStatus) {
                                // ボタンを有効化し、再送信を許可
                                $button.attr('disabled', false);
                            },

                            // 通信成功時の処理
                            success: function(result, textStatus, xhr) {
                                var data = result.data;
                                // レスポンスの更新データをFormにセット
                                setCustomerForm(data);

                                displayHeaderMessage(result["property"]["status"], result["property"]["message"]);

                                $('#customer-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/cust01-2.json").load();
                                $('#customer-list').DataTable().ajax.reload();

                            },

                            // 通信失敗時の処理
                            error: function(xhr, textStatus, error) {
                                displayHeaderErrorMessage(textStatus, error)
                            }
                        });

                    }
                },
                danger: {
                    text: 'キャンセル',
                },
            }
        });
    });

    $('#address-list tbody').on("click", "button", function() {
        if ($(this).find('.dataTables_empty').length == 0) {
            var data = $('#address-list').dataTable().fnGetData(this);

            console.log("宛先一覧から削除しました。");
        }
    });

    $('#search-list tbody').on("click", "button", function() {
        if ($(this).find('.dataTables_empty').length == 0) {
            var data = $('#search-list').dataTable().fnGetData(this);

            console.log("宛先一覧へ追加しました。");
        }
    });
})
