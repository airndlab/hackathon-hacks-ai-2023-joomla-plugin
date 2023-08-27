jQuery(document).ready(function($) {
  $('#chatbot-icon').click(function() {
    $('#chatbot-widget').show();
    $('body').css('position', 'fixed');
  });

  $('.js-close-icon').click(function() {
    $('#chatbot-widget').hide();
    $('body').css('position', 'static');
  });


  $('#js-input').on('input', function() {
    $('.js-submit-btn').prop('disabled', !$(this).val());
  });

  $('#js-submit-form').submit(function() {
    const $jsInput = $('#js-input');
    const value = $jsInput.val();

    if (value) {
      const $jsContent = $('.js-content');
      const $jsContentWrap = $('.js-content-wrap');
      const $submitBtn = $('.js-submit-btn');

      $('.js-content-answer-assistant').hide();

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
                <div>
                  <a class="content-answer-link" href="#">Перейти к описанию</a>
                </div>
              </div>
              ${buttons}
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
      }

      function handleError() {
        $('.js-content-question-wrap').last().prepend(`
            <i class="material-symbols-outlined error-icon">error_outline</i>
          `)
      }

      function handleFinally() {
        $jsInput.prop('readonly', false);
      }

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

    return false;
  });
});
