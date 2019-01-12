Set-StrictMode -Version Latest
$script:PACKAGE_FOLDER = "$env:APPVEYOR_BUILD_FOLDER"
Set-Location $script:PACKAGE_FOLDER

if ($env:ATOM_CHANNEL) {
  $script:ATOM_CHANNEL = "$env:ATOM_CHANNEL"
} else {
  $script:ATOM_CHANNEL = "stable"
}

$script:ATOM_DIRECTORY_NAME = "Atom"
if (($script:ATOM_CHANNEL.tolower() -ne "stable") -and ($script:ATOM_CHANNEL.tolower() -ne "dev")) {
    $script:ATOM_DIRECTORY_NAME = "$script:ATOM_DIRECTORY_NAME "
    $script:ATOM_DIRECTORY_NAME += $script:ATOM_CHANNEL.substring(0,1).toupper()
    $script:ATOM_DIRECTORY_NAME += $script:ATOM_CHANNEL.substring(1).tolower()
}

$script:ATOM_EXE_PATH = "$script:PACKAGE_FOLDER\$script:ATOM_DIRECTORY_NAME\atom.exe"
$script:ATOM_SCRIPT_PATH = "$script:PACKAGE_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\cli\atom.cmd"
$script:APM_SCRIPT_PATH = "$script:PACKAGE_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\app\apm\bin\apm.cmd"
$script:NPM_SCRIPT_PATH = "$script:PACKAGE_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\app\apm\node_modules\.bin\npm.cmd"

if ($env:ATOM_LINT_WITH_BUNDLED_NODE -eq "false") {
  $script:ATOM_LINT_WITH_BUNDLED_NODE = $FALSE
  $script:NPM_SCRIPT_PATH = "npm"
} else {
  $script:ATOM_LINT_WITH_BUNDLED_NODE = $TRUE
}

function DownloadAtom() {
    Write-Host "Downloading latest Atom release..."
    $source = "https://atom.io/download/windows_zip?channel=$script:ATOM_CHANNEL"
    $destination = "$script:PACKAGE_FOLDER\atom.zip"
    appveyor DownloadFile $source -FileName $destination
    if ($LASTEXITCODE -ne 0) {
        ExitWithCode -exitcode $LASTEXITCODE
    }
}

