"use strict";

/*
    MINI STORE CHECKOUT SYSTEM
    Laboratory Activity #3
    Control-Structure Application
*/


// ==========================================
// REQUIRED CALCULATION FUNCTIONS
// ==========================================

/*
    Calculates the amount of one product.

    Item Amount = Price × Quantity
*/
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


/*
    Calculates the discount based on subtotal.

    ₱5,000 and above      = 10%
    ₱3,000 - ₱4,999.99    = 7%
    ₱1,000 - ₱2,999.99    = 5%
    Below ₱1,000          = 0%
*/
function calculateDiscount(subtotal) {
    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 0.10;
    } else if (subtotal >= 3000) {
        discountRate = 0.07;
    } else if (subtotal >= 1000) {
        discountRate = 0.05;
    } else {
        discountRate = 0;
    }

    return subtotal * discountRate;
}


/*
    Determines the delivery fee using switch.

    1 = Store Pickup       ₱0
    2 = Standard Delivery ₱80
    3 = Express Delivery  ₱150
*/
function getDeliveryFee(option) {
    let fee = 0;

    switch (String(option)) {
        case "1":
            fee = 0;
            break;

        case "2":
            fee = 80;
            break;

        case "3":
            fee = 150;
            break;

        default:
            fee = 0;
    }

    return fee;
}


// ==========================================
// DOM ELEMENTS
// ==========================================

const customerNameInput = document.getElementById("customerName");
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const deliveryOption = document.getElementById("deliveryOption");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");


// ==========================================
// HELPER FUNCTION
// ==========================================

function formatCurrency(amount) {
    return `₱${amount.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}


// ==========================================
// CREATE PRODUCT INPUTS
// ==========================================

function generateProductInputs() {

    productsContainer.innerHTML = "";

    const productCount = Number(productCountInput.value);

    if (!Number.isInteger(productCount) || productCount <= 0) {
        return;
    }

    /*
        Required FOR LOOP.

        Dynamically creates:
        productName-0
        productPrice-0
        productQuantity-0

        productName-1
        productPrice-1
        productQuantity-1

        and so on...
    */

    for (let i = 0; i < productCount; i++) {

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-title">
                Product ${i + 1}
            </div>

            <div class="product-grid">

                <div class="form-group">
                    <label for="productName-${i}">
                        Product Name
                    </label>

                    <input
                        type="text"
                        id="productName-${i}"
                        placeholder="Enter product name"
                    >
                </div>

                <div class="form-group">
                    <label for="productPrice-${i}">
                        Price
                    </label>

                    <input
                        type="number"
                        id="productPrice-${i}"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                    >
                </div>

                <div class="form-group">
                    <label for="productQuantity-${i}">
                        Quantity
                    </label>

                    <input
                        type="number"
                        id="productQuantity-${i}"
                        min="1"
                        step="1"
                        placeholder="0"
                    >
                </div>

            </div>
        `;

        productsContainer.appendChild(productCard);
    }
}


// ==========================================
// VALIDATION MESSAGE
// ==========================================

function showValidation(message) {

    validationMessage.textContent = message;
    validationMessage.className = "validation error";
}


function clearValidation() {

    validationMessage.textContent = "";
    validationMessage.className = "validation";
}


// ==========================================
// GENERATE PRODUCT INPUTS WHEN COUNT CHANGES
// ==========================================

productCountInput.addEventListener("input", generateProductInputs);


// ==========================================
// CALCULATE ORDER
// ==========================================

