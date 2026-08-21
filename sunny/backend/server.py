import asyncio
import json
import time
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI(title="RescueEye Ground Station API", version="2.4.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active connected web client sockets
connected_clients = []

@app.get("/api/health")
async def health_check():
    return {
        "status": "online",
        "system": "RescueEye DVI Mission Control",
        "version": "2.4.0",
        "active_drones": ["UAV-ALPHA-01"],
        "timestamp": time.time()
    }

@app.get("/api/victims")
async def get_active_victims():
    return {
        "count": 3,
        "victims": [
            {
                "id": "VIC-EQ-01",
                "name": "Survivor trapped under concrete slab",
                "lat": 17.3853,
                "lng": 78.4871,
                "temp": 36.8,
                "keyword": "HELP",
                "confidence": 0.94,
                "triage": "CRITICAL",
                "depth": "1.2m under debris"
            },
            {
                "id": "VIC-EQ-02",
                "name": "Trapped in ground floor void",
                "lat": 17.3847,
                "lng": 78.4862,
                "temp": 36.2,
                "keyword": "SAVE ME",
                "confidence": 0.88,
                "triage": "HIGH",
                "depth": "Surface debris"
            },
            {
                "id": "VIC-EQ-03",
                "name": "Thermal signature detected in rubble pocket",
                "lat": 17.3856,
                "lng": 78.4864,
                "temp": 35.8,
                "keyword": "SOS",
                "confidence": 0.80,
                "triage": "MODERATE",
                "depth": "2.4m under beam"
            }
        ]
    }

@app.websocket("/ws/telemetry")
async def websocket_telemetry_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    print(f"[WebSocket] Ground station client connected. Total: {len(connected_clients)}")
    try:
        while True:
            # Simulate real-time 10Hz telemetry stream
            telemetry_packet = {
                "drone_id": "UAV-ALPHA-01",
                "gps": {
                    "lat": 17.3850 + (time.time() % 100) * 0.00001,
                    "lng": 78.4867 + (time.time() % 100) * 0.00001,
                    "alt": 14.2
                },
                "battery": 84,
                "thermal_temp": 36.8,
                "acoustic_keyword": "HELP",
                "visual_class": "Human Body",
                "sensor_fusion_confidence": 0.94,
                "timestamp": time.time()
            }
            await websocket.send_text(json.dumps(telemetry_packet))
            await asyncio.sleep(0.2)
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
        print("[WebSocket] Ground station client disconnected.")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
