# PDFjam

```
pdfnup --nup 2x3 --no-landscape --scale 0.9 --suffix nup input.pdf
```

scale is to increase output margins

trim and clip to remove part of the input pages (sidebar)
```
--trim '1cm 0 0 0' --clip true 
```

# Crop A4 to 4:3 slide

```
pdfjam --papersize '{10in,7.5in}' --trim '0 7.5cm 0 7.5cm' --clip true --suffix cropped input.pdf
```

Size of 4:3 slide {10in,7.5in} 

# Crop A4 to 16:9 slide

```
pdfjam --papersize '{13.333in,7.5in}' --trim '0 9cm 0 9cm' --clip true --suffix cropped input.pdf
```
