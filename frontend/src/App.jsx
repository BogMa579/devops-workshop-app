import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Activity, Gauge, AlertTriangle, Server } from 'lucide-react'

function App() {
  const [data, setData] = useState({ 
    fuelLevel: 0, 
    cabinPressure: 0, 
    trajectory: 0, 
    status: 'INIT', 
    nodeName: 'Unknown', 
    version: 'v1.0.0' 
  })

  const BACKEND_URL = window.ENV?.BACKEND_URL || '/api';

  useEffect(() => {
    const interval = setInterval(() => {
      const url = BACKEND_URL.startsWith('http') 
        ? `${BACKEND_URL}/telemetry` 
        : `${BACKEND_URL}/telemetry`;

      fetch(url)
        .then(res => res.json())
        .then(setData)
        .catch(err => console.log("Backend offline:", err))
    }, 1000)
    return () => clearInterval(interval)
  }, [BACKEND_URL])

  // Calculate rocket vertical position based on fuel (0-100% maps to 10%-90% of screen height)
  const rocketBottom = `${10 + (data.fuelLevel * 0.8)}%`;
  
  // Calculate rotation based on trajectory (scale down to reasonable tilt)
  const rocketRotation = (data.trajectory - 180) / 5; // -36° to +36°
  
  // Flame opacity based on fuel
  const flameOpacity = Math.max(0.3, data.fuelLevel / 100);

  return (
    <div className="min-h-screen flex items-center justify-between p-8 font-mono relative overflow-hidden">
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* LEFT SIDE: Live Rocket Visualization */}
      <div className="w-1/3 relative h-screen flex items-end justify-center z-10">
        <motion.div
          className="absolute"
          animate={{ 
            bottom: rocketBottom,
            rotate: rocketRotation,
            x: data.status === 'WARNING' ? [-5, 5, -5, 5, 0] : 0, // Shake on warning
          }}
          transition={{ 
            bottom: { duration: 0.8, ease: "easeOut" },
            rotate: { duration: 0.8, ease: "easeOut" },
            x: { duration: 0.3 }
          }}
        >
          <svg 
            width="80" 
            height="120" 
            viewBox="0 0 60 100" 
            className={`drop-shadow-[0_0_20px_rgba(0,243,255,0.8)] ${data.status === 'WARNING' ? 'drop-shadow-[0_0_30px_rgba(255,0,60,0.9)]' : ''}`}
          >
            {/* Rocket Body */}
            <ellipse cx="30" cy="20" rx="15" ry="20" fill={data.status === 'WARNING' ? '#ff003c' : '#00f3ff'} />
            <rect x="20" y="20" width="20" height="40" fill={data.status === 'WARNING' ? '#cc0033' : '#0099cc'} />
            <polygon points="20,60 10,80 20,80" fill="#006699" />
            <polygon points="40,60 50,80 40,80" fill="#006699" />
            ircle cx="30" cy="35" r="5" fill="#ffffff" opacity="0.8" />
            
            {/* Dynamic Flames - Intensity based on fuel */}
            <motion.path
              d="M 25 60 Q 20 75 25 85 Q 30 80 30 60"
              fill="#ff003c"
              opacity={flameOpacity}
              animate={{
                d: [
                  "M 25 60 Q 20 75 25 85 Q 30 80 30 60",
                  "M 25 60 Q 18 80 25 90 Q 30 85 30 60",
                  "M 25 60 Q 20 75 25 85 Q 30 80 30 60",
                ],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            <motion.path
              d="M 30 60 Q 28 75 30 85 Q 32 80 30 60"
              fill="#ff9900"
              opacity={flameOpacity}
              animate={{
                d: [
                  "M 30 60 Q 28 75 30 85 Q 32 80 30 60",
                  "M 30 60 Q 26 80 30 90 Q 34 85 30 60",
                  "M 30 60 Q 28 75 30 85 Q 32 80 30 60",
                ],
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
            <motion.path
              d="M 35 60 Q 40 75 35 85 Q 30 80 30 60"
              fill="#ffff00"
              opacity={flameOpacity}
              animate={{
                d: [
                  "M 35 60 Q 40 75 35 85 Q 30 80 30 60",
                  "M 35 60 Q 42 80 35 90 Q 30 85 30 60",
                  "M 35 60 Q 40 75 35 85 Q 30 80 30 60",
                ],
              }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
          </svg>

          {/* Particle Exhaust - density based on fuel */}
          {data.fuelLevel > 20 && [...Array(Math.floor(data.fuelLevel / 15))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full"
              style={{
                left: '50%',
                top: '100%',
              }}
              animate={{
                y: [0, 50 + Math.random() * 30],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
                opacity: [flameOpacity, 0],
                scale: [1, 0.3],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Altitude Indicator */}
        <div className="absolute left-0 top-0 h-full w-12 border-l-2 border-cyan-500/30">
          <div className="relative h-full">
            <span className="absolute top-0 left-4 text-xs text-gray-500">100%</span>
            <span className="absolute top-1/2 left-4 text-xs text-gray-500">50%</span>
            <span className="absolute bottom-0 left-4 text-xs text-gray-500">0%</span>
            <motion.div 
              className="absolute left-0 w-8 h-1 bg-cyan-500"
              animate={{ top: `${100 - data.fuelLevel}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Telemetry Dashboard */}
      <div className="w-2/3 flex flex-col items-center justify-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-cyber-blue mb-2 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
            Mission Control
          </h1>
          <p className="text-gray-400 flex items-center justify-center gap-2">
            DevOps Workshop Demo // {data.version} // <Server className="w-4 h-4" /> {data.nodeName}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <StatusCard 
            title="FUEL CELLS" 
            value={`${data.fuelLevel}%`} 
            icon={<Rocket className="w-6 h-6 text-cyber-green" />}
            color="border-cyber-green"
          />
          <StatusCard 
            title="CABIN PRESS" 
            value={`${data.cabinPressure.toFixed(2)} PSI`} 
            icon={<Gauge className="w-6 h-6 text-cyber-blue" />}
            color="border-cyber-blue"
            alert={data.status === 'WARNING'}
          />
          <StatusCard 
            title="TRAJECTORY" 
            value={`${data.trajectory}°`} 
            icon={<Activity className="w-6 h-6 text-purple-500" />}
            color="border-purple-500"
          />
        </div>

        {data.status === 'WARNING' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 border border-red-500 bg-red-900/20 text-red-500 flex items-center gap-2"
          >
            <AlertTriangle /> WARNING: SYSTEM INSTABILITY DETECTED
          </motion.div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>🔴 Live telemetry feed from backend</p>
          <p className="mt-2">Rocket altitude = Fuel Level | Tilt = Trajectory</p>
        </div>
      </div>
    </div>
  )
}

function StatusCard({ title, value, icon, color, alert }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 border bg-black/50 backdrop-blur-md ${alert ? 'border-red-500 animate-pulse' : color} relative overflow-hidden`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-gray-400 tracking-widest">{title}</h3>
        {icon}
      </div>
      <div className="text-4xl font-bold text-white font-mono">
        {value}
      </div>
    </motion.div>
  )
}

export default App
