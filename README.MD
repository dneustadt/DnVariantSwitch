# Change product variants from basket

> **Discontinued** - migrated to [FroshVariantSwitch](https://github.com/FriendsOfShopware/FroshVariantSwitch)

[![Scrutinizer](https://scrutinizer-ci.com/g/dneustadt/DnVariantSwitch/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/dneustadt/DnVariantSwitch/?branch=master)
[![Travis CI](https://travis-ci.org/dneustadt/DnVariantSwitch.svg?branch=master)](https://travis-ci.org/dneustadt/DnVariantSwitch)

This plugin for Shopware adds functionality to change the previously
selected variant of a product within basket and checkout views.

Available variants can be exchanged by clicking "Change variant"
in cart/checkout views as well as in the off-canvas basket. It will
open a modal that includes all relevant information. The product
configuration as well as the quantity can be changed at this point.

Users will no longer have to remove the article from the basket, 
find the desired article again and add another variant from the article
page instead.

## Installation

* Clone this repository into a folder **DnVariantSwitch** within the **custom/plugins** directory of the Shopware installation.
* Install the plugin through the Plugin-Manager within the Shopware backend.

### Install with composer
* Change to your root installation of shopware
* Run command `composer require dneustadt/dn-variant-switch` and install and activate plugin with Plugin Manager 

## Requirements

* Shopware 5.3.4 or higher
* PHP 7.0