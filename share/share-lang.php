<select class="lang-choose" onchange="changeLanguage(this.value)">
    <?php foreach (system_config('support_lang_display') as $key => $text) {
        $selected = CURRENT_LANG == $key ? ' selected ' : '';
        ?>
        <option value="<?php echo $key; ?>" <?php echo $selected; ?>><?php echo $text; ?> </option>
    <?php } ?>
</select>