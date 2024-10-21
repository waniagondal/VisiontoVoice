# 👁️ VisiontoVoice —— Gaze Detection & Keyboard Interface

## 🌟 Project Overview
Welcome to the **VisiontoVoice**! This application merges advanced eye-tracking technology with an interactive keyboard, allowing users to type effortlessly using just their eyes. Designed primarily for individuals with **paralysis** or **locked-in syndrome**, this project aims to enhance accessibility and empower users to communicate effectively.

## 🎯 Key Features
- **Real-Time Blink Detection**: Detects when the user blinks, allowing them to select keys without physical interaction.
- **Dynamic Keyboard Interface**: Each key on the keyboard is highlighted in a continuous loop, drawing the user's attention to the currently selectable key.
- **Eye-Controlled Typing**: A blink on the **Enter** key converts the typed message into speech using Google Text-to-Speech (gTTS), providing instant auditory feedback.
- **User-Friendly Design**: The interface is intuitive, ensuring users can easily navigate and interact with the keyboard.

## 🖥️ How It Works
1. **Eye Tracking**: The application captures video frames from the webcam, using MediaPipe to identify facial landmarks, particularly around the eyes.
2. **Keyboard Interaction**: The keyboard keys are visually highlighted in a loop, allowing users to focus on the desired key.
3. **Blink to Select**: A blink is registered as a key press, enabling users to select letters and symbols.
4. **Speech Output**: Pressing the **Enter** key triggers the conversion of the input text into speech, making communication seamless.

## 📷 User Interface
The keyboard interface showcases each key pulsating with light, creating an engaging visual experience. When a user blinks, the selected key is "typed," providing a unique interaction method.

## 💡 Use Cases
- **Accessibility Solutions**: Designed for individuals with severe mobility impairments, enabling them to communicate and express themselves.
- **Assistive Technology**: Ideal for use in medical environments, therapy sessions, and educational settings where traditional input methods are not feasible.

## 🔧 Built With
- **OpenCV**: For real-time video processing and eye tracking.
- **MediaPipe**: For accurate facial landmark detection.
- **WebSockets**: For real-time communication with the interface.
- **gTTS (Google Text-to-Speech)**: To translate typed text into spoken words.

## 🚀 Future Enhancements
The Eye Tracker project aims to continuously improve with potential features like:
- **Simplified Command Inputs**: Implementing buttons for simple commands like "Yes" or "No," streamlining user interactions for quick responses.
- **Enhanced User Design**: Improving the user interface to reduce the time it takes to loop through the keys, making the experience smoother and more efficient.
- **Advanced Analytics**: Tracking user patterns for tailored assistance and improvements.

## 🤝 Contributing
Thank you for exploring the VisiontoVoice —— Gaze Detection & Keyboard Interface! I invite you to contribute to VisiontoVoice. Whether you have ideas for new features, bug fixes, or enhancements, your collaboration is welcome. Let's make communication easier for those who need it most! 💬👀✨

## 📧 Contact
For questions, suggestions, or collaborations, please reach out to:
- **Wania Gondal** - [wania.gondal@mail.utoronto.ca](mailto:wania.gondal@mail.utoronto.ca)
