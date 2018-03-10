;(function($, window, document) {
    'use strict';

    $.plugin('dnVariantSwitch', {

        defaults: {

            switchUrl: '',

            detailId: 0,

            productUrl: '',

            productQuery: '',

            offCanvas: false,

            modalWidth: 1024

        },

        init: function () {
            var me = this;

            me.applyDataAttributes();

            me._isOpened = false;

            me.opts.modal = $.extend({}, Object.create($.modal.defaults), me.opts);
            me.opts.modal.additionalClass = 'switch-variant--modal';
            me.opts.modal.width = me.opts.modalWidth;

            me.registerEvents();
        },

        registerEvents: function() {
            var me = this;

            me._on(me.$el, 'submit', $.proxy(me.onSubmit, me));

            $.publish('plugin/dnVariantSwitch/onRegisterEvents', [ me ]);
        },

        onSubmit: function (event) {
            event.preventDefault();

            var me = this,
                target = me.opts.productUrl,
                query = me.opts.productQuery;

            $.loadingIndicator.open();

            $.ajax({
                url: target + query,
                type: "GET",
                dataType: "html",
                success: function (response) {
                    var $response = $($.parseHTML(response, document, true)),
                        $detail = $response.find('.product--detail-upper'),
                        index = $('*[data-variant-switch="true"]').index(me.$el);

                    $.loadingIndicator.close();

                    if (!$detail) {
                        return;
                    }

                    $.modal.open(
                        '<div class="product--details ajax-modal--custom" data-index="' + index + '" data-ajax-variants-container="true">' +
                        $detail[0].outerHTML +
                        '</div>',
                        me.opts.modal
                    );

                    window.StateManager.addPlugin(
                        '*[data-ajax-variants-container="true"]',
                        'swAjaxVariant',
                        ['xs', 's', 'm', 'l', 'xl']
                    );

                    var $modal = $('.switch-variant--modal'),
                        $buyboxForm = $modal.find('*[data-add-article="true"]');

                    $modal.find('*[data-ajax-variants-container="true"]').data('plugin_swAjaxVariant')._getUrl = function () {
                       return target;
                    };

                    if (!$buyboxForm) {
                        return;
                    }

                    me._on($buyboxForm, 'submit', $.proxy(me.onBuyboxSubmit, me));
                }
            });

            me._isOpened = true;
        },

        onBuyboxSubmit: function (event) {
            event.preventDefault();

            var me = this,
                data = $(event.target).serialize();

            $.loadingIndicator.open({
                closeOnClick: false,
                renderElement: '.switch-variant--modal .content'
            });

            $.ajax({
                'data': data + '&detailId=' + me.opts.detailId,
                'method': 'GET',
                'url': me.opts.switchUrl,
                'success': function () {
                    if (me.opts.offCanvas) {
                        var plugin = $('*[data-collapse-cart="true"]').data('plugin_swCollapseCart');

                        plugin.loadCart(function () {
                            $.modal.close();
                            plugin.openMenu();

                            window.StateManager.addPlugin(
                                '*[data-off-canvas-variant-switch="true"]',
                                'dnOffCanvasVariantSwitch',
                                ['xs', 's', 'm', 'l', 'xl']
                            );
                        });

                        return;
                    }

                    if (window.location.href.includes("addArticle")) {
                        window.location.href = window.location.href.replace("addArticle", "cart");
                    } else {
                        window.location.reload();
                    }
                }
            });
        },

        onClose: function () {
            var me = this;

            me._isOpened = false;
        },

        destroy: function () {
            var me = this;

            if (me._isOpened) {
                $.modal.close();
            }

            me._destroy();
        }

    });

    window.StateManager.addPlugin(
        '*[data-variant-switch="true"]',
        'dnVariantSwitch',
        ['xs', 's', 'm', 'l', 'xl']
    );

    $.subscribe("plugin/swAjaxVariant/onBeforeRequestData", function() {
        var $el = $('.switch-variant--modal');

        if ($el.length) {
            $.loadingIndicator.close();
            $.loadingIndicator.open({
                closeOnClick: false,
                renderElement: '.switch-variant--modal .content'
            });
        }
    });

    $.subscribe("plugin/swAjaxVariant/onRequestData", function(e, me) {
        var $el = $('.switch-variant--modal'),
            index = me.$el.data('index');

        if ($el.length) {
            $.loadingIndicator.close();

            var $buyboxForm = $el.find('*[data-add-article="true"]'),
                plugin = $($('*[data-variant-switch="true"]').get(index)).data('plugin_dnVariantSwitch');

            if (!$el.length) {
                return;
            }

            window.StateManager.removePlugin('.switch-variant--modal *[data-add-article="true"]', 'swAddArticle');
            $buyboxForm.data('plugin_swAddArticle').destroy();

            me._on($buyboxForm, 'submit', $.proxy(
                plugin.onBuyboxSubmit,
                plugin
            ));

            me.hasHistorySupport = false;
            setTimeout(function(){
                me.hasHistorySupport = true;
            }, 50);
        }
    });

})(jQuery, window);
