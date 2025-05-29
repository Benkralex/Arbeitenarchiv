<?php
// Kill the script if not all required parameters are set
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(400);
    die("Invalid request method. Please use POST.");
}
if (!isset($_POST)) {
    http_response_code(400);
    die("Invalid request method. No POST parameters provided.");
}
if (!isset(($_POST['subject'])) || !isset($_POST['teacher']) || !isset($_POST['grade_level']) || !isset($_POST['year'])) {
    http_response_code(400);
    die("Missing required parameters: subject, teacher, grade_level, or year.");
}

// Functions
function reArrayFiles(&$file_post) {
    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);
    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }
    return $file_ary;
}
function readData() {
    $dataFile = '/var/www/data/data.json';
    if (!file_exists($dataFile)) {
        http_response_code(500);
        die("Data file not found.");
    }
    $jsonData = file_get_contents($dataFile);
    if ($jsonData === false) {
        http_response_code(500);
        die("Failed to read data file.");
    }
    $data = json_decode($jsonData, true);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(500);
        die("Invalid JSON in data file.");
    }
    return $data;
}

// Get all parameters
$dataFile = '/var/www/data/data.json';
$subject = $_POST['subject'] ?? '';
$teacher = $_POST['teacher'] ?? '';
$grade_level = $_POST['grade_level'] ?? '';
$year = $_POST['year'] ?? '';
//get all topics
$topics = [];
while (isset($_POST['topic' . count($topics)])) {
    $topics[] = $_POST['topic' . count($topics)];
}
//get next id
$data = readData();
$id = is_array($data) ? count($data) : 0;
// get and upload images
$images = [];
if (isset($_FILES['images'])) {
    $files = reArrayFiles($_FILES['images']);
    foreach ($files as $index => $file) {
        $source = $file['tmp_name'];
        if (is_uploaded_file($source)) {
            $filename = "exam-" . $id . "-" . $index . "." . end(explode(".", $file['name']));
            $destination = "/var/www/data/" . $filename;
            if (move_uploaded_file($source, $destination)) {
                $images[] = $filename;
            }
        } else {
            echo "Error: File upload failed.<br>";
        }
    }
} else {
    echo "No files uploaded.<br>";
}
// Output the data
echo "Adding entry with ID: $id<br>";
echo "Subject: $subject<br>";
echo "Teacher: $teacher<br>";
echo "Grade Level: $grade_level<br>";
echo "Year: $year<br>";
foreach ($topics as $topic) {
    echo "Topic: $topic<br>";
}
foreach ($images as $image) {
    echo "Image-Name: $image<br>";
}
// Prepare the JSON data
$JsonData = [
    'id' => $id,
    'subject' => $subject,
    'teacher' => $teacher,
    'grade_level' => $grade_level,
    'year' => $year,
    'topics' => $topics,
    'images' => $images
];
// Save the data to the JSON file
$data = readData();
$data[] = $JsonData;
if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
    http_response_code(500);
    die("Failed to write to data file.");
}