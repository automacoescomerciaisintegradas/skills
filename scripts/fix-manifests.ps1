# Fix missing manifest.json for skills
$TargetDirs = @(
    "C:\antigravity\skills",
    "C:\antigravity\skills\.agents\skills",
    "C:\antigravity\skills\kit\.agent\skills"
)

foreach ($BaseDir in $TargetDirs) {
    if (-Not (Test-Path $BaseDir)) { continue }
    
    $Skills = Get-ChildItem -Path $BaseDir -Directory
    foreach ($Skill in $Skills) {
        $ManifestPath = Join-Path $Skill.FullName "manifest.json"
        $SkillMd = Join-Path $Skill.FullName "SKILL.md"
        $DocMd = Join-Path $Skill.FullName "doc.md"
        
        # Skip directories that are not skills (no SKILL.md or doc.md)
        if (-Not (Test-Path $SkillMd) -And -Not (Test-Path $DocMd)) { continue }
        
        Write-Host "Generating/Updating manifest for: $($Skill.Name)" -ForegroundColor Cyan
        
        # Try to get description
        $Desc = "Agentic skill for $($Skill.Name)"
        
        if (Test-Path $SkillMd) {
            $Content = Get-Content $SkillMd -First 10
            foreach ($Line in $Content) {
                if ($Line -match "description:\s*(.*)") {
                    $Desc = $Matches[1].Trim().Trim('"')
                    break
                }
            }
        } elseif (Test-Path $DocMd) {
            $Content = Get-Content $DocMd -First 5
            $Desc = $Content[0].Trim('#').Trim()
        }
        
        $Manifest = @{
            name = $Skill.Name
            version = "1.0.0"
            description = $Desc
            license = "© Automações Comerciais Integradas! 2026"
            keywords = @($Skill.Name.Split('-'))
            repository = @{
                type = "git"
                url = "https://github.com/automacoescomerciaisintegradas/skills"
            }
            mcp = @{
                transport = "stdio"
                tools = @()
            }
        }
        
        $ManifestJson = $Manifest | ConvertTo-Json -Depth 10
        [System.IO.File]::WriteAllText($ManifestPath, $ManifestJson, [System.Text.Encoding]::UTF8)
    }
}

Write-Host "Manifest fix complete!" -ForegroundColor Green
