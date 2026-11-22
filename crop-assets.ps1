Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force assets | Out-Null
function Crop($name,$x,$y,$w,$h) {
    $rect = [Drawing.Rectangle]::new($x,$y,$w,$h)
    $tile = $script:source.Clone($rect,[Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $tile.Save((Join-Path (Get-Location) "assets/$name.jpg"),[Drawing.Imaging.ImageFormat]::Jpeg)
    $tile.Dispose()
}
function Source($name) {
    if ($script:source) { $script:source.Dispose() }
    $script:source = [Drawing.Bitmap]::new((Resolve-Path "../$name").Path)
}
Source 'Apex Precision CNC Homepage Mockup.png'
Crop home-hero 493 71 436 351
Crop home-aero 274 1142 155 101
Crop home-medical 442 1142 153 101
Crop home-industrial 608 1142 154 101
Crop home-defense 774 1142 154 101
Crop batch 650 605 267 79
Crop flange 8 1502 308 166
Source 'capabilities.png'
Crop cap-hero 1248 65 278 265
Crop multi 799 350 332 113
Crop cap-turn 1161 352 164 77
Crop cap-mill 1350 352 167 79
Crop edm 1162 482 164 80
Crop secondary 1352 482 164 71
Crop blocks 794 749 193 144
Source 'Equipment Showcase.png'
Crop equipment-hero 529 61 580 311
Crop impeller 210 388 272 180
Crop turning 771 389 338 116
Crop swiss 660 520 140 72
Crop horizontal 963 520 144 73
Crop inspection 292 648 191 124
Crop dmg 287 804 180 101
Crop mazak 500 807 173 98
Crop citizen 710 807 173 98
Crop okuma 918 805 179 100
Crop machining 572 1054 177 89
Source 'Industries.png'
Crop industries-hero 595 73 601 437
Crop aerospace 22 534 276 79
Crop medical 318 534 272 80
Crop industrial 612 534 272 82
Crop robotics 905 534 274 81
Crop tool 22 736 275 100
Crop energy 318 736 271 76
Crop electronics 610 736 275 78
Crop transport 904 736 275 78
Crop cta 684 1156 258 126
Source 'Precision CNC Quality Commitment.png'
Crop quality-hero 604 72 593 387
Crop cmm 18 657 403 294
Crop gauge 868 655 316 154
Crop rings 868 824 316 129
Source 'about_us.png'
Crop operator 502 70 396 372
Crop story 1278 70 243 234
Crop shop 18 598 560 259
Crop team 925 713 234 172
