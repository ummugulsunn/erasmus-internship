@echo off
setlocal
chcp 65001 >nul 2>&1
title Apollo Onboarding - Automatic Setup

echo.
echo  ========================================================
echo     APOLLO ONBOARDING AUTOMATION - AUTOMATIC SETUP
echo     Apollo Green Solutions
echo  ========================================================
echo.
echo  This will set up the onboarding system on your computer.
echo  Estimated time: about 5 minutes.
echo.
echo  Press any key to start...
pause >nul

:: ---- STEP 1: Check Node.js ----
echo.
echo  [Step 1 of 5] Checking Node.js...
node --version >nul 2>&1
if ERRORLEVEL 1 (
    echo    Node.js is not installed. Trying to install...
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    if ERRORLEVEL 1 (
        echo.
        echo    ERROR: Could not install Node.js automatically.
        echo    Please download it from https://nodejs.org
        echo    Then restart your computer and run this script again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo    Node.js was installed successfully!
    echo    Please RESTART your computer, then run this script again.
    echo.
    pause
    exit /b 0
)
echo    OK!

:: ---- STEP 2: Download project ----
echo.
echo  [Step 2 of 5] Getting project files from GitHub...
set "PROJECT_DIR=%USERPROFILE%\Documents\erasmus-internship"

if exist "%PROJECT_DIR%\onboarding-automation\mcp-email-server\server.mjs" (
    echo    OK - Files already exist.
) else (
    echo    Downloading...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/ummugulsunn/erasmus-internship/archive/refs/heads/main.zip' -OutFile '%TEMP%\apollo-repo.zip'"
    if ERRORLEVEL 1 (
        echo    ERROR: Download failed. Check your internet connection.
        pause
        exit /b 1
    )
    echo    Extracting...
    powershell -Command "Expand-Archive -Path '%TEMP%\apollo-repo.zip' -DestinationPath '%TEMP%\apollo-extract' -Force"
    robocopy "%TEMP%\apollo-extract\erasmus-internship-main" "%PROJECT_DIR%" /E /NFL /NDL /NJH /NJS >nul 2>&1
    rd /s /q "%TEMP%\apollo-extract" 2>nul
    del "%TEMP%\apollo-repo.zip" 2>nul
    echo    OK - Downloaded!
)

:: ---- STEP 3: npm install ----
echo.
echo  [Step 3 of 5] Installing dependencies...
cd /d "%PROJECT_DIR%\onboarding-automation\mcp-email-server"
call npm install 2>nul
echo    OK!

:: ---- STEP 4: Get credentials ----
echo.
echo  [Step 4 of 5] Email setup
echo.
echo    You need an Outlook App Password. If you do not have one:
echo    1. Go to https://account.microsoft.com/security
echo    2. Click "Security info" then "Add sign-in method"
echo    3. Choose "App password" and copy the generated code
echo.
set /p SMTP_EMAIL="   Enter your company email address: "
set /p SMTP_PASS="   Enter your App Password: "

:: ---- STEP 5: Write Claude config ----
echo.
echo  [Step 5 of 5] Configuring Claude Desktop...

set "CLAUDE_DIR=%APPDATA%\Claude"
if not exist "%CLAUDE_DIR%" mkdir "%CLAUDE_DIR%"

:: Convert backslashes to forward slashes for JSON
set "MCP_PATH=%PROJECT_DIR%\onboarding-automation\mcp-email-server\server.mjs"
set "MCP_PATH=%MCP_PATH:\=/%"

:: Write the Claude Desktop configuration file
set "CONFIG=%CLAUDE_DIR%\claude_desktop_config.json"
> "%CONFIG%" echo {
>> "%CONFIG%" echo   "mcpServers": {
>> "%CONFIG%" echo     "apollo-onboarding": {
>> "%CONFIG%" echo       "command": "node",
>> "%CONFIG%" echo       "args": ["%MCP_PATH%"],
>> "%CONFIG%" echo       "env": {
>> "%CONFIG%" echo         "SMTP_HOST": "smtp.office365.com",
>> "%CONFIG%" echo         "SMTP_PORT": "587",
>> "%CONFIG%" echo         "SMTP_USER": "%SMTP_EMAIL%",
>> "%CONFIG%" echo         "SMTP_PASSWORD": "%SMTP_PASS%"
>> "%CONFIG%" echo       }
>> "%CONFIG%" echo     }
>> "%CONFIG%" echo   }
>> "%CONFIG%" echo }

echo    OK - Configuration saved!

echo.
echo  ========================================================
echo     SETUP COMPLETE!
echo  ========================================================
echo.
echo  Now follow these 3 steps:
echo.
echo  1. CLOSE Claude Desktop completely
echo     (Right-click the Claude icon near the clock,
echo      then click "Quit")
echo.
echo  2. REOPEN Claude Desktop
echo.
echo  3. Try it! Type in Claude:
echo     "Onboard Test User, Intern, HR, starting tomorrow.
echo      Send the email to %SMTP_EMAIL%"
echo.
echo  If you have any issues, contact Ummugulsun!
echo.
echo  ========================================================
echo.
pause
