$skillsDir = "c:\antigravity\skills" 
$skills = Get-ChildItem -Path $skillsDir -Recurse -Filter SKILL.md -File
$skillCount = $skills.Count
$currentDate = Get-Date -Format "dd/MM/yyyy HH:mm:ss"

$skillsList = ""
foreach ($s in $skills) {
    if ($s.Directory.Name -ne "skills") { # Evita pastas aninhadas confusas se necessário
        $skillsList += "- [" + $s.Directory.Name + "](" + $s.Directory.Name + "/) `n"
    }
}

$readmeContent = @"
# 🚀 Cleudocode Metrics: Dashboard de Skills

## 📊 Estatísticas Atuais
- **Total de Skills Ativas:** $skillCount
- **Último Push Sincronizado:** $currentDate
- **Estado do Repositório:** Sincronizado via Git

## 🛠️ Todas as Skills Encontradas
$skillsList

## 🛡️ Governança
Este repositório é gerenciado pelo **Antigravity AI Agent** e segue os protocolos de **Mission-Critical Security**.

---
*Gerado automaticamente pelo Skill Creator às $currentDate*
"@

Set-Content -Path "c:\antigravity\skills\README.md" -Value $readmeContent
Write-Output "README.md gerado com lista completa de $skillCount skills."
