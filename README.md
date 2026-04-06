# FluxFlow - High-Performance AI Image Generation Suite

A production-ready mobile application built with **React Native** and **Expo SDK 54**. This project serves as a technical showcase for handling high-bandwidth generative AI assets, custom binary data pipelines, and native filesystem integration.

## 🚀 Engineering Highlights

* **Low-Latency Inference:** Integration with the **Hugging Face Inference API** utilizing `FLUX.1-schnell` for rapid, high-fidelity image generation.
* **Optimized Data Pipeline:** Implemented a custom **Base64-to-Uint8Array conversion layer**. This bypasses JavaScript string-encoding bottlenecks, allowing for direct-to-disk binary writes.
* **Advanced Filesystem Architecture:** Leverages the new **Expo File API** (Synchronous I/O) to manage a sophisticated caching layer, ensuring thread-safe operations during image processing.
* **Native Interop:** Full integration with **iOS/Android System Sheets** via `expo-sharing` and automated permission-handling with `expo-media-library`.
* **Modern Filesystem (SDK 54):** Implemented the latest **Expo File API** for synchronous, low-latency disk I/O, ensuring thread-safe image caching.

## 🏗️ System Architecture

The application is architected to handle large binary payloads efficiently within the React Native bridge:

1.  **Network Layer:** Asynchronous fetching of binary Blobs from remote AI models.
2.  **Buffer Management:** Translation of 16-bit UTF strings into 8-bit unsigned integer arrays (`Uint8Array`) to align with native C++/Swift hardware requirements.
3.  **Persistence Layer:** Utilizing a "Sandbox-to-Gallery" workflow, where assets are staged in `Paths.cache` before being committed to the permanent system storage.



## 🛠️ Technical Stack

* **Framework:** React Native (Expo Managed Workflow)
* **Core Engine:** TypeScript
* **API Architecture:** REST / Hugging Face Inference
* **Storage Engine:** Expo File System (Next-Gen SDK 54 API)
* **Native Modules:** MediaLibrary, Sharing, Device-Level Permissions
* **UI/UX:** FontAwesome5


## 📸 Core Features

* **Real-time AI Generation:**Custom prompts, Multi-model support with dynamic aspect ratio injection.
* **Asset Persistence:** Native "Save to Gallery" functionality with duplicate detection.
* **Cross-App Handoff:** Integrated system-level sharing for professional workflows.
* **Native Sharing:** System-level sharing to Slack, Discord, or WhatsApp.
* **Cache Optimization:** Automated cleanup protocols to maintain a zero-footprint storage impact.
* **One-Tap Save:** Direct-to-gallery saving with automated permission handling.

