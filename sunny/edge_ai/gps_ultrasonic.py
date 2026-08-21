import time
from typing import Dict, Any, Tuple

class GPSModule:
    """
    NEO-M8N / NEO-6M GPS Receiver Interface
    Parses NMEA $GPRMC and $GPGGA sentences via UART/Serial.
    """

    def __init__(self, port: str = "/dev/ttyAMA0", baudrate: int = 9600):
        self.port = port
        self.baudrate = baudrate
        self.serial_conn = None
        self.is_hardware_available = False
        self._init_serial()

    def _init_serial(self):
        try:
            import serial
            self.serial_conn = serial.Serial(self.port, baudrate=self.baudrate, timeout=1)
            self.is_hardware_available = True
            print(f"[GPSModule] GPS receiver connected on {self.port}.")
        except Exception as e:
            print(f"[GPSModule] Serial port unavailable ({e}). Using GPS simulation mode.")
            self.is_hardware_available = False

    def read_coordinates(self) -> Dict[str, Any]:
        """Returns latitude, longitude, altitude, satellites, and fix status."""
        if self.is_hardware_available and self.serial_conn:
            try:
                line = self.serial_conn.readline().decode('ascii', errors='replace')
                if line.startswith('$GNGGA') or line.startswith('$GPGGA'):
                    parts = line.split(',')
                    if len(parts) > 9 and parts[2] and parts[4]:
                        lat = self._convert_nmea_to_decimal(parts[2], parts[3])
                        lng = self._convert_nmea_to_decimal(parts[4], parts[5])
                        alt = float(parts[9]) if parts[9] else 0.0
                        sats = int(parts[7]) if parts[7] else 0
                        return {
                            "lat": lat,
                            "lng": lng,
                            "alt": alt,
                            "satellites": sats,
                            "fix": int(parts[6]) > 0
                        }
            except Exception as e:
                print(f"[GPSModule] Error reading GPS sentence: {e}")

        # Simulated Disaster Coordinates (Hyderabad / SAR Test Range)
        return {
            "lat": 17.385044,
            "lng": 78.486671,
            "alt": 14.2,
            "satellites": 14,
            "fix": True
        }

    def _convert_nmea_to_decimal(self, raw_coord: str, direction: str) -> float:
        """Converts NMEA DDMM.MMMM to decimal degrees."""
        if not raw_coord:
            return 0.0
        degrees = float(raw_coord[:2])
        minutes = float(raw_coord[2:]) / 60.0
        dec = degrees + minutes
        if direction in ['S', 'W']:
            dec = -dec
        return round(dec, 6)


class UltrasonicSensor:
    """
    HC-SR04 Ultrasonic Distance Sensor Interface
    Measures height above ground (AGL) and obstacle distance (2cm - 400cm).
    """

    def __init__(self, trig_pin: int = 23, echo_pin: int = 24):
        self.trig_pin = trig_pin
        self.echo_pin = echo_pin
        self.is_hardware_available = False
        self._init_gpio()

    def _init_gpio(self):
        try:
            import RPi.GPIO as GPIO
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(self.trig_pin, GPIO.OUT)
            GPIO.setup(self.echo_pin, GPIO.IN)
            GPIO.output(self.trig_pin, False)
            time.sleep(0.1)
            self.is_hardware_available = True
            print("[UltrasonicSensor] HC-SR04 GPIO pins initialized.")
        except Exception as e:
            print(f"[UltrasonicSensor] GPIO unavailable ({e}). Using distance simulation mode.")
            self.is_hardware_available = False

    def measure_distance(self) -> float:
        """Measures distance in meters."""
        if self.is_hardware_available:
            try:
                import RPi.GPIO as GPIO
                GPIO.output(self.trig_pin, True)
                time.sleep(0.00001)
                GPIO.output(self.trig_pin, False)

                pulse_start = time.time()
                pulse_end = time.time()

                while GPIO.input(self.echo_pin) == 0:
                    pulse_start = time.time()

                while GPIO.input(self.echo_pin) == 1:
                    pulse_end = time.time()

                pulse_duration = pulse_end - pulse_start
                # Speed of sound = 343 m/s -> Distance = (time * 343) / 2
                distance_m = (pulse_duration * 343.0) / 2.0
                return round(distance_m, 2)
            except Exception as e:
                print(f"[UltrasonicSensor] Measure error: {e}")

        # Simulated clearance distance
        return 4.8

if __name__ == "__main__":
    gps = GPSModule()
    sonar = UltrasonicSensor()
    print("GPS:", gps.read_coordinates())
    print("Distance:", sonar.measure_distance(), "m")
