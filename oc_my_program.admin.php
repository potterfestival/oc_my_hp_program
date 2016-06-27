<?php

function oc_my_program_admin($form, &$form_state) {
  $form = array();
  /*
   * Target url for the program js to pass the collected nid's too.
   */
  $form['hp_program_target'] = array(
    '#type' => 'textfield',
    '#title' => t('Hp Program url target'),
    '#default_value' => variable_get('hp_program_target',''),
    '#attributes' => array(
        'placeholder' => t('url'),
        'title' => t("view some tager program noder feks: mit/view/1,2,3,4")
    ),
);
  return system_settings_form($form);
}

