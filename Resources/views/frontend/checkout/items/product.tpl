{extends file='parent:frontend/checkout/items/product.tpl'}

{block name='frontend_checkout_cart_item_delivery_informations' append}
    {block name='frontend_checkout_cart_item_dn_switch_variant'}
        {if $sBasketItem.modus == 0}
            {action module="widgets"
                    controller="DnVariantSwitch"
                    action="variantSwitchForm"
                    basketId=$sBasketItem.id
                    articleId=$sBasketItem.articleID
                    number=$sBasketItem.ordernumber
                    quantity=$sBasketItem.quantity}
        {/if}
    {/block}
{/block}