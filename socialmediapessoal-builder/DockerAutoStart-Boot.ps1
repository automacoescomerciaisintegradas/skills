# ============================================================
#  Docker Auto-Start — Boot do Windows (sem login)
#  Automações Comerciais Integradas (ACI)
#  contato@automacoescomerciais.com.br
# ============================================================
#Requires -RunAsAdministrator

# ── Configurações ────────────────────────────────────────────
$serviceName     = "com.docker.service"
$taskName        = "ACI-DockerAutoStart-Boot"
$logDir          = "C:\ProgramData\ACI\Logs"
$logFile         = "$logDir\docker-autostart.log"
$maxLogSizeBytes = 5MB
$maxWaitSeconds  = 150   # 30 tentativas × 5s

# ── Função de Log ────────────────────────────────────────────
function Write-Log {
    param(
        [string]$Message,
        [ValidateSet("INFO","OK","WARN","ERROR")]
        [string]$Level = "INFO"
    )

    # Rotação de log se ultrapassar 5MB
    if ((Test-Path $logFile) -and (Get-Item $logFile).Length -gt $maxLogSizeBytes) {
        Rename-Item $logFile "$logFile.bak" -Force -ErrorAction SilentlyContinue
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $entry     = "[$timestamp] [$Level] $Message"

    try {
        if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
        Add-Content -Path $logFile -Value $entry -ErrorAction Stop
    } catch {}

    Write-Host $entry
}

# ============================================================
# MODO 1 — REGISTRAR tarefa agendada (executar com -Setup)
# ============================================================
if ($args[0] -eq "-Setup") {

    Write-Log "=== INICIANDO CONFIGURAÇÃO DA TAREFA AGENDADA ==="

    # -- Validar serviço Docker
    $svc = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
    if (-not $svc) {
        Write-Log "Serviço '$serviceName' não encontrado. Instale o Docker Desktop primeiro." "ERROR"
        exit 1
    }

    # -- Definir serviço como Automático
    Set-Service -Name $serviceName -StartupType Automatic
    Write-Log "Serviço '$serviceName' configurado como Automatic."

    # -- Remover tarefa antiga se existir
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

    # -- Caminho do próprio script
    $scriptPath = $MyInvocation.MyCommand.Path

    # -- Ação: rodar este script no modo -Run
    $action = New-ScheduledTaskAction `
        -Execute "PowerShell.exe" `
        -Argument "-NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$scriptPath`" -Run"

    # -- Trigger: ao iniciar o sistema (sem login)
    $trigger = New-ScheduledTaskTrigger -AtStartup

    # -- Configurações da tarefa
    $settings = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -StartWhenAvailable `
        -ExecutionTimeLimit (New-TimeSpan -Minutes 10) `
        -RestartCount 3 `
        -RestartInterval (New-TimeSpan -Minutes 1)

    # -- Executar como SYSTEM (não requer login)
    $principal = New-ScheduledTaskPrincipal `
        -UserId "SYSTEM" `
        -LogonType ServiceAccount `
        -RunLevel Highest

    Register-ScheduledTask `
        -TaskName    $taskName `
        -Action      $action `
        -Trigger     $trigger `
        -Settings    $settings `
        -Principal   $principal `
        -Description "ACI — Inicia o Docker automaticamente no boot do Windows (sem login)" `
        -Force | Out-Null

    Write-Log "Tarefa '$taskName' registrada com sucesso!" "OK"

    # -- Resumo
    Write-Log "=================================================="
    Write-Log "CONFIGURAÇÃO CONCLUÍDA" "OK"
    Write-Log "Tarefa  : $taskName"
    Write-Log "Trigger : Ao iniciar o Windows (sem login)"
    Write-Log "Conta   : SYSTEM"
    Write-Log "Script  : $scriptPath"
    Write-Log "Log     : $logFile"
    Write-Log "Suporte : contato@automacoescomerciais.com.br"
    Write-Log "=================================================="

    exit 0
}

# ============================================================
# MODO 2 — EXECUTAR inicialização do Docker (chamado no boot)
# ============================================================
if ($args[0] -eq "-Run") {

    Write-Log "=== BOOT DETECTADO — Iniciando Docker ==="

    # -- Aguardar serviço de dependências do Windows estabilizar
    Start-Sleep -Seconds 10

    # -- Garantir serviço iniciado
    $svc = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

    if (-not $svc) {
        Write-Log "Serviço '$serviceName' não encontrado no boot." "ERROR"
        exit 1
    }

    if ($svc.Status -ne "Running") {
        Write-Log "Iniciando serviço '$serviceName'..."
        try {
            Start-Service -Name $serviceName -ErrorAction Stop
            Write-Log "Serviço iniciado." "OK"
        } catch {
            Write-Log "Falha ao iniciar serviço: $_" "ERROR"
            exit 1
        }
    } else {
        Write-Log "Serviço já estava em execução."
    }

    # -- Aguardar daemon Docker responder
    Write-Log "Aguardando daemon Docker ficar disponível (máx ${maxWaitSeconds}s)..."

    $attempts  = 0
    $maxTries  = [math]::Floor($maxWaitSeconds / 5)
    $available = $false

    while ($attempts -lt $maxTries) {
        try {
            $info = docker info 2>&1
            if ($LASTEXITCODE -eq 0) {
                $version  = docker info --format '{{.ServerVersion}}'
                $daemonID = docker info --format '{{.ID}}'
                Write-Log "Docker disponível! Versão: $version | ID: $daemonID" "OK"
                $available = $true
                break
            }
        } catch {}

        $attempts++
        Write-Log "Tentativa $attempts/$maxTries — aguardando..."
        Start-Sleep -Seconds 5
    }

    if (-not $available) {
        Write-Log "Timeout — Docker não ficou disponível em ${maxWaitSeconds}s." "ERROR"
        exit 1
    }

    Write-Log "=== Docker pronto para uso ===" "OK"
    exit 0
}

# ============================================================
# MODO 3 — STATUS da tarefa e do serviço
# ============================================================
if ($args[0] -eq "-Status") {

    Write-Log "=== STATUS ATUAL ==="

    $svc  = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
    $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

    if ($svc) {
        Write-Log "Serviço : $($svc.Name) | Startup: $($svc.StartType) | Status: $($svc.Status)"
    } else {
        Write-Log "Serviço '$serviceName' não encontrado." "WARN"
    }

    if ($task) {
        $info = Get-ScheduledTaskInfo -TaskName $taskName -ErrorAction SilentlyContinue
        Write-Log "Tarefa  : $($task.TaskName) | State: $($task.State)"
        if ($info.LastRunTime) { Write-Log "Último run : $($info.LastRunTime) | Resultado: $($info.LastTaskResult)" }
        if ($info.NextRunTime) { Write-Log "Próximo run: $($info.NextRunTime)" }
    } else {
        Write-Log "Tarefa '$taskName' não registrada. Execute com -Setup primeiro." "WARN"
    }

    exit 0
}

# ============================================================
# MODO 4 — REMOVER tarefa agendada
# ============================================================
if ($args[0] -eq "-Remove") {

    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    Write-Log "Tarefa '$taskName' removida." "OK"
    exit 0
}

# ── Ajuda (nenhum argumento fornecido) ──────────────────────
Write-Host ""
Write-Host "  Docker Auto-Start — ACI" -ForegroundColor Cyan
Write-Host "  ─────────────────────────────────────────────"
Write-Host "  Uso: .\DockerAutoStart-Boot.ps1 [opcao]"
Write-Host ""
Write-Host "  -Setup   Registra a tarefa agendada no boot (1x, como Admin)"
Write-Host "  -Run     Executa a inicialização do Docker   (chamado automaticamente)"
Write-Host "  -Status  Exibe status do serviço e da tarefa"
Write-Host "  -Remove  Remove a tarefa agendada"
Write-Host ""
Write-Host "  Log: C:\ProgramData\ACI\Logs\docker-autostart.log"
Write-Host "  Suporte: contato@automacoescomerciais.com.br"
Write-Host ""
