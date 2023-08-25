<?php
defined('_JEXEC') or die;

class PlgContentChatbot extends JPlugin {
  public function onContentBeforeDisplay($context, &$row, &$params, $page = 0) {
    $param = $this->params->get('test', 'defaultValue');
    return "<h2>".$param."</h2>";
  }

  public function onAfterRender() {
    $html = file_get_contents(JURI::root() . 'plugins/content/chatbot/assets/html/chatbot.html');
    $buffer = JResponse::getBody();
    $buffer = str_replace('</body>', $html . '</body>', $buffer);
    JResponse::setBody($buffer);

    return true;
  }
}
