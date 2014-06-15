///<summary>Calculate fare list grid</summary>
///<param name="fareList">Fare list jQuery object</param>
///<param name="policy">Pricing policy object</param>
///<param name="numberFormat">Number format string</param>
///<param name="locale">Two-character ISO country code</param>

function calculateFareList(fareList, policy, numberFormat, locale)
{
 var cost =
 {
  baseFare: 0,
  commission: 0,
  count: 0,
  discount: 0,
  fee: 0,
  forecastCommission: 0,
  fuelSurcharge: 0,
  incomeTax: 0,
  oldPrice: 0,
  penalty: 0,
  penaltyPaid: 0,
  price: 0,
  priceElement: null,
  priceDifference: 0,
  priceDifferenceElement: null,
  serviceTax: 0,
  subTotalPrice: 0,
  subTotalPriceElement: null,
  taxes: 0,
  travelerSurcharge: 0
 };
 var currentCostContainer;
 var currentSaleContainer;
 var costContainer = fareList.find("tbody tr.cost");
 var displayedSaleFee;
 var dislayedServiceTax;
 var isCommon;
 var integerNumberFormat = numberFormat.replace(/\..+/g, "");
 var precision = (numberFormat.lastIndexOf(".") < 0) ? 0 : numberFormat.substr(numberFormat.lastIndexOf(".") + 1).length;
 var sale =
 {
  baseFare: 0,
  baseFareElement: null,
  commission: 0,
  commissionElement: null,
  count: 0,
  countElement: null,
  discount: 0,
  discountElement: null,
  extraFee: 0,
  extraFeeElement: null,
  fee: 0,
  feeElement: null,
  fuelSurcharge: 0,
  fuelSurchargeElement: null,
  incomeTax: 0,
  incomeTaxElement: null,
  isFuelSurchargeCommissionable: 0,
  oldPrice: 0,
  paymentProcessingFee: 0,
  paymentProcessingFeeElement: null,
  penalty: 0,
  penaltyElement: null,
  penaltyPaid: 0,
  penaltyPaidElement: null,
  price: 0,
  priceElement: null,
  priceDifference: 0,
  priceDifferenceElement: null,
  serviceTax: 0,
  serviceTaxElement: null,
  subTotalPrice: 0,
  subTotalPriceElement: null,
  taxes: 0,
  taxesElement: null,
  totalPrice: 0,
  totalPriceElement: fareList.find("tfoot td.totalPrice").first(),
  travelerSurcharge: 0
 };
 var saleContainer = fareList.find("tbody tr.sale");
 var travelSector = {flight: 1, hotel: 3};

 //Check and iterate through the cost/sale prices if either equal cost/sale price entries exist or no cost prices exist
 if ((saleContainer.length > 0) && ((costContainer.length == saleContainer.length) || (costContainer.length == 0)))
 {
  for (var i = 0; i < saleContainer.length; i++)
  {
   currentSaleContainer = $(saleContainer[i]);
   currentCostContainer = (costContainer.length == 0) ? null : $(costContainer[i]);
   isCommon = currentSaleContainer.hasClass("common");
   
   //Identify writeable fare elements
   if (currentCostContainer != null)
   {
    cost.priceElement = currentCostContainer.find(".price:not(.invisible)").first();
    cost.priceDifferenceElement = currentCostContainer.find(".priceDifference:not(.invisible)").first();
    cost.subTotalPriceElement = currentCostContainer.find(".subTotalPrice:not(.invisible)").first();
   }
   sale.baseFareElement = currentSaleContainer.find(".baseFare:not(.invisible)").first();
   sale.commissionElement = currentSaleContainer.find(".commission:not(.invisible)").first();
   sale.countElement = currentSaleContainer.find(".count:not(.invisible)").first();
   sale.discountElement = currentSaleContainer.find(".discount:not(.invisible)").first();
   sale.extraFeeElement = currentSaleContainer.find(".extraFee:not(.invisible)").first();
   sale.feeElement = currentSaleContainer.find(".fee:not(.invisible)").first();
   sale.fuelSurchargeElement = currentSaleContainer.find(".fuelSurcharge:not(.invisible)").first();
   sale.incomeTaxElement = currentSaleContainer.find(".incomeTax:not(.invisible)").first();
   sale.paymentProcessingFeeElement = currentSaleContainer.find(".paymentProcessingFee:not(.invisible)").first();
   sale.penaltyElement = currentSaleContainer.find(".penalty:not(.invisible)").first();
   sale.penaltyPaidElement = currentSaleContainer.find(".penaltyPaid:not(.invisible)").first();
   sale.priceElement = currentSaleContainer.find(".price:not(.invisible)").first();
   sale.priceDifferenceElement = currentSaleContainer.find(".priceDifference:not(.invisible)").first();
   sale.serviceTaxElement = currentSaleContainer.find(".serviceTax:not(.invisible)").first();
   sale.subTotalPriceElement = currentSaleContainer.find(".subTotalPrice:not(.invisible)").first();
   sale.taxesElement = currentSaleContainer.find(".taxes:not(.invisible)").first();
   sale.travelerSurchargeElement = currentSaleContainer.find(".travelerSurcharge:not(.invisible)").first();

   //Read readable fare values
   if (currentCostContainer != null)
   {
    cost.baseFare = round(parseAmount(getContentText(currentCostContainer.find(".baseFare:not(.invisible)"))), 2);
    cost.commission = round(parseAmount(getContentText(currentCostContainer.find(".commission:not(.invisible)"))), 2);
    cost.forecastCommission = round(parseAmount(getContentText(currentCostContainer.find(".forecastCommission:not(.invisible)"))), 2);
    cost.count = Math.max(round(parseAmount(getContentText(currentCostContainer.find(".count:not(.invisible)"))), 2), 1);
    cost.discount = round(parseAmount(getContentText(currentCostContainer.find(".discount:not(.invisible)"))), 2);
    cost.fee = round(parseAmount(getContentText(currentCostContainer.find(".fee:not(.invisible)"))), 2);
    cost.fuelSurcharge = round(parseAmount(getContentText(currentCostContainer.find(".fuelSurcharge:not(.invisible)"))), 2);
    cost.incomeTax = round(parseAmount(getContentText(currentCostContainer.find(".incomeTax:not(.invisible)"))), 2);
    cost.oldPrice = round(parseAmount(getContentText(currentCostContainer.find(".oldPrice:not(.invisible)"))), 2);
    cost.penalty = round(parseAmount(getContentText(currentCostContainer.find(".penalty:not(.invisible)"))), 2);
    cost.penaltyPaid = round(parseAmount(getContentText(currentCostContainer.find(".penaltyPaid:not(.invisible)"))), 2);
    cost.serviceTax = round(parseAmount(getContentText(currentCostContainer.find(".serviceTax:not(.invisible)"))), 2);
    cost.taxes = round(parseAmount(getContentText(currentCostContainer.find(".taxes:not(.invisible)"))), 2);
    cost.travelerSurcharge = round(parseAmount(getContentText(currentCostContainer.find(".travelerSurcharge:not(.invisible)"))), 2);
   }
   sale.baseFare = round(parseAmount(getContentText(currentSaleContainer.find(".baseFare:not(.invisible)"))), 2);
   sale.commission = round(parseAmount(getContentText(currentSaleContainer.find(".commission:not(.invisible)"))), 2);
   sale.count = Math.max(round(parseAmount(getContentText(currentSaleContainer.find(".count:not(.invisible)"))), 2), 1);
   sale.discount = round(parseAmount(getContentText(currentSaleContainer.find(".discount:not(.invisible)"))), 2);
   sale.extraFee = round(parseAmount(getContentText(currentSaleContainer.find(".extraFee:not(.invisible)"))), 2);
   sale.fee = round(parseAmount(getContentText(currentSaleContainer.find(".fee:not(.invisible)"))), 2);
   sale.fuelSurcharge = round(parseAmount(getContentText(currentSaleContainer.find(".fuelSurcharge:not(.invisible)"))), 2);
   sale.incomeTax = round(parseAmount(getContentText(currentSaleContainer.find(".incomeTax:not(.invisible)"))), 2);
   sale.isFuelSurchargeCommissionable = (currentSaleContainer.find(".isFuelSurchargeCommissionable input:checked:not(.invisible)").length == 1);
   sale.oldPrice = round(parseAmount(getContentText(currentSaleContainer.find(".oldPrice:not(.invisible)"))), 2);
   sale.paymentProcessingFee = round(parseAmount(getContentText(currentSaleContainer.find(".paymentProcessingFee:not(.invisible)"))), 2);
   sale.penalty = round(parseAmount(getContentText(currentSaleContainer.find(".penalty:not(.invisible)"))), 2);
   sale.penaltyPaid = round(parseAmount(getContentText(currentSaleContainer.find(".penaltyPaid:not(.invisible)"))), 2);
   sale.serviceTax = round(parseAmount(getContentText(currentSaleContainer.find(".serviceTax:not(.invisible)"))), 2);
   sale.taxes = round(parseAmount(getContentText(currentSaleContainer.find(".taxes:not(.invisible)"))), 2);
   sale.travelerSurcharge = round(parseAmount(getContentText(currentSaleContainer.find(".travelerSurcharge:not(.invisible)"))), 2);
   
   //Calculate tax-exclusive fees if configured as tax-inclusive
   if (isDefinedAndNotNull(policy.isFeeTaxInclusive))
    if (policy.isFeeTaxInclusive)
    {
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnFee))
     {
      sale.fee = sale.fee / (1 + policy.tax.serviceTaxOnFee);
      sale.extraFee = sale.extraFee / (1 + policy.tax.serviceTaxOnFee);
     }
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnSale))
     {
      sale.fee = sale.fee / (1 + policy.tax.serviceTaxOnSale);
      sale.extraFee = sale.extraFee / (1 + policy.tax.serviceTaxOnSale);
     }
    }

   if (currentCostContainer != null)
   {
    //Copy cost baseFare, count, fuelSurcharge, travelerSurcharge, taxes and penalty to sale if they exist and are writeable
    if (!isCommon)
    {
     if ((sale.baseFareElement.length == 1) && (sale.baseFareElement.find("input").length == 0))
     {
      sale.baseFare = cost.baseFare;
      sale.baseFareElement.html($.formatNumber(sale.baseFare, {format:(sale.baseFare % 1 == 0) ? integerNumberFormat : numberFormat, locale:locale}));
     }
     if ((sale.countElement.length == 1) && (sale.countElement.find("input").length == 0))
     {
      sale.count = cost.count;
      sale.countElement.html("&times; " + sale.count);
     }
     if ((sale.fuelSurchargeElement.length == 1) && (sale.fuelSurchargeElement.find("input").length == 0))
     {
      sale.fuelSurcharge = cost.fuelSurcharge;
      sale.fuelSurchargeElement.html($.formatNumber(sale.fuelSurcharge, {format:(sale.fuelSurcharge % 1 == 0) ? integerNumberFormat : numberFormat, locale:locale}));
     }
     if ((sale.travelerSurchargeElement.length == 1) && (sale.travelerSurchargeElement.find("input").length == 0))
     {
      sale.travelerSurcharge = cost.travelerSurcharge;
      sale.travelerSurchargeElement.html($.formatNumber(sale.travelerSurcharge, {format:(sale.travelerSurcharge % 1 == 0) ? integerNumberFormat : numberFormat, locale:locale}));
     }
     if ((sale.taxesElement.length == 1) && (sale.taxesElement.find("input").length == 0))
     {
      sale.taxes = cost.taxes;
      sale.taxesElement.html($.formatNumber(sale.taxes, {format:(sale.taxes % 1 == 0) ? integerNumberFormat : numberFormat, locale:locale}));
     }
    }
    if ((sale.penaltyElement.length == 1) && (sale.penaltyElement.find("input").length == 0))
    {
     sale.penalty = cost.penalty;
     sale.penaltyElement.html($.formatNumber(sale.penalty, {format:(sale.penalty % 1 == 0) ? integerNumberFormat : numberFormat, locale:locale}));
    }

    //Calculate cost price, priceDifference and subTotalPrice if they exist and are writeable
    if ((cost.priceElement.length == 1) && (cost.priceElement.find("input").length == 0))
    {
     cost.price = cost.baseFare + cost.travelerSurcharge + cost.taxes - cost.commission + cost.fee + cost.penaltyPaid + cost.penalty + cost.incomeTax + cost.serviceTax - cost.discount;
     cost.priceElement.html($.formatNumber(cost.price, {format:integerNumberFormat, locale:locale}));
    }
    if ((cost.priceDifferenceElement.length == 1) && (cost.priceDifferenceElement.find("input").length == 0))
    {
     cost.priceDifference = cost.price - cost.oldPrice;
     cost.priceDifferenceElement.html($.formatNumber(cost.priceDifference, {format:integerNumberFormat, locale:locale}));
    }
    if ((cost.subTotalPriceElement.length == 1) && (cost.subTotalPriceElement.find("input").length == 0))
    {
     //Always calculate subTotalPrice based on priceDifference if it exists
     if (cost.priceDifferenceElement.length == 1)
      cost.subTotalPrice = cost.priceDifference * cost.count;
     else
      cost.subTotalPrice = cost.price * cost.count;
     cost.subTotalPriceElement.html($.formatNumber(cost.subTotalPrice, {format:integerNumberFormat, locale:locale}));
    }
   }
   
   //Calculate sale fee/discount/commission
   if (!isCommon)
   {
    if (isDefined(policy.pricing))
    {
     //Calculate sale only if all three of fee, discount and commission exist and are writeable
     if ((sale.feeElement.length == 1) && (sale.feeElement.find("input").length == 0) && (sale.discountElement.length == 1) && (sale.discountElement.find("input").length == 0) && (sale.commissionElement.length == 1) && (sale.commissionElement.find("input").length == 0))
     {
      calculatePrice(cost, sale, policy, precision);
      
      //Display tax-inclusive fees if configured
      displayedSaleFee = sale.fee;
      if (isDefinedAndNotNull(policy.isFeeTaxInclusive))
       if (policy.isFeeTaxInclusive)
       {
        if (isDefinedAndNotNull(policy.tax.serviceTaxOnFee))
         displayedSaleFee = displayedSaleFee * (1 + policy.tax.serviceTaxOnFee);
        if (isDefinedAndNotNull(policy.tax.serviceTaxOnSale))
         displayedSaleFee = displayedSaleFee * (1 + policy.tax.serviceTaxOnSale);
       }
      sale.feeElement.html($.formatNumber(displayedSaleFee, {format:integerNumberFormat, locale:locale}));

      sale.discountElement.html($.formatNumber(sale.discount, {format:integerNumberFormat, locale:locale}));
      sale.commissionElement.html($.formatNumber(sale.commission, {format:integerNumberFormat, locale:locale}));
     }
    }
   }
   else
   {
    //Echo cost discount only if sale discount is writeable
    if ((sale.discountElement.length == 1) && (sale.discountElement.find("input").length == 0))
    {
     sale.discount = cost.discount;
     sale.discountElement.html($.formatNumber(sale.discount, {format:integerNumberFormat, locale:locale}));
    }
    
    //Echo sale extraFee only if it exists and sale fee is writeable
    if ((sale.extraFeeElement.length == 1) && (sale.extraFeeElement.find("input").length == 1) && (sale.feeElement.length == 1) && (sale.feeElement.find("input").length == 0))
    {
     sale.fee = round(sale.extraFee, precision);

     //Display tax-inclusive fees if configured
     displayedSaleFee = sale.fee;
     if (isDefinedAndNotNull(policy.isFeeTaxInclusive))
      if (policy.isFeeTaxInclusive)
      {
       if (isDefinedAndNotNull(policy.tax.serviceTaxOnFee))
        displayedSaleFee = displayedSaleFee * (1 + policy.tax.serviceTaxOnFee);
       if (isDefinedAndNotNull(policy.tax.serviceTaxOnSale))
        displayedSaleFee = displayedSaleFee * (1 + policy.tax.serviceTaxOnSale);
      }
     sale.feeElement.html($.formatNumber(displayedSaleFee, {format:integerNumberFormat, locale:locale}));
    }
   }

   //Calculate sale incomeTax and serviceTax if they exist and are writeable
   if (isDefined(policy.tax))
   {
    if ((sale.incomeTaxElement.length == 1) && (sale.incomeTaxElement.find("input").length == 0))
    {
     sale.incomeTax = 0;
     if (isDefinedAndNotNull(policy.tax.incomeTaxOnCommission))
      sale.incomeTax = round(sale.commission * policy.tax.incomeTaxOnCommission, precision);
     sale.incomeTaxElement.html($.formatNumber(sale.incomeTax, {format:numberFormat, locale:locale}));
    }
    if ((sale.serviceTaxElement.length == 1) && (sale.serviceTaxElement.find("input").length == 0))
    {
     sale.serviceTax = 0;
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnBasic))
     {
      sale.serviceTax += ((sale.baseFare + sale.travelerSurcharge) * policy.tax.serviceTaxOnBasic);
      if (sale.isFuelSurchargeCommissionable)
       sale.serviceTax += sale.fuelSurcharge * policy.tax.serviceTaxOnBasic;
     }
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnCommission))
      sale.serviceTax += sale.commission * policy.tax.serviceTaxOnCommission;
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnFee))
      sale.serviceTax += sale.fee * policy.tax.serviceTaxOnFee;
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnPenalty))
      sale.serviceTax += (sale.penaltyPaid + sale.penalty) * policy.tax.serviceTaxOnPenalty;
     if (isDefinedAndNotNull(policy.tax.serviceTaxOnSale))
      sale.serviceTax += (sale.baseFare + sale.travelerSurcharge + sale.taxes + sale.fee) * policy.tax.serviceTaxOnSale;
     sale.serviceTax = round(sale.serviceTax, precision);

     //Hide service tax on fees if configured as tax-inclusive
     displayedServiceTax = sale.serviceTax;
     if (isDefinedAndNotNull(policy.isFeeTaxInclusive))
      if (policy.isFeeTaxInclusive)
      {
       if(isDefinedAndNotNull(policy.tax.serviceTaxOnFee))
        displayedServiceTax = displayedServiceTax - (sale.fee * policy.tax.serviceTaxOnFee);
       if(isDefinedAndNotNull(policy.tax.serviceTaxOnSale))
        displayedServiceTax = displayedServiceTax - (sale.fee * policy.tax.serviceTaxOnSale);
      }
     sale.serviceTaxElement.html($.formatNumber(round(displayedServiceTax, precision), {format:numberFormat, locale:locale}));
    }
   }

   //Calculate sale paymentProcessingFee, price, priceDifference and subTotalPrice if they exist and are writeable
   if (isDefined(policy.pricing))
   {
    if (isDefinedAndNotNull(policy.pricing.paymentCardProcessingSurchargeRatio) && (sale.paymentProcessingFeeElement.length == 1) && (sale.paymentProcessingFeeElement.find("input").length == 0))
    {
     sale.paymentProcessingFee = Math.ceil((sale.baseFare + sale.travelerSurcharge + sale.taxes - sale.commission + sale.fee + sale.incomeTax + sale.serviceTax - sale.discount)*(1/(1 - policy.pricing.paymentCardProcessingSurchargeRatio)-1));
     sale.paymentProcessingFeeElement.html($.formatNumber(sale.paymentProcessingFee, {format:integerNumberFormat, locale:locale}));
    }
   }
   if ((sale.priceElement.length == 1) && (sale.priceElement.find("input").length == 0))
   {
    sale.price = Math.round(sale.baseFare + sale.travelerSurcharge + sale.taxes - sale.commission + sale.fee + sale.penaltyPaid + sale.penalty + sale.incomeTax + sale.serviceTax - sale.discount + sale.paymentProcessingFee);
    sale.priceElement.html($.formatNumber(sale.price, {format:integerNumberFormat, locale:locale}));
   }
   if ((sale.priceDifferenceElement.length == 1) && (sale.priceDifferenceElement.find("input").length == 0))
   {
    sale.priceDifference = Math.round(sale.price - sale.oldPrice);
    sale.priceDifferenceElement.html($.formatNumber(sale.priceDifference, {format:integerNumberFormat, locale:locale}));
   }
   if ((sale.subTotalPriceElement.length == 1) && (sale.subTotalPriceElement.find("input").length == 0))
   {
    //Calculate differential subTotalPrice if priceDifference exists
    if (sale.priceDifferenceElement.length == 1)
     sale.subTotalPrice = sale.priceDifference * sale.count;
    else
     sale.subTotalPrice = sale.price * sale.count;
    sale.totalPrice += sale.subTotalPrice;
    sale.subTotalPriceElement.html($.formatNumber(sale.subTotalPrice, {format:integerNumberFormat, locale:locale}));
   }
  }

  //Set sale totalPrice if it is writeable
  if ((sale.totalPriceElement.length == 1) && (sale.totalPriceElement.find("input").length == 0))
   sale.totalPriceElement.html($.formatNumber(sale.totalPrice, {format:integerNumberFormat, locale:locale}));
 }
}

