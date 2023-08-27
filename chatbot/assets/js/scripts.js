jQuery(document).ready(function($) {
  const $jsInput = $('#js-input');
  const $submitBtn = $('.js-submit-btn');
  const $contentTypingImg = $('.js-content-typing-assistant');

  $('#chatbot-icon').click(function() {
    $('#chatbot-widget').show();
    $('body').css('position', 'fixed');
    $jsInput.focus();
    $contentTypingImg.addClass('animated');
    setTimeout(() => {
      $contentTypingImg.removeClass('animated');
    }, 3000);
  });

  $('.js-close-icon').click(function() {
    $('#chatbot-widget').hide();
    $('body').css('position', 'static');
  });

  $('.js-example').click(function() {
    $jsInput.val($(this).text().trim())
    $jsInput.focus();
    $submitBtn.prop('disabled', false);
  });


  $jsInput.on('input', function() {
    $submitBtn.prop('disabled', !$(this).val());
  });

  $('#js-submit-form').submit(function(e) {
    const value = $jsInput.val();

    if (value) {
      const $jsContent = $('.js-content');
      const $jsContentWrap = $('.js-content-wrap');

      $('.js-content-answer-assistant').hide();
      $contentTypingImg.addClass('animated');

      $jsContent.append(`
        <div class="content-question-wrap js-content-question-wrap">
          <div class="content-question">${value}</div>
        </div>
      `)

      $jsInput
          .val('')
          .prop('readonly', true);
      $submitBtn.prop('disabled', true);
      $jsContentWrap.scrollTop($jsContent.height());

      function handleSuccess(data) {
        const buttons = `
          <div class="content-answer-like-dislike">
            <i class="material-symbols-outlined js-like-btn">thumb_up</i>
            <i class="material-symbols-outlined js-dislike-btn">thumb_down</i>
          </div>
        `;

        $jsContent.on('click', '.js-like-btn', function() {
          $(this).addClass('material-icons-filled');
          $(this).parent().addClass('clicked');
          $(this).parent().children().removeClass('js-like-btn js-dislike-btn');
        });

        $jsContent.on('click', '.js-dislike-btn', function() {
          $(this).addClass('material-icons-filled');
          $(this).parent().addClass('clicked');
          $(this).parent().children().removeClass('js-like-btn js-dislike-btn');
        });

        if (data.length === 1) {
          $jsContent.append(`
            <div class="content-answer-wrap">
              <div class="content-answer">
                ${data[0].answerText}
                ${!data[0].isThanks && !data[0].isHello 
                  ? `
                    <div>
                      <a class="content-answer-link" href="#">Перейти к описанию</a>
                    </div>
                  `
                  : '' }
              </div>
              ${!data[0].isThanks && !data[0].isHello ? buttons : ''}
            </div>
          `);
        } else {
          $jsContent.append(`
            <div class="content-answer-wrap">
              <div class="content-answer content-answer-variants">
                <div class="content-answer-variants__title">Вот что я нашел:</div>
                <div class="content-answer-variants__items js-answer-items"></div>
              </div>
              ${buttons}
            </div>
            `);

          $jsItems = $('.js-answer-items');

          data.map(({ answerText, url }, idx) => {
            if (idx === 0) {
              $jsItems.last().append(`
                  <div class="content-answer-variants__item">
                    ${answerText}
                  </div>
                `);
            } else if (idx < 3) {
              $jsItems.last().append(`
                  <div class="content-answer-variants__item short">
                    ${answerText}
                    <div class="short-icon">
                      <i class="material-symbols-outlined">chevron_right</i>
                    </div>
                  </div>
                `);
            }
          });

          if (data.length > 3) {
            $jsContent.append(`
                <div>
                  <div class="content-answer-variants-link">
                    Показать, что нашлось еще
                  </div>
                </div>
              `);
          }
        }

        $jsContentWrap.scrollTop($jsContent.height());
        setTimeout(() => {
          $contentTypingImg.removeClass('animated');
        }, 3000);
      }

      function handleError() {
        $('.js-content-question-wrap').last().prepend(`
            <i class="material-symbols-outlined error-icon">error_outline</i>
          `)
        $contentTypingImg.removeClass('animated');
      }

      function handleFinally() {
        $jsInput.prop('readonly', false);
      }

      const trimmedValueSplit = $.trim(value).toLowerCase().split(' ');
      const isThanks = trimmedValueSplit.some((word) => word === 'спасибо'
        || word === 'спасибо!'
        || word === 'спасиб'
        || word === 'спасиб!'
        || word === 'пасиб'
        || word === 'пасиб!'
        || word === 'пасибо'
        || word === 'пасибо!'
        || word === 'благодарю'
        || word === 'благодарю!'
        || word === 'благодар'
        || word === 'благодар!'
      );
      const isHello = trimmedValueSplit.some((word, idx) => word === 'привет'
        || word === 'привет!'
        || word === 'приветствую'
        || word === 'приветствую!'
        || word === 'добрый'
          && (
              trimmedValueSplit[idx + 1] === 'день'
              || trimmedValueSplit[idx + 1] === 'день!'
              || trimmedValueSplit[idx + 1] === 'вечер'
              || trimmedValueSplit[idx + 1] === 'вечер!'
          )
        || word === 'доброе' && (
            trimmedValueSplit[idx + 1] === 'утро'
            || trimmedValueSplit[idx + 1] === 'утро!'
          )
        || word === 'доброй' && (
              trimmedValueSplit[idx + 1] === 'ночи'
              || trimmedValueSplit[idx + 1] === 'ночи!'
          )
      );

      if (isThanks || isHello) {
        e.preventDefault();
        handleSuccess([{
          answerText: isThanks
              ? 'Всегда рад помочь, обращайтесь почаще)'
              : isHello
                  ? 'Рад Вас приветствовать! Чем я могу вам помочь?'
                  : '',
          isThanks,
          isHello,
        }]);
        handleFinally();
      } else {
        $.ajax({
          url: $(this).prop('action'),
          method: 'get',
          dataType: 'json',
          data: { q: value },
          success: handleSuccess,
          error: handleError,
          complete: handleFinally,
        });
      }
    }

    return false;
  });
});
