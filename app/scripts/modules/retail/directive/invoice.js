(function() {
    'use strict';

    angular
        .module('retailInvoice', ['ui.bootstrap'])
        .directive('invoice', invoice)
        // Service for accessing local storage
        .service('LocalStorage', [function() {

            var Service = {};

            // Returns true if there is a logo stored
            var hasLogo = function() {
                return !!localStorage['logo'];
            };

            // Returns a stored logo (false if none is stored)
            Service.getLogo = function() {
                if (hasLogo()) {
                    return localStorage['logo'];
                } else {
                    return false;
                }
            };

            Service.setLogo = function(logo) {
                localStorage['logo'] = logo;
            };

            // Checks to see if an invoice is stored
            var hasInvoice = function() {
                return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
            };

            // Returns a stored invoice (false if none is stored)
            Service.getInvoice = function() {
                if (hasInvoice()) {
                    return JSON.parse(localStorage['invoice']);
                } else {
                    return false;
                }
            };

            Service.setInvoice = function(invoice) {
                localStorage['invoice'] = JSON.stringify(invoice);
            };

            // Clears a stored logo
            Service.clearLogo = function() {
                localStorage['logo'] = '';
            };

            // Clears a stored invoice
            Service.clearinvoice = function() {
                localStorage['invoice'] = '';
            };

            // Clears all local storage
            Service.clear = function() {
                localStorage['invoice'] = '';
                Service.clearLogo();
            };

            return Service;

        }])
        .service('Currency', [function() {

            var service = {};

            service.all = function() {
                return [{
                    name: 'British Pound (£)',
                    symbol: '£'
                }, {
                    name: 'Canadian Dollar ($)',
                    symbol: 'CAD $ '
                }, {
                    name: 'Euro (€)',
                    symbol: '€'
                }, {
                    name: 'Indian Rupee (Rs.)',
                    symbol: 'Rs.'
                }, {
                    name: 'Norwegian krone (kr)',
                    symbol: 'kr '
                }, {
                    name: 'US Dollar ($)',
                    symbol: '$'
                }]
            }

            return service;

        }])

        // The default logo for the invoice
        .constant('DEFAULT_LOGO', 'images/logo.png')
        // The invoice displayed when the user first uses the app
        .constant('DEFAULT_INVOICE', {
            tax: 13.00,
            invoice_number: 10,
            customer_info: {
                name: 'Mr. John Doe',
                web_link: 'John Doe Designs Inc.',
                address1: '1 Infinite Loop',
                address2: 'Cupertino, California, US',
                postal: '90210'
            },
            company_info: {
                name: 'Metaware Labs',
                web_link: 'www.metawarelabs.com',
                address1: '123 Yonge Street',
                address2: 'Toronto, ON, Canada',
                postal: 'M5S 1B6'
            },
            items: [{
                qty: 10,
                description: 'Gadget',
                cost: 9.95
            }]
        })

    invoiceCtrl.$inject = ['$scope', '$uibModal', '$log', '$http', 'DEFAULT_INVOICE', 'DEFAULT_LOGO', 'LocalStorage', 'Currency'];

    function invoice() {
        // Usage:
        //
        // Creates:
        //
        var invoice = {
            bindToController: true,
            controller: invoiceCtrl,
            templateUrl: 'scripts/modules/retail/directive/invoice.tpl.html',
            controllerAs: 'ivc',
            link: link,
            restrict: 'AE',
            scope: {}
        };
        return invoice;

        function link(scope, element, attrs) {}



    };
    /* @ngInject */
    function invoiceCtrl($scope, $uibModal, $log, $http, DEFAULT_INVOICE, DEFAULT_LOGO, LocalStorage, Currency) {
        var ivc = this;
ivc.printModeInvoice = false;
        // Set defaults
        ivc.currencySymbol = 'Rs.';
        ivc.logoRemoved = false;
        ivc.printMode = false;

        (function init() {
            // Attempt to load invoice from local storage
            ! function() {
                var invoice = LocalStorage.getInvoice();
                ivc.invoice = invoice ? invoice : DEFAULT_INVOICE;
            }();

            // Set logo to the one from local storage or use default
            ! function() {
                var logo = LocalStorage.getLogo();
                ivc.logo = logo ? logo : DEFAULT_LOGO;
            }();

            ivc.availableCurrencies = Currency.all();

        })()
        // Adds an item to the invoice's items
        ivc.addItem = function() {
            ivc.invoice.items.push({
                qty: 0,
                cost: 0,
                description: ""
            });
        }

        // Toggle's the logo
        ivc.toggleLogo = function(element) {
            ivc.logoRemoved = !ivc.logoRemoved;
            LocalStorage.clearLogo();
        };

        // Triggers the logo chooser click event
        ivc.editLogo = function() {
            // angular.element('#imgInp').trigger('click');
            document.getElementById('imgInp').click();
        };

        ivc.printInfo = function() {
            window.print();
        };

        // Remotes an item from the invoice
        ivc.removeItem = function(item) {
            ivc.invoice.items.splice(ivc.invoice.items.indexOf(item), 1);
        };

        // Calculates the sub total of the invoice
        ivc.invoiceSubTotal = function() {
            var total = 0.00;
            angular.forEach(ivc.invoice.items, function(item, key) {
                total += (item.qty * item.cost);
            });
            return total;
        };

        // Calculates the tax of the invoice
        ivc.calculateTax = function() {
            return ((ivc.invoice.tax * ivc.invoiceSubTotal()) / 100);
        };

        // Calculates the grand total of the invoice
        ivc.calculateGrandTotal = function() {
            saveInvoice();
            return ivc.calculateTax() + ivc.invoiceSubTotal();
        };

        // Clears the local storage
        ivc.clearLocalStorage = function() {
            var confirmClear = confirm('Are you sure you would like to clear the invoice?');
            if (confirmClear) {
                LocalStorage.clear();
                setInvoice(DEFAULT_INVOICE);
            }
        };

        // Sets the current invoice to the given one
        var setInvoice = function(invoice) {
            ivc.invoice = invoice;
            saveInvoice();
        };

        // Reads a url
        var readUrl = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('company_logo').setAttribute('src', e.target.result);
                    LocalStorage.setLogo(e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        };

        // Saves the invoice in local storage
        var saveInvoice = function() {
            LocalStorage.setInvoice(ivc.invoice);
        };

        // Runs on document.ready
        angular.element(document).ready(function() {
            // Set focus
            document.getElementById('invoice-number').focus();

            // Changes the logo whenever the input changes
            document.getElementById('imgInp').onchange = function() {
                readUrl(this);
            };
        });


    };

})();