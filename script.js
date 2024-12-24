function calculateDiscount(event) {
    event.preventDefault(); // Prevent form submission

    const mrp = parseFloat(document.getElementById("mrp").value);
    const sellingPrice = parseFloat(document.getElementById("sellingPrice").value);
    const difference = parseFloat(document.getElementById("difference").value);
    const middleSize = parseInt(document.getElementById("middleSize").value); // Get the entered size

    // Validate inputs
    if (isNaN(mrp) || isNaN(sellingPrice) || isNaN(difference) || isNaN(middleSize) ||
        mrp <= 0 || sellingPrice <= 0 || difference <= 0 || middleSize <= 0) {
        document.getElementById("results").innerHTML = "Please enter valid positive numbers.";
        return;
    }

    let resultsHTML = "<table><tr><th>Selling Price</th><th>Size</th><th>Discount (%)</th></tr>";

    // Calculate sizes and selling prices
    for (let i = -4; i <= 4; i++) {
        const currentSize = middleSize + (i * 2); // Size changes by 2
        const currentSellingPrice = sellingPrice + (i * difference);
        const discount = ((mrp - currentSellingPrice) / mrp) * 100;
        resultsHTML += `<tr><td>₹${currentSellingPrice.toFixed(2)}</td><td>${currentSize}</td><td>${discount.toFixed(2)}%</td></tr>`;
    }

    resultsHTML += "</table>";
    document.getElementById("results").innerHTML = resultsHTML;
}

// Clear the input field value when clicked
function clearFieldValue(event) {
    event.target.value = "";
}

// Add event listeners to each input field
document.getElementById("mrp").addEventListener("click", clearFieldValue);
document.getElementById("sellingPrice").addEventListener("click", clearFieldValue);
document.getElementById("difference").addEventListener("click", clearFieldValue);
document.getElementById("middleSize").addEventListener("click", clearFieldValue); // Also clearing for middleSize input field

// Function to move focus between fields using arrow keys or Enter
function handleKeyboardNavigation(event) {
    const currentField = event.target;
    const nextField = {
        "mrp": document.getElementById("sellingPrice"),
        "sellingPrice": document.getElementById("difference"),
        "difference": document.getElementById("middleSize"),
        "middleSize": document.getElementById("mrp")  // Optionally, loop back to the first field
    };

    // Handling navigation via arrow keys or Enter key
    if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "Enter") {
        // Move to next field on Enter or right/down arrow
        event.preventDefault();
        nextField[currentField.id].focus();
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        // Move to previous field on left/up arrow
        event.preventDefault();
        const prevField = Object.keys(nextField).find(key => nextField[key] === currentField);
        const prevFieldId = prevField || "mrp";
        document.getElementById(prevFieldId).focus();
    }
}

// Add event listeners for keyboard navigation
document.getElementById("mrp").addEventListener("keydown", handleKeyboardNavigation);
document.getElementById("sellingPrice").addEventListener("keydown", handleKeyboardNavigation);
document.getElementById("difference").addEventListener("keydown", handleKeyboardNavigation);
document.getElementById("middleSize").addEventListener("keydown", handleKeyboardNavigation);

// Trigger calculation on Enter key press in any input field (including the size input field)
document.getElementById("middleSize").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calculateDiscount(event);
    }
});
