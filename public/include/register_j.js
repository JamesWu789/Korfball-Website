$(function () {

    $("#btn-register").click(function () {
        console.log("class", $(".here").attr("class"));
        if ($("#password").val() !== $("#password_2").val()) {      //判斷兩次密碼是否相同
            alert("密碼必須相同");
            $("form").submit(function () { return false });
        };
        // if (!$("#workerName").val() || !$("#phoneNum").val() || !$("#workItem").val() || !$("#account").val() || !$("#password").val()) {        //判斷有無空白
        //     alert("請填完整資料");
        //     $("form").submit(function () { return false });
        // };
    });

    // 警告帳號已重複
    $(".fire").on("click", function () {
        alert("帳號已經存在");
        $(this).removeAttr("fire");
    });
    $(".fire").click();


});

