import cv2 as cv
import numpy as np

#conda deactivate

FRAME_HEIGHT = 280

first_rect = []
second_rect = []
third_rect = []

index = 0

def resize_mat(umat, height, width):
    width = int(width * (FRAME_HEIGHT / height))
    height = FRAME_HEIGHT
    return cv.resize(umat, (width, height))

def crop_mat(umat, height, width, left=0, top=0):
    return cv.UMat(umat, [top, height+top], [left, width+left])

def join_mat(umat_list, channels, dtype):
    side = FRAME_HEIGHT // 2
    mat = np.zeros([side, side * len(umat_list), channels], dtype)
    cv.hconcat([ cv.UMat.get(umat) for umat in umat_list ], mat)
    return mat

def process_mat(umat, height, width):
    global second_rect
    global first_rect
    global third_rect
    side = FRAME_HEIGHT // 2
    umat = resize_mat(umat, height, width)
    umat = crop_mat(umat, FRAME_HEIGHT, FRAME_HEIGHT)
    second_rect += [ crop_mat(umat, side, side, left = side) ]
    third_rect += [ crop_mat(umat, side, side, top = side) ]
    first_rect += [ crop_mat(umat, side, side) ]
    if len(first_rect)%25 == 0:
        print("Total: ", len(first_rect))

def take_frames(umat_list, *args, **kwargs):
    if "slice" in kwargs:
        umat_list = umat_list[kwargs["slice"]:]
    if len(args) != 0:
        umat_list = [ umat_list[i] for i in args]
    return umat_list

cap = cv.VideoCapture('../media/cutted.mp4')

while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == True:
        height, width, channels = frame.shape
        dtype = frame.dtype
        index = index + 1
        if index%24 == 0:
            process_mat(cv.UMat(frame), height, width)
    else:
        break

args, kwargs = (range(0, 14), {"slice": 52})

first_rect = take_frames(first_rect, *args, **kwargs)
second_rect = take_frames(second_rect, *args, **kwargs)
third_rect = take_frames(third_rect, *args, **kwargs)

cv.imwrite("first.png", join_mat(first_rect, channels, dtype))
cv.imwrite("second.png", join_mat(second_rect, channels, dtype))
cv.imwrite("third.png", join_mat(third_rect, channels, dtype))

print("Total: ", len(first_rect))