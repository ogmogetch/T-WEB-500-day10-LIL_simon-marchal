function showAlert(message, alertType) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', alertType);
    alertDiv.innerHTML = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    // Supprime l'alerte après 5 secondes
    setTimeout(() => {
    alertDiv.remove();
    }, 3000);
}

function validateType() {
    const typeInput = document.getElementById('typeInput');
    const typeValidationMsg = document.getElementById('typeValidationMsg');
    typeValidationMsg.innerHTML = '';

    const type = typeInput.value.trim();

    if (type.length < 3) {
    showAlert('$type: this type does not have enough characters.', 'alert-danger');
    return;
    }

    if (type.length > 10) {
    showAlert('$type: this type has too many characters.', 'alert-danger');
    return;
    }

    if (!/^[a-zA-Z-]+$/.test(type)) {
    showAlert('$type: this type has non-alphabetical characters (different from "-").', 'alert-danger');
    return;
    }
    showAlert('$type: this type exists in databases.', 'alert-success');
}

function validateBrand() {
    const brandInput = document.getElementById('brandInput');
    const brandValidationMsg = document.getElementById('brandValidationMsg');
    brandValidationMsg.innerHTML = '';
    const brand = brandInput.value.trim();

    if (brand.length < 2) {
        showAlert('$brand: this brand does not have enough characters.', 'alert-danger');
        return;
        }
    if (brand.length > 20) {
        showAlert('$brand: this brand has too many characters.', 'alert-danger');
        return;
        }

    if (!/^[a-zA-Z0-9\-&]+$/.test(brand)) {
        showAlert('$brand: this brand has invalid characters.', 'alert-danger');
        return;
        }
    
    showAlert('$brand: this brand is valid for the type $type.', 'alert-success');
    }
    
function sendValidationRequest(type, brand) {
    fetch(`task04.php?type=${type}&brand=${brand}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const typeValidationMsg = document.getElementById('typeValidationMsg');
        const brandValidationMsg = document.getElementById('brandValidationMsg');

        if (data.typeValidationMsg) {
            showAlert(data.typeValidationMsg, 'alert-danger');
        } else {
            showAlert('No type sent yet!', 'alert-success');
        }

        if (data.brandValidationMsg) {
            showAlert(data.brandValidationMsg, 'alert-danger');
        } else {
            showAlert('No brand sent yet!', 'alert-success');
        }
        })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred while validating.', 'alert-danger');
    });
}