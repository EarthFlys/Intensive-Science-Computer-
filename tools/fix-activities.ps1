$content = Get-Content 'e:\ISC website\index.html' -Raw -Encoding UTF8
$lines = $content -split "`n"
# Show lines 400-410 (0-indexed, which is 401-411 in 1-indexed)
for ($i = 400; $i -lt 412; $i++) {
    $lineNum = $i + 1
    $line = $lines[$i].TrimEnd("`r")
    Write-Host "${lineNum}: $line"
}
