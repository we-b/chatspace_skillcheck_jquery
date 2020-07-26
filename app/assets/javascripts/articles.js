$(function(){
  //①マウスオーバー、マウスアウト
  $(".contents").on("mouseover", ".article", function(){
    $(this).css({"background-color": "#F1940B", "font-weight": "bold"});
  }).on("mouseout", ".article", function(){
    $(this).css({"background-color": "#FFFFFF", "font-weight": "normal"});
  })

  //②文字カウント
  $(".article_form").on('keyup', function(){
    $(".char_num").text($(this).val().length + '文字');
  });

  //③Ajax
  $("#new_article").on("submit", function(e){
    e.preventDefault();
    console.log(this)
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }).done(function(data){
      let html = buildHTML(data.text);
      $(".contents").prepend(html);
      $(".article_form").val("");
    }).fail(function(jqXHR, textStatus, errorThrown){
      // ④エラーメッセージ
      alert("error : " + errorThrown)
    })
  })

  function buildHTML(data){
    let html =
    `<div class="article"> ${data} </div>`
    return html;
  }

  //⑤スクロール
  $(".scroll_arrow").on("click", function(){
     $(".contents").animate({scrollTop: $(".contents")[0].scrollHeight}, 500, "swing");
  })

})