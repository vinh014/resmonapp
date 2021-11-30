<div id="<?php echo $_resourceId; ?>" class="resource-column size-<?php echo $_resourceSize; ?>">
    <div class="the-resource disable-select type-<?php echo $_resourceType; ?>">
        <div class="nickname-container">
            <span class="nickname" contenteditable="true"><?php echo $_nickname; ?></span>
        </div>
        <span class="ui-icon ui-icon-trash delete-resource-action" title="<?php echo Lang::read('delete_resource'); ?>"></span>
        <span class="ui-icon ui-icon-suitcase change-type-action" title="<?php echo Lang::read('change_type'); ?>"></span>
        <!-- <span class="ui-icon ui-icon-arrowthick-1-w move-left-action" title="<?php echo Lang::read('move_left'); ?>"></span>-->
        <span class="ui-icon ui-icon-arrow-4-diag dragndrop-handle" title="<?php echo Lang::read('dragndrop'); ?>"></span>
        <span class="ui-icon ui-icon-cancel show-hidden-bookings-action" title="<?php echo Lang::read('show_hidden_bookings'); ?>"></span>
        <!-- <span class="ui-icon ui-icon-arrowthick-1-e move-right-action" title="<?php echo Lang::read('move_right'); ?>"></span>-->
        <span class="ui-icon ui-icon-arrowthick-2-e-w change-size-action" title="<?php echo Lang::read('change_size'); ?>"></span>
        <span class="ui-icon ui-icon-plus add-booking-action" title="<?php echo Lang::read('add_booking'); ?>"></span>
    </div>
</div>