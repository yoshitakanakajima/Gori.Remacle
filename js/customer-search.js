$(function(){
    $('#customer-list').DataTable({
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

    $('#customer-form').parsley().on('field:validated', function() {
        //alert($('.parsley-error').length);
        if ($('.parsley-error').length > 0) {
            $('#btn-register > button').prop("disabled", true);
            $('#btn-modify > button').prop("disabled", true);
       } else {
            $('#btn-register > button').prop("disabled", false);
            $('#btn-modify > button').prop("disabled", false);
        }
    })

    $("#customer-search").on("click", function() {
        $('#customer-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/cust01-2.json").load();
        $('#customer-list').DataTable().ajax.reload();
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
    })

    $("#btn-delete > button").on("click", function() {
        $.confirm({
            title: '顧客情報を削除しますがよろしいですか？',
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
                        var $button = $("#btn-delete > button");

                        // 送信
                        $.ajax({
                            url: "http://localhost:63342/Gori.Remacle/data/cust01-5.json",
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

                                displayHeaderMessage(result["property"]["status"], result["property"]["message"]);

                                $('#btn-register').show();
                                $('#btn-modify').hide();
                                $('#btn-delete > button').prop("disabled", true);

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


    $("#btn-clear > button").on("click", function() {
        clearForm('#customer-form');
        $('#btn-register').show();
        $('#btn-modify').hide();
        $('#btn-delete > button').prop("disabled", true);
    })


    $('#customer-list tbody').on("click", "tr", function() {
        if ($(this).find('.dataTables_empty').length == 0) {
            var data = $('#customer-list').dataTable().fnGetData(this);

            setCustomerForm(data);

            $('#btn-register').hide();
            $('#btn-modify').show();
            $('#btn-delete > button').prop("disabled", false);
        }
    });
})

function setCustomerForm(data) {
    $('#customer-key').val(data.customer_key_list);
    $('#customer-name-kana-sei').val(data.customer_name_kana_mei_list);
    $('#customer-name-kana-mei').val(data.customer_name_kana_sei_list);
    $('#customer-name-sei').val(data.customer_name_sei_list);
    $('#customer-name-mei').val(data.customer_name_mei_list);
    $('#customer-mobile-no').val(data.customer_mobile_no_list);
    $('#customer-address').val(data.customer_address_list);
    $('#customer-remarks').val(data.customer_remarks_list);

    if (data.transmission_error_flg_list == '1') {
        $('.transmission_error_flg_list').show();
    } else {
        $('.transmission_error_flg_list').hide();
    }

}
