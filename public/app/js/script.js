/**
 * convert html special chars to html entities
 * @param htmlText
 * @returns string escaped text
 */
_escape = function (htmlText) {
    return jQuery('<div/>').text(htmlText).html();
};

/**
 * decode html entities to char
 *
 * @param encodedHtml
 * @returns string decoded text
 */
_restore = function (encodedHtml) {
    return jQuery('<div/>').html(encodedHtml).text();
};

_uniqid = function (prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${random ? `${Math.trunc(Math.random() * 100000000)}` : ""}`;
};
/**
 * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 */
_compare = function (a, b) {
    if (a['c'] < b['c']) {
        return -1;
    }
    if (a['c'] > b['c']) {
        return 1;
    }
    return 0;
}

/**
 * https://gist.github.com/danallison/3ec9d5314788b337b682
 *
 * @param text
 * @param fileType
 * @param fileName
 */
function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], {type: fileType});

    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
        URL.revokeObjectURL(a.href);
    }, 1500);
}

function uploadFile() {
    _uploadFile(function (content) {
        var obj;
        try {
            obj = JSON.parse(content);
        } catch (e) {
            $('.notify-detail').text(Lang.invalid_json);
            console && console.log(e);
            return;
        }
        localStorage.clear();
        for (var i in obj) {
            for (var j in obj[i]['bs']) {
                if (!obj[i]['bs'][j]['id']) {
                    obj[i]['bs'][j]['id'] = _uniqid('b', true);
                }
            }
            if (!obj[i]['id']) {
                obj[i]['id'] = _uniqid('r', true);
            }
        }
        writeData(obj);
        $('.notify-detail').text(Lang.upload_success).addClass('upload-success');
    });
}

/**
 * https://dev.to/singhdigamber/read-local-text-file-using-javascript-filereader-api-4i76
 */
function _uploadFile(callback) {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    var textFile = /(text\/plain|application\/json)/;
    if (file.type.match(textFile)) {
        reader.onload = function (event) {
            callback(event.target.result);
        }
    } else {
        console.log(Lang.invalid_file);
    }
    reader.readAsText(file);
}

function _sortable(el) {
    $(el).sortable({
        items: '.portlet',
        connectWith: '.resource-column',
        handle: '.sortable-handle',
        cancel: '.ui-icon:not(.sortable-handle),input,textarea,button,select,option',
        receive: function (event, ui) {
            if ($(ui.sender).find('.display-booking-0').length) {
                $(ui.sender).addClass('has-hidden-booking');
            } else {
                $(ui.sender).removeClass('has-hidden-booking');
            }
            var receiver = $(ui.item).closest('.resource-column');
            if ($(receiver).find('.display-booking-0').length) {
                $(receiver).addClass('has-hidden-booking');
            } else {
                $(receiver).removeClass('has-hidden-booking');
            }
        },
        update: function (event, ui) {
            saveData('sorted');
        }
    });
}

function _sortable4Resource() {
    $('.resource-container').sortable({
        items: '.resource-column',
        connectWith: '.resource-container',
        handle: '.dragndrop-handle',
        cancel: '.portlet,.ui-icon:not(.dragndrop-handle),input,textarea,button,select,option',
        update: function (event, ui) {
            saveData('sorted');
        }
    });
}

var holder = null;

function _getType(columnObj) {
    var type;
    var typeObj = $(columnObj).find('.the-resource');
    switch (true) {
        case typeObj.is('.type-0'):
            type = '0';
            break;
        case typeObj.is('.type-1'):
            type = '1';
            break;
        case typeObj.is('.type-2'):
            type = '2';
            break;
        case typeObj.is('.type-3'):
            type = '3';
            break;
        case typeObj.is('.type-4'):
            type = '4';
            break;
        case typeObj.is('.type-5'):
            type = '5';
            break;
    }
    return type;
}

function saveData(action, objId, childIds) {
    // notify that it's saving
    $('.notify-detail').text(Lang.saving).removeClass('save-ok').addClass('saving');
    if (holder) {
        clearTimeout(holder);
        holder = null;
    }

    function _getDisplay(bookingObj) {
        return $(bookingObj).is('.display-booking-1') ? '1' : '0';
    }

    function _getStatus(bookingObj) {
        var status;
        var statusObj = $(bookingObj).find('.status-action');
        switch (true) {
            case statusObj.is('.status-10'):
                status = '10';
                break;
            case statusObj.is('.status-11'):
                status = '11';
                break;
            case statusObj.is('.status-12'):
                status = '12';
                break;
            case statusObj.is('.status-13'):
                status = '13';
                break;
            case statusObj.is('.status-14'):
                status = '14';
                break;
            case statusObj.is('.status-15'):
                status = '15';
                break;
        }
        return status;
    }

    function _getSize(columnObj) {
        var size;
        columnObj = $(columnObj);
        switch (true) {
            case columnObj.is('.size-16'):
                size = '16';
                break;
            case columnObj.is('.size-15'):
                size = '15';
                break;
            case columnObj.is('.size-14'):
                size = '14';
                break;
            case columnObj.is('.size-13'):
                size = '13';
                break;
            case columnObj.is('.size-12'):
                size = '12';
                break;
        }
        return size;
    }

    function _getPriority(bookingObj) {
        var priority;
        var priorityObj = $(bookingObj).find('.priority-action');
        switch (true) {
            case priorityObj.is('.priority-0'):
                priority = '0';
                break;
            case priorityObj.is('.priority-1'):
                priority = '1';
                break;
        }
        return priority;
    }

    holder = setTimeout(function () {
        var data = [];
        var countR = 0;
        var countB = 0;
        $('.resource-column').each(function () {
            countR++;
            var resourceId = $(this).attr('id');
            var resourceType = _getType(this);
            var resourceSize = _getSize(this);
            var nickname = _nickname($(this).find('.nickname').html());
            var bookings = [];
            $(this).find('.portlet').each(function () {
                countB++;
                bookings.push({
                    'c': countB,
                    'rid': resourceId,
                    'id': $(this).attr('id'),
                    'ds': _getDisplay(this),
                    's': _getStatus(this),
                    'p': _getPriority(this),
                    't': _bookingTitle($(this).find('.booking-title').html()),
                    'd': _bookingDetail($(this).find('.portlet-content').html())
                });
            });
            data.push({'c': countR, 'id': resourceId, 't': resourceType, 's': resourceSize, 'n': nickname, 'bs': bookings});
        });
        writeData(data, action, objId, childIds);

        // notify that it's saved
        $('.notify-detail').text(Lang.saved).addClass('save-ok').removeClass('saving');
    }, 1000);
}

function loadData() {
    var data = readData();
    for (var j in data) {
        if (Array.isArray(data)) { // new format 
            var resourceId = data[j]['id'];
            var resourceType = data[j]['t'];
            var resourceSize = data[j]['s'];
            var nickname = data[j]['n'];
            var bookings = data[j]['bs'];
        } else { // old format
            var resourceId = _uniqid('r', true);
            var nickname = j;
            var bookings = data[j];
            var resourceType = 0;
            var resourceSize = '16';
        }
        var resourceEl = _addResource(resourceId, resourceType, resourceSize, nickname);
        for (var i in bookings) {
            if (jQuery.isEmptyObject(bookings[i])) {
                continue;
            }
            _addBooking(resourceEl, bookings[i]['id'], bookings[i]['ds'], bookings[i]['s'], bookings[i]['p'], bookings[i]['t'], bookings[i]['d']);
        }
    }
    $('.resource-column').each(function () {
        if ($(this).find('.display-booking-0').length) {
            $(this).addClass('has-hidden-booking');
        } else {
            $(this).removeClass('has-hidden-booking');
        }
    });
}

function readData() {
    // use new version
    if (!localStorage.getItem('db-data-active') && !localStorage.getItem('db-data')) {
        var data = {};
        // build resources
        for (var i = 0; i < localStorage.length; i++) {
            var id = localStorage.key(i);
            if (id.charAt(0) == 'r') {
                data[id] = JSON.parse(localStorage.getItem(id));
                data[id]['bs'] = [];
            }
        }
        // build bookings
        for (var i = 0; i < localStorage.length; i++) {
            var id = localStorage.key(i);
            if (id.charAt(0) == 'b') {
                var booking = JSON.parse(localStorage.getItem(id));
                if (data[booking['rid']]) {
                    data[booking['rid']]['bs'].push(booking);
                }
            }
        }
        
        for(var i in data) {
            data[i]['bs'] = data[i]['bs'].sort(_compare); 
        }
        return Object.values(data).sort(_compare);
    }

    // for historical reason
    if (!localStorage.getItem('db-data-active')) {
        if (localStorage.getItem('db-data')) {
            localStorage.setItem('db-data-active', localStorage.getItem('db-data'));
        }
        localStorage.removeItem('db-data');
    }

    // garbage collector
    if (localStorage.getItem('db-version')) {
        for (var i = 0; i <= 10000; i++) {
            localStorage.removeItem('db-data-' + i);
        }
        localStorage.removeItem('db-version');
        localStorage.removeItem('db-data');
    }

    // clean
    setTimeout(function () {
        if (localStorage.getItem('db-data-active')) {
            saveData('clean');
        }
    }, 3);

    // return old
    return JSON.parse(localStorage.getItem('db-data-active'));
}

/**
 * shouldn't upload when edit data. That causes lost some information
 *
 * @param data
 */
function writeData(data, action, objId, childIds) {
    if (action && objId) {
        switch (true) {
            case 'delete-resource-action' == action:
                // remove resource
                localStorage.removeItem(objId);
                for (var i in childIds) {
                    localStorage.removeItem(childIds[i]);
                }
                break;

            case 'delete-booking-action' == action:
                localStorage.removeItem(objId);
                break;
        }
        return;
    }
    for (var rindex in data) {
        for (var bindex in data[rindex]['bs']) {
            // write booking
            localStorage.setItem(data[rindex]['bs'][bindex]['id'], JSON.stringify(data[rindex]['bs'][bindex]));
        }
        delete data[rindex]['bs'];
        // write resource
        localStorage.setItem(data[rindex]['id'], JSON.stringify(data[rindex]));
    }

    localStorage.removeItem('db-data-active');
}

function _addResource(resourceId, resourceType, resourceSize, nickname, after) {
    var html = BindController.bind($('#resource-sample').text().trim(), {
        'resourceId': resourceId ? resourceId : _uniqid('r', true),
        'resourceType': resourceType ? resourceType : 0,
        'resourceSize': resourceSize ? resourceSize : '16',
        'nickname': _nickname(nickname)
    });
    if (after) {
        var dom = $(html).insertAfter($(after));
    } else {
        var dom = $(html).appendTo($('.sub-container'));
    }
    _checkResource();
    return dom;
}

function _addBooking(resourceEl, bookingId, display, status, priority, title, detail) {
    var bookingDetail = _bookingDetail(detail);
    var mapping = {0: 10, 1: 11, 2: 13, 3: 15};
    status = mapping[status] ? mapping[status] : status;
    var html = BindController.bind($('#booking-sample').text().trim(), {
        'bookingId': bookingId ? bookingId : _uniqid('b', true),
        'bookingDisplay': display ? display : 1,
        'bookingStatus': status ? status : 10,
        'bookingPriority': priority,
        'bookingTitle': _bookingTitle(title ? title : detail),
        'bookingDetail': bookingDetail
    });
    var dom = $(html);
    if (bookingDetail) {
        $(dom).closest('.portlet').find('.portlet-toggle').addClass('has-content');
    }
    return $(dom).appendTo($(resourceEl));
}

function _deleteBooking(el, callback) {
    var text = _bookingTitle(el.find('.booking-title').html());
    _confirmDialog(el, 'booking', text, callback);
}

function _deleteResource(el, callback) {
    var text = _nickname(el.find('.nickname').html());
    _confirmDialog(el, 'resource', text, function () {
        callback();
        _checkResource();
    }, function () {
        _checkResource();
    });
}

function _checkResource() {
    if (!$('.resource-column:visible').length) {
        $('.center-container .add-resource-action').show();
    } else {
        $('.center-container .add-resource-action').hide();
    }
}

function _shortText(html, length) {
    // output: one line normal text
    html = html.replace(/<\/?[^>]+>/gui, ' '); // remove script tags, html tags
    html = _restore(html); // convert html entities to normal
    html = html.split('\n')[0]; // get first line
    html = html.replace(/\s+/gui, ' ');
    return html.trim().substr(0, length).trim();
}

function _nickname(html) {
    html = _shortText(html, 32);
    return html ? html : '';
}

function _bookingTitle(html) {
    html = _shortText(html, 64);
    return html ? html : '';
}

function _bookingDetail(html) {
    // output: remove script tags, remove tags attributes
    html = html.replace(/<script\s[^>]+>/gui, ' ').replace(/<\/script>/gui, ' '); // remove script tags
    html = html.replace(/<([a-z0-9]+)\s[^>]+>/gui, '<$1>'); // remove tag attributes
    html = html.replace(/\s+/gui, ' ');
    return html.trim();
}

function _confirmDialog(el, type, content, removeCallback, hideCallback) {
    $('#dialog-confirm .type-confirm').hide();
    $('#dialog-confirm .type-confirm.type-' + type).show();
    $('#dialog-confirm .content-confirm').text(content);
    var obj = {
        position: {my: 'center', at: 'center', of: window},
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        title: Lang['delete_' + type + '_title'],
        buttons: {}
    };
    obj.buttons[Lang.delete_button] = function () {
        $(this).dialog('close');
        $(el).hide();
        if ('function' == typeof hideCallback) {
            hideCallback();
        }
        setTimeout(function () {
            $(el).remove();
            removeCallback();
        }, 10);
    };
    obj.buttons[Lang.cancel_button] = function () {
        $(this).dialog('close');
    };
    $('#dialog-confirm').dialog(obj);
}