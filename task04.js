document.addEventListener("DOMContentLoaded", function() {
    const typeInput = document.getElementById("type");
    const brandInput = document.getElementById("brand");
    const typeValidationMessage = document.getElementById("typeValidationMessage");
    const brandValidationMessage = document.getElementById("brandValidationMessage");
    const serverResponse = document.getElementById("serverResponse");

    const showAlert = (message, alertClass) => {
        serverResponse.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    };

    const validateType = () => {
        // Your type validation logic here
        // Example: Check length and valid characters
        const type = typeInput.value;
        const validType = /^[a-zA-Z\-]{3,10}$/.test(type);

        typeValidationMessage.textContent = validType
            ? "Type is valid"
            : "Invalid type. Please check length and characters.";
        typeValidationMessage.className = validType ? "valid" : "error";
        return validType;
    };

    const validateBrand = () => {
        // Your brand validation logic here
        // Example: Check length, valid characters, and if it exists in the database
        const brand = brandInput.value;
        const validBrand = /^[a-zA-Z0-9\-&]{2,20}$/.test(brand);

        brandValidationMessage.textContent = validBrand
            ? "Brand is valid"
            : "Invalid brand. Please check length and characters.";
        brandValidationMessage.className = validBrand ? "valid" : "error";
        return validBrand;
    };

    typeInput.addEventListener("input", validateType);
    brandInput.addEventListener("input", validateBrand);

    const brandForm = document.getElementById("brandForm");
    brandForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const isTypeValid = validateType();
        const isBrandValid = validateBrand();

        if (!isTypeValid || !isBrandValid) {
            showAlert("Please fix validation errors.", "alert-danger");
            return;
        }

        // Send a GET request to your server using fetch() to check brand existence
        // You will need to implement the server-side logic to check the brand in the database
        // and respond accordingly
        fetch("task04.php?type=" + encodeURIComponent(typeInput.value) + "&brand=" + encodeURIComponent(brandInput.value))
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    showAlert("Brand already exists in the database.", "alert-danger");
                } else {
                    showAlert("Brand is valid for the type " + data.type + ".", "alert-success");
                }
            })
            .catch(error => {
                showAlert("An error occurred while checking the brand.", "alert-danger");
                console.error(error);
            });
    });
});
