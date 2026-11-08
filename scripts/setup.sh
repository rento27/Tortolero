#!/usr/bin/env bash
# Prepara el entorno de edicion de video (ffmpeg + librerias Python).
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v ffmpeg >/dev/null; then
  apt-get update && apt-get install -y ffmpeg
fi
pip install --break-system-packages -q -r requirements.txt

python3 -c "import moviepy, cv2, pydub, faster_whisper, scenedetect, librosa; print('Entorno de video listo')"
ffmpeg -version | head -1
