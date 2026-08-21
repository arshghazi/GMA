/**
 * RESCUEEYE — SATELLITE-CONNECTED DISASTER INTELLIGENCE PLATFORM
 * Core Engine: Space-to-Ground Orchestration, Multi-UAV Swarm Navigation,
 * 7-Layer Tactical GIS Map, Multi-Modal Bayesian Sensor Fusion,
 * Resilient Satellite Comms Failover, and 60-Second Cinematic Director.
 *
 * Engineered by Solution Conquerors (Founded by Ghazi Mohammad Arsh)
 */

// ============================================================================
// 1. STATE & GLOBAL MISSION CONFIGURATION
// ============================================================================
const RescueEye = {
  activeView: 'tactical-hud',
  activeScenario: 'earthquake',
  selectedUav: 'UAV-01',
  thermalPalette: 'ironbow',
  audioMicActive: false,
  networkBlackout: false,
  activeLayerFilters: {
    satellite: true,
    damage: true,
    drones: true,
    victims: true,
    rescueteams: true,
    medical: true,
    comms: true
  },
  
  // Swarm UAV Fleet Definitions
  swarm: {
    'UAV-01': {
      id: 'UAV-ALPHA-01',
      name: 'UAV-01 (Alpha Lead)',
      role: 'Multi-Sensor SAR Lead (FLIR + RGB + Sonar + UWB)',
      sector: 'Sector A',
      status: 'SEARCHING',
      battery: 84,
      alt: 14.2,
      speed: 4.6,
      lat: 17.3853,
      lng: 78.4871,
      heading: 142,
      pitch: 2.1,
      roll: -1.4,
      pattern: 'lawnmower',
      targetVictimId: 'VIC-EQ-01',
      color: '#00f0ff'
    },
    'UAV-02': {
      id: 'UAV-BRAVO-02',
      name: 'UAV-02 (Bravo Flood)',
      role: 'Flood & Multispectral SAR (5-Band + RGB Zoom)',
      sector: 'Sector B',
      status: 'PATROL',
      battery: 79,
      alt: 18.5,
      speed: 5.2,
      lat: 17.3875,
      lng: 78.4895,
      heading: 95,
      pitch: 1.0,
      roll: 0.5,
      pattern: 'crevice',
      targetVictimId: 'VIC-EQ-02',
      color: '#ffb703'
    },
    'UAV-03': {
      id: 'UAV-CHARLIE-03',
      name: 'UAV-03 (Charlie Acoustic)',
      role: 'Acoustic Rubble Recon (4-Mic Array + DSP)',
      sector: 'Sector C',
      status: 'HOVERING',
      battery: 68,
      alt: 8.0,
      speed: 0.0,
      lat: 17.3832,
      lng: 78.4850,
      heading: 270,
      pitch: 0.2,
      roll: -0.1,
      pattern: 'acoustic-grid',
      targetVictimId: 'VIC-EQ-03',
      color: '#00f0ff'
    },
    'UAV-04': {
      id: 'UAV-DELTA-04',
      name: 'UAV-04 (Delta LiDAR)',
      role: 'Infrastructure LiDAR & Access Recon (LiDAR + 4K)',
      sector: 'Sector D',
      status: 'SURVEYING',
      battery: 91,
      alt: 24.0,
      speed: 6.0,
      lat: 17.3815,
      lng: 78.4890,
      heading: 45,
      pitch: 3.2,
      roll: 1.1,
      pattern: 'corridor',
      targetVictimId: null,
      color: '#00ff88'
    }
  },

  // Rescue Ground Teams
  rescueTeams: [
    {
      id: 'RT-07',
      name: 'Alpha Urban SAR Team (RT-07)',
      status: 'APPROACHING',
      lat: 17.3846,
      lng: 78.4864,
      targetVictimId: 'VIC-EQ-01',
      distanceM: 82,
      eta: '1m 40s',
      personnel: 6,
      vehicle: 'Heavy SAR Extraction Truck + Canine Unit'
    },
    {
      id: 'RT-02',
      name: 'Bravo Flood Extraction (RT-02)',
      status: 'STAGED',
      lat: 17.3820,
      lng: 78.4840,
      targetVictimId: null,
      distanceM: 420,
      eta: '6m 15s',
      personnel: 4,
      vehicle: 'Amphibious Rescue Craft'
    }
  ],

  // Scenarios with Multi-Layer GIS Features
  scenarios: {
    earthquake: {
      name: 'Earthquake Rubble (City Core - 24.8 km²)',
      center: [17.3850, 78.4867],
      zoom: 17,
      disasterType: 'EARTHQUAKE M7.8',
      areaKm2: '24.8 km²',
      severity: 'CRITICAL',
      groundAccess: 'LIMITED (BRIDGES COLLAPSED)',
      sectors: [
        { id: 'A', name: 'Sector A (Critical)', color: '#ff2a55', bounds: [[17.3840, 78.4855], [17.3865, 78.4885]], hazard: 'High-density collapsed concrete structures' },
        { id: 'B', name: 'Sector B (High)', color: '#ffb703', bounds: [[17.3865, 78.4880], [17.3890, 78.4910]], hazard: 'Isolated residential pocket • Flood ingress' },
        { id: 'C', name: 'Sector C (High)', color: '#ffb703', bounds: [[17.3820, 78.4835], [17.3845, 78.4865]], hazard: 'Submerged commercial rubble voids' },
        { id: 'D', name: 'Sector D (Moderate)', color: '#00ff88', bounds: [[17.3805, 78.4870], [17.3830, 78.4905]], hazard: 'Passable corridor • Infrastructure recon' }
      ],
      victims: [
        {
          id: 'VIC-EQ-01',
          caseNumber: '#RX-00127',
          name: 'Survivor trapped under 1.2m concrete floor slab',
          sector: 'Sector A-07',
          lat: 17.3853,
          lng: 78.4871,
          temp: 36.8,
          keyword: 'HELP',
          visualClass: 'Human Torso & Waving Arm',
          visualProb: 0.95,
          audioProb: 0.93,
          thermalProb: 0.91,
          radarProb: 0.88,
          respirationBpm: 14,
          pulseBpm: 76,
          triage: 'critical',
          time: '08:34:02 UTC',
          depth: '1.2m under concrete rubble',
          dispatched: true,
          assignedTeam: 'RT-07'
        },
        {
          id: 'VIC-EQ-02',
          caseNumber: '#RX-00128',
          name: 'Trapped in ground-floor void behind collapsed stairwell',
          sector: 'Sector B-12',
          lat: 17.3878,
          lng: 78.4897,
          temp: 36.4,
          keyword: 'SAVE ME',
          visualClass: 'Human Head & Face',
          visualProb: 0.88,
          audioProb: 0.85,
          thermalProb: 0.89,
          radarProb: 0.82,
          respirationBpm: 16,
          pulseBpm: 82,
          triage: 'high',
          time: '08:29:15 UTC',
          depth: '0.8m under masonry',
          dispatched: false,
          assignedTeam: null
        },
        {
          id: 'VIC-EQ-03',
          caseNumber: '#RX-00129',
          name: 'Acoustic knocking detected in basement shelter pocket',
          sector: 'Sector C-04',
          lat: 17.3835,
          lng: 78.4852,
          temp: 35.9,
          keyword: 'KNOCKING / SOS',
          visualClass: 'Occluded Void',
          visualProb: 0.65,
          audioProb: 0.94,
          thermalProb: 0.86,
          radarProb: 0.90,
          respirationBpm: 12,
          pulseBpm: 70,
          triage: 'high',
          time: '08:22:40 UTC',
          depth: '2.4m under steel beam',
          dispatched: false,
          assignedTeam: null
        }
      ],
      medicalFacilities: [
        { name: 'City Trauma Center Alpha', lat: 17.3885, lng: 78.4840, type: 'hospital', beds: 42 },
        { name: 'Emergency Triage Field Staging LZ-01', lat: 17.3810, lng: 78.4860, type: 'staging', beds: 100 }
      ]
    },

    landslide: {
      name: 'Mountain Landslide (Sector B / Isolated)',
      center: [30.1234, 79.2345],
      zoom: 17,
      disasterType: 'MASSIVE LANDSLIDE',
      areaKm2: '16.4 km²',
      severity: 'CRITICAL',
      groundAccess: 'BLOCKED BY DEBRIS FLOW',
      sectors: [
        { id: 'A', name: 'Sector A (Slide Zone)', color: '#ff2a55', bounds: [[30.1220, 79.2330], [30.1245, 79.2360]], hazard: 'Active mudflow & unstable slope' },
        { id: 'B', name: 'Sector B (Isolated Valley)', color: '#ffb703', bounds: [[30.1245, 79.2355], [30.1270, 79.2385]], hazard: '300 villagers stranded across severed bridge' }
      ],
      victims: [
        {
          id: 'VIC-LS-01',
          caseNumber: '#RX-00130',
          name: 'Survivor pinned under fallen trees and clay mud',
          sector: 'Sector A-02',
          lat: 30.1237,
          lng: 79.2348,
          temp: 36.5,
          keyword: 'HELP',
          visualClass: 'Upper Torso',
          visualProb: 0.91,
          audioProb: 0.90,
          thermalProb: 0.93,
          radarProb: 0.85,
          respirationBpm: 15,
          pulseBpm: 78,
          triage: 'critical',
          time: '08:18:20 UTC',
          depth: '0.6m mud pocket',
          dispatched: false,
          assignedTeam: null
        }
      ],
      medicalFacilities: [
        { name: 'Valley Base Heli-Med Evac Point', lat: 30.1210, lng: 79.2320, type: 'staging', beds: 20 }
      ]
    },

    flood: {
      name: 'River Flash Flood (Submerged Residential)',
      center: [25.5941, 85.1376],
      zoom: 17,
      disasterType: 'FLASH FLOOD INUNDATION',
      areaKm2: '38.2 km²',
      severity: 'HIGH',
      groundAccess: 'AMPHIBIOUS ONLY',
      sectors: [
        { id: 'A', name: 'Sector A (Submerged Core)', color: '#ff2a55', bounds: [[25.5925, 85.1360], [25.5955, 85.1390]], hazard: 'Water depth 2.5m • Current 1.8 m/s' }
      ],
      victims: [
        {
          id: 'VIC-FL-01',
          caseNumber: '#RX-00131',
          name: 'Family of 3 stranded on submerged rooftop',
          sector: 'Sector A-01',
          lat: 25.5945,
          lng: 85.1380,
          temp: 36.7,
          keyword: 'SAVE US',
          visualClass: '3 Humans Waving Fabric',
          visualProb: 0.97,
          audioProb: 0.92,
          thermalProb: 0.94,
          radarProb: 0.75,
          respirationBpm: 18,
          pulseBpm: 88,
          triage: 'critical',
          time: '08:12:00 UTC',
          depth: 'Rooftop level (Water 2.4m below)',
          dispatched: false,
          assignedTeam: null
        }
      ],
      medicalFacilities: [
        { name: 'State Flood Relief Boat Hub', lat: 25.5910, lng: 85.1340, type: 'staging', beds: 50 }
      ]
    },

    wildfire: {
      name: 'Wildfire Complex (Evacuation Perimeter)',
      center: [37.7749, -122.4194],
      zoom: 17,
      disasterType: 'URBAN INTERFACE WILDFIRE',
      areaKm2: '45.0 km²',
      severity: 'CRITICAL',
      groundAccess: 'RESTRICTED BY FLAME PERIMETER',
      sectors: [
        { id: 'A', name: 'Sector A (Flank)', color: '#ff2a55', bounds: [[37.7735, -122.4210], [37.7765, -122.4180]], hazard: 'Rapid flame front • Heavy smoke obscurement' }
      ],
      victims: [
        {
          id: 'VIC-WF-01',
          caseNumber: '#RX-00132',
          name: 'Individual trapped in concrete storm shelter',
          sector: 'Sector A-03',
          lat: 37.7752,
          lng: -122.4190,
          temp: 37.1,
          keyword: 'HELP',
          visualClass: 'Smoke Occluded Heat Body',
          visualProb: 0.70,
          audioProb: 0.91,
          thermalProb: 0.98,
          radarProb: 0.89,
          respirationBpm: 20,
          pulseBpm: 94,
          triage: 'critical',
          time: '08:05:00 UTC',
          depth: 'Inside bunker',
          dispatched: false,
          assignedTeam: null
        }
      ],
      medicalFacilities: [
        { name: 'Evacuation Staging Camp', lat: 37.7720, lng: -122.4230, type: 'staging', beds: 120 }
      ]
    }
  },

  // Global Disasters Feed
  globalDisasters: [
    { id: 'GD-01', type: 'EARTHQUAKE M7.8', location: 'Turkey-Syria Border (Kahramanmaraş)', area: '24.8 km²', severity: 'CRITICAL', uavs: 4, survivors: 7, status: 'ACTIVE RESPONSE' },
    { id: 'GD-02', type: 'LANDSLIDE', location: 'Wayanad Ghats, India', area: '16.4 km²', severity: 'CRITICAL', uavs: 2, survivors: 3, status: 'RECON' },
    { id: 'GD-03', type: 'FLASH FLOOD', location: 'Patna River Basin, India', area: '38.2 km²', severity: 'HIGH', uavs: 3, survivors: 12, status: 'ACTIVE RESPONSE' },
    { id: 'GD-04', type: 'WILDFIRE COMPLEX', location: 'Maui Interface, Hawaii', area: '45.0 km²', severity: 'CRITICAL', uavs: 4, survivors: 2, status: 'PERIMETER SCAN' },
    { id: 'GD-05', type: 'TROPICAL CYCLONE', location: 'Bay of Bengal Coastal Zone', area: '92.0 km²', severity: 'HIGH', uavs: 6, survivors: 19, status: 'MONITORING' }
  ],

  // Cinematic Simulation State
  cinema: {
    isPlaying: false,
    timerSeconds: 0,
    speed: 2,
    intervalId: null,
    totalSeconds: 60
  }
};

