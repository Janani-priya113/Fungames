<?php
$host = "localhost";
$db   = "myapp";
$user = "priya";
$pass = "janani";

// Connect to MySQL
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$player = $_POST['player'] ?? 'Guest';
$game = $_POST['game'] ?? 'Unknown';
$score = intval($_POST['score'] ?? 0);

// Insert score into DB
$stmt = $conn->prepare("INSERT INTO scores (player, game, score) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $player, $game, $score);
$stmt->execute();
$stmt->close();
$conn->close();

echo "✅ Score saved!";
?>