function ExtractAtom() {
    Remove-Item "$script:PACKAGE_FOLDER\$script:ATOM_DIRECTORY_NAME" -Recurse -ErrorAction Ignore
    Unzip "$script:PACKAGE_FOLDER\atom.zip" "$script:PACKAGE_FOLDER"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
function Unzip
{
    param([string]$zipfile, [string]$outpath)

    [System.IO.Compression.ZipFile]::ExtractToDirectory($zipfile, $outpath)
}

function PrintVersions() {
    Write-Host -NoNewLine "Using Atom version: "
    $atomVer = & "$script:ATOM_EXE_PATH" --version | Out-String
    if ($LASTEXITCODE -ne 0) {
        ExitWithCode -exitcode $LASTEXITCODE
    }
    Write-Host $atomVer
    Write-Host "Using APM version: "
    & "$script:APM_SCRIPT_PATH" -v
    if ($LASTEXITCODE -ne 0) {
        ExitWithCode -exitcode $LASTEXITCODE
    }
}

function InstallPackage() {
    Write-Host "Downloading package dependencies..."
    & "$script:APM_SCRIPT_PATH" clean
    if ($LASTEXITCODE -ne 0) {
        ExitWithCode -exitcode $LASTEXITCODE
    }
    if ($script:ATOM_LINT_WITH_BUNDLED_NODE -eq $TRUE) {
      & "$script:APM_SCRIPT_PATH" install
      # Set the PATH to include the node.exe bundled with APM
      $newPath = "$script:PACKAGE_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\app\apm\bin;$env:PATH"
      $env:PATH = $newPath
      [Environment]::SetEnvironmentVariable("PATH", "$newPath", "User")
    } else {
      & "$script:APM_SCRIPT_PATH" install --production
      if ($LASTEXITCODE -ne 0) {
          ExitWithCode -exitcode $LASTEXITCODE
      }
      # Use the system NPM to install the devDependencies
      Write-Host "Using Node.js version:"
      & node --version
      if ($LASTEXITCODE -ne 0) {
          ExitWithCode -exitcode $LASTEXITCODE
      }
      Write-Host "Using NPM version:"
      & npm --version
      if ($LASTEXITCODE -ne 0) {
          ExitWithCode -exitcode $LASTEXITCODE
      }
      Write-Host "Installing remaining dependencies..."
      & npm install
    }
    if ($LASTEXITCODE -ne 0) {
        ExitWithCode -exitcode $LASTEXITCODE
    }
    InstallDependencies
}

function InstallDependencies() {
    if ($env:APM_TEST_PACKAGES) {
        Write-Host "Installing atom package dependencies..."
        $APM_TEST_PACKAGES = $env:APM_TEST_PACKAGES -split "\s+"
        $APM_TEST_PACKAGES | foreach {
            Write-Host "$_"
            & "$script:APM_SCRIPT_PATH" install $_
            if ($LASTEXITCODE -ne 0) {
                ExitWithCode -exitcode $LASTEXITCODE
            }
        }
    }
}


function HasLinter([String] $LinterName) {
    $output = &"$script:NPM_SCRIPT_PATH" ls --parseable --dev --depth=0 $LinterName 2>$null
    if ($LastExitCode -eq 0) {
        if ($output.Trim() -ne "") {
            return $true
        }
    }

    return $false
}

function RunLinters() {
    $libpath = "$script:PACKAGE_FOLDER\lib"
    $libpathexists = Test-Path $libpath
    $srcpath = "$script:PACKAGE_FOLDER\src"
    $srcpathexists = Test-Path $srcpath
    $specpath = "$script:PACKAGE_FOLDER\spec"
    $specpathexists = Test-Path $specpath
    $testpath = "$script:PACKAGE_FOLDER\test"
    $testpathexists = Test-Path $testpath
    $eslintpath = "$script:PACKAGE_FOLDER\node_modules\.bin\eslint.cmd"
    $lintwitheslint = HasLinter -LinterName "eslint"
    if (($libpathexists -or $srcpathexists) -and ($lintwitheslint)) {
        Write-Host "Linting package..."
    }

    if ($libpathexists) {
        if ($lintwitheslint) {
            & "$eslintpath" lib
            if ($LASTEXITCODE -ne 0) {
                ExitWithCode -exitcode $LASTEXITCODE
            }
        }
    }

    if ($srcpathexists) {
        if ($lintwitheslint) {
            & "$eslintpath" src
            if ($LASTEXITCODE -ne 0) {
                ExitWithCode -exitcode $LASTEXITCODE
            }
        }
    }

    if ($specpathexists -and ($lintwitheslint)) {
        Write-Host "Linting package specs..."
        if ($lintwitheslint) {
            & "$eslintpath" spec
            if ($LASTEXITCODE -ne 0) {
                ExitWithCode -exitcode $LASTEXITCODE
            }
        }
    }

    if ($testpathexists -and ($lintwitheslint)) {
        Write-Host "Linting package tests..."

        if ($lintwitheslint) {
            & "$eslintpath" test
            if ($LASTEXITCODE -ne 0) {
                ExitWithCode -exitcode $LASTEXITCODE
            }
        }
    }
}

function RunSpecs() {
    Write-Host "Running specs..."
    if ($specpathexists) {
      & "$script:ATOM_EXE_PATH" --test spec 2>&1 | %{ "$_" }
    }

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Specs Failed"
        ExitWithCode -exitcode $LASTEXITCODE
    }
}

function ExitWithCode
{
    param
    (
        $exitcode
    )

    $host.SetShouldExit($exitcode)
    exit
}

function SetElectronEnvironmentVariables
{
  $env:ELECTRON_NO_ATTACH_CONSOLE = "true"
  [Environment]::SetEnvironmentVariable("ELECTRON_NO_ATTACH_CONSOLE", "true", "User")
  $env:ELECTRON_ENABLE_LOGGING = "YES"
  [Environment]::SetEnvironmentVariable("ELECTRON_ENABLE_LOGGING", "YES", "User")

}

DownloadAtom
ExtractAtom
SetElectronEnvironmentVariables
PrintVersions
InstallPackage
RunLinters
RunSpecs
