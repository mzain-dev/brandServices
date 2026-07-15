# HMI Brand Workflow & Charging Wheel Videos (Remotion)

This repository contains programmatically generated videos built with [Remotion](https://www.remotion.dev/) to represent HMI brand workflows and technical diagrams.

## 🎥 Compositions

The project defines two key video compositions (both 1080x1080 resolution at 30 FPS):

1. **WorkflowVideo**
   - **Duration:** 6 seconds (180 frames)
   - **Description:** A step-by-step schematic layout demonstrating technical/functional workflows with smooth spring animations, technical grid background, and gold/cyan HMI branding.
   - **Rendered Output:** [out/workflow.mp4](file:///c:/Users/hmcou/Downloads/workflow-video/workflow-video/out/workflow.mp4)

2. **ChargingWheel**
   - **Duration:** 30 seconds (900 frames)
   - **Description:** A detailed circular charging wheel diagram showcasing technical components rotating into focus with dynamic text, custom icons, and blueprint drafting line aesthetics.
   - **Rendered Output:** [out/ChargingWheel.mp4](file:///c:/Users/hmcou/Downloads/workflow-video/workflow-video/out/ChargingWheel.mp4)

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [FFmpeg](https://www.remotion.dev/docs/ffmpeg) (installed on your system for video rendering)

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Previewing the Videos

Launch the Remotion Studio in your browser to preview the animations interactively:

```bash
npm start
```

### Rendering the Videos

You can render the compositions to MP4 files:

*   **To render the WorkflowVideo:**
    ```bash
    npm run render
    ```
    This generates `out/workflow.mp4`.

*   **To render the ChargingWheel:**
    ```bash
    npx remotion render src/index.ts ChargingWheel out/ChargingWheel.mp4
    ```
    This generates `out/ChargingWheel.mp4`.

*   **To capture a still frame from the WorkflowVideo (e.g. frame 100):**
    ```bash
    npm run still
    ```
    This generates `out/workflow.png`.

---

## 📂 File Structure

*   `src/index.ts`: The entry point for the Remotion project.
*   `src/Root.tsx`: Composition registrations and settings.
*   `src/WorkflowVideo.tsx`: Component source code for the linear workflow animation.
*   `src/ChargingWheelVideo.tsx`: Component source code for the circular charging wheel animation.
*   `out/`: Directory containing pre-rendered assets.
*   `hmi-logo.png`: HMI brand logo asset used in the videos.
