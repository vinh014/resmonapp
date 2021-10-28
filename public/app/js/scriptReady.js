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
        saveData('portlet-content');
    });
    // not remove html tags when editing content
    $(document).on('input', '.booking-title', function () {
        saveData('booking-title');
    });

    $(document).on('blur', '.booking-title', function () {
        var val = _bookingTitle($(this).html());
        $(this).html(val);
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
            case obj.is('.status-0'):
                obj.toggleClass('status-0 status-1');
                break;
            case obj.is('.status-1'):
                obj.toggleClass('status-1 status-2');
                break;
            case obj.is('.status-2'):
                obj.toggleClass('status-2 status-3');
                break;
            case obj.is('.status-3'):
                obj.toggleClass('status-3 status-0');
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
        _addBooking($(this).closest('.resource-column'), 0, 0, Lang.booking_title_sample, Lang.booking_detail_sample);
        saveData('add-booking-action');
    });
    $(document).on('click', '.delete-booking-action', function () {
        _deleteBooking($(this).closest('.portlet'), function () {
            saveData('delete-booking-action');
        });
    });
    $(document).on('click', '.delete-resource-action', function () {
        _deleteResource($(this).closest('.resource-column'), function () {
            saveData('delete-resource-action');
        });
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
        _addResource(Lang.nickname_sample);
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
        downloadString(readData(), 'text/plain', now + '.json');
    });
    $(document).on('click', '.upload-action', function () {
        $('input[type=file]').trigger('click');
    });
    $(document).on('change', 'input[type=file]', function () {
        uploadFile();
    });
});