from typing import Dict, Any

class VictimConfidenceEngine:
    """
    Multi-Modal Sensor Fusion Engine
    Combines Thermal (40%), Acoustic (30%), and RGB Visual (30%) probabilities
    to compute an aggregated victim confidence score and trigger rescue alerts.
    """

    def __init__(self, w_thermal: float = 0.40, w_audio: float = 0.30, w_visual: float = 0.30, alert_threshold: float = 0.80):
        self.w_thermal = w_thermal
        self.w_audio = w_audio
        self.w_visual = w_visual
        self.alert_threshold = alert_threshold

    def calculate_confidence(self, thermal_prob: float, audio_prob: float, visual_prob: float) -> Dict[str, Any]:
        """
        Computes weighted probability score and assigns triage priority.
        """
        # Clamped probability fusion
        t_p = max(0.0, min(1.0, thermal_prob))
        a_p = max(0.0, min(1.0, audio_prob))
        v_p = max(0.0, min(1.0, visual_prob))

        total_confidence = (self.w_thermal * t_p) + (self.w_audio * a_p) + (self.w_visual * v_p)
        total_confidence = round(total_confidence, 4)

        # Triage Level Assignment
        if total_confidence >= 0.85:
            triage = "CRITICAL"
        elif total_confidence >= 0.70:
            triage = "HIGH"
        elif total_confidence >= 0.50:
            triage = "MODERATE"
        else:
            triage = "LOW"

        is_alert_triggered = total_confidence >= self.alert_threshold

        return {
            "confidence_score": total_confidence,
            "confidence_percent": round(total_confidence * 100, 1),
            "triage_priority": triage,
            "alert_triggered": is_alert_triggered,
            "modality_breakdown": {
                "thermal_contribution": round(self.w_thermal * t_p, 3),
                "audio_contribution": round(self.w_audio * a_p, 3),
                "visual_contribution": round(self.w_visual * v_p, 3)
            }
        }

if __name__ == "__main__":
    engine = VictimConfidenceEngine()
    score = engine.calculate_confidence(thermal_prob=0.96, audio_prob=0.92, visual_prob=0.95)
    print("Sensor Fusion Result:", score)