///<summary>Calculate price based on policy. This function must not be changed unless Musafir.Business.Entities.Finance.Pricing.FareManager.ProcessAirFare is changed.</summary>
///<param name="cost">Cost object</param>
///<param name="sale">Sale object</param>
///<param name="policy">Policy object</param>
///<param name="precision">Decimal precision</param>

function calculatePrice (cost, sale, policy, precision)
{
 var bookingSurchargeType = {onCost: 0, onSalePrice: 1};
 var packageType = {none: 0, flight: 1, hotel: 2, flightAndHotel: 3};
 var flightPackageMode = {normal: 0, split: 1};
 var projectedEarning = 0;
 var requiredEarningDifference = 0;
 var travelSector = {flight: 1, hotel: 3};

 //Set default values
 sale.fee = 0;
 sale.discount = 0;
 sale.commission = 0;
 
 //Calculate saleFee on rooms for hotels
 if (policy.travelSector == travelSector.hotel && isDefinedAndNotNull(policy.pricing.bookingFeePerRoomStay))
  sale.fee += (sale.count * policy.pricing.bookingFeePerRoomStay);

 //Calculate saleFee on baseFare for flights/hotels
 if (isDefinedAndNotNull(policy.pricing.baseFareBookingSurchargeRatio))
 {
  switch(policy.travelSector)
  {
   case travelSector.flight:
    switch(policy.pricing.bookingSurchargeType)
    {
     case null:
     case bookingSurchargeType.onCost:
      if (isDefinedAndNotNull(policy.pricing.vendorCommissionOnBaseAmountRatio))
      {
       sale.fee += (sale.baseFare * (1 - policy.pricing.vendorCommissionOnBaseAmountRatio)) * policy.pricing.baseFareBookingSurchargeRatio;
       sale.fee -= sale.baseFare * policy.pricing.vendorCommissionOnBaseAmountRatio;
      }
      break;
     case bookingSurchargeType.onSalePrice:
      sale.fee += sale.baseFare * policy.pricing.baseFareBookingSurchargeRatio;
      break;
    }
    break;
   case travelSector.hotel:
    sale.fee += sale.baseFare * policy.pricing.baseFareBookingSurchargeRatio;
    break;
  }
 } 

 //Calculate saleFee on total
 if (isDefinedAndNotNull(policy.pricing.bookingSurchargeRatio))
  sale.fee += (sale.baseFare + sale.taxes) * policy.pricing.bookingSurchargeRatio; 

 //Calculate saleFee on fuelSurcharge
 if (isDefinedAndNotNull(policy.pricing.fuelSurchargeCommissionRatio))
 {
  switch(policy.pricing.bookingSurchargeType)
  {
   case null:
   case bookingSurchargeType.onCost:
    if (isDefinedAndNotNull(policy.pricing.vendorCommissionOnFuelSurchargeRatio))
    {
     sale.fee += (sale.fuelSurcharge * (1 - policy.pricing.vendorCommissionOnFuelSurchargeRatio)) * policy.pricing.fuelSurchargeBookingSurchargeRatio;
     sale.fee -= policy.pricing.vendorCommissionOnFuelSurchargeRatio * sale.fuelSurcharge;
    }
    break;
   case bookingSurchargeType.onSalePrice:
    sale.fee += sale.fuelSurcharge * policy.pricing.fuelSurchargeBookingSurchargeRatio;
    break;
  }
 }
 
 //Calculate saleFee on travelerSurcharge for hotels
 if (isDefinedAndNotNull(policy.pricing.travelerSurchargeCommissionRatio))
  sale.fee += sale.travelerSurcharge * policy.pricing.travelerSurchargeBookingSurchargeRatio;
 
 //Calculate interline fee for flights
 if (policy.travelSector == travelSector.flight && isDefinedAndNotNull(policy.isMultiAirlineFlight) && isDefinedAndNotNull(policy.pricing.multipleAirlinesSurchargeRatio))
  if (policy.isMultiAirlineFlight)
   sale.fee += (sale.baseFare + sale.taxes) * policy.pricing.multipleAirlinesSurchargeRatio;

 //Calculate minimum fee, package reduction and corporate reduction
 if (isDefinedAndNotNull(policy.pricing.bookingSurchargeMinimum))
  sale.fee = Math.max(sale.fee, policy.pricing.bookingSurchargeMinimum);
 if (policy.packageType == packageType.flightAndHotel && isDefinedAndNotNull(policy.pricing.flightPlusHotelBookingFeeReductionRatio))
  sale.fee -= (sale.fee * policy.pricing.flightPlusHotelBookingFeeReductionRatio);
 else if (policy.flightPackageMode == flightPackageMode.split && isDefinedAndNotNull(policy.pricing.SplitFlightBookingFeeReductionRatio))
  sale.fee -= (sale.fee * policy.pricing.SplitFlightBookingFeeReductionRatio);
 if (isDefinedAndNotNull(policy.pricing.bookingFeeReductionRatio))
  sale.fee -= sale.fee * policy.pricing.bookingFeeReductionRatio;
 
 sale.fee = round(sale.fee, precision) +  round(sale.extraFee, precision);

 //Calculate saleDiscount for flights/hotels
 if (policy.travelSector == travelSector.hotel)
  sale.discount += cost.discount;
 if (isDefinedAndNotNull(policy.pricing.baseFareDiscountRatio))
  sale.discount += sale.baseFare * policy.pricing.baseFareDiscountRatio;
 if (isDefinedAndNotNull(policy.pricing.fuelSurchargeDiscountRatio))
  sale.discount += sale.fuelSurcharge * policy.pricing.fuelSurchargeDiscountRatio;
 if (isDefinedAndNotNull(policy.pricing.travelerSurchargeDiscountRatio))
  sale.discount += sale.travelerSurcharge * policy.pricing.travelerSurchargeDiscountRatio;
 if (isDefinedAndNotNull(policy.pricing.discountRatio))
  sale.discount += (sale.baseFare + sale.taxes) * policy.pricing.discountRatio;
 if (isDefinedAndNotNull(policy.pricing.discountMinimum))
  if (sale.discount < policy.pricing.discountMinimum)
   sale.discount = policy.pricing.discountMinimum;
 sale.discount = round(sale.discount, precision);
 
 //Calculate saleCommission for flights/hotels
 if (isDefinedAndNotNull(policy.pricing.baseFareCommissionRatio))
  sale.commission += sale.baseFare * policy.pricing.baseFareCommissionRatio;
 if (isDefinedAndNotNull(policy.pricing.fuelSurchargeCommissionRatio))
  sale.commission += sale.fuelSurcharge * policy.pricing.fuelSurchargeCommissionRatio;
 if (isDefinedAndNotNull(policy.pricing.travelerSurchargeCommissionRatio))
  sale.commission += sale.travelerSurcharge * policy.pricing.travelerSurchargeCommissionRatio;
 if (isDefinedAndNotNull(policy.pricing.commissionMinimum))
  if (sale.commission < policy.pricing.commissionMinimum)
   sale.commission = policy.pricing.commissionMinimum;
 sale.commission = round(sale.commission, precision);

 //Minimum earning check
 if (isDefinedAndNotNull(policy.pricing.earningMinimum))
 {
  projectedEarning = round(cost.commission + cost.forecastCommission - cost.fee - sale.commission - sale.discount + sale.fee, precision);
  if (projectedEarning < policy.pricing.earningMinimum)
  {
   requiredEarningDifference = round(policy.pricing.earningMinimum - projectedEarning, precision);
   if (sale.commission > 0)
   {
    if (sale.commission <= requiredEarningDifference)
    {
     requiredEarningDifference = round(requiredEarningDifference - sale.commission, precision);
     sale.commission = 0;
    }
    else
    {
     sale.commission = round(sale.commission - requiredEarningDifference, precision);
     requiredEarningDifference = 0;
    }
   }
   if (sale.discount > 0)
   {
    if (sale.discount <= requiredEarningDifference)
    {
     requiredEarningDifference = round(requiredEarningDifference - sale.discount, precision);
     sale.discount = 0;
    }
    else
    {
     sale.discount = round(sale.discount - requiredEarningDifference, precision);
     requiredEarningDifference = 0;
    }
   }

   if (requiredEarningDifference > 0)
    sale.fee = round(sale.fee + requiredEarningDifference, precision);
  }
 }
}