calculateBtn.addEventListener("click", function () {

    clearValidation();

    // --------------------------------------
    // CUSTOMER NAME VALIDATION
    // --------------------------------------

    const customerName = customerNameInput.value.trim();

    if (customerName === "") {
        showValidation("Please enter the Customer Name.");
        customerNameInput.focus();
        return;
    }


    // --------------------------------------
    // PRODUCT COUNT VALIDATION
    // --------------------------------------

    const productCount = Number(productCountInput.value);

    if (
        !Number.isInteger(productCount) ||
        productCount <= 0
    ) {
        showValidation(
            "Number of Products must be a positive whole number."
        );

        productCountInput.focus();
        return;
    }


    // --------------------------------------
    // PRODUCT INPUT EXISTENCE CHECK
    // --------------------------------------

    if (
        productsContainer.children.length !== productCount
    ) {
        generateProductInputs();
    }


    // --------------------------------------
    // ACCUMULATOR
    // --------------------------------------

    let subtotal = 0;

    let productDetails = "";


    // --------------------------------------
    // PROCESS PRODUCTS USING FOR LOOP
    // --------------------------------------

    for (let i = 0; i < productCount; i++) {

        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);


        // ----------------------------------
        // PRODUCT NAME VALIDATION
        // ----------------------------------

        if (productName === "") {

            showValidation(
                `Please enter the Product Name for Product ${i + 1}.`
            );

            document.getElementById(`productName-${i}`).focus();
            return;
        }


        // ----------------------------------
        // PRICE VALIDATION
        // ----------------------------------

        if (!Number.isFinite(price) || price <= 0) {

            showValidation(
                `Price for Product ${i + 1} must be a positive number.`
            );

            document.getElementById(`productPrice-${i}`).focus();
            return;
        }


        // ----------------------------------
        // QUANTITY VALIDATION
        // ----------------------------------

        if (
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {

            showValidation(
                `Quantity for Product ${i + 1} must be a positive whole number.`
            );

            document
                .getElementById(`productQuantity-${i}`)
                .focus();

            return;
        }


        // ----------------------------------
        // CALCULATE ITEM AMOUNT
        // ----------------------------------

        const itemAmount =
            calculateItemAmount(price, quantity);


        // ----------------------------------
        // ADD TO SUBTOTAL
        // ----------------------------------

        subtotal += itemAmount;


        // ----------------------------------
        // BUILD PRODUCT SUMMARY
        // ----------------------------------

        productDetails += `
            <div class="product-summary">

                <strong>${i + 1}. ${productName}</strong>

                <div class="summary-row">
                    <span>Price:</span>
                    <span>${formatCurrency(price)}</span>
                </div>

                <div class="summary-row">
                    <span>Quantity:</span>
                    <span>${quantity}</span>
                </div>

                <div class="summary-row">
                    <span>Amount:</span>
                    <strong>${formatCurrency(itemAmount)}</strong>
                </div>

            </div>
        `;
    }


    // ======================================
    // CALCULATE DISCOUNT
    // ======================================

    const discountAmount =
        calculateDiscount(subtotal);


    // ======================================
    // DETERMINE DISCOUNT RATE
    // ======================================

    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }


    // ======================================
    // DELIVERY INFORMATION
    // ======================================

    const selectedOption = deliveryOption.value;

    const deliveryFee =
        getDeliveryFee(selectedOption);

    let deliveryType = "";

    switch (selectedOption) {

        case "1":
            deliveryType = "Store Pickup";
            break;

        case "2":
            deliveryType = "Standard Delivery";
            break;

        case "3":
            deliveryType = "Express Delivery";
            break;

        default:
            deliveryType = "Store Pickup";
    }


    // ======================================
    // FINAL AMOUNT
    // ======================================

    const finalAmount =
        subtotal - discountAmount + deliveryFee;


    // ======================================
    // DISPLAY ORDER SUMMARY
    // ======================================

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>

        <p>
            <strong>Customer:</strong>
            ${customerName}
        </p>

        ${productDetails}

        <div style="margin-top: 20px;">

            <div class="summary-row">
                <span>Subtotal:</span>
                <strong>${formatCurrency(subtotal)}</strong>
            </div>

            <div class="summary-row">
                <span>Discount Rate:</span>
                <strong>${discountRate}%</strong>
            </div>

            <div class="summary-row">
                <span>Discount Amount:</span>
                <strong>${formatCurrency(discountAmount)}</strong>
            </div>

            <div class="summary-row">
                <span>Delivery Type:</span>
                <strong>${deliveryType}</strong>
            </div>

            <div class="summary-row">
                <span>Delivery Fee:</span>
                <strong>${formatCurrency(deliveryFee)}</strong>
            </div>

            <div class="summary-row final-row">
                <span>Final Amount:</span>
                <span>${formatCurrency(finalAmount)}</span>
            </div>

        </div>
    `;
});
