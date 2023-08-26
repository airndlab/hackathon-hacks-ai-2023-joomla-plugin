<?php
defined('_JEXEC') or die;

class PlgContentChatbot extends JPlugin {
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
