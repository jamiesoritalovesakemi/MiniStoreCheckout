function calculateItemAmount(price, quantity) {
    return price * quantity;
}
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
function getDeliveryFee(option) {
    let fee = 0;
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
const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

productCountInput.addEventListener("input", function () {
    const productCount = Number(productCountInput.value);
    productsContainer.innerHTML = "";
    if (!Number.isInteger(productCount) || productCount <= 0) {
        return;
    }
    for (let i = 0; i < productCount; i++) {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>Product ${i + 1}</h3>

            <div class="form-group">
                <label for="productName-${i}">Product Name</label>
                <input
                    type="text"
                    id="productName-${i}"
                    placeholder="Enter product name"
                >
            </div>

            <div class="form-group">
                <label for="productPrice-${i}">Price</label>
                <input
                    type="number"
                    id="productPrice-${i}"
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                >
            </div>

            <div class="form-group">
                <label for="productQuantity-${i}">Quantity</label>
                <input
                    type="number"
                    id="productQuantity-${i}"
                    min="1"
                    step="1"
                    placeholder="Enter quantity"
                >
            </div>
        `;

        productsContainer.appendChild(productDiv);
    }
});
calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    validationMessage.className = "";
    orderSummary.innerHTML = "";

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(productCountInput.value);
    const deliveryOption = document.getElementById("deliveryOption").value;
    if (customerName === "") {
        validationMessage.textContent = "Please enter the Customer Name.";
        validationMessage.className = "error";
        return;
    }
    if (!Number.isInteger(productCount) || productCount <= 0) {
        validationMessage.textContent =
            "Please enter a valid positive Number of Products.";
        validationMessage.className = "error";
        return;
    }
    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < productCount; i++) {
        const productName =
            document.getElementById(`productName-${i}`).value.trim();
        const price =
            Number(document.getElementById(`productPrice-${i}`).value);
        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);
        if (productName === "") {
            validationMessage.textContent =
                `Please enter the Product Name for Product ${i + 1}.`;
            validationMessage.className = "error";
            return;
        }
        if (!Number.isFinite(price) || price <= 0) {
            validationMessage.textContent =
                `Please enter a valid positive Price for Product ${i + 1}.`;
            validationMessage.className = "error";
            return;
        }
        if (!Number.isInteger(quantity) || quantity <= 0) {
            validationMessage.textContent =
                `Please enter a valid positive Quantity for Product ${i + 1}.`;
            validationMessage.className = "error";
            return;
        }
        const itemAmount = calculateItemAmount(price, quantity);

        subtotal += itemAmount;

        productDetails += `
            <div>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </div>
            <hr>
        `;
    }
    const discountAmount = calculateDiscount(subtotal);
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
    const deliveryFee = getDeliveryFee(deliveryOption);
    let deliveryType = "";
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
    const finalAmount =
        subtotal - discountAmount + deliveryFee;

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>
        <p>
            <strong>Customer:</strong> ${customerName}
        </p>
        ${productDetails}
        <h3>ORDER TOTALS</h3>
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
        <h2>
            Final Amount: ₱${finalAmount.toFixed(2)}
        </h2>
    `;
    validationMessage.textContent = "Order calculated successfully!";
    validationMessage.className = "success";
});