<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Para liberar todas as origens
header("Access-Control-Allow-Methods: GET, POST"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeçalhos permitidos


$apiKey = 'c3e87286e9bca6de780ca0427db96969';
$latitude = $_GET['latitude'];
$longitude = $_GET['longitude'];

$url = "http://api.openweathermap.org/data/2.5/weather?lat=$latitude&lon=$longitude&appid=$apiKey&units=metric";

$response = file_get_contents($url);

if ($response === FALSE) {
    echo json_encode(["error" => "Falha ao obter dados do clima"]);
    exit;
}

$data = json_decode($response, true);

if (!isset($data['main']['temp']) || !isset($data['weather'][0]['description'])) {
    echo json_encode(["error" => "Dados de clima não encontrados"]);
    exit;
}

$temp = $data['main']['temp'];
$description = $data['weather'][0]['description'];

echo json_encode([
    "main" => ["temp" => $temp],
    "weather" => [["description" => $description]]
]);
?>
