{extends file='parent:frontend/checkout/items/product.tpl'}

{block name='frontend_checkout_cart_item_delivery_informations' append}
    {action module="widgets"
            controller="DnVariantSwitch"
            action="variantSwitchForm"
            basketId=$sBasketItem.id
            articleId=$sBasketItem.articleID
            number=$sBasketItem.ordernumber}
{/block}