$ErrorActionPreference = 'Stop'
$root = Get-Location
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:8000/")
$listener.Start()
Write-Output "Serving $root on http://localhost:8000/"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $resp = $context.Response
    $path = $req.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
    $file = Join-Path $root $path
    try {
        if (Test-Path $file) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            switch -Regex ($file) {
                '\.css$'     { $resp.ContentType = 'text/css'; break }
                '\.js$'      { $resp.ContentType = 'application/javascript'; break }
                '\.png$|\.jpg$|\.jpeg$|\.gif$' { $resp.ContentType = 'image/jpeg'; break }
                default       { $resp.ContentType = 'text/html'; break }
            }
            $resp.ContentLength64 = $bytes.Length
            $resp.OutputStream.Write($bytes,0,$bytes.Length)
        } else {
            $resp.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
            $resp.OutputStream.Write($buffer,0,$buffer.Length)
        }
    } catch {
        $resp.StatusCode = 500
        $buf = [System.Text.Encoding]::UTF8.GetBytes('Server Error')
        $resp.OutputStream.Write($buf,0,$buf.Length)
    } finally {
        $resp.OutputStream.Close()
    }
}
$listener.Stop()
$listener.Close()
