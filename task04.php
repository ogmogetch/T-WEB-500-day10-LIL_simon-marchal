<?php
// Configuration de la connexion à la base de données
$host = "localhost"; // Adresse du serveur MySQL (peut varier)
$database = "ajax_products"; // Nom de la base de données
$username = "root"; // Nom d'utilisateur MySQL


try {
    // Connexion à la base de données MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username);
    
    // Récupérer les valeurs du type et de la marque depuis la requête GET
    $type = isset($_GET['type']) ? $_GET['type'] : '';
    $brand = isset($_GET['brand']) ? $_GET['brand'] : '';

    // Valider le type et la marque (ajoutez votre logique de validation ici)
    $validType = preg_match('/^[a-zA-Z\-]{3,10}$/', $type);
    $validBrand = preg_match('/^[a-zA-Z0-9\-&]{2,20}$/', $brand);

    if (!$validType || !$validBrand) {
        // Si le type ou la marque ne sont pas valides, renvoyer une réponse d'erreur
        $response = array("error" => true, "message" => "Invalid type or brand.");
        http_response_code(400); // Bad Request
    } else {
        // Vérifier si la marque existe déjà dans la base de données
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM products WHERE type = :type AND brand = :brand");
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->bindParam(':brand', $brand, PDO::PARAM_STR);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            // La marque existe déjà
            $response = array("exists" => true, "type" => $type);
        } else {
            // La marque est valide pour le type spécifié
            $response = array("exists" => false, "type" => $type);
        }
    }

    // Répondre avec une réponse JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    // En cas d'erreur de connexion à la base de données
    $response = array("error" => true, "message" => "Database error: " . $e->getMessage());
    http_response_code(500); // Internal Server Error
    echo json_encode($response);
}
?>
