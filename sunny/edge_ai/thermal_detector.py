import numpy as np
import cv2
from typing import Tuple, Optional, Dict, Any

class ThermalDetector:
    """
    Thermal Camera Interface & Human Heat Signature Detector
    Supports MLX90640 32x24 I2C sensor or FLIR Lepton via SPI/I2C.
    Extracts heat maps and isolates human body temperatures (30°C - 40°C).
    """

    def __init__(self, i2c_bus: int = 1, fps: int = 16, min_human_temp: float = 30.0, max_human_temp: float = 40.0):
        self.i2c_bus = i2c_bus
        self.fps = fps
        self.min_human_temp = min_human_temp
        self.max_human_temp = max_human_temp
        self.raw_shape = (24, 32)
        self.upscaled_shape = (240, 320)
        self.is_hardware_available = False
        
        self._init_sensor()

    def _init_sensor(self):
        """Attempts to initialize hardware MLX90640 sensor; falls back to simulation mode."""
        try:
            import board
            import busio
            import adafruit_mlx90640
            i2c = busio.I2C(board.SCL, board.SDA, frequency=800000)
            self.mlx = adafruit_mlx90640.MLX90640(i2c)
            self.mlx.refresh_rate = adafruit_mlx90640.RefreshRate.REFRESH_16_HZ
            self.frame_buffer = [0] * 768
            self.is_hardware_available = True
            print("[ThermalDetector] MLX90640 hardware initialized successfully.")
        except Exception as e:
            print(f"[ThermalDetector] Hardware sensor not found ({e}). Running in simulation mode.")
            self.is_hardware_available = False

    def capture_temperature_matrix(self) -> np.ndarray:
        """Captures 32x24 temperature matrix in Celsius."""
        if self.is_hardware_available:
            try:
                self.mlx.getFrame(self.frame_buffer)
                return np.array(self.frame_buffer).reshape(self.raw_shape)
            except Exception as e:
                print(f"[ThermalDetector] Frame read error: {e}")
        
        # Synthetic Thermal Frame Simulation
        ambient = 19.5 + np.random.normal(0, 0.4, self.raw_shape)
        # Synthetic human heat signature in center
        cy, cx = 12, 16
        for y in range(self.raw_shape[0]):
            for x in range(self.raw_shape[1]):
                dist = np.sqrt((y - cy)**2 + (x - cx)**2)
                if dist < 5:
                    ambient[y, x] += (36.8 - ambient[y, x]) * (1 - dist / 5)
        return ambient

    def process_frame(self, temp_matrix: Optional[np.ndarray] = None) -> Dict[str, Any]:
        """
        Analyzes thermal matrix, finds human heat clusters, and returns detection metadata.
        """
        if temp_matrix is None:
            temp_matrix = self.capture_temperature_matrix()

        # Bilinear interpolation upscale for high resolution heat mapping
        upscaled_temp = cv2.resize(temp_matrix, (self.upscaled_shape[1], self.upscaled_shape[0]), interpolation=cv2.INTER_CUBIC)
        
        # Filter for human temperature range (30°C - 40°C)
        human_mask = np.zeros_like(upscaled_temp, dtype=np.uint8)
        human_mask[(upscaled_temp >= self.min_human_temp) & (upscaled_temp <= self.max_human_temp)] = 255

        # Morphological filtering to clean noise
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        cleaned_mask = cv2.morphologyEx(human_mask, cv2.MORPH_CLOSE, kernel)

        # Find contours of heat blobs
        contours, _ = cv2.findContours(cleaned_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        max_temp = float(np.max(temp_matrix))
        min_temp = float(np.min(temp_matrix))
        detected_blobs = []

        confidence = 0.0
        target_temp = 0.0

        for cnt in contours:
            area = cv2.contourArea(cnt)
            if area > 400: # Significant heat blob
                x, y, w, h = cv2.boundingRect(cnt)
                roi = upscaled_temp[y:y+h, x:x+w]
                blob_max_temp = float(np.max(roi))
                blob_avg_temp = float(np.mean(roi))
                
                # Confidence based on closeness to 36.6°C
                temp_diff = abs(blob_avg_temp - 36.6)
                blob_conf = max(0.0, min(1.0, 1.0 - (temp_diff / 5.0)))

                if blob_conf > confidence:
                    confidence = blob_conf
                    target_temp = blob_max_temp

                detected_blobs.append({
                    "bbox": [int(x), int(y), int(w), int(h)],
                    "max_temp": round(blob_max_temp, 2),
                    "avg_temp": round(blob_avg_temp, 2),
                    "confidence": round(blob_conf, 3)
                })

        # Generate false-color Ironbow heatmap representation
        normalized = np.clip((upscaled_temp - min_temp) / (max_temp - min_temp + 1e-5) * 255, 0, 255).astype(np.uint8)
        colored_heatmap = cv2.applyColorMap(normalized, cv2.COLORMAP_INFERNO)

        return {
            "max_temp": round(max_temp, 2),
            "min_temp": round(min_temp, 2),
            "target_temp": round(target_temp, 2),
            "confidence": round(confidence, 3),
            "human_detected": confidence > 0.65,
            "blobs": detected_blobs,
            "heatmap_image": colored_heatmap
        }

if __name__ == "__main__":
    detector = ThermalDetector()
    result = detector.process_frame()
    print(f"Thermal Scan -> Human Detected: {result['human_detected']}, Max Temp: {result['max_temp']}°C, Conf: {result['confidence']}")
