<?php
  $json = file_get_contents('birthdays.json');
  $obj = json_decode($json);

  // Function to sort month names
  function compare_months($a, $b) {
    $monthA = date_parse($a);
    $monthB = date_parse($b);

    return $monthA["month"] - $monthB["month"];
  }

  $occurrences = [];
  foreach ($obj as $value) {
    $month = explode("/", $value);
    $dateObj   = DateTime::createFromFormat('!m', $month[0]);
    $monthName = $dateObj->format('F');

    if (array_key_exists($monthName, $occurrences)) {
      $occurrences[$monthName]++;
    }
    else {
      $occurrences[$monthName] = 1;
    }
  }

  uksort($occurrences, "compare_months");
  print_r(json_encode($occurrences));
