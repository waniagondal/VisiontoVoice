© 2024 Wania Gondal

import cv2
import mediapipe as mp
import asyncio
import websockets
import json

class EyeTracker:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(max_num_faces=1, refine_landmarks=True, min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_drawing_styles = mp.solutions.drawing_styles

    def process_frame(self, frame):
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = self.face_mesh.process(frame_rgb)
        return result

    def get_landmarks(self, result):
        if result.multi_face_landmarks:
            for face_landmarks in result.multi_face_landmarks:
                return face_landmarks.landmark
        return None

    def detect_blink(self, landmarks):
        left_eye = [landmarks[i] for i in [33, 159, 158, 157, 145, 144]]
        right_eye = [landmarks[i] for i in [362, 386, 385, 384, 373, 374]]

        left_eye_closed = self.is_eye_closed(left_eye)
        right_eye_closed = self.is_eye_closed(right_eye)

        return left_eye_closed and right_eye_closed

    def is_eye_closed(self, eye_landmarks):
        upper_y = (eye_landmarks[1].y + eye_landmarks[2].y + eye_landmarks[3].y) / 3  # Averaging upper eyelid
        lower_y = (eye_landmarks[4].y + eye_landmarks[5].y) / 2  # Averaging lower eyelid
        distance = abs(upper_y - lower_y)
        return distance < 0.015

class EyeTrackerServer:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        self.eye_tracker = EyeTracker()
        self.blink_detected = False
        self.closed_time = 0
        self.blink_duration = 0.19
    
    async def eye_tracking(self, websocket):
        if not self.cap.isOpened():
            print("Error: Your camera is unable to be opened.")
            return
        
        try:
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    print("Error: The frame cannot be read.")
                    break

                result = self.eye_tracker.process_frame(frame)
                landmarks = self.eye_tracker.get_landmarks(result)

                if landmarks:
                    eyes_closed = self.eye_tracker.detect_blink(landmarks)

                    if eyes_closed:
                        self.closed_time += 1 / 30
                    else:
                        self.closed_time = 0
                
                    if self.closed_time >= self.blink_duration and not self.blink_detected:
                        self.blink_detected = True
                    else:
                        self.blink_detected = False
                
                await websocket.send(json.dumps({"blink_detected": self.blink_detected}))

                if self.blink_detected:
                    cv2.putText(frame, "Blink Detected", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
                else:
                    cv2.putText(frame, "Eyes Open", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

                cv2.imshow("Eye Tracker", frame)


                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

        finally:
            self.cap.release()
            cv2.destroyAllWindows()
    
    async def main(self):
        async with websockets.serve(self.eye_tracking, "localhost", 8765):
            await asyncio.Future()

if __name__ == "__main__":
    eye_tracker_server = EyeTrackerServer()
    asyncio.run(EyeTrackerServer().main())
