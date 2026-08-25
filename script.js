// --- Required Top-Level Calculation Functions ---

function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10; // 10%
    } else if (subtotal >= 3000) {
        return subtotal * 0.07; // 7%
    } else if (subtotal >= 1000) {
        return subtotal * 0.05; // 5%
    } else {
        return 0; // No discount
    }
}

function getDeliveryFee(option) {
    switch (Number(option)) {
        case 1:
            return 0;
        case 2:
            return 80;
        case 3:
            return 150;
        default:
            return 0;
    }
}

// --- DOM Interaction & Event Handling ---

const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

// Dynamically generate product inputs when productCount changes
productCountInput.addEventListener("input", () => {
    productsContainer.innerHTML = "";
    const count = parseInt(productCountInput.value);

    if (count > 0 && count <= 50) {
        // Using a for loop to create inputs per requirement
        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement("div");
            productDiv.className = "product-row";
            productDiv.innerHTML = `
                <strong>Product #${i + 1}</strong>
                <div style="margin-top:5px;">
                    <label>Product Name</label>
                    <input type="text" id="productName-${i}" placeholder="Product Name">
                </div>
                <div style="margin-top:5px;">
                    <label>Price</label>
                    <input type="number" id="productPrice-${i}" min="0" step="0.01" placeholder="Price">
                </div>
                <div style="margin-top:5px;">
                    <label>Quantity</label>
                    <input type="number" id="productQuantity-${i}" min="1" placeholder="Quantity">
                </div>
            `;
            productsContainer.appendChild(productDiv);
        }
    }
});

// Main Calculation Trigger
calculateBtn.addEventListener("click", () => {
    validationMessage.textContent = "";
    orderSummary.textContent = "";

    const customerNameVal = document.getElementById("customerName").value.trim();
    const countVal = parseInt(productCountInput.value);
    const deliveryOptionVal = document.getElementById("deliveryOption").value;

    // --- Input Validation ---
    let errors = [];

    if (!customerNameVal) {
        errors.push("Customer Name cannot be empty.");
    }
    if (isNaN(countVal) || countVal <= 0) {
        errors.push("Number of Products must be a valid positive number.");
    }

    let productsData = [];
    if (countVal > 0) {
        for (let i = 0; i < countVal; i++) {
            const nameEl = document.getElementById(`productName-${i}`);
            const priceEl = document.getElementById(`productPrice-${i}`);
            const qtyEl = document.getElementById(`productQuantity-${i}`);

            const name = nameEl ? nameEl.value.trim() : "";
            const price = priceEl ? parseFloat(priceEl.value) : NaN;
            const qty = qtyEl ? parseInt(qtyEl.value) : NaN;

            if (!name) {
                errors.push(`Product Name for item #${i + 1} cannot be empty.`);
            }
            if (isNaN(price) || price < 0) {
                errors.push(`Price for item #${i + 1} must be a valid positive number.`);
            }
            if (isNaN(qty) || qty <= 0) {
                errors.push(`Quantity for item #${i + 1} must be a valid positive integer.`);
            }

            productsData.push({ name, price, qty });
        }
    }

    if (errors.length > 0) {
        validationMessage.textContent = errors.join("\n");
        return;
    }

    // --- Processing & Computation ---
    let subtotal = 0;
    let productSummaryLines = [];

    // Using a for loop for product processing per requirement
    for (let i = 0; i < productsData.length; i++) {
        const item = productsData[i];
        const amount = calculateItemAmount(item.price, item.qty);
        subtotal += amount;

        productSummaryLines.push(
            `${i + 1}. ${item.name}\n   Price: ₱${item.price.toFixed(2)}\n   Quantity: ${item.qty}\n   Amount: ₱${amount.toFixed(2)}`
        );
    }

    const discountAmount = calculateDiscount(subtotal);
    
    // Determine discount rate percentage string for summary
    let discountRateStr = "No discount";
    if (subtotal >= 5000) discountRateStr = "10%";
    else if (subtotal >= 3000) discountRateStr = "7%";
    else if (subtotal >= 1000) discountRateStr = "5%";

    const deliveryFee = getDeliveryFee(deliveryOptionVal);
    
    // Determine delivery type name string
    let deliveryTypeStr = "Store Pickup";
    if (deliveryOptionVal === "2") deliveryTypeStr = "Standard Delivery";
    else if (deliveryOptionVal === "3") deliveryTypeStr = "Express Delivery";

    const finalAmount = subtotal - discountAmount + deliveryFee;

    // --- Build Final Order Summary Output ---
    let summaryText = `MINI STORE CHECKOUT SYSTEM\n\n`;
    summaryText += `Customer: ${customerNameVal}\n\n`;
    summaryText += productSummaryLines.join("\n\n") + `\n\n`;
    summaryText += `ORDER SUMMARY\n`;
    summaryText += `Subtotal: ₱${subtotal.toFixed(2)}\n`;
    summaryText += `Discount Rate: ${discountRateStr}\n`;
    summaryText += `Discount Amount: ₱${discountAmount.toFixed(2)}\n`;
    summaryText += `Delivery Type: ${deliveryTypeStr}\n`;
    summaryText += `Delivery Fee: ₱${deliveryFee.toFixed(2)}\n`;
    summaryText += `Final Amount: ₱${finalAmount.toFixed(2)}`;

    orderSummary.textContent = summaryText;
});