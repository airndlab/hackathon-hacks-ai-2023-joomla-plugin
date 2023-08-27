<div id="chatbot-container">
  <div id="chatbot-icon">
    <img src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/img/assistant.png' ?>" alt="Chatbot_Icon">
  </div>
  <div id="chatbot-widget">
    <div class="chatbot-header">
      <div class="close-icon js-close-icon">
        <i class="material-symbols-outlined">close</i>
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
          <div>
            <?php if ($params->get('example_1')) : ?>
              <div class="content-answer-variants-link js-example">
                <?php echo $params->get('example_1'); ?>
              </div>
            <?php endif; ?>
            <?php if ($params->get('example_2')) : ?>
              <div class="content-answer-variants-link js-example">
                <?php echo $params->get('example_2'); ?>
              </div>
            <?php endif; ?>
            <?php if ($params->get('example_3')) : ?>
              <div class="content-answer-variants-link js-example">
                <?php echo $params->get('example_3'); ?>
              </div>
            <?php endif; ?>
          </div>
          <div class="content-answer-assistant js-content-answer-assistant">
            <img src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/img/assistant.png' ?>" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="content-footer">
      <div class="content-typing-assistant js-content-typing-assistant">
        <img src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/img/assistant.png' ?>" alt="">
      </div>
      <div class="content-typing">
        <form
          class="content-typing-form"
          id="js-submit-form"
          action="<?php echo $params->get('url_api', 'https://api.hacks-ai.ycdev.ru/api/v1/question/'); ?>"
        >
          <input class="content-typing-input" id="js-input" type="text" placeholder="Введите запрос">
          <button class="content-typing-send-btn js-submit-btn" disabled>
            <i class="material-symbols-outlined material-icons-filled">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="<?php echo JUri::base() . 'plugins/content/chatbot/assets/css/styles.css' ?>">
<script src="<?php echo JUri::base() . 'plugins/content/chatbot/assets/js/scripts.js' ?>"></script>