// ============================================================================
// 2. AUDIO SYNTHESIS & DSP ACOUSTIC FILTER ENGINE (Web Audio API)
// ============================================================================
const AudioEngine = {
  ctx: null,
  analyser: null,
  micStream: null,
  sirenOsc: null,
  isSirenActive: false,

  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
      }
    } catch (e) {
      console.warn('Web Audio API not supported on this browser context', e);
    }
  },

  playAlertBeep(freq = 880, duration = 0.15, type = 'sine') {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn(e);
    }
  },

  toggleEmergencySiren() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.isSirenActive) {
      if (this.sirenOsc) {
        try { this.sirenOsc.stop(); } catch(e){}
        this.sirenOsc = null;
      }
      this.isSirenActive = false;
      const sirenBtn = document.getElementById('btn-emergency-siren');
      if (sirenBtn) sirenBtn.innerHTML = '<i data-lucide="bell-ring"></i> Audio Alert';
      if (window.lucide) lucide.createIcons();
    } else {
      this.isSirenActive = true;
      const sirenBtn = document.getElementById('btn-emergency-siren');
      if (sirenBtn) sirenBtn.innerHTML = '<i data-lucide="bell-off"></i> Silence Alert';
      if (window.lucide) lucide.createIcons();

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        
        // Siren frequency modulation
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.8);
        osc.frequency.linearRampToValueAtTime(400, now + 1.6);
        
        gain.gain.setValueAtTime(0.1, now);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        this.sirenOsc = osc;

        setTimeout(() => {
          if (this.isSirenActive) this.toggleEmergencySiren();
        }, 4000);
      } catch (e) {
        console.warn(e);
      }
    }
  },

  async toggleLiveMicrophone() {
    if (!this.ctx) this.init();
    const micBtnText = document.getElementById('mic-btn-text');

    if (RescueEye.audioMicActive) {
      if (this.micStream) {
        this.micStream.getTracks().forEach(t => t.stop());
        this.micStream = null;
      }
      RescueEye.audioMicActive = false;
      if (micBtnText) micBtnText.innerText = 'Live Mic';
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.micStream = stream;
        const source = this.ctx.createMediaStreamSource(stream);
        
        // DSP High-Pass and Notch Filter to simulate propeller rotor cancellation
        const filterHigh = this.ctx.createBiquadFilter();
        filterHigh.type = 'highpass';
        filterHigh.frequency.setValueAtTime(150, this.ctx.currentTime);

        const filterNotch = this.ctx.createBiquadFilter();
        filterNotch.type = 'notch';
        filterNotch.frequency.setValueAtTime(400, this.ctx.currentTime);
        filterNotch.Q.setValueAtTime(5, this.ctx.currentTime);

        source.connect(filterHigh);
        filterHigh.connect(filterNotch);
        filterNotch.connect(this.analyser);

        RescueEye.audioMicActive = true;
        if (micBtnText) micBtnText.innerText = 'Stop Mic (DSP ON)';
      } catch (err) {
        alert('Microphone access not available. Simulating synthetic microphone DSP stream.');
        RescueEye.audioMicActive = false;
      }
    }
  }
};

