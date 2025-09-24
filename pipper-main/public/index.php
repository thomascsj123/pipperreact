<?php
require '../.env';

// Function to log requests
function logRequest() {
    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'method' => $_SERVER['REQUEST_METHOD'],
        'uri' => $_SERVER['REQUEST_URI'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    // Log to file
    $logEntry = json_encode($logData) . "\n";
    file_put_contents('../logs/requests.log', $logEntry, FILE_APPEND | LOCK_EX);
    
    // Also log to PHP error log for immediate visibility
    error_log("REQUEST: {$logData['method']} {$logData['uri']} from {$logData['ip']}");
}

// Log this request
// logRequest();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, XRequested-With");


$servername = "localhost";
$username = "root";
$password = getenv('PASSWORD');

$conn = new PDO("mysql:host=$servername;dbname=mul2025", $username, $password);
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// echo $uri;

// $uri = explode('/', $uri);

$request = $_SERVER['REQUEST_METHOD'];

if ($request === 'GET' && $uri === '/pips') {
  // herfra
    try {
        // Læs query-parametre: limit og offset
        $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
        $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

        // Rimelige grænser/validering
        if ($limit < 1) $limit = 1;
        if ($limit > 100) $limit = 100; // undgå alt for store svar
        if ($offset < 0) $offset = 0;

        // (Valgfrit) total antal rækker til metadata
        $total = (int) $conn->query("SELECT COUNT(*) FROM pipper")->fetchColumn();

        // Hent pagineret data – bind som ints!
        $stmt = $conn->prepare("SELECT * FROM pipper ORDER BY postTime DESC LIMIT :limit OFFSET :offset");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Returnér data + pagination-info
        echo json_encode([
            'data' => $rows,
            'pagination' => [
                'limit' => $limit,
                'offset' => $offset,
                'total' => $total,
                'next_offset' => ($offset + $limit < $total) ? $offset + $limit : null,
                'prev_offset' => ($offset - $limit >= 0) ? $offset - $limit : null
            ]
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    }
    // hertil
} 
else if ($request === 'POST' && $uri === '/pips') {
    $input = (array) json_decode(file_get_contents('php://input'), true);

    $username = $input["username"];
    $message = $input["message"];

    if ($username !== '') { // validering: overholde regler for at gemme korrekt data
        $data = [
            'username' => $username,
            'message' => $message
        ];
        $sql = "INSERT INTO pipper VALUES (default, :username, :message, NOW())"; 
        $stmt= $conn->prepare($sql);
        $stmt->execute($data);


        $id = $conn->lastInsertId();
        $cat = (object) $input;
        $cat->id = $id;

        echo json_encode($cat);
    } else {
        echo json_encode("Navn skal udfyldes");
    }

    // echo $name;
    

}
// else check if this is a POST request and write "You wrote a POST request" back

?>