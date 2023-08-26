<?php
defined('_JEXEC') or die;

class PlgContentChatbot extends JPlugin {
  public function onContentBeforeDisplay() {
    JFactory::getDocument()->addStyleSheet('https://fonts.googleapis.com/icon?family=Material+Icons');
    JFactory::getDocument()->addStyleSheet(JUri::base() . 'plugins/content/chatbot/assets/css/styles.css');
    JHtml::_('bootstrap.framework');
    JFactory::getDocument()->addScript(JUri::base() . 'plugins/content/chatbot/assets/js/scripts.js');
  }

  public function onAfterRender() {
    $app = JFactory::getApplication();
    $body = $app->getBody();
    $isAdministratorPage = $app->isAdmin();

    if (!$isAdministratorPage) {
      $params = $this->params;
      ob_start();
      include(__DIR__ . '/assets/templates/chatbot.php');
      $customMarkup = ob_get_clean();
      $body = str_replace('</body>', $customMarkup . '</body>', $body);
      $app->setBody($body);
    }

    return true;
  }
}