// ============================================================================
// 3. TACTICAL GIS LEAFLET MAP ENGINE (7 LAYERS)
// ============================================================================
const MapEngine = {
  map: null,
  layers: {
    satellite: null,
    damage: null,
    drones: null,
    victims: null,
    rescueteams: null,
    medical: null,
    comms: null
  },
  droneMarkers: {},
  rescueMarkers: {},
  victimMarkers: {},

  init() {
    const mapContainer = document.getElementById('mission-map');
    if (!mapContainer || !window.L) return;

    const currentScenario = RescueEye.scenarios[RescueEye.activeScenario];
    this.map = L.map('mission-map', {
      center: currentScenario.center,
      zoom: currentScenario.zoom,
      zoomControl: false,
      attributionControl: false
    });

    // Dark Basemap Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd'
    }).addTo(this.map);

    // Initialize Feature Layer Groups
    Object.keys(this.layers).forEach(key => {
      this.layers[key] = L.layerGroup().addTo(this.map);
    });

    this.renderScenarioData();
  },

  renderScenarioData() {
    if (!this.map) return;
    const scen = RescueEye.scenarios[RescueEye.activeScenario];
    this.map.setView(scen.center, scen.zoom);

    // Clear all layers
    Object.keys(this.layers).forEach(k => this.layers[k].clearLayers());
    this.droneMarkers = {};
    this.rescueMarkers = {};
    this.victimMarkers = {};

    // 1. SATELLITE SAR LAYER: Outer bounding box with radar scan texture
    if (scen.sectors && scen.sectors.length > 0) {
      const allBounds = scen.sectors.map(s => s.bounds);
      const satOuter = L.polygon([
        [scen.center[0] - 0.007, scen.center[1] - 0.008],
        [scen.center[0] + 0.007, scen.center[1] - 0.008],
        [scen.center[0] + 0.007, scen.center[1] + 0.008],
        [scen.center[0] - 0.007, scen.center[1] + 0.008]
      ], {
        color: '#00f0ff',
        weight: 1.5,
        dashArray: '6, 6',
        fillColor: '#00f0ff',
        fillOpacity: 0.04
      });
      this.layers.satellite.addLayer(satOuter);
    }

    // 2. AI DAMAGE & SECTOR POLYGONS
    if (scen.sectors) {
      scen.sectors.forEach(sec => {
        const poly = L.polygon(sec.bounds, {
          color: sec.color,
          weight: 2,
          fillColor: sec.color,
          fillOpacity: 0.15
        }).bindTooltip(`<strong>${sec.name}</strong><br>${sec.hazard}`, { sticky: true, className: 'map-custom-tooltip' });
        this.layers.damage.addLayer(poly);
      });
    }

    // 3. DRONE SWARM MARKERS & FOV CONES
    Object.keys(RescueEye.swarm).forEach(key => {
      const uav = RescueEye.swarm[key];
      const droneIcon = L.divIcon({
        className: 'drone-map-icon',
        html: `
          <div style="background: ${uav.color}; width: 28px; height: 28px; border-radius: 50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow: 0 0 12px ${uav.color};">
            <span style="font-family:'JetBrains Mono'; font-weight:800; font-size:10px; color:#000;">${key.replace('UAV-','')}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([uav.lat, uav.lng], { icon: droneIcon })
        .bindPopup(`<strong>${uav.id} (${uav.name})</strong><br>Role: ${uav.role}<br>Alt: ${uav.alt}m | Battery: ${uav.battery}%`)
        .on('click', () => {
          RescueEye.selectedUav = key;
          const uavSelect = document.getElementById('uav-feed-select');
          if (uavSelect) uavSelect.value = key;
          App.updateTelemetryUI();
        });

      // Drone Field-of-View Search Circle
      const fovCircle = L.circle([uav.lat, uav.lng], {
        radius: 35,
        color: uav.color,
        weight: 1,
        fillColor: uav.color,
        fillOpacity: 0.12,
        dashArray: '3, 4'
      });

      this.droneMarkers[key] = { marker, fovCircle };
      this.layers.drones.addLayer(marker);
      this.layers.drones.addLayer(fovCircle);
    });

    // 4. VICTIM DETECTION MARKERS
    if (scen.victims) {
      scen.victims.forEach(v => {
        const vIcon = L.divIcon({
          className: 'victim-map-icon',
          html: `
            <div style="background: #ff2a55; width: 24px; height: 24px; border-radius: 50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; animation: pulseGlow 1.5s infinite ease-in-out; box-shadow: 0 0 15px rgba(255,42,85,0.9);">
              <span style="color:#fff; font-size:12px; font-weight:bold;">🚨</span>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const vMarker = L.marker([v.lat, v.lng], { icon: vIcon })
          .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; font-size:12px;">
              <strong style="color:#ff2a55;">${v.caseNumber} - ${v.id}</strong><br>
              <strong>Description:</strong> ${v.name}<br>
              <strong>Depth:</strong> ${v.depth}<br>
              <strong>Temp:</strong> ${v.temp}°C | <strong>Keyword:</strong> "${v.keyword}"<br>
              <strong>GPS:</strong> ${v.lat.toFixed(6)}° N, ${v.lng.toFixed(6)}° E<br>
              <button onclick="App.openVictimModal('${v.id}')" style="background:#00f0ff; color:#000; border:none; padding:4px 8px; border-radius:4px; font-weight:700; cursor:pointer; margin-top:6px;">View Full Dossier</button>
            </div>
          `);

        this.victimMarkers[v.id] = vMarker;
        this.layers.victims.addLayer(vMarker);
      });
    }

    // 5. RESCUE TEAMS MARKERS
    RescueEye.rescueTeams.forEach(rt => {
      const rtIcon = L.divIcon({
        className: 'rescue-map-icon',
        html: `
          <div style="background: #ffb703; width: 26px; height: 26px; border-radius: 6px; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow: 0 0 10px rgba(255,183,3,0.8);">
            <span style="color:#000; font-weight:900; font-size:12px;">🚒</span>
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const rtMarker = L.marker([rt.lat, rt.lng], { icon: rtIcon })
        .bindPopup(`<strong>${rt.name}</strong><br>Status: ${rt.status}<br>Assigned Target: ${rt.targetVictimId || 'Standby'}<br>ETA: ${rt.eta}`);

      this.rescueMarkers[rt.id] = rtMarker;
      this.layers.rescueteams.addLayer(rtMarker);

      // Line connecting rescue team to victim
      if (rt.targetVictimId) {
        const victim = scen.victims.find(v => v.id === rt.targetVictimId);
        if (victim) {
          const navLine = L.polyline([[rt.lat, rt.lng], [victim.lat, victim.lng]], {
            color: '#ffb703',
            weight: 2.5,
            dashArray: '5, 8'
          });
          this.layers.rescueteams.addLayer(navLine);
        }
      }
    });

    // 6. MEDICAL & STAGING FACILITIES
    if (scen.medicalFacilities) {
      scen.medicalFacilities.forEach(m => {
        const medIcon = L.divIcon({
          className: 'med-map-icon',
          html: `
            <div style="background: #00ff88; width: 22px; height: 22px; border-radius: 4px; display:flex; align-items:center; justify-content:center; border:1.5px solid #fff; box-shadow: 0 0 8px rgba(0,255,136,0.6);">
              <span style="color:#000; font-weight:900; font-size:11px;">🏥</span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const mMarker = L.marker([m.lat, m.lng], { icon: medIcon })
          .bindPopup(`<strong>${m.name}</strong><br>Type: ${m.type.toUpperCase()}<br>Capacity: ${m.beds} emergency beds`);
        this.layers.medical.addLayer(mMarker);
      });
    }

    // 7. SATELLITE & COMMS MESH FOOTPRINT
    const commsBeam = L.circle(scen.center, {
      radius: 550,
      color: '#a855f7',
      weight: 1,
      fillColor: '#a855f7',
      fillOpacity: 0.05,
      dashArray: '8, 8'
    }).bindTooltip('Satellite L-Band Orbital Beam Footprint (Iridium SV-104 Relay)', { sticky: true });
    this.layers.comms.addLayer(commsBeam);
  },

  toggleLayer(layerName) {
    if (!this.map || !this.layers[layerName]) return;
    const currentState = RescueEye.activeLayerFilters[layerName];
    if (currentState) {
      this.map.removeLayer(this.layers[layerName]);
      RescueEye.activeLayerFilters[layerName] = false;
    } else {
      this.map.addLayer(this.layers[layerName]);
      RescueEye.activeLayerFilters[layerName] = true;
    }
  },

  updateDroneCoordinates(uavKey, newLat, newLng) {
    if (this.droneMarkers[uavKey]) {
      this.droneMarkers[uavKey].marker.setLatLng([newLat, newLng]);
      this.droneMarkers[uavKey].fovCircle.setLatLng([newLat, newLng]);
    }
  }
};

// ============================================================================
// 4. SENSOR CANVAS RENDERERS (FLIR, YOLOv8, AUDIO, UWB RADAR, SAT SAR)
// ============================================================================
const CanvasRenderers = {
  thermalCanvas: null,
  rgbCanvas: null,
  audioCanvas: null,
  uwbCanvas: null,
  satCanvas: null,
  cinemaCanvas: null,
  animationFrameId: null,
  tick: 0,

  init() {
    this.thermalCanvas = document.getElementById('thermal-canvas');
    this.rgbCanvas = document.getElementById('rgb-canvas');
    this.audioCanvas = document.getElementById('audio-visualizer-canvas');
    this.uwbCanvas = document.getElementById('uwb-canvas');
    this.satCanvas = document.getElementById('sat-imagery-canvas');
    this.cinemaCanvas = document.getElementById('cinematic-canvas');

    this.startRenderLoop();
  },

  startRenderLoop() {
    const loop = () => {
      this.tick++;
      this.renderThermal();
      this.renderRgb();
      this.renderAudio();
      this.renderUwb();
      this.renderSatImagery();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  },

  // 1. FLIR MLX90640 Thermal IR Simulation
  renderThermal() {
    if (!this.thermalCanvas) return;
    const ctx = this.thermalCanvas.getContext('2d');
    const w = this.thermalCanvas.width;
    const h = this.thermalCanvas.height;

    // Ambient cold background
    ctx.fillStyle = '#060818';
    ctx.fillRect(0, 0, w, h);

    // Debris noise artifacts
    for (let i = 0; i < 24; i++) {
      const x = (Math.sin(i * 99 + this.tick * 0.02) * 0.5 + 0.5) * w;
      const y = (Math.cos(i * 33 + this.tick * 0.01) * 0.5 + 0.5) * h;
      const rad = 20 + (i % 15);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
      grad.addColorStop(0, 'rgba(30, 45, 90, 0.4)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hot Survivor Heat Blob at center (36.8°C)
    const targetX = w / 2 + Math.sin(this.tick * 0.03) * 8;
    const targetY = h / 2 + Math.cos(this.tick * 0.02) * 5;

    const heatGrad = ctx.createRadialGradient(targetX, targetY, 2, targetX, targetY, 48);
    if (RescueEye.thermalPalette === 'ironbow') {
      heatGrad.addColorStop(0, '#ffffff'); // 37°C core
      heatGrad.addColorStop(0.25, '#ff2a55'); // Hot red
      heatGrad.addColorStop(0.6, '#ffb703'); // Orange/Amber
      heatGrad.addColorStop(0.85, '#6b11ff'); // Purple
      heatGrad.addColorStop(1, 'transparent');
    } else if (RescueEye.thermalPalette === 'rainbow') {
      heatGrad.addColorStop(0, '#ffffff');
      heatGrad.addColorStop(0.2, '#ff0000');
      heatGrad.addColorStop(0.5, '#ffff00');
      heatGrad.addColorStop(0.8, '#00ff00');
      heatGrad.addColorStop(1, '#0000ff');
    } else if (RescueEye.thermalPalette === 'whitehot') {
      heatGrad.addColorStop(0, '#ffffff');
      heatGrad.addColorStop(0.5, '#aaaaaa');
      heatGrad.addColorStop(1, 'transparent');
    } else { // lava
      heatGrad.addColorStop(0, '#ffffdd');
      heatGrad.addColorStop(0.3, '#ffaa00');
      heatGrad.addColorStop(0.7, '#cc2200');
      heatGrad.addColorStop(1, 'transparent');
    }

    ctx.fillStyle = heatGrad;
    ctx.beginPath();
    ctx.arc(targetX, targetY, 52, 0, Math.PI * 2);
    ctx.fill();

    // Digital noise grain
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 16) {
      const noise = (Math.random() - 0.5) * 8;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
  },

  // 2. 4K RGB YOLOv8 SAR AI Detector
  renderRgb() {
    if (!this.rgbCanvas) return;
    const ctx = this.rgbCanvas.getContext('2d');
    const w = this.rgbCanvas.width;
    const h = this.rgbCanvas.height;

    // Dark concrete rubble texture
    ctx.fillStyle = '#1c222d';
    ctx.fillRect(0, 0, w, h);

    // Concrete slabs & debris lines
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 40 + (this.tick % 40));
      ctx.lineTo(w, i * 40 + 20 + (this.tick % 40));
      ctx.stroke();
    }

    // Trapped survivor silhouette under concrete
    const cx = w / 2;
    const cy = h / 2;
    ctx.fillStyle = '#3a4a5b';
    ctx.beginPath();
    ctx.arc(cx, cy - 10, 16, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillRect(cx - 14, cy + 6, 28, 36); // Torso

    // Waving hand micro-animation
    const armWave = Math.sin(this.tick * 0.08) * 12;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx + 12, cy + 12);
    ctx.lineTo(cx + 26, cy - 5 + armWave);
    ctx.stroke();

    // YOLOv8 Bounding Box
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 32, cy - 36, 68, 86);

    // YOLO Tag
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(cx - 32, cy - 48, 68, 12);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 9px "JetBrains Mono"';
    ctx.fillText('HUMAN 95.2%', cx - 30, cy - 39);
  },

  // 3. Acoustic DSP Spectrogram & Visualizer
  renderAudio() {
    if (!this.audioCanvas) return;
    const ctx = this.audioCanvas.getContext('2d');
    const w = this.audioCanvas.width;
    const h = this.audioCanvas.height;

    ctx.fillStyle = '#04070e';
    ctx.fillRect(0, 0, w, h);

    // Spectrum bars
    const numBars = 36;
    const barW = (w / numBars) - 2;

    for (let i = 0; i < numBars; i++) {
      let val = 0;
      if (RescueEye.audioMicActive && AudioEngine.analyser) {
        const dataArr = new Uint8Array(AudioEngine.analyser.frequencyBinCount);
        AudioEngine.analyser.getByteFrequencyData(dataArr);
        val = (dataArr[i % dataArr.length] / 255) * (h - 10);
      } else {
        // Simulated formant peak around 340Hz (Voice "HELP")
        const isVoiceFormant = (i >= 10 && i <= 16);
        const base = isVoiceFormant ? 45 : 12;
        val = base + Math.sin(this.tick * 0.15 + i * 0.4) * (isVoiceFormant ? 30 : 8);
      }

      const barH = Math.max(4, val);
      const barY = h - barH;
      const isPeak = (i >= 10 && i <= 16);

      ctx.fillStyle = isPeak ? '#00ff88' : '#00f0ff';
      ctx.fillRect(i * (barW + 2) + 2, barY, barW, barH);
    }
  },

  // 4. UWB Radar Micro-Vital Signs (Respiration Waveform)
  renderUwb() {
    if (!this.uwbCanvas) return;
    const ctx = this.uwbCanvas.getContext('2d');
    const w = this.uwbCanvas.width;
    const h = this.uwbCanvas.height;

    ctx.fillStyle = '#050711';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
    ctx.lineWidth = 1;
    for (let y = 15; y < h; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Respiration Sine Wave (14 bpm) + Heart Micro-Spike (76 bpm)
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < w; x++) {
      const t = (x + this.tick * 2) * 0.04;
      const respiration = Math.sin(t * 0.5) * 16;
      const heartPulse = Math.pow(Math.sin(t * 2.5), 8) * 10;
      const noise = (Math.sin(x * 9) * 2);
      const y = (h / 2) + respiration + heartPulse + noise;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  },

  // 5. Satellite Disaster SAR Damage Proxy Imagery View
  renderSatImagery() {
    if (!this.satCanvas) return;
    const ctx = this.satCanvas.getContext('2d');
    const w = this.satCanvas.width;
    const h = this.satCanvas.height;

    ctx.fillStyle = '#060a16';
    ctx.fillRect(0, 0, w, h);

    // Earth terrain & river contours
    ctx.strokeStyle = '#12233f';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 80 + i * 45, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Disaster Rupture Fault Line
    ctx.strokeStyle = '#ff2a55';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(80, 50);
    ctx.lineTo(w / 2 - 40, h / 2 - 20);
    ctx.lineTo(w / 2 + 80, h / 2 + 60);
    ctx.lineTo(w - 100, h - 40);
    ctx.stroke();

    // Synthetic SAR Heatmap Blobs
    const secA_X = w * 0.35;
    const secA_Y = h * 0.35;
    const sarGrad = ctx.createRadialGradient(secA_X, secA_Y, 10, secA_X, secA_Y, 120);
    sarGrad.addColorStop(0, 'rgba(255, 42, 85, 0.45)');
    sarGrad.addColorStop(0.5, 'rgba(255, 183, 3, 0.25)');
    sarGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = sarGrad;
    ctx.beginPath();
    ctx.arc(secA_X, secA_Y, 120, 0, Math.PI * 2);
    ctx.fill();

    // Orbital Laser Scan Line sweeping vertically
    const scanY = (this.tick * 3) % h;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();
  }
};

// ============================================================================
// 5. CINEMATIC 60-SECOND SPACE-TO-GROUND MISSION DIRECTOR
// ============================================================================
const CinemaDirector = {
  milestones: [
    {
      time: 0,
      stage: 'STAGE 1: ORBITAL SATELLITE DISASTER DETECTION',
      headline: 'SATELLITE DISASTER DETECTION • EARTHQUAKE DETECTED',
      details: 'Sentinel-1C Synthetic Aperture Radar detects M7.8 seismic rupture across 24.8 km² disaster zone. Ground cellular networks severed.'
    },
    {
      time: 5,
      stage: 'STAGE 2: AI DAMAGE SEGMENTATION & SECTORIZATION',
      headline: 'AFFECTED AREA IDENTIFIED • SEARCH PRIORITY: CRITICAL',
      details: 'RescueEye Space-AI identifies 48 collapsed structures, 3 destroyed bridges. Sector A tagged for IMMEDIATE drone deployment.'
    },
    {
      time: 10,
      stage: 'STAGE 3: COMMAND CENTER SWARM FLIGHT GENERATION',
      headline: 'AI MISSION PLANNING • 4 MULTI-SENSOR UAVs REQUIRED',
      details: 'Command Center calculates optimal safe altitudes (14m AGL), Lawnmower & Rubble Spiral search trajectories with 25% battery reserves.'
    },
    {
      time: 15,
      stage: 'STAGE 4: AUTONOMOUS DRONE SWARM LAUNCH',
      headline: 'AUTONOMOUS SEARCH MISSION ACTIVE • 4 UAVs AIRBORNE',
      details: 'UAV-01 (FLIR Lead), UAV-02 (Flood Zoom), UAV-03 (Acoustic Rubble), UAV-04 (LiDAR Recon) ingress Sector A-D corridors simultaneously.'
    },
    {
      time: 20,
      stage: 'STAGE 5: MULTI-MODAL SENSOR FUSION VICTIM DETECTION',
      headline: '🚨 HUMAN PRESENCE DETECTED • MULTI-SENSOR CONFIDENCE: 94%',
      details: 'FLIR: 36.8°C Body Heat (91%) | RGB YOLOv8: Trapped Torso (95%) | Acoustic DSP: "HELP" SOS (93%) | UWB Radar: 14 bpm Respiration (88%).'
    },
    {
      time: 30,
      stage: 'STAGE 6: CENTIMETER GPS LOCATION LOCK',
      headline: 'VICTIM LOCATION LOCKED • LAT 17.385300° N, LNG 78.487100° E',
      details: 'u-blox NEO-M8N with dual-frequency RTK pins trapped survivor coordinates with ±0.4m precision under 1.2m concrete floor.'
    },
    {
      time: 35,
      stage: 'STAGE 7: SATELLITE-BACKED RESILIENT TELEMETRY RELAY',
      headline: 'SATELLITE LINK ACTIVE • EMERGENCY TELEMETRY TRANSMITTED',
      details: 'Cellular network offline. RescueEye automatically relays 248-byte emergency telemetry packet via Iridium L-Band orbital constellation.'
    },
    {
      time: 40,
      stage: 'STAGE 8: RESCUE TEAM DISPATCHED & OVERHEAD GUIDANCE',
      headline: 'CASE #RX-00127 • RESCUE TEAM RT-07 DISPATCHED',
      details: 'Alpha Urban SAR extraction squad vectored toward locked GPS coordinates. Drone UAV-01 activates high-intensity overhead spotlight.'
    },
    {
      time: 50,
      stage: 'STAGE 9: LIVE EXTRACTION & RESCUE IN PROGRESS',
      headline: 'LIVE DRONE GUIDANCE • VICTIM: 12 M • RESCUE TEAM REACHED',
      details: 'First responders breach concrete slab with hydraulic spreader. Survivor reached within Golden 72-Hour window.'
    },
    {
      time: 60,
      stage: 'STAGE 10: MISSION ACCOMPLISHED',
      headline: 'SURVIVOR SAFELY EXTRACTED • CASE #RX-00127 CLOSED',
      details: 'RescueEye Space-to-Ground Disaster Intelligence ecosystem successfully executes autonomous lifecycle.'
    }
  ],

  init() {
    this.bindControls();
  },

  bindControls() {
    const btnPlay = document.getElementById('btn-cinematic-play');
    const btnPause = document.getElementById('btn-cinematic-pause');
    const btnReset = document.getElementById('btn-cinematic-reset');
    const speedSelect = document.getElementById('cinematic-speed');
    const btnReplay = document.getElementById('btn-cinema-replay');

    if (btnPlay) btnPlay.addEventListener('click', () => this.play());
    if (btnPause) btnPause.addEventListener('click', () => this.pause());
    if (btnReset) btnReset.addEventListener('click', () => this.reset());
    if (btnReplay) btnReplay.addEventListener('click', () => {
      this.reset();
      this.play();
    });

    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        RescueEye.cinema.speed = parseFloat(e.target.value) || 2;
        if (RescueEye.cinema.isPlaying) {
          this.pause();
          this.play();
        }
      });
    }

    // Timeline Marker Clicks
    document.querySelectorAll('.timeline-marker').forEach(marker => {
      marker.addEventListener('click', () => {
        const time = parseInt(marker.getAttribute('data-time'), 10);
        this.seekTo(time);
      });
    });
  },

  play() {
    if (RescueEye.cinema.isPlaying) return;
    RescueEye.cinema.isPlaying = true;
    AudioEngine.playAlertBeep(520, 0.2);

    const intervalMs = 1000 / RescueEye.cinema.speed;
    RescueEye.cinema.intervalId = setInterval(() => {
      RescueEye.cinema.timerSeconds++;
      if (RescueEye.cinema.timerSeconds >= RescueEye.cinema.totalSeconds) {
        RescueEye.cinema.timerSeconds = RescueEye.cinema.totalSeconds;
        this.pause();
        this.showFinalScreen();
      }
      this.updateCinemaUI();
    }, intervalMs);
  },

  pause() {
    RescueEye.cinema.isPlaying = false;
    if (RescueEye.cinema.intervalId) {
      clearInterval(RescueEye.cinema.intervalId);
      RescueEye.cinema.intervalId = null;
    }
  },

  reset() {
    this.pause();
    RescueEye.cinema.timerSeconds = 0;
    const finalScreen = document.getElementById('cinema-final-screen');
    if (finalScreen) finalScreen.classList.add('hidden');
    this.updateCinemaUI();
  },

  seekTo(seconds) {
    RescueEye.cinema.timerSeconds = seconds;
    const finalScreen = document.getElementById('cinema-final-screen');
    if (finalScreen) {
      if (seconds >= 60) finalScreen.classList.remove('hidden');
      else finalScreen.classList.add('hidden');
    }
    this.updateCinemaUI();
  },

  showFinalScreen() {
    const finalScreen = document.getElementById('cinema-final-screen');
    if (finalScreen) finalScreen.classList.remove('hidden');
    AudioEngine.playAlertBeep(880, 0.4, 'triangle');
  },

  updateCinemaUI() {
    const sec = RescueEye.cinema.timerSeconds;
    const pct = (sec / RescueEye.cinema.totalSeconds) * 100;

    // Timer display
    const timerEl = document.getElementById('cinematic-timer');
    if (timerEl) {
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      timerEl.innerText = `${mm}:${ss} / 01:00`;
    }

    // Progress bar
    const progressEl = document.getElementById('cinematic-progress');
    if (progressEl) progressEl.style.width = `${pct}%`;

    // Find active milestone
    let activeM = this.milestones[0];
    for (let i = 0; i < this.milestones.length; i++) {
      if (sec >= this.milestones[i].time) activeM = this.milestones[i];
    }

    const stepBadge = document.getElementById('cinema-step-badge');
    const headline = document.getElementById('cinema-headline');
    const details = document.getElementById('cinema-details');

    if (stepBadge) stepBadge.innerHTML = `<i data-lucide="satellite"></i> ${activeM.stage}`;
    if (headline) headline.innerText = activeM.headline;
    if (details) details.innerText = activeM.details;
    if (window.lucide) lucide.createIcons();

    // Render Canvas Frame
    this.drawCinemaStage(sec, activeM);
  },

  drawCinemaStage(sec, milestone) {
    const canvas = CanvasRenderers.cinemaCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Space Deep Dark Background
    ctx.fillStyle = '#020409';
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 60; i++) {
      const sx = ((i * 197) % w);
      const sy = ((i * 311) % h);
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    if (sec <= 10) {
      // Orbiting Earth Curve at bottom
      const earthGrad = ctx.createRadialGradient(w / 2, h + 400, 100, w / 2, h + 400, 700);
      earthGrad.addColorStop(0, '#0d3268');
      earthGrad.addColorStop(0.7, '#071630');
      earthGrad.addColorStop(1, '#020409');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(w / 2, h + 400, 700, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric limb glow
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w / 2, h + 400, 702, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Sentinel Satellite Model passing over
      const satX = 200 + sec * 60;
      const satY = 120 + Math.sin(sec) * 20;

      // Satellite Body
      ctx.fillStyle = '#ffb703';
      ctx.fillRect(satX - 20, satY - 10, 40, 20);
      // Solar Panels
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(satX - 70, satY - 6, 45, 12);
      ctx.fillRect(satX + 25, satY - 6, 45, 12);

      // Radar Laser Scan Beam projecting downward to Earth
      const laserGrad = ctx.createLinearGradient(satX, satY, satX, h - 80);
      laserGrad.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      laserGrad.addColorStop(1, 'rgba(255, 42, 85, 0.9)');

      ctx.fillStyle = laserGrad;
      ctx.beginPath();
      ctx.moveTo(satX - 10, satY + 10);
      ctx.lineTo(w / 2 - 120, h - 90);
      ctx.lineTo(w / 2 + 120, h - 90);
      ctx.lineTo(satX + 10, satY + 10);
      ctx.closePath();
      ctx.fill();

      // Earthquake epicenter pulse
      ctx.strokeStyle = '#ff2a55';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(w / 2, h - 90, 20 + (sec % 3) * 20, 0, Math.PI * 2);
      ctx.stroke();
    } else if (sec <= 35) {
      // Swarm Flight & Multi-Sensor View
      ctx.fillStyle = '#0a101f';
      ctx.fillRect(40, 40, w - 80, h - 140);
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, w - 80, h - 140);

      // 4 Drone Icons navigating
      const dColors = ['#00f0ff', '#ffb703', '#00f0ff', '#00ff88'];
      for (let d = 0; d < 4; d++) {
        const dx = 150 + d * 240 + Math.sin(sec + d) * 30;
        const dy = 180 + Math.cos(sec + d) * 20;

        ctx.fillStyle = dColors[d];
        ctx.beginPath();
        ctx.arc(dx, dy, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px "Orbitron"';
        ctx.fillText(`UAV-0${d + 1}`, dx - 20, dy - 20);

        // Search cone
        ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.lineTo(dx - 40, dy + 100);
        ctx.lineTo(dx + 40, dy + 100);
        ctx.closePath();
        ctx.fill();
      }

      // Detection lock reticle in center
      if (sec >= 20) {
        ctx.strokeStyle = '#ff2a55';
        ctx.lineWidth = 3;
        ctx.strokeRect(w / 2 - 60, h / 2 - 40, 120, 100);

        ctx.fillStyle = '#ff2a55';
        ctx.font = 'bold 14px "JetBrains Mono"';
        ctx.fillText('🚨 SURVIVOR LOCKED: 94.2%', w / 2 - 80, h / 2 - 50);
      }
    } else {
      // Rescue Team Guidance Stage
      ctx.fillStyle = '#060d1d';
      ctx.fillRect(40, 40, w - 80, h - 140);
      ctx.strokeStyle = '#ffb703';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, w - 80, h - 140);

      // Victim Pin
      const vx = w / 2 + 100;
      const vy = h / 2;
      ctx.fillStyle = '#ff2a55';
      ctx.beginPath();
      ctx.arc(vx, vy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.fillText('VICTIM #RX-00127', vx - 45, vy - 26);

      // Rescue Team moving towards victim
      const progressToVictim = Math.min(1, (sec - 40) / 20);
      const rx = 200 + progressToVictim * (vx - 200);
      const ry = vy;

      ctx.fillStyle = '#ffb703';
      ctx.fillRect(rx - 16, ry - 16, 32, 32);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px "Inter"';
      ctx.fillText('🚒', rx - 10, ry + 7);

      // Guidance Vector Line
      ctx.strokeStyle = '#ffb703';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(rx + 16, ry);
      ctx.lineTo(vx - 18, vy);
      ctx.stroke();
      ctx.setLineDash([]);

      const distLeft = Math.max(0, Math.round(82 * (1 - progressToVictim)));
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 16px "JetBrains Mono"';
      ctx.fillText(`LIVE DISTANCE: ${distLeft} M`, w / 2 - 70, h / 2 + 80);
    }
  }
};

// ============================================================================
// 6. AUTHENTICATION & MOBILE PHONE COMPANION LINK ENGINE
// ============================================================================
const AuthEngine = {
  currentUser: null,
  connectedPhone: null,

  init() {
    // Load from localStorage or initialize with Ghazi Mohammad Arsh pre-paired
    const saved = localStorage.getItem('rescueEyeUser');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.currentUser = parsed.user;
        this.connectedPhone = parsed.phone;
      } catch(e){}
    }

    if (!this.currentUser) {
      // Default to logged-in as Founder & Chief Commander Ghazi Mohammad Arsh with connected iPhone 16 Pro
      this.loginAsGhazi(false);
    } else {
      this.updateAuthUI();
    }

    this.bindEvents();
  },

  bindEvents() {
    // Open Auth Modal
    const btnOpenAuth = document.getElementById('btn-open-auth');
    if (btnOpenAuth) {
      btnOpenAuth.addEventListener('click', () => this.openModal());
    }

    // Close Auth Modal
    const btnClose = document.getElementById('btn-auth-modal-close');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.closeModal());
    }

    // Toggle Dropdown Menu
    const profileChip = document.getElementById('user-profile-chip');
    if (profileChip) {
      profileChip.addEventListener('click', (e) => {
        const drop = document.getElementById('user-dropdown-menu');
        if (drop) drop.classList.toggle('hidden');
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      const widget = document.getElementById('user-auth-widget');
      const drop = document.getElementById('user-dropdown-menu');
      if (widget && drop && !widget.contains(e.target)) {
        drop.classList.add('hidden');
      }
    });

    // Auth Tab switching
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-authtab');
        document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.auth-tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetPanel = document.getElementById(`auth-panel-${tab}`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Social Login: Google
    const btnGoogle = document.getElementById('btn-login-google');
    if (btnGoogle) {
      btnGoogle.addEventListener('click', () => this.loginGoogle());
    }

    // Social Login: Apple iOS
    const btnApple = document.getElementById('btn-login-apple');
    if (btnApple) {
      btnApple.addEventListener('click', () => this.loginApple());
    }

    // Quick Login: Ghazi Mohammad Arsh
    const btnGhaziFast = document.getElementById('btn-login-ghazi-fast');
    if (btnGhaziFast) {
      btnGhaziFast.addEventListener('click', () => this.loginAsGhazi(true));
    }

    // QR Code Phone Link Simulator
    const btnQrPair = document.getElementById('btn-simulate-qr-pair');
    if (btnQrPair) {
      btnQrPair.addEventListener('click', () => this.pairPhoneViaQR());
    }

    // OTP Submit
    const btnOtp = document.getElementById('btn-submit-phone-otp');
    if (btnOtp) {
      btnOtp.addEventListener('click', () => this.loginViaPhoneOTP());
    }

    // Unlink Phone
    const btnUnlink = document.getElementById('btn-unlink-phone');
    if (btnUnlink) {
      btnUnlink.addEventListener('click', () => this.unlinkPhone());
    }

    // Manage device link from dropdown
    const btnManage = document.getElementById('btn-manage-phone-link');
    if (btnManage) {
      btnManage.addEventListener('click', (e) => {
        e.stopPropagation();
        const drop = document.getElementById('user-dropdown-menu');
        if (drop) drop.classList.add('hidden');
        this.openModal();
      });
    }

    // Logout
    const btnLogout = document.getElementById('btn-auth-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', (e) => {
        e.stopPropagation();
        this.logout();
      });
    }
  },

  openModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('hidden');
    AudioEngine.playAlertBeep(520, 0.15);
  },

  closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
  },

  loginAsGhazi(playAudio = true) {
    this.currentUser = {
      name: 'Ghazi Mohammad Arsh',
      initials: 'GA',
      email: 'ghazi.arsh@rescueeye.ops',
      role: 'Chief SAR Commander / Founder',
      provider: 'RescueEye Identity'
    };
    this.connectedPhone = {
      model: 'iPhone 16 Pro Max (iOS 18.4)',
      owner: 'Ghazi Mohammad Arsh',
      battery: '89%',
      lat: 17.385300,
      lng: 78.487100,
      status: 'FaceID Authenticated & Connected'
    };
    this.saveState();
    this.updateAuthUI();
    this.closeModal();
    if (playAudio) AudioEngine.playAlertBeep(880, 0.25, 'triangle');
  },

  loginGoogle() {
    this.currentUser = {
      name: 'Ghazi Mohammad Arsh',
      initials: 'GA',
      email: 'ghazi.arsh@gmail.com',
      role: 'SAR Commander (Google Pixel)',
      provider: 'Google Workspace'
    };
    this.connectedPhone = {
      model: 'Google Pixel 9 Pro (Android 15)',
      owner: 'Ghazi Mohammad Arsh',
      battery: '94%',
      lat: 17.385300,
      lng: 78.487100,
      status: 'Biometric Pixel Imprint Linked'
    };
    this.saveState();
    this.updateAuthUI();
    this.closeModal();
    AudioEngine.playAlertBeep(880, 0.25, 'triangle');
  },

  loginApple() {
    this.currentUser = {
      name: 'Ghazi Mohammad Arsh',
      initials: 'GA',
      email: 'ghazi.arsh@icloud.com',
      role: 'SAR Commander (Apple ID)',
      provider: 'Apple ID (iOS)'
    };
    this.connectedPhone = {
      model: 'iPhone 16 Pro (iOS 18.4)',
      owner: 'Ghazi Mohammad Arsh',
      battery: '91%',
      lat: 17.385300,
      lng: 78.487100,
      status: 'Apple FaceID Bio-Tethered'
    };
    this.saveState();
    this.updateAuthUI();
    this.closeModal();
    AudioEngine.playAlertBeep(880, 0.25, 'triangle');
  },

  pairPhoneViaQR() {
    this.connectedPhone = {
      model: 'iPhone 16 Pro (iOS 18.4 Mobile App)',
      owner: this.currentUser ? this.currentUser.name : 'Ghazi Mohammad Arsh',
      battery: '88%',
      lat: 17.385300,
      lng: 78.487100,
      status: 'QR Pair Success • Low Latency Relay'
    };
    this.saveState();
    this.updateAuthUI();
    AudioEngine.playAlertBeep(780, 0.3);
  },

  loginViaPhoneOTP() {
    const phoneInput = document.getElementById('input-phone-number');
    const phone = phoneInput ? phoneInput.value : '9876543210';
    this.currentUser = {
      name: 'Ghazi Mohammad Arsh',
      initials: 'GA',
      email: `+91 ${phone}`,
      role: 'SAR Field Commander',
      provider: 'SMS OTP Verified'
    };
    this.connectedPhone = {
      model: `Phone +91 ${phone} (GPS Tethered)`,
      owner: 'Ghazi Mohammad Arsh',
      battery: '96%',
      lat: 17.385300,
      lng: 78.487100,
      status: 'OTP Verified • Live Mesh Active'
    };
    this.saveState();
    this.updateAuthUI();
    this.closeModal();
    AudioEngine.playAlertBeep(880, 0.25, 'triangle');
  },

  unlinkPhone() {
    this.connectedPhone = null;
    this.saveState();
    this.updateAuthUI();
  },

  logout() {
    this.currentUser = null;
    this.connectedPhone = null;
    localStorage.removeItem('rescueEyeUser');
    this.updateAuthUI();
    const drop = document.getElementById('user-dropdown-menu');
    if (drop) drop.classList.add('hidden');
    AudioEngine.playAlertBeep(330, 0.2);
  },

  saveState() {
    localStorage.setItem('rescueEyeUser', JSON.stringify({
      user: this.currentUser,
      phone: this.connectedPhone
    }));
  },

  updateAuthUI() {
    const btnOpen = document.getElementById('btn-open-auth');
    const chip = document.getElementById('user-profile-chip');
    const cdHud = document.getElementById('connected-device-hud');

    if (this.currentUser) {
      if (btnOpen) btnOpen.classList.add('hidden');
      if (chip) chip.classList.remove('hidden');

      const nameEl = document.getElementById('header-user-name');
      const devEl = document.getElementById('header-user-device');
      const dropName = document.getElementById('drop-user-name');
      const dropEmail = document.getElementById('drop-user-email');
      const dropPhone = document.getElementById('drop-phone-model');
      const dropBatt = document.getElementById('drop-phone-battery');
      const initials = document.getElementById('user-avatar-initials');

      if (nameEl) nameEl.innerText = this.currentUser.name;
      if (dropName) dropName.innerText = this.currentUser.name;
      if (dropEmail) dropEmail.innerText = this.currentUser.email;
      if (initials) initials.innerText = this.currentUser.initials || 'GA';

      if (this.connectedPhone) {
        if (devEl) devEl.innerHTML = `<i data-lucide="smartphone"></i> ${this.connectedPhone.model.split(' ')[0]} Linked`;
        if (dropPhone) dropPhone.innerText = this.connectedPhone.model;
        if (dropBatt) dropBatt.innerText = `${this.connectedPhone.battery} • Connected`;

        if (cdHud) {
          cdHud.classList.remove('hidden');
          const cdModel = document.getElementById('cd-phone-model');
          const cdOwner = document.getElementById('cd-owner-name');
          const cdBatt = document.getElementById('cd-battery-val');
          if (cdModel) cdModel.innerText = this.connectedPhone.model;
          if (cdOwner) cdOwner.innerText = this.connectedPhone.owner;
          if (cdBatt) cdBatt.innerText = this.connectedPhone.battery;
        }
      } else {
        if (devEl) devEl.innerHTML = `<i data-lucide="smartphone"></i> No Phone Linked`;
        if (dropPhone) dropPhone.innerText = 'Not Paired';
        if (cdHud) cdHud.classList.add('hidden');
      }
    } else {
      if (btnOpen) btnOpen.classList.remove('hidden');
      if (chip) chip.classList.add('hidden');
      if (cdHud) cdHud.classList.add('hidden');
    }

    if (window.lucide) lucide.createIcons();
  }
};

// ============================================================================
// 7. APPLICATION CONTROLLER & INTERACTION EVENT HANDLERS
// ============================================================================
const App = {
  init() {
    // 1. Initialize Subsystems
    AudioEngine.init();
    MapEngine.init();
    CanvasRenderers.init();
    CinemaDirector.init();
    AuthEngine.init();

    // 2. Bind DOM Events
    this.bindViewTabs();
    this.bindHeaderActions();
    this.bindScenarioSelector();
    this.bindLayerPills();
    this.bindFlightControls();
    this.bindSwarmEvents();
    this.bindCommsFailover();
    this.populateGlobalDisasters();
    this.populateVictimCards();
    this.updateTelemetryUI();

    // 3. Periodic Simulation Heartbeat (1 Hz)
    setInterval(() => {
      this.simulationStep();
    }, 1000);
  },

  bindViewTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.getAttribute('data-view');
        this.switchView(viewId);
      });
    });
  },

  switchView(viewId) {
    RescueEye.activeView = viewId;

    // Update tab button active states
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
    });

    // Update panel active states
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${viewId}`);
    });

    // Invalidate map size if returning to tactical HUD
    if (viewId === 'tactical-hud' && MapEngine.map) {
      setTimeout(() => MapEngine.map.invalidateSize(), 150);
    }

    AudioEngine.playAlertBeep(440, 0.08);
  },

  bindHeaderActions() {
    // Live Mic Toggle
    const btnMic = document.getElementById('btn-toggle-audio-mic');
    if (btnMic) {
      btnMic.addEventListener('click', () => AudioEngine.toggleLiveMicrophone());
    }

    // Siren Alert
    const btnSiren = document.getElementById('btn-emergency-siren');
    if (btnSiren) {
      btnSiren.addEventListener('click', () => AudioEngine.toggleEmergencySiren());
    }

    // Sat-Failover Blackout Test Toggle
    const btnFailover = document.getElementById('btn-toggle-failover');
    if (btnFailover) {
      btnFailover.addEventListener('click', () => this.toggleBlackout());
    }

    // Swarm RTH
    const btnRth = document.getElementById('btn-rth-all');
    const btnRth2 = document.getElementById('btn-swarm-rth-2');
    const triggerRth = () => {
      alert('SWARM RTH TRIGGERED: All 4 UAVs executing return-to-home corridor to LZ-01 staging area.');
      Object.keys(RescueEye.swarm).forEach(k => {
        RescueEye.swarm[k].status = 'RTH (RETURNING)';
      });
      const badge = document.getElementById('flight-state-badge');
      if (badge) {
        badge.innerText = 'RTH IN PROGRESS';
        badge.className = 'state-badge badge-critical';
      }
      this.updateTelemetryUI();
    };
    if (btnRth) btnRth.addEventListener('click', triggerRth);
    if (btnRth2) btnRth2.addEventListener('click', triggerRth);

    // Emergency Banner Dispatch
    const btnBannerDispatch = document.getElementById('btn-banner-dispatch');
    if (btnBannerDispatch) {
      btnBannerDispatch.addEventListener('click', () => {
        alert('DISPATCH CONFIRMED: Ground Unit RT-07 assigned to Case #RX-00127. Live drone spotlight guidance active.');
        this.dispatchTeamToVictim('RT-07', 'VIC-EQ-01');
      });
    }

    // Emergency Banner Dismiss
    const btnBannerDismiss = document.getElementById('btn-banner-dismiss');
    if (btnBannerDismiss) {
      btnBannerDismiss.addEventListener('click', () => {
        const banner = document.getElementById('emergency-banner');
        if (banner) banner.classList.add('hidden');
      });
    }

    // Quick Dispatch Swarm in Strip
    const btnQuickSwarm = document.getElementById('btn-quick-dispatch-swarm');
    if (btnQuickSwarm) {
      btnQuickSwarm.addEventListener('click', () => {
        alert('SWARM AUTONOMOUS DISPATCH: Launching 4 UAVs to prioritized Sectors A, B, C, and D.');
        this.switchView('tactical-hud');
      });
    }

    // Modal Close
    const btnModalClose = document.getElementById('btn-modal-close');
    if (btnModalClose) {
      btnModalClose.addEventListener('click', () => {
        const modal = document.getElementById('victim-modal');
        if (modal) modal.classList.add('hidden');
      });
    }
  },

  bindScenarioSelector() {
    const sel = document.getElementById('select-scenario');
    if (sel) {
      sel.addEventListener('change', (e) => {
        RescueEye.activeScenario = e.target.value;
        const scen = RescueEye.scenarios[e.target.value];

        // Update Strip
        const qType = document.getElementById('quick-disaster-type');
        const qArea = document.getElementById('quick-disaster-area');
        const qSev = document.getElementById('quick-disaster-severity');
        const qAccess = document.getElementById('quick-ground-access');

        if (qType) qType.innerText = scen.disasterType;
        if (qArea) qArea.innerText = scen.areaKm2;
        if (qSev) qSev.innerText = scen.severity;
        if (qAccess) qAccess.innerText = scen.groundAccess;

        MapEngine.renderScenarioData();
        this.populateVictimCards();
        this.updateTelemetryUI();
      });
    }

    // UAV Feed Selector
    const uavSel = document.getElementById('uav-feed-select');
    if (uavSel) {
      uavSel.addEventListener('change', (e) => {
        RescueEye.selectedUav = e.target.value;
        this.updateTelemetryUI();
      });
    }

    // Thermal Palette Selector
    const palSel = document.getElementById('thermal-palette');
    if (palSel) {
      palSel.addEventListener('change', (e) => {
        RescueEye.thermalPalette = e.target.value;
      });
    }
  },

  bindLayerPills() {
    document.querySelectorAll('.layer-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const layer = pill.getAttribute('data-layer');
        pill.classList.toggle('active');
        MapEngine.toggleLayer(layer);
      });
    });
  },

  bindFlightControls() {
    const btnPatrol = document.getElementById('btn-start-patrol');
    const btnSpiral = document.getElementById('btn-spiral-patrol');
    const btnHover = document.getElementById('btn-pause-hover');
    const btnBeacon = document.getElementById('btn-drop-beacon');
    const btnInject = document.getElementById('btn-inject-victim');
    const btnSimVoice = document.getElementById('btn-sim-voice');

    if (btnPatrol) {
      btnPatrol.addEventListener('click', () => {
        const badge = document.getElementById('flight-state-badge');
        if (badge) {
          badge.innerText = 'LAWNMOWER SEARCH';
          badge.className = 'state-badge state-patrol';
        }
        AudioEngine.playAlertBeep(660, 0.1);
      });
    }

    if (btnSpiral) {
      btnSpiral.addEventListener('click', () => {
        const badge = document.getElementById('flight-state-badge');
        if (badge) {
          badge.innerText = 'RUBBLE SPIRAL SCAN';
          badge.className = 'state-badge state-patrol';
        }
        AudioEngine.playAlertBeep(720, 0.1);
      });
    }

    if (btnHover) {
      btnHover.addEventListener('click', () => {
        const badge = document.getElementById('flight-state-badge');
        if (badge) {
          badge.innerText = 'HOVER & DEEP SCAN';
          badge.className = 'state-badge badge-high';
        }
        AudioEngine.playAlertBeep(440, 0.2);
      });
    }

    if (btnBeacon) {
      btnBeacon.addEventListener('click', () => {
        alert('GPS BEACON DROPPED: Sub-surface beacon deployed at locked coordinates 17.385300° N, 78.487100° E.');
      });
    }

    if (btnInject) {
      btnInject.addEventListener('click', () => {
        const scen = RescueEye.scenarios[RescueEye.activeScenario];
        const newVic = {
          id: `VIC-TEST-${Math.floor(Math.random() * 900 + 100)}`,
          caseNumber: `#RX-00${Math.floor(Math.random() * 900 + 100)}`,
          name: 'Thermal anomaly in collapsed basement pocket',
          sector: 'Sector A-09',
          lat: scen.center[0] + (Math.random() - 0.5) * 0.002,
          lng: scen.center[1] + (Math.random() - 0.5) * 0.002,
          temp: 36.9,
          keyword: 'HELP',
          visualClass: 'Human Limb',
          visualProb: 0.94,
          audioProb: 0.91,
          thermalProb: 0.95,
          radarProb: 0.89,
          respirationBpm: 15,
          pulseBpm: 80,
          triage: 'critical',
          time: '08:35:10 UTC',
          depth: '1.5m rubble',
          dispatched: false,
          assignedTeam: null
        };
        scen.victims.unshift(newVic);
        MapEngine.renderScenarioData();
        this.populateVictimCards();
        this.triggerEmergencyBanner(newVic);
      });
    }

    if (btnSimVoice) {
      btnSimVoice.addEventListener('click', () => {
        AudioEngine.playAlertBeep(340, 0.4, 'sawtooth');
        const kwHelp = document.getElementById('kw-help');
        const probHelp = document.getElementById('prob-help');
        if (kwHelp && probHelp) {
          kwHelp.classList.add('active-hit');
          probHelp.innerText = '98%';
          setTimeout(() => { probHelp.innerText = '93%'; }, 3000);
        }
      });
    }
  },

  bindSwarmEvents() {
    document.querySelectorAll('.btn-uav-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const uav = btn.getAttribute('data-uav');
        RescueEye.selectedUav = uav;
        const uavSel = document.getElementById('uav-feed-select');
        if (uavSel) uavSel.value = uav;
        this.switchView('tactical-hud');
      });
    });

    document.querySelectorAll('.btn-deploy-sector').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = btn.getAttribute('data-sector');
        alert(`SECTOR DEPLOYMENT: Tasking designated UAV for Sector ${sec}.`);
        this.switchView('tactical-hud');
      });
    });
  },

  bindCommsFailover() {
    const btnBlackout = document.getElementById('btn-trigger-blackout');
    const btnRestore = document.getElementById('btn-restore-networks');
    const btnClearPackets = document.getElementById('btn-clear-packets');

    if (btnBlackout) btnBlackout.addEventListener('click', () => this.toggleBlackout(true));
    if (btnRestore) btnRestore.addEventListener('click', () => this.toggleBlackout(false));
    if (btnClearPackets) {
      btnClearPackets.addEventListener('click', () => {
        const stream = document.getElementById('sat-packet-stream');
        if (stream) stream.innerText = '[08:35:00] -- STREAM CLEARED --\n';
      });
    }
  },

  toggleBlackout(forceState) {
    if (forceState !== undefined) RescueEye.networkBlackout = forceState;
    else RescueEye.networkBlackout = !RescueEye.networkBlackout;

    const satLinkBadge = document.getElementById('sat-link-badge');
    const statGroundNet = document.getElementById('stat-ground-net');
    const indGroundState = document.getElementById('ind-ground-state');
    const failoverBtnText = document.getElementById('failover-btn-text');

    if (RescueEye.networkBlackout) {
      if (satLinkBadge) satLinkBadge.className = 'badge badge-active';
      if (statGroundNet) {
        statGroundNet.innerText = 'OFFLINE (SAT RELAY ON)';
        statGroundNet.className = 'telem-val status-offline';
      }
      if (indGroundState) {
        indGroundState.innerText = 'UNAVAILABLE (SEVERED)';
        indGroundState.className = 'ind-state text-red';
      }
      if (failoverBtnText) failoverBtnText.innerText = 'Restore Ground Net';
      AudioEngine.playAlertBeep(320, 0.3, 'square');
    } else {
      if (statGroundNet) {
        statGroundNet.innerText = 'ONLINE (5G MESH)';
        statGroundNet.className = 'telem-val status-online';
      }
      if (indGroundState) {
        indGroundState.innerText = 'RESTORED (5G CELLULAR)';
        indGroundState.className = 'ind-state text-green';
      }
      if (failoverBtnText) failoverBtnText.innerText = 'Test Sat-Failover';
    }
  },

  populateGlobalDisasters() {
    const list = document.getElementById('disaster-events-list');
    if (!list) return;
    list.innerHTML = RescueEye.globalDisasters.map(d => `
      <div class="disaster-event-item" onclick="alert('Viewing satellite dataset for ${d.type} in ${d.location}')">
        <div class="de-title">
          <span>${d.type}</span>
          <span class="badge ${d.severity === 'CRITICAL' ? 'bg-red' : 'bg-yellow'}">${d.severity}</span>
        </div>
        <div class="de-meta">
          📍 ${d.location} | 🛰️ ${d.area} | 🛸 ${d.uavs} UAVs
        </div>
      </div>
    `).join('');
  },

  populateVictimCards() {
    const container = document.getElementById('victim-cards-container');
    if (!container) return;

    const scen = RescueEye.scenarios[RescueEye.activeScenario];
    if (!scen || !scen.victims) return;

    container.innerHTML = scen.victims.map(v => {
      const fusedScore = Math.round(
        (v.thermalProb * 0.35 + v.visualProb * 0.25 + v.audioProb * 0.25 + v.radarProb * 0.15) * 100
      );

      return `
        <div class="victim-card triage-${v.triage}" onclick="App.openVictimModal('${v.id}')">
          <div class="vc-header">
            <span class="vc-id">${v.caseNumber} • ${v.id}</span>
            <span class="vc-conf text-${v.triage === 'critical' ? 'red' : 'amber'}">${fusedScore}% FUSED CONF</span>
          </div>
          <div class="vc-desc">${v.name}</div>
          <div class="vc-footer">
            <span>📍 ${v.sector}</span>
            <span>🌡️ ${v.temp}°C | 🔊 "${v.keyword}"</span>
            <span class="text-${v.dispatched ? 'green' : 'red'}">${v.dispatched ? '🚒 DISPATCHED (' + v.assignedTeam + ')' : '⚠️ PENDING DISPATCH'}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  openVictimModal(victimId) {
    const scen = RescueEye.scenarios[RescueEye.activeScenario];
    const victim = scen.victims.find(v => v.id === victimId);
    if (!victim) return;

    const modal = document.getElementById('victim-modal');
    const modalId = document.getElementById('modal-victim-id');
    const modalContent = document.getElementById('modal-victim-content');

    if (modalId) modalId.innerText = `${victim.caseNumber} (${victim.id})`;
    if (modalContent) {
      modalContent.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:10px; font-family:'Inter', sans-serif; font-size:12px;">
          <div style="background:rgba(255,42,85,0.15); border:1px solid #ff2a55; padding:8px; border-radius:6px;">
            <strong style="color:#ff2a55; font-size:13px;">TRIAGE LEVEL: ${victim.triage.toUpperCase()} SURVIVOR</strong>
            <p style="margin-top:3px; color:#fff;">${victim.name}</p>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-family:'JetBrains Mono';">
            <div style="background:rgba(0,0,0,0.5); padding:6px; border-radius:4px;"><strong>Target GPS:</strong> ${victim.lat.toFixed(6)}° N, ${victim.lng.toFixed(6)}° E</div>
            <div style="background:rgba(0,0,0,0.5); padding:6px; border-radius:4px;"><strong>Depth / Void:</strong> ${victim.depth}</div>
            <div style="background:rgba(0,0,0,0.5); padding:6px; border-radius:4px;"><strong>Body Heat (FLIR):</strong> ${victim.temp} °C (Norm)</div>
            <div style="background:rgba(0,0,0,0.5); padding:6px; border-radius:4px;"><strong>Acoustic Keyword:</strong> "${victim.keyword}" (${Math.round(victim.audioProb*100)}%)</div>
            <div style="background:rgba(0,0,0,0.5); padding:6px; border-radius:4px;"><strong>RGB YOLOv8:</strong> ${victim.visualClass} (${Math.round(victim.visualProb*100)}%)</div>
            <div style="background:rgba(0,0,0,0.5); padding:6px; border-radius:4px;"><strong>UWB Respiration:</strong> ${victim.respirationBpm} bpm (Pulse ${victim.pulseBpm} bpm)</div>
          </div>
          <div style="background:rgba(0,240,255,0.1); border:1px solid #00f0ff; padding:8px; border-radius:6px;">
            <strong>Assigned Rescue Unit:</strong> ${victim.assignedTeam || 'None yet'} | <strong>Extraction Vector:</strong> Clear via Artery Corridor D
          </div>
        </div>
      `;
    }

    if (modal) modal.classList.remove('hidden');
  },

  triggerEmergencyBanner(victim) {
    const banner = document.getElementById('emergency-banner');
    const caseEl = document.getElementById('banner-case-id');
    const detailsEl = document.getElementById('banner-details');

    if (caseEl) caseEl.innerText = `CASE ${victim.caseNumber} (${victim.sector})`;
    if (detailsEl) {
      detailsEl.innerHTML = `Confidence: <strong>${Math.round(victim.thermalProb*100)}%</strong> | Thermal: <strong>${victim.temp}°C</strong> | RGB: <strong>${victim.visualClass}</strong> | Voice: <strong>"${victim.keyword}"</strong> | GPS: <strong>${victim.lat.toFixed(6)}° N, ${victim.lng.toFixed(6)}° E</strong>`;
    }

    if (banner) banner.classList.remove('hidden');
    AudioEngine.playAlertBeep(780, 0.3, 'sawtooth');
  },

  dispatchTeamToVictim(teamId, victimId) {
    const team = RescueEye.rescueTeams.find(t => t.id === teamId);
    const scen = RescueEye.scenarios[RescueEye.activeScenario];
    const victim = scen.victims.find(v => v.id === victimId);

    if (team && victim) {
      team.targetVictimId = victimId;
      team.status = 'APPROACHING';
      victim.dispatched = true;
      victim.assignedTeam = teamId;
      MapEngine.renderScenarioData();
      this.populateVictimCards();
    }
  },

  updateTelemetryUI() {
    const uav = RescueEye.swarm[RescueEye.selectedUav] || RescueEye.swarm['UAV-01'];

    // Gimbal stats
    const pitch = document.getElementById('telem-pitch');
    const roll = document.getElementById('telem-roll');
    const yaw = document.getElementById('telem-yaw');
    const compassArrow = document.getElementById('compass-needle');

    if (pitch) pitch.innerText = `${uav.pitch.toFixed(1)}°`;
    if (roll) roll.innerText = `${uav.roll.toFixed(1)}°`;
    if (yaw) yaw.innerText = `${uav.heading}° SE`;
    if (compassArrow) compassArrow.style.transform = `rotate(${uav.heading}deg)`;

    // Sonar radar value
    const sonarVal = document.getElementById('radar-dist-val');
    if (sonarVal) sonarVal.innerText = `${(uav.alt / 3).toFixed(1)}m`;
  },

  simulationStep() {
    // 1. Move rescue team towards victim
    RescueEye.rescueTeams.forEach(rt => {
      if (rt.targetVictimId) {
        const scen = RescueEye.scenarios[RescueEye.activeScenario];
        const victim = scen.victims.find(v => v.id === rt.targetVictimId);
        if (victim) {
          // Linear interpolation towards victim
          const dLat = (victim.lat - rt.lat) * 0.08;
          const dLng = (victim.lng - rt.lng) * 0.08;
          rt.lat += dLat;
          rt.lng += dLng;

          if (rt.distanceM > 4) {
            rt.distanceM -= 2;
          }

          // Update HUD element
          const distEl = document.getElementById('rt-distance');
          if (distEl) distEl.innerText = `${rt.distanceM} M`;

          if (MapEngine.rescueMarkers[rt.id]) {
            MapEngine.rescueMarkers[rt.id].setLatLng([rt.lat, rt.lng]);
          }
        }
      }
    });

    // 2. Swarm UAV slight orbital drift
    Object.keys(RescueEye.swarm).forEach((k, idx) => {
      const uav = RescueEye.swarm[k];
      uav.lat += (Math.sin(Date.now() * 0.001 + idx) * 0.00003);
      uav.lng += (Math.cos(Date.now() * 0.001 + idx) * 0.00003);
      MapEngine.updateDroneCoordinates(k, uav.lat, uav.lng);
    });

    // 3. Append simulated telemetry packet to Terminal Stream
    const stream = document.getElementById('sat-packet-stream');
    if (stream && Math.random() > 0.4) {
      const uavKeys = ['UAV-01', 'UAV-02', 'UAV-03', 'UAV-04'];
      const randKey = uavKeys[Math.floor(Math.random() * uavKeys.length)];
      const u = RescueEye.swarm[randKey];
      const nowStr = new Date().toISOString().substring(11, 23);
      const pktId = Math.floor(Math.random() * 9000 + 10000);
      const logLine = `[${nowStr}] 📦 PKT #${pktId} [248B] <- ${u.id}: LAT ${u.lat.toFixed(6)} LNG ${u.lng.toFixed(6)} ALT ${u.alt}m BATT ${u.battery}%\n`;
      
      stream.innerText = logLine + stream.innerText.substring(0, 1200);
    }
  }
};

// ============================================================================
// 7. BOOTSTRAP RESCUEEYE APPLICATION ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  if (window.lucide) lucide.createIcons();
  console.log('🚁 RescueEye Satellite-Connected Disaster Intelligence System initialized.');
});
