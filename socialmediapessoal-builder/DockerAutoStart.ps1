# ============================================================
# Docker Auto-Start Setup - ACI
# Automações Comerciais Integradas
# ============================================================

#Requires -RunAsAdministrator

$serviceName = "com.docker.service"
$dockerDesktopPath = "$env:ProgramFiles\Docker\Docker\Docker Desktop.exe"
$logFile = "$env:TEMP\docker-autostart.log"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $entry = "[$timestamp] [$Level] $Message"
    Write-Host $entry
    Add-Content -Path $logFile -Value $entry
}

# ============================================================
# ETAPA 1 — Configurar serviço para iniciar automaticamente
# ============================================================
Write-Log "Configurando serviço '$serviceName' para inicialização automática..."

$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($service) {
    Set-Service -Name $serviceName -StartupType Automatic
    Write-Log "Tipo de inicialização definido como: Automatic"
} else {
    Write-Log "Serviço '$serviceName' não encontrado. Verifique se o Docker Desktop está instalado." "WARN"
}

# ============================================================
# ETAPA 2 — Iniciar o serviço se estiver parado
# ============================================================
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($service -and $service.Status -ne "Running") {
    Write-Log "Iniciando serviço Docker..."
    try {
        Start-Service -Name $serviceName -ErrorAction Stop
        Write-Log "Serviço iniciado com sucesso!" "OK"
    } catch {
        Write-Log "Erro ao iniciar serviço: $_" "ERROR"
    }
} elseif ($service.Status -eq "Running") {
    Write-Log "Serviço já está em execução."
}

# ============================================================
# ETAPA 3 — Criar tarefa agendada para iniciar com o Windows
# ============================================================
$taskName = "DockerAutoStart-ACI"
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if (-not $existingTask) {
    Write-Log "Criando tarefa agendada '$taskName'..."

    $action = New-ScheduledTaskAction `
        -Execute "PowerShell.exe" `
        -Argument "-NoProfile -WindowStyle Hidden -Command `"Start-Service -Name '$serviceName' -ErrorAction SilentlyContinue; Start-Process '$dockerDesktopPath'`""

    $trigger = New-ScheduledTaskTrigger -AtLogOn

    $settings = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -StartWhenAvailable `
        -ExecutionTimeLimit (New-TimeSpan -Minutes 5)

    $principal = New-ScheduledTaskPrincipal `
        -UserId $env:USERNAME `
        -LogonType Interactive `
        -RunLevel Highest

    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Principal $principal `
        -Description "Inicia o Docker Desktop automaticamente ao fazer login - ACI" `
        -Force | Out-Null

    Write-Log "Tarefa agendada criada com sucesso!"
} else {
    Write-Log "Tarefa agendada '$taskName' já existe. Nenhuma alteração necessária."
}

# ============================================================
# ETAPA 4 — Aguardar Docker ficar disponível
# ============================================================
Write-Log "Aguardando Docker ficar disponível..."
$attempts = 0

while ($attempts -lt 30) {
    try {
        $result = docker info 2>&1
        if ($LASTEXITCODE -eq 0) {
            $version = docker info --format '{{.ServerVersion}}'
            $daemonID = docker info --format '{{.ID}}'
            Write-Log "Docker disponível! Versão: $version | Daemon ID: $daemonID" "OK"
            break
        }
    } catch {}

    $attempts++
    Write-Log "Tentativa $attempts/30 - Aguardando Docker inicializar..."
    Start-Sleep -Seconds 5
}

if ($attempts -ge 30) {
    Write-Log "Timeout - Docker não ficou disponível em 150s." "ERROR"
    exit 1
}

# ============================================================
# ETAPA 5 — Relatório final
# ============================================================
Write-Log "=========================================="
Write-Log "CONFIGURAÇÃO CONCLUÍDA"
Write-Log "=========================================="

Get-Service -Name $serviceName | Select-Object Name, StartType, Status | ForEach-Object {
    Write-Log "Serviço : $($_.Name)"
    Write-Log "Startup : $($_.StartType)"
    Write-Log "Status  : $($_.Status)"
}

Get-ScheduledTask -TaskName $taskName | Select-Object TaskName, State | ForEach-Object {
    Write-Log "Tarefa  : $($_.TaskName) [$($_.State)]"
}

Write-Log "Log saved in: $logFile"
Write-Log "Support: contacto@automacoescomerciais.com.br"
