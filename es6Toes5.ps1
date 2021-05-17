npm init -y
npm install -g babel-cli
npm install --save-dev babel-preset-es2015 babel-cli
if (-not (Test-Path ./.babelrc))
{
	Write-Host "there is not .babelrc"
    new-item .babelrc -type file
}
if (-not (Test-Path ./es5/))
{
	Write-Host "there is not es5/"
     md es5/
}
"{""presets"":[""es2015""],""plugins"":[]}" | Out-File -Encoding ascii .babelrc
Get-ChildItem es6/*.js | ForEach-Object -Process{
if($_ -is [System.IO.FileInfo])
{
	$srcpath = "es6/"+$_.name
	$aimpath = "es5/"+$_.name
	babel $srcpath -o $aimpath;
}
}