///<summary>Sets up action panel link group</summary>

function initializeActionPanel()
{
 $(".actionPanel ul li").each(function() {
  var linkitem = $(this);
  linkitem.hover(function() {
   $(this).addClass("active");
  }, function() {
   $(this).removeClass("active");
  });
 });
}

///<summary>Set fare list grid calculator</summary>
///<param name="fareList">Fare list jQuery object</param>
///<param name="policy">Pricing policy object</param>
///<param name="numberFormat">Number format string</param>
///<param name="locale">Two-character ISO country code</param>

function setFareListCalculator(fareList, policy, numberFormat, locale)
{
 //Forcefully unbind other keystroke detectors until a better solution is found
 fareList.find("input").unbind("keyup change");

 //Trigger the calculator on any change
 fareList.find("input").bind("keyup change", function()
 {
  calculateFareList(fareList, policy, numberFormat, locale);
 });
 
 //Trigger the calculator on default values
 calculateFareList(fareList, policy, numberFormat, locale);
}

///<summary>Sets up dropdown to switch between trip views</summary>

function setupTripViewSwitcher()
{
 var switchDropDown = $("#switchTripView");
 switchDropDown.change(function() {
  $(this).find("option").each(function() {
   var viewId = $(this).val();
   var target = $("." + viewId);
   if (target != undefined) {
    if ($(this).prop("selected")) {
     target.removeClass("hidden");
    }
    else {
     target.addClass("hidden");
    }
   }
  });
 });
 switchDropDown.change();
}

///<summary>Event triggered when the DOM is loaded</summary>

$(document).ready(function()
{
 initializeActionPanel();
});