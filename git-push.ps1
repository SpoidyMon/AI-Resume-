$commitMessage = Read-Host "Enter commit message"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    Write-Error "Commit message cannot be empty."
    exit 1
}

git add --all
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

$currentBranch = git branch --show-current
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($currentBranch)) {
    Write-Error "Could not determine the current Git branch."
    exit 1
}

git push origin $currentBranch
exit $LASTEXITCODE
