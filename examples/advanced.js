/*global document, $*/
$(function () {
    var adjustScrollable = function ($scrollable) {
        var insideScrollable = $scrollable.length > 0;
        if (insideScrollable) {
            var scrollable = $scrollable[0];
            if (scrollable.scrollTop <= 0) {
                scrollable.scrollTop = 1;
            } else if (scrollable.scrollHeight <= scrollable.scrollTop + scrollable.offsetHeight) {
                scrollable.scrollTop = scrollable.scrollHeight - scrollable.offsetHeight - 1;
            }
        }
    };
    var touchStart = function (e) {
        var $target = $(e.target);
        var $scrollable = $target.closest('.scrollable');

        adjustScrollable($scrollable);
        return true;
    };

    var touchMove = function (e) {
        var $target = $(e.target);
        var $scrollable = $target.closest('.scrollable');

        var insideScrollable = $scrollable.length > 0;
        if (insideScrollable) {
            e.stopPropagation();
        } else {
            e.preventDefault();
        }
        return insideScrollable;
    };

    document.addEventListener("touchstart", touchStart, true);
    document.addEventListener("touchmove", touchMove, true);

    $('.mail-frame').on('load', function (e) {
        var $target = $(e.target);
        $target.contents().find('body').css('overflow', 'hidden');
        $target.contents().on('touchstart', function (e) {
            var $scrollable = $target.closest('.scrollable');
            adjustScrollable($scrollable);
        });
        $target.show();

        setTimeout(function () {
            var height = $target.contents().find('html').height();
            $target.height(height);
            $target.contents().find('body').css('-webkit-transform', 'translate3d(0,0,0)');
        }, 1);
    });
    function enableTransition() {
        var views = $('.mailView, .mailList');
        views.addClass('transitioning');
        setTimeout(function () {
            views.removeClass('transitioning');
        }, 500);
    }
    // Just some javascript to make the demo a little interactive
    $('.item').click(function () {
        enableTransition();
        $('.content').addClass('showMailView');
    });

    $('.back-to-inbox').click(function () {
        enableTransition();
        $('.content').removeClass('showMailView');
    });
});
