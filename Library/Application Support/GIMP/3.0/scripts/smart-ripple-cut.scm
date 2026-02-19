(define (script-fu-ripple-cut image drawable)
  (let* (
         (selection-bounds (gimp-selection-bounds image))
         (exists (car selection-bounds))
         (x1 (cadr selection-bounds))
         (y1 (caddr selection-bounds))
         (x2 (cadddr selection-bounds))
         (y2 (car (cddddr selection-bounds)))
         (sel-w (- x2 x1))
         (sel-h (- y2 y1))
         (img-w (car (gimp-image-get-width image)))
         (img-h (car (gimp-image-get-height image)))
         (cut-h (- img-h y2))
         (cut-w (- img-w x2))
        )

    (if (= exists TRUE)
        (begin
          ;(gimp-image-undo-group-start image)
          
          ; 1. Clear the gap
          (gimp-drawable-edit-clear drawable)

          (cond 
            ; CASE: Selection spans full width -> Vertical Ripple (Move Bottom Up)
            ((>= sel-w img-w)
              (begin
                (gimp-image-select-rectangle image 2 0 y2 img-w cut-h)
                (gimp-edit-cut (vector drawable))
                ; Select original location with the correct size for the pasted part
                (gimp-image-select-rectangle image 2 x1 y1 img-w cut-h)
                ; Paste into selection
                (gimp-edit-paste drawable 1)
                (gimp-image-resize image img-w (- img-h sel-h) 0 0)))

            ; CASE: Selection spans full height -> Horizontal Ripple (Move Right to Left)
            ((>= sel-h img-h)
              (begin
                (gimp-image-select-rectangle image 2 x2 0 cut-w img-h)
                (gimp-edit-cut (vector drawable))
                ; Select original location with the correct size for the pasted part
                (gimp-image-select-rectangle image 2 x1 y1 cut-w img-h)
                ; Paste into selection
                (gimp-edit-paste drawable 1)
                (gimp-image-resize image (- img-w sel-w) img-h 0 0)))

            (else (gimp-message "Selection must span the full width or height of the canvas to ripple."))))
        (gimp-message "No selection active."))))

(script-fu-register "script-fu-ripple-cut"
  "Ripple Cut"
  "Cuts selection and ripples the remaining image together based on canvas span."
  "Your Name"
  "Your Name"
  "2024"
  "RGB*, GRAY*"
  SF-IMAGE    "Image"    0
  SF-DRAWABLE "Drawable" 0
)

(script-fu-menu-register "script-fu-ripple-cut" "<Image>/Edit")
