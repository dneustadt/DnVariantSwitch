<?php

class Shopware_Controllers_Widgets_DnVariantSwitch extends \Enlight_Controller_Action
{
    public function variantSwitchFormAction()
    {
        $basketID = $this->Request()->get('basketId');
        $articleID = $this->Request()->get('articleId');
        $number = $this->Request()->get('number');

        $this->view->hasActiveVariants = true;

        $this->view->basketID = $basketID;
        $this->view->articleID = $articleID;
        $this->view->number = $number;
    }

    public function switchVariantAction()
    {
        $this->get('front')->Plugins()->ViewRenderer()->setNoRender();

        $number = $this->Request()->get('sAdd');
        $quantity = (int)$this->Request()->get('sQuantity', 1);
        $basketID = (int)$this->Request()->get('detailId');

        if(!empty($number) && !empty($basketID)){
            $this->get('dn.variant_switch')->switchVariant($number, $basketID, $quantity);
        }

        $this->Response()->setBody(json_encode(array('success' => true)));
    }
}