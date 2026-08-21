import asyncio
import time
import json
import cv2
import numpy as np
from typing import Dict, Any

from thermal_detector import ThermalDetector
from vision_detector import VisionDetector
from voice_recognizer import VoiceRecognizer
from gps_ultrasonic import GPSModule, UltrasonicSensor
from sensor_fusion import VictimConfidenceEngine

class RescueEyeOnboardController:
    """
    Master Onboard Edge Controller (Raspberry Pi 5 / Jetson Nano)
    Runs concurrent sensor acquisition, edge AI inference pipelines,
    Bayesian multi-modal sensor fusion, and dispatches real-time telemetry to Ground Control.
    """

    def __init__(self, drone_id: str = "UAV-ALPHA-01"):
        self.drone_id = drone_id
        print(f"[RescueEye] Initializing Onboard Subsystems for {drone_id}...")

        self.thermal = ThermalDetector()
        self.vision = VisionDetector()
        self.voice = VoiceRecognizer()
        self.gps = GPSModule()
        self.sonar = UltrasonicSensor()
        self.fusion = VictimConfidenceEngine()

        self.is_running = False
        self.telemetry_history = []

    async def run_detection_cycle(self) -> Dict[str, Any]:
        """
        Executes one full multi-modal detection cycle across all onboard sensors.
        """
        # 1. Thermal Sensing & Heat Blob Analysis
        thermal_res = self.thermal.process_frame()

        # 2. RGB Optical Inference (YOLOv8)
        dummy_rgb_frame = np.zeros((480, 640, 3), dtype=np.uint8)
        vision_res = self.vision.detect(dummy_rgb_frame)

        # 3. Acoustic Processing & Keyword Spotting
        audio_res = self.voice.process_audio_chunk(b"")

        # 4. GPS & Ultrasonic Telemetry
        gps_data = self.gps.read_coordinates()
        distance_m = self.sonar.measure_distance()

        # 5. Bayesian Multi-Modal Sensor Fusion
        fusion_res = self.fusion.calculate_confidence(
            thermal_prob=thermal_res["confidence"],
            audio_prob=audio_res["confidence"] if audio_res["keyword_detected"] else 0.1,
            visual_prob=vision_res["max_confidence"]
        )

        packet = {
            "drone_id": self.drone_id,
            "timestamp": time.time(),
            "telemetry": {
                "gps": gps_data,
                "altitude_agl": distance_m,
                "battery": 84
            },
            "sensor_fusion": fusion_res,
            "modalities": {
                "thermal": {
                    "max_temp": thermal_res["max_temp"],
                    "target_temp": thermal_res["target_temp"],
                    "confidence": thermal_res["confidence"]
                },
                "acoustic": {
                    "keyword": audio_res.get("keyword", "NONE"),
                    "confidence": audio_res["confidence"],
                    "db": audio_res["db_level"]
                },
                "vision": {
                    "detected_classes": [d["class"] for d in vision_res["detections"]],
                    "confidence": vision_res["max_confidence"]
                }
            }
        }

        if fusion_res["alert_triggered"]:
            print(f"[RESCUE ALERT] Survivor detected with {fusion_res['confidence_percent']}% confidence at GPS: {gps_data['lat']}, {gps_data['lng']}")

        return packet

    async def start_patrol_loop(self, interval_sec: float = 0.5):
        """Continuous edge autonomous monitoring loop."""
        self.is_running = True
        print("[RescueEye] Autonomous search-and-rescue patrol started.")
        while self.is_running:
            packet = await self.run_detection_cycle()
            self.telemetry_history.append(packet)
            await asyncio.sleep(interval_sec)

if __name__ == "__main__":
    controller = RescueEyeOnboardController()
    asyncio.run(controller.start_patrol_loop())
