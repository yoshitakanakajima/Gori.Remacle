$(function(){
    $('#user-list').DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        order: [[7, "asc"]],
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
            {data: "permission_name"},
            {data: "sort_no"},
        ],
        columnDefs: [
            {targets: [0], visible: false},
            {targets: [1], visible: false},
            {targets: [5], visible: false},
            {targets: [7], visible: false},
            {
                targets: [8],
                render: function (data, type, row) {
                    return data.user_no == '' ? '<button type="submit" class="btn btn-primary btn-xs user-add-button">追加</button>' : '<button type="submit" class="btn btn-primary btn-xs user-modify-button">変更</button>';
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

    $('#user-list tbody').on("click", "button.user-add-button", function() {
        // ダイアログ表示
        $('#form').on('show.bs.modal', function (event) {

            // コントロール制御
            $("#form #dialogTitle").text("新規登録");
            $("#form #regist-button").show();
            $("#form #update-button").hide();

            // フォーカス
            setTimeout(function(){
                $("#user-id").focus();
            }, 500);

        }).modal("show");
    });

    $("#regist-button").on("click", function () {
        $.ajax({
            url: "http://localhost:63342/Gori.Remacle/data/acct01-3.json",
            type: "POST",
            data: {
                "user_id": $("#user-id").val(),
                "password": $("#password").val(),
                "password_comfirm": $("#password-comfirm").val(),
                "user_name": $("#user-name").val(),
                "user_email": $("#user-email").val(),
                "permission_cd": $("#permission-cd").val(),
                "permission_name": $("#permission-name").val()
            },
            timeout: 10000,  // 単位はミリ秒
            dataType: "json",
            success: function (result, textStatus, xhr) {
                var status = result["property"]["status"];
                var message = result["property"]["message"]

                if (status == "1") {
                    // テーブル更新
                    $('#user-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/acct01-4.json").load();
                    $('#user-list').DataTable().ajax.reload();
                } else {
                    displayHeaderMessage("0", message);
                }

                // フォームを閉じる
                $("#form").modal("hide");
            },
            error: function() {
                displayHeaderErrorMessage(textStatus, error)
            }
        });
    });

    $('#user-list tbody').on("click", "button.user-modify-button", function() {
        if ($(this).find('.dataTables_empty').length == 0) {
            var data = $('#user-list').dataTable().fnGetData("#user-list > tbody > tr");

            // ダイアログ表示
            $('#form').on('show.bs.modal', function (event) {
                // 取得したデータのセット
                $("#user-id").val(data.user_id);
                $("#user-name").val(data.user_name);
                $("#user-email").val(data.user_email);
                $("#permission-cd").val(data.permission_cd);

                // コントロール制御
                $("#form #dialogTitle").text("更新");
                $("#form #regist-button").hide();
                $("#form #update-button").show();

                // フォーカス
                setTimeout(function(){
                    $("#user-id").focus();
                }, 500);

            }).modal("show");
        }
    });

    $("#update-button").on("click", function () {
        $.ajax({
            url: "http://localhost:63342/Gori.Remacle/data/acct01-5.json",
            type: "POST",
            data: {
                "user_id": $("#user-id").val(),
                "password": $("#password").val(),
                "password_comfirm": $("#password-comfirm").val(),
                "user_name": $("#user-name").val(),
                "user_email": $("#user-email").val(),
                "permission_cd": $("#permission-cd").val(),
                "permission_name": $("#permission-name").val()
            },
            timeout: 10000,  // 単位はミリ秒
            dataType: "json",
            success: function (result, textStatus, xhr) {
                var status = result["property"]["status"];
                var message = result["property"]["message"]

                if (status == "1") {
                    // テーブル更新
                    $('#user-list').DataTable().ajax.url("http://localhost:63342/Gori.Remacle/data/acct01-4.json").load();
                    $('#user-list').DataTable().ajax.reload();
                } else {
                    displayHeaderMessage("0", message);
                }

                // フォームを閉じる
                $("#form").modal("hide");
            },
            error: function() {
                displayHeaderErrorMessage(textStatus, error)
            }
        });
    });


    $("#company-info-update-button").on("click", function () {
        console.log("事業者情報変更");
        // 操作対象のフォーム要素を取得
        var $form = $('#company-form');
        // 送信ボタンを取得
        var $button = $("#company-info-update-button");

        // 送信
        $.ajax({
            url: "http://localhost:63342/Gori.Remacle/data/acct01-3.json",
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
                displayHeaderMessage(result["property"]["status"], result["property"]["message"]);
            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {
                displayHeaderErrorMessage(textStatus, error)
            }
        });
    })

    $('#company-form').parsley().on('field:validated', function() {
        if ($('.parsley-error').length > 0) {
            $('#company-info-update-button').prop("disabled", true);
        } else {
            $('#company-info-update-button').prop("disabled", false);
        }
    })

    $("#card-info-update-button").on("click", function () {
        //FIXME: Stripe APIをコールしてレスポンスJSONを受け取る
        console.log("Stripe APIをコールしてレスポンスJSONを受け取る");

        // 送信ボタンを取得
        var $button = $("#card-info-update-button");

        // 送信
        $.ajax({
            url: "http://localhost:63342/Gori.Remacle/data/acct01-3.json",
            type: "POST",
            data: {"token": "stripeapirespons-token"},
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
                displayHeaderMessage(result["property"]["status"], result["property"]["message"]);
            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {
                displayHeaderErrorMessage(textStatus, error)
            }
        });

    })

    $("#option_req_button").on("click", function() {
        $.confirm({
            title: '別サイトに遷移しますがよろしいですか？',
            content: 'OKを押下すると、オプション申し込みサイトへ遷移します。',
            type: 'orange',
            buttons: {
                info: {
                    text: 'OK',
                    btnClass: 'btn-orange',
                    action: function(){
                        window.location.href = 'https://www.google.com/';
                    }
                },
                danger: {
                    text: 'キャンセル',
                },
            }
        });
    });

})
