<?php
// Database connection settings
$host = 'localhost'; // Change this if you're using a remote database
$dbname = 'myapp;
$username = 'priya'; // Your MySQL username
$password = 'janani'; // Your MySQL password

// Create a new PDO instance
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Fetch scores from the database
$query = "SELECT * FROM scores ORDER BY timestamp DESC";
$stmt = $pdo->query($query);
$scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scoreboard</title>
    <link rel="stylesheet" href="styles.css"> <!-- Optional: add some styles -->
</head>
<body>
    <h1>Scoreboard</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Player</th>
                <th>Game</th>
                <th>Score</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <?php if (count($scores) > 0): ?>
                <?php foreach ($scores as $score): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($score['player']); ?></td>
                        <td><?php echo htmlspecialchars($score['game']); ?></td>
                        <td><?php echo htmlspecialchars($score['score']); ?></td>
                        <td><?php echo htmlspecialchars($score['timestamp']); ?></td>
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr>
                    <td colspan="4">No scores available yet.</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</body>
</html>

