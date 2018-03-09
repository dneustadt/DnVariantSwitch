<?php

namespace DnVariantSwitch\Services;

/**
 * Interface VariantSwitchInterface
 * @package DnVariantSwitch\Services
 */
interface VariantSwitchInterface
{

    /**
     * @param string $number
     * @param int $basketID
     * @param int $quantity
     * @return mixed
     */
    public function switchVariant($number, $basketID, $quantity);

}