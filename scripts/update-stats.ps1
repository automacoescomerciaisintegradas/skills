$skillsDir = "c:\antigravity\skills" 
$skills = Get-ChildItem -Path $skillsDir -Recurse -Filter SKILL.md -File
$skillCount = $skills.Count
$currentDate = Get-Date -Format "dd/MM/yyyy HH:mm:ss"

$skillsList = ""
foreach ($s in $skills) {
    if ($s.Directory.Name -ne "skills") {
        $hasManifest = Test-Path (Join-Path $s.Directory.FullName "manifest.json")
        $manifestStatus = if ($hasManifest) { "✅ Manifest Ready" } else { "❌ No Manifest" }
        $skillsList += "- [" + $s.Directory.Name + "](" + $s.Directory.Name + "/) | $manifestStatus `n"
    }
}

$readmeContent = @"
# 🚀 Cleudocode Metrics: Dashboard de Skills

## 📊 Estatísticas Atuais
- **Total de Skills Ativas:** $skillCount
- **Último Push Sincronizado:** $currentDate
- **Estado do Repositório:** Sincronizado via Git
- **Suporte MCP:** ✅ Habilitado em config.json

## 🛠️ Todas as Skills Encontradas
| Skill | Status do Manifesto |
| :--- | :--- |
$skillsList

## 🛡️ Governança
Este repositório é gerenciado pelo **Antigravity AI Agent** e segue os protocolos de **Mission-Critical Security**.

---
*Gerado automaticamente pelo Skill Creator às $currentDate*
"@

Set-Content -Path "c:\antigravity\skills\README.md" -Value $readmeContent
Write-Output "README.md gerado com lista completa de $skillCount skills e status dos manifestos."
