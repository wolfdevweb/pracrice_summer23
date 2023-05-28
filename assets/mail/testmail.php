<?php
/* Тест отправки шаблона письма */
// ini_set('error_reporting', E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);

/*
require_once(__DIR__.'/../../core.php');

$asd = new NewCore();

$maildata = [
  "link_to_server" => "https://".$_SERVER["SERVER_NAME"],
  "link_to_logo" => "https://".$_SERVER["SERVER_NAME"]."/theme/theme1/assets/img/logoBig.webp",
  "alt_link_to_logo" => "https://".$_SERVER["SERVER_NAME"]."/theme/theme1/assets/img/logoBig.webp",
  "title" => "Титульник",
  "description" => "Описание",
  "link_button" => "https://".$_SERVER["SERVER_NAME"],
  "color_button" => "#ee412e",
  "text_color_button" => "#ffffff",
  "text_button" => "текст кнопки",
  "name_host" => $_SERVER["SERVER_NAME"],
  "date" => date('d.m.Y H:i'),
];

$template_email = file_get_contents('TmpOneBtn.php');

foreach ($maildata as $key => $value) {
    $template_email = str_replace('['.$key.']', $value, $template_email);
}

$asd->send_email_user('web@kt-segment.ru', 'tema письма', $template_email);
*/

?>
