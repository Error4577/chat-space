$(function(){
  function buildHTML(message){
    var image = message.image_url ? `<img class= "lower-message__image" src="${message.image_url}">` : "" ;

    var html = `<div class="message" data-message_id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__body">
                      ${message.body}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    })
  });
  var reloadMessages = function(){
    if (location.href.match(/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message_id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        });
      })
      .fail(function(){
        alert('error');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});
