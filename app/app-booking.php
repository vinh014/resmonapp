<div class="portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">
    <div class="portlet-header ui-widget-header ui-corner-all">
        <span class="ui-icon ui-icon-arrow-4 sortable-handle" title="<?php echo Lang::read('sortable_handle'); ?>"></span>
        <span class="ui-icon ui-icon-trash delete-booking-action" title="<?php echo Lang::read('delete_booking'); ?>"></span>
        <span class='ui-icon ui-icon-play status-action status-<?php echo $_bookingStatus; ?>' title="<?php echo Lang::read('change_status'); ?>"></span>
        <span class='ui-icon ui-icon-lightbulb priority-action priority-<?php echo $_bookingPriority; ?>' title="<?php echo Lang::read('change_priority'); ?>"></span>
        <span class='ui-icon ui-icon-plusthick portlet-toggle' title="<?php echo Lang::read('collapse_expand'); ?>"></span>
        <span class="booking-title" contenteditable="true"><?php echo $_bookingTitle; ?></span>
    </div>
    <div class="portlet-content" contenteditable="true"><?php echo $_bookingDetail; ?></div>
</div>