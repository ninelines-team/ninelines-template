<?php

$title = '';
$description = '';
$image = '';

// Uncomment the code below and fill in the pages if necessary
// $pages = [
// 	'/page/1' => [
// 		'title' => '',
// 		'description' => '',
// 		'image' => '',
// 	],
// ];

$page = @$pages[$_SERVER['REQUEST_URI']];

if ($page) {
	$title = !is_null(@$page['title']) ? $page['title'] : $title;
	$description = !is_null(@$page['description']) ? $page['description'] : $description;
	$image = !is_null(@$page['image']) ? $page['image'] : $image;
}

?>
