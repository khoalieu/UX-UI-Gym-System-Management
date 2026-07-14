$ErrorActionPreference = 'Stop'
$runtime = 'C:\Users\MinhKhoa\.cache\codex-runtimes\codex-primary-runtime\dependencies\node'
$env:NODE_PATH = "$runtime\node_modules;$runtime\node_modules\.pnpm\node_modules"
& "$runtime\bin\node.exe" "$PSScriptRoot\export-figma-html.js"
