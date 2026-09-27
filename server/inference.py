from ultralytics import YOLO
import cv2

model = YOLO("yolo11n.pt")

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise RuntimeError("Cannot open webcam")

while True:
    success, frame = cap.read()

    if not success:
        print("Failed to read frame")
        break

    results = model(frame)

    annotated_frame = results[0].plot()

    cv2.imshow("YOLO Webcam", annotated_frame)

    # Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()