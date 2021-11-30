$(function () {
    loadData();

    _checkResource();

    function _autoSortable() {
        setTimeout(function () {
            $('.main-container .resource-column:not(.made-sortable)').each(function () {
                $(this).addClass('made-sortable');
                _sortable(this);
            });
            _autoSortable();
        }, 2000);
    }

    _autoSortable();
    _sortable4Resource();

    $(document).on('click', '.info-container .ui-icon-minusthick', function () {
        var icon = $('.ui-icon-minusthick.portlet-toggle');
        icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
        icon.closest('.portlet').find('.portlet-content').toggle();
    });

    $(document).on('click', '.portlet-toggle', function () {
        var that = this;
        $('.ui-icon-minusthick.portlet-toggle').each(function () {
            if ($(this).is(that)) {
                return;
            }
            var icon = $(this);
            icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
            icon.closest('.portlet').find('.portlet-content').toggle();
        });

        var icon = $(this);
        icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
        icon.closest('.portlet').find('.portlet-content').toggle();
    });

    // not remove html tags when editing content
    $(document).on('input', '.portlet-content', function () {
        saveData('portlet-content');
    });

    $(document).on('blur', '.portlet-content', function () {
        var val = _bookingDetail($(this).html());
        $(this).html(val);

        if (val) {
            $(this).closest('.portlet').find('.portlet-toggle').addClass('has-content');
        } else {
            $(this).closest('.portlet').find('.portlet-toggle').removeClass('has-content');
        }

        saveData('portlet-content');
    });
    // not remove html tags when editing content
    $(document).on('input', '.booking-title', function () {
        saveData('booking-title');
    });

    $(document).on('blur', '.booking-title', function () {
        var val = _bookingTitle($(this).html());
        $(this).html(val);
        $(this).attr('title', val);
        saveData('booking-title');
    });

    // not remove html tags when editing content
    $(document).on('input', '.nickname', function () {
        saveData('nickname');
    });

    $(document).on('blur', '.nickname', function () {
        $(this).html(_nickname($(this).html()));
        saveData('nickname');
    });

    $(document).on('blur', '.nickname', function () {
        // check empty
        if (!_nickname($(this).html())) {
            $(this).html(Lang.nickname_sample);
        }
        // check duplication
        var that = this;
        $('.nickname').each(function () {
            if ($(this).is(that)) {
                return;
            }
            var thisNick = _nickname($(this).html());
            var thatNick = _nickname($(that).html());
            if (thisNick.toLowerCase() == thatNick.toLowerCase()) {
                // $(that).html('Other ' + new Date().getTime());
            }
        })
    });

    $(document).on('click', '.status-action', function () {
        var obj = $(this);
        switch (true) {
            case obj.is('.status-10'):
                obj.toggleClass('status-10 status-11');
                break;
            case obj.is('.status-11'):
                obj.toggleClass('status-11 status-12');
                break;
            case obj.is('.status-12'):
                obj.toggleClass('status-12 status-13');
                break;
            case obj.is('.status-13'):
                obj.toggleClass('status-13 status-14');
                break;
            case obj.is('.status-14'):
                obj.toggleClass('status-14 status-15');
                break;
            case obj.is('.status-15'):
                obj.toggleClass('status-15 status-10');
                break;
        }
        saveData('status-action');
    });

    $(document).on('click', '.priority-action', function () {
        var obj = $(this);
        switch (true) {
            case obj.is('.priority-0'):
                obj.toggleClass('priority-0 priority-1');
                break;
            case obj.is('.priority-1'):
                obj.toggleClass('priority-1 priority-0');
                break;
        }
        saveData('priority-action');
    });

    $(document).on('click', '.add-booking-action', function () {
        _addBooking($(this).closest('.resource-column'), _uniqid('b', true), 1, 10, 0, Lang.booking_title_sample, Lang.booking_detail_sample);
        saveData('add-booking-action');
    });
    $(document).on('click', '.delete-booking-action', function () {
        var resource = $(this).closest('.resource-column');
        var objId = $(this).closest('.portlet').attr('id');
        _deleteBooking($(this).closest('.portlet'), function () {
            saveData('delete-booking-action', objId);
            if ($(resource).find('.display-booking-0').length) {
                $(resource).addClass('has-hidden-booking');
            } else {
                $(resource).removeClass('has-hidden-booking');
            }
        });
    });
    $(document).on('click', '.display-booking-action', function () {
        var obj = $(this).closest('.portlet');
        switch (true) {
            case obj.is('.display-booking-0'):
                obj.toggleClass('display-booking-0 display-booking-1');
                break;
            case obj.is('.display-booking-1'):
                obj.toggleClass('display-booking-1 display-booking-0');
                break;
        }
        saveData('display-booking-action');
        if ($(this).closest('.resource-column').find('.display-booking-0').length) {
            $(this).closest('.resource-column').addClass('has-hidden-booking');
        } else {
            $(this).closest('.resource-column').removeClass('has-hidden-booking');
        }
    });
    $(document).on('click', '.show-hidden-bookings-action', function () {
        $(this).closest('.resource-column').toggleClass('show-hidden-bookings');
    });
    
    $(document).on('click', '.delete-resource-action', function () {
        var objId = $(this).closest('.resource-column').attr('id');
        var childIds = [];
        $(this).closest('.resource-column').find('.portlet').each(function () {
            childIds.push($(this).attr('id'));
        })
        _deleteResource($(this).closest('.resource-column'), function () {
            saveData('delete-resource-action', objId, childIds);
        });
    });

    $(document).on('click', '.change-type-action', function () {
        var obj = $(this).closest('.the-resource');
        switch (true) {
            case obj.is('.type-0'):
                obj.toggleClass('type-0 type-1');
                break;
            case obj.is('.type-1'):
                obj.toggleClass('type-1 type-2');
                break;
            case obj.is('.type-2'):
                obj.toggleClass('type-2 type-3');
                break;
            case obj.is('.type-3'):
                obj.toggleClass('type-3 type-0');
                break;
        }
        saveData('type-action');
    });
    
    $(document).on('click', '.change-size-action', function () {
        var obj = $(this).closest('.resource-column');
        switch (true) {
            case obj.is('.size-16'):
                obj.toggleClass('size-16 size-15');
                break;
            case obj.is('.size-15'):
                obj.toggleClass('size-15 size-14');
                break;
            case obj.is('.size-14'):
                obj.toggleClass('size-14 size-13');
                break;
            case obj.is('.size-13'):
                obj.toggleClass('size-13 size-12');
                break;
            case obj.is('.size-12'):
                obj.toggleClass('size-12 size-16');
                break;
        }
        saveData('size-action');
    });
    
    $(document).on('click', '.move-left-action', function () {
        var current = $(this).closest('.resource-column');
        var prev = current.prev('.resource-column');
        if (prev.length) {
            current.insertBefore(prev);
            saveData('move-left-action');
        }
    });
    $(document).on('click', '.move-right-action', function () {
        var current = $(this).closest('.resource-column');
        var next = current.next('.resource-column');
        if (next.length) {
            current.insertAfter(next);
            saveData('move-right-action');
        }
    });

    $(document).on('click', '.add-resource-action', function () {
        _addResource(_uniqid('r', true), 0, '16', Lang.nickname_sample);
        saveData('add-resource-action');
    });
    $(document).on('click', '.download-action', function () {
        var date = new Date();
        var now = [
            date.getFullYear(),
            ((date.getMonth() + 1) + '').padStart(2, '0'),
            (date.getDate() + '').padStart(2, '0'),
            ' ',
            (date.getHours() + '').padStart(2, '0'),
            (date.getMinutes() + '').padStart(2, '0'),
            (date.getSeconds() + '').padStart(2, '0')
        ];
        now = now.join('-').replace('- -', ' ');
        downloadString(JSON.stringify(readData()), 'text/plain', now + '.json');
    });
    $(document).on('click', '.upload-action', function () {
        $('input[type=file]').trigger('click');
    });
    $(document).on('change', 'input[type=file]', function () {
        uploadFile();
    });
});