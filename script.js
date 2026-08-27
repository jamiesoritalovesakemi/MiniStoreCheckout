// Required Function 1
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// Required Function 2
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


// Required Function 3
function getDeliveryFee(option) {

    let fee;

    switch (option) {
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


// Get required HTML elements
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");


// Generate product fields
productCountInput.addEventListener("input", function () {

    const productCount = Number(productCountInput.value);

    productsContainer.innerHTML = "";

    if (productCount > 0) {

        for (let i = 0; i < productCount; i++) {

            const productDiv = document.createElement("div");

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">

                <br>

                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" step="0.01">

                <br>

                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}">

                <br><br>
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});


// Calculate Order
calculateBtn.addEventListener("click", function () {

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    const customerName =
        document.getElementById("customerName").value.trim();

    const productCount =
        Number(document.getElementById("productCount").value);


    // Customer name validation
    if (customerName === "") {

        validationMessage.textContent =
            "Please enter Customer Name.";

        return;
    }


    // Product count validation
    if (!Number.isInteger(productCount) || productCount <= 0) {

        validationMessage.textContent =
            "Please enter a valid positive Number of Products.";

        return;
    }


    let subtotal = 0;
    let productDetails = "";


    // Required FOR LOOP
    for (let i = 0; i < productCount; i++) {

        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);


        // Product name validation
        if (productName === "") {

            validationMessage.textContent =
                `Please enter Product Name for Product ${i + 1}.`;

            return;
        }


        // Price validation
        if (isNaN(price) || price <= 0) {

            validationMessage.textContent =
                `Please enter a valid positive Price for Product ${i + 1}.`;

            return;
        }


        // Quantity validation
        if (!Number.isInteger(quantity) || quantity <= 0) {

            validationMessage.textContent =
                `Please enter a valid positive Quantity for Product ${i + 1}.`;

            return;
        }


        // Calculate item amount
        const itemAmount =
            calculateItemAmount(price, quantity);


        // Accumulator
        subtotal += itemAmount;


        productDetails += `
            <p>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }


    // Calculate discount
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


    // Delivery option
    const deliveryOption =
        document.getElementById("deliveryOption").value;


    // Required switch function
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


    // Final Amount
    const finalAmount =
        subtotal - discountAmount + deliveryFee;


    // Complete Order Summary
    orderSummary.innerHTML = `
        <h2>MINI STORE CHECKOUT SYSTEM</h2>

        <p>
            <strong>Customer:</strong>
            ${customerName}
        </p>

        ${productDetails}

        <h3>ORDER SUMMARY</h3>

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

        <p>
            <strong>Final Amount:</strong>
            ₱${finalAmount.toFixed(2)}
        </p>
    `;
});
