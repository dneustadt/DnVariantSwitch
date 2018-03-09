{if $hasActiveVariants}
    <form href="{url controller="detail" sArticle=$articleID number=$number}"
          class="content--variant-switch-form block"
          data-variant-switch="true"
          data-switchUrl="{url module="widgets" controller="DnVariantSwitch" action="switchVariant"}"
          data-detailId="{$basketID}"
          data-productUrl="{url controller="detail" sArticle=$articleID}"}
          data-productQuery="?number={$number}&template=ajax">
        <button class="is--icon-right" type="submit" name="Submit" value="submit">
            {s name="ChangeVariant" namespace="frontend/plugins/dn/variantswitch"}Variante wechseln{/s} <i class="icon--cycle"></i>
        </button>
    </form>
{/if}