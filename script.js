// Calculate the amount for one product
function calculateItemAmount(price, quantity) {
    return price * quantity;
}


// Calculate the discount based on the subtotal
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


// Calculate delivery fee using switch statement
function getDeliveryFee(option) {
    let deliveryFee;

    switch (option) {
        case "1":
            deliveryFee = 0;
            break;

        case "2":
            deliveryFee = 80;
            break;

        case "3":
            deliveryFee = 150;
            break;

        default:
            deliveryFee = 0;
    }

    return deliveryFee;
}


// Generate product input fields
document.getElementById("productCount").addEventListener("input", function () {

    const productCount = Number(this.value);
    const productsContainer = document.getElementById("productsContainer");

    productsContainer.innerHTML = "";

    if (productCount > 0) {

        for (let i = 0; i < productCount; i++) {

            const productDiv = document.createElement("div");
            productDiv.className = "product";

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input
                    type="text"
                    id="productName-${i}"
                    placeholder="Enter product name"
                >

                <label for="productPrice-${i}">Price</label>
                <input
                    type="number"
                    id="productPrice-${i}"
                    min="0.01"
                    step="0.01"
                    placeholder="Enter price"
                >

                <label for="productQuantity-${i}">Quantity</label>
                <input
                    type="number"
                    id="productQuantity-${i}"
                    min="1"
                    placeholder="Enter quantity"
                >
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});


// Calculate Order button
document.getElementById("calculateBtn").addEventListener("click", function () {

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(
        document.getElementById("productCount").value
    );

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";


    // Validate customer name
    if (customerName === "") {

        validationMessage.textContent =
            "Please enter the Customer Name.";

        return;
    }


    // Validate product count
    if (!Number.isInteger(productCount) || productCount <= 0) {

        validationMessage.textContent =
            "Please enter a valid positive Number of Products.";

        return;
    }


    let subtotal = 0;
    let productDetails = "";


    // Process every product using a for loop
    for (let i = 0; i < productCount; i++) {

        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);


        // Validate product name
        if (productName === "") {

            validationMessage.textContent =
                `Please enter the Product Name for Product ${i + 1}.`;

            return;
        }


        // Validate price
        if (isNaN(price) || price <= 0) {

            validationMessage.textContent =
                `Please enter a valid positive Price for Product ${i + 1}.`;

            return;
        }


        // Validate quantity
        if (!Number.isInteger(quantity) || quantity <= 0) {

            validationMessage.textContent =
                `Please enter a valid positive Quantity for Product ${i + 1}.`;

            return;
        }


        // Calculate item amount
        const itemAmount =
            calculateItemAmount(price, quantity);


        // Add item amount to subtotal
        subtotal += itemAmount;


        // Build product details
        productDetails += `
            <div class="summary-line">
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </div>
            <hr>
        `;
    }


    // Calculate discount
    const discountAmount =
        calculateDiscount(subtotal);


    // Determine discount rate
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


    // Get delivery option
    const deliveryOption =
        document.getElementById("deliveryOption").value;


    // Calculate delivery fee
    const deliveryFee =
        getDeliveryFee(deliveryOption);


    // Determine delivery type
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
            deliveryType = "Unknown";
    }


    // Calculate final amount
    const finalAmount =
        subtotal - discountAmount + deliveryFee;


    // Display complete order summary
    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>

        <p><strong>Customer:</strong> ${customerName}</p>

        ${productDetails}

        <p class="summary-line">
            <strong>Subtotal:</strong>
            ₱${subtotal.toFixed(2)}
        </p>

        <p class="summary-line">
            <strong>Discount Rate:</strong>
            ${discountRate}%
        </p>

        <p class="summary-line">
            <strong>Discount Amount:</strong>
            ₱${discountAmount.toFixed(2)}
        </p>

        <p class="summary-line">
            <strong>Delivery Type:</strong>
            ${deliveryType}
        </p>

        <p class="summary-line">
            <strong>Delivery Fee:</strong>
            ₱${deliveryFee.toFixed(2)}
        </p>

        <hr>

        <p class="total">
            Final Amount: ₱${finalAmount.toFixed(2)}
        </p>
    `;

});
