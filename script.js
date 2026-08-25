function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) return subtotal * 0.10;
    if (subtotal >= 3000) return subtotal * 0.07;
    if (subtotal >= 1000) return subtotal * 0.05;
    return 0;
}

function getDeliveryFee(option) {
    switch (Number(option)) {
        case 1: return 0;
        case 2: return 80;
        case 3: return 150;
        default: return 0;
    }
}

const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

productCountInput.addEventListener("input", () => {
    productsContainer.innerHTML = "";
    const count = parseInt(productCountInput.value);
    if (count > 0 && count <= 50) {
        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement("div");
            productDiv.className = "product-row";
            productDiv.innerHTML = `
                <strong>Product #${i + 1}</strong>
                <div style="margin-top:5px;"><label>Product Name</label><input type="text" id="productName-${i}" placeholder="Product Name"></div>
                <div style="margin-top:5px;"><label>Price</label><input type="number" id="productPrice-${i}" min="0" step="0.01" placeholder="Price"></div>
                <div style="margin-top:5px;"><label>Quantity</label><input type="number" id="productQuantity-${i}" min="1" placeholder="Quantity"></div>
            `;
            productsContainer.appendChild(productDiv);
        }
    }
});

calculateBtn.addEventListener("click", () => {
    validationMessage.textContent = "";
    orderSummary.textContent = "";

    const customerNameVal = document.getElementById("customerName").value.trim();
    const countVal = parseInt(productCountInput.value);
    const deliveryOptionVal = document.getElementById("deliveryOption").value;

    let errors = [];
    if (!customerNameVal) errors.push("Customer Name cannot be empty.");
    if (isNaN(countVal) || countVal <= 0) errors.push("Number of Products must be a valid positive number.");

    let productsData = [];
    for (let i = 0; i < countVal; i++) {
        const name = document.getElementById(`productName-${i}`)?.value.trim() || "";
        const price = parseFloat(document.getElementById(`productPrice-${i}`)?.value);
        const qty = parseInt(document.getElementById(`productQuantity-${i}`)?.value);

        if (!name) errors.push(`Product Name for item #${i + 1} cannot be empty.`);
        if (isNaN(price) || price < 0) errors.push(`Price for item #${i + 1} must be a valid positive number.`);
        if (isNaN(qty) || qty <= 0) errors.push(`Quantity for item #${i + 1} must be a valid positive integer.`);

        productsData.push({ name, price, qty });
    }

    if (errors.length > 0) {
        validationMessage.textContent = errors.join("\n");
        return;
    }

    let subtotal = 0;
    let productSummaryLines = [];
    for (let i = 0; i < productsData.length; i++) {
        const item = productsData[i];
        const amount = calculateItemAmount(item.price, item.qty);
        subtotal += amount;
        productSummaryLines.push(`${i + 1}. ${item.name}\n   Price: ₱${item.price.toFixed(2)}\n   Quantity: ${item.qty}\n   Amount: ₱${amount.toFixed(2)}`);
    }

    const discountAmount = calculateDiscount(subtotal);
    let discountRateStr = subtotal >= 5000 ? "10%" : subtotal >= 3000 ? "7%" : subtotal >= 1000 ? "5%" : "No discount";

    const deliveryFee = getDeliveryFee(deliveryOptionVal);
    let deliveryTypeStr = deliveryOptionVal === "2" ? "Standard Delivery" : deliveryOptionVal === "3" ? "Express Delivery" : "Store Pickup";

    const finalAmount = subtotal - discountAmount + deliveryFee;

    orderSummary.textContent = `MINI STORE CHECKOUT SYSTEM\n\nCustomer: ${customerNameVal}\n\n` +
        productSummaryLines.join("\n\n") + `\n\nORDER SUMMARY\n` +
        `Subtotal: ₱${subtotal.toFixed(2)}\nDiscount Rate: ${discountRateStr}\n` +
        `Discount Amount: ₱${discountAmount.toFixed(2)}\nDelivery Type: ${deliveryTypeStr}\n` +
        `Delivery Fee: ₱${deliveryFee.toFixed(2)}\nFinal Amount: ₱${finalAmount.toFixed(2)}`;
});
