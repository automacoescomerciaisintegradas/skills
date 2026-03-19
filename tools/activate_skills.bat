@echo off
setlocal EnableDelayedExpansion

:: --- CONFIGURATION ---
:: Local deployment directory for the agent
set "BASE_DIR=%USERPROFILE%\.gemini\antigravity"
set "SKILLS_DIR=%BASE_DIR%\skills"
set "LIBRARY_DIR=%BASE_DIR%\skills_library"
set "ARCHIVE_DIR=%BASE_DIR%\skills_archive"

:: Repository source (assumes this script is in tools/ and skills are in root)
set "REPO_SKILLS=%~dp0..\"

echo Activating Antigravity skills...

:: --- ARGUMENT HANDLING ---
set "DO_CLEAR=0"
set "EXTRA_ARGS="
set "SKILLS_LIST_FILE=%TEMP%\skills_list_%RANDOM%_%RANDOM%.txt"

for %%a in (%*) do (
    if /I "%%a"=="--clear" (
        set "DO_CLEAR=1"
    ) else (
        if "!EXTRA_ARGS!"=="" (set "EXTRA_ARGS=%%a") else (set "EXTRA_ARGS=!EXTRA_ARGS! %%a")
    )
)

:: --- LIBRARY SYNC ---
:: Sync current repository state to the local skills library
if exist "%REPO_SKILLS%" (
    echo Syncing library with repository source...
    if not exist "%LIBRARY_DIR%" mkdir "%LIBRARY_DIR%" 2>nul
    robocopy "%REPO_SKILLS%" "%LIBRARY_DIR%" /E /NFL /NDL /NJH /NJS /XO /XD tools .git .gemini .tmp /XF *.py *.bat *.json *.md >nul 2>&1
)

:: --- PREPARE ACTIVE FOLDER ---
if "!DO_CLEAR!"=="1" (
    echo [RESET] Archiving and clearing existing skills...
    if exist "%SKILLS_DIR%" (
        set "ts=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
        set "ts=!ts: =0!"
        robocopy "%SKILLS_DIR%" "%ARCHIVE_DIR%_!ts!" /E /MOVE /NFL /NDL /NJH /NJS >nul 2>&1
    )
) else (
    echo [APPEND] Layering new skills onto existing folder...
)
mkdir "%SKILLS_DIR%" 2>nul

:: --- BUNDLE EXPANSION ---
echo Expanding bundles...

if exist "%SKILLS_LIST_FILE%" del "%SKILLS_LIST_FILE%" 2>nul

python --version >nul 2>&1
if not errorlevel 1 (
    :: Safely pass all arguments to Python (filtering out --clear)
    python "%~dp0scripts\get-bundle-skills.py" !EXTRA_ARGS! > "%SKILLS_LIST_FILE%" 2>nul
)

:: Fallback if Python fails or returned empty
if not exist "%SKILLS_LIST_FILE%" (
    echo Python bundle expansion failed. Using default list...
    > "%SKILLS_LIST_FILE%" (
        echo softare-engineer
        echo skill-creator
        echo software-architecture
        echo design-principles
    )
)

:: --- RESTORATION ---
echo Restoring selected skills to active area...
if exist "%SKILLS_LIST_FILE%" (
    for /f "usebackq delims=" %%s in ("%SKILLS_LIST_FILE%") do (
        if exist "%SKILLS_DIR%\%%s" (
            echo   . %%s ^(already active^)
        ) else if exist "%LIBRARY_DIR%\%%s" (
            echo   + %%s
            robocopy "%LIBRARY_DIR%\%%s" "%SKILLS_DIR%\%%s" /E /NFL /NDL /NJH /NJS >nul 2>&1
        ) else (
            echo   - %%s ^(not found in library^)
        )
    )
)
if exist "%SKILLS_LIST_FILE%" del "%SKILLS_LIST_FILE%" 2>nul

echo.
echo Done! Antigravity skills are now activated.
pause
