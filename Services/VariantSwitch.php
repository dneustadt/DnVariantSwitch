<?php

namespace DnVariantSwitch\Services;

use Shopware\Bundle\StoreFrontBundle\Service\AdditionalTextServiceInterface;
use Shopware\Bundle\StoreFrontBundle\Service\ContextServiceInterface;
use Shopware\Bundle\StoreFrontBundle\Service\ListProductServiceInterface;
use Shopware\Components\Model\ModelManager;

/**
 * Class VariantSwitch
 * @package DnVariantSwitch\Services
 */
class VariantSwitch implements VariantSwitchInterface
{

    /** @var ModelManager */
    private $models;

    /** @var ContextServiceInterface */
    private $context;

    /** @var ListProductServiceInterface */
    private $listProductService;

    /** @var AdditionalTextServiceInterface */
    private $additionalTextService;

    public function __construct(
        ModelManager $models,
        ContextServiceInterface $contextService,
        ListProductServiceInterface $listProductService,
        AdditionalTextServiceInterface $additionalTextService
    )
    {
        $this->models = $models;
        $this->context = $contextService;
        $this->listProductService = $listProductService;
        $this->additionalTextService = $additionalTextService;
    }

    /**
     * @inheritdoc
     */
    public function switchVariant($number, $basketID, $quantity = 1)
    {
        /** @var \Shopware\Models\Order\Basket $basket */
        $basket = $this->models->getRepository('Shopware\Models\Order\Basket')->find($basketID);
        $basket->setOrderNumber($number);

        $context = $this->context->getProductContext();
        $product = $this->listProductService->get($number, $context);
        /** @var \Shopware\Bundle\StoreFrontBundle\Struct\ListProduct $product */
        $product = $this->additionalTextService->buildAdditionalText($product, $context);

        $basket->setArticleName($product->getName() . ' ' . $product->getAdditional());

        $this->models->persist($basket);
        $this->models->flush();

        Shopware()->Modules()->Basket()->sUpdateArticle($basketID, $quantity);
    }

}