// =====================================================
// MINI STORE CHECKOUT SYSTEM
// =====================================================


// =====================================================
// REQUIRED FUNCTION 1
// Calculates the amount of one product
// =====================================================

function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// =====================================================
// REQUIRED FUNCTION 2
// Calculates the discount amount
// =====================================================

function calculateDiscount(subtotal) {

    let discountRate;

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


// =====================================================
// REQUIRED FUNCTION 3
// Determines the delivery fee
// =====================================================

function getDeliveryFee(option) {

    switch (option) {

        case "1":
            return 0;

        case "2":
            return 80;

        case "3":
            return 150;

        default:
            return 0;
    }
}


// =====================================================
// GENERATE PRODUCT INPUTS
// =====================================================

function generateProductInputs() {

    const productCount =
        Number(document.getElementById("productCount").value);

    const productsContainer =
        document.getElementById("productsContainer");

    productsContainer.innerHTML = "";


    if (productCount > 0) {

        for (let i = 0; i < productCount; i++) {

            const productDiv =
                document.createElement("div");

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">
                    Product Name
                </label>

                <input
                    type="text"
                    id="productName-${i}"
                    name="productName-${i}"
                >

                <br><br>

                <label for="productPrice-${i}">
                    Price
                </label>

                <input
                    type="number"
                    id="productPrice-${i}"
                    name="productPrice-${i}"
                    min="0"
                    step="0.01"
                >

                <br><br>

                <label for="productQuantity-${i}">
                    Quantity
                </label>

                <input
                    type="number"
                    id="productQuantity-${i}"
                    name="productQuantity-${i}"
                    min="1"
                    step="1"
                >

                <br><br>
            `;

            productsContainer.appendChild(productDiv);
        }
    }
}


// =====================================================
// PRODUCT COUNT EVENT
// =====================================================

document
    .getElementById("productCount")
    .addEventListener("input", generateProductInputs);


// =====================================================
// CALCULATE ORDER
// =====================================================

document
    .getElementById("calculateBtn")
    .addEventListener("click", function () {

        const customerName =
            document.getElementById("customerName").value.trim();

        const productCount =
            Number(document.getElementById("productCount").value);

        const deliveryOption =
            document.getElementById("deliveryOption").value;

        const validationMessage =
            document.getElementById("validationMessage");

        const orderSummary =
            document.getElementById("orderSummary");


        // Clear previous messages
        validationMessage.textContent = "";
        orderSummary.innerHTML = "";


        // =================================================
        // CUSTOMER NAME VALIDATION
        // =================================================

        if (customerName === "") {

            validationMessage.textContent =
                "Customer Name is required.";

            return;
        }


        // =================================================
        // PRODUCT COUNT VALIDATION
        // =================================================

        if (
            !Number.isInteger(productCount) ||
            productCount <= 0
        ) {

            validationMessage.textContent =
                "Number of Products must be a positive whole number.";

            return;
        }


        // Make sure product fields exist
        if (
            document.getElementById("productName-0") === null
        ) {

            generateProductInputs();
        }


        // =================================================
        // ACCUMULATOR
        // =================================================

        let subtotal = 0;

        let productDetails = "";


        // =================================================
        // REQUIRED FOR LOOP
        // PROCESS EACH PRODUCT
        // =================================================

        for (let i = 0; i < productCount; i++) {

            const productName =
                document
                    .getElementById(`productName-${i}`)
                    .value
                    .trim();

            const price =
                Number(
                    document
                        .getElementById(`productPrice-${i}`)
                        .value
                );

            const quantity =
                Number(
                    document
                        .getElementById(`productQuantity-${i}`)
                        .value
                );


            // =============================================
            // PRODUCT NAME VALIDATION
            // =============================================

            if (productName === "") {

                validationMessage.textContent =
                    `Product Name is required for Product ${i + 1}.`;

                return;
            }


            // =============================================
            // PRICE VALIDATION
            // =============================================

            if (
                isNaN(price) ||
                price <= 0
            ) {

                validationMessage.textContent =
                    `Price must be a positive number for Product ${i + 1}.`;

                return;
            }


            // =============================================
            // QUANTITY VALIDATION
            // =============================================

            if (
                !Number.isInteger(quantity) ||
                quantity <= 0
            ) {

                validationMessage.textContent =
                    `Quantity must be a positive whole number for Product ${i + 1}.`;

                return;
            }


            // =============================================
            // CALCULATE ITEM AMOUNT
            // =============================================

            const itemAmount =
                calculateItemAmount(price, quantity);


            // =============================================
            // ACCUMULATE SUBTOTAL
            // =============================================

            subtotal += itemAmount;


            // =============================================
            // BUILD PRODUCT OUTPUT
            // =============================================

            productDetails += `
                <p>
                    <strong>${i + 1}. ${productName}</strong><br>
                    Price: ₱${price.toFixed(2)}<br>
                    Quantity: ${quantity}<br>
                    Amount: ₱${itemAmount.toFixed(2)}
                </p>
            `;
        }


        // =================================================
        // DISCOUNT
        // =================================================

        const discountAmount =
            calculateDiscount(subtotal);


        // Determine discount rate for display
        let discountRate;

        if (subtotal >= 5000) {
            discountRate = 10;
        } else if (subtotal >= 3000) {
            discountRate = 7;
        } else if (subtotal >= 1000) {
            discountRate = 5;
        } else {
            discountRate = 0;
        }


        // =================================================
        // DELIVERY
        // =================================================

        const deliveryFee =
            getDeliveryFee(deliveryOption);


        let deliveryType;

        switch (deliveryOption) {

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


        // =================================================
        // FINAL AMOUNT
        // =================================================

        const finalAmount =
            subtotal - discountAmount + deliveryFee;


        // =================================================
        // COMPLETE ORDER SUMMARY
        // =================================================

        orderSummary.innerHTML = `
            <h2>ORDER SUMMARY</h2>

            <p>
                <strong>Customer:</strong>
                ${customerName}
            </p>

            ${productDetails}

            <hr>

            <p>
                <strong>Subtotal:</strong>
                ₱${subtotal.toFixed(2)}
            </p>

            <p>
                <strong>Discount Rate:</strong>
                ${discountRate}%
            </p>

            <p>
                <strong>Discount Amount:</strong>
                ₱${discountAmount.toFixed(2)}
            </p>

            <p>
                <strong>Delivery Type:</strong>
                ${deliveryType}
            </p>

            <p>
                <strong>Delivery Fee:</strong>
                ₱${deliveryFee.toFixed(2)}
            </p>

            <hr>

            <h3>
                Final Amount:
                ₱${finalAmount.toFixed(2)}
            </h3>
        `;

    });
