<div id="chatbot-container">
  <div id="chatbot-icon">
    <img src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/img/assistant.png' ?>" alt="Chatbot_Icon">
  </div>
  <div id="chatbot-widget">
    <div class="chatbot-header">
      <div class="close-icon js-close-icon">
        <i class="material-icons">close</i>
      </div>
    </div>
    <div class="content-wrap js-content-wrap">
      <div class="content js-content">
        <div>
          <div class="content-answer">
            <?php echo $params->get('hello_text', 'Добро пожаловать!'); ?>
            <br><br>
            <?php echo $params->get('hello_text_additional', 'Напишите ваш запрос'); ?>
          </div>
          <div class="content-answer-assistant js-content-answer-assistant">
            <img src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/img/assistant.png' ?>" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="content-footer">
      <div class="content-typing-assistant">
        <img src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/img/assistant.png' ?>" alt="">
      </div>
      <div class="content-typing">
        <form
          class="content-typing-form"
          id="js-submit-form"
          action="<?php echo $params->get('url', 'https://api.hacks-ai.ycdev.ru'); ?>/api/v1/question/"
        >
          <input class="content-typing-input" id="js-input" type="text" placeholder="Введите запрос">
          <button class="content-typing-send-btn js-submit-btn" disabled>
            <i class="material-icons">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>