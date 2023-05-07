$(function () {

    // hover更改顏色
    const topic = $(".btn-group").find("a");
    topic.fadeTo(1, 0.5);
    topic.mouseenter(function () {   //hover
        $(this).stop().fadeTo(200, 1);//css("background-color", "rgba(180, 180, 30, 0.8)");
        topic.mouseleave(function () {   //hover
            $(this).stop().fadeTo(100, 0.7);
        });
    });


    // 按+號跳出視窗
    $("#plus-icon").click(function () {
        $(".modal, .overlay").removeClass("hidden");
    });

    $(".close-modal, .cancel").click(function () {       // 按esc關閉 
        $(".overlay, .modal").addClass("hidden");
        $("form").submit(function () {                  // 按esc後避免回傳post
            return false;
        });
    });

    $(".Add-data").click(function () {                  // 按button後關閉表單
        $(".overlay, .modal").addClass("hidden");
    });

    $(".cancel").click(function () {       // 按取消關閉 
        $("form").submit(function () {                  // 按esc後避免回傳post
            return false;
        });
    });

    // 按刪除後的confirm功能
    $("#delete-icon, #delete-account-icon, #delete-work-icon").click(function () {
        return confirm1 = confirm('確定要刪除嗎!!');
    });

    // 按鉛筆號跳出視窗
    // $("#edit-icon").click(function () {
    //     $(".edit-form, .overlay").removeClass("hidden");
    // });

    // $(".close-modal").click(function () {       // 按esc關閉 
    //     $(".overlay, .edit-form").addClass("hidden");
    //     $("form").submit(function () {                  // 按esc後避免回傳post
    //         return false;
    //     });
    // });

    // $(".edit-data").click(function () {                  // 按button後關閉表單
    //     $(".overlay, .edit-form").addClass("hidden");
    // });

    //table專用
    let $table = $('.scroll'),
        $bodyCells = $table.find('tbody tr:first').children(),
        colWidth;
    // Adjust the width of thead cells when window resizes
    $(window).resize(function () {
        // Get the tbody columns width array
        colWidth = $bodyCells.map(function () {
            return $(this).width();
        }).get();
        // Set the width of thead columns
        $table.find('thead tr').children().each(function (i, v) {
            $(v).width(colWidth[i]);
        });
    }).resize();


    // table sorter
    $("#myTable").tablesorter({ sortList: [[0, 0], [1, 0]] });

    // //multer上傳資料
    // $('.single .submit').on('click',function(){
    //     let fileList = $('#singleFile')[0].files;
    //     console.log('FileList:',fileList);
    //     let formData = new FormData();

    //     formData.append('singleFile', fileList[0]);

    //     $.ajax({
    //         url: '/uploadFile',
    //         type:'post',
    //         processData:false,
    //         contentType:false,
    //         data: formData,
    //         success: function(data){
    //             console.log(data)
    //         }
    //     })
    // });

});

