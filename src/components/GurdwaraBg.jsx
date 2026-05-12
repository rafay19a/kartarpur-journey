const stars = [
  [100,80],[200,50],[350,120],[450,60],[600,90],[750,40],[900,70],[1050,100],[1200,55],[1350,85],
  [150,160],[300,140],[500,150],[680,130],[820,170],[1000,145],[1150,160],[1300,135],[80,200],[400,210],
  [550,190],[750,220],[950,185],[1100,205],[1380,195],[230,270],[700,250],[1250,260],
]

export default function GurdwaraBg() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#050a14" />
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="60%" r="40%">
          <stop offset="0%" stopColor="#C8A951" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8A951" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="waterRefl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8A951" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0a1628" stopOpacity="0.8" />
        </radialGradient>
        <filter id="blur2"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="blur1"><feGaussianBlur stdDeviation="1" /></filter>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill="url(#skyGrad)" />
      <rect width="1440" height="900" fill="url(#glow)" />

      {/* Stars */}
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={0.8 + (i % 3) * 0.4} fill="white" opacity={0.45 + (i % 4) * 0.1} />
      ))}

      {/* Sarovar / water */}
      <ellipse cx="720" cy="820" rx="620" ry="120" fill="url(#waterRefl)" />
      <rect x="100" y="780" width="1240" height="120" fill="#0a1628" opacity="0.6" />
      {[800, 820, 840, 860, 880].map((y, i) => (
        <line key={i} x1="200" y1={y} x2="1240" y2={y} stroke="#C8A951" strokeOpacity="0.06" strokeWidth="1" />
      ))}

      {/* Causeway */}
      <rect x="660" y="680" width="120" height="120" fill="#1a2a4a" opacity="0.9" />
      <rect x="660" y="688" width="4" height="112" fill="#C8A951" opacity="0.5" />
      <rect x="776" y="688" width="4" height="112" fill="#C8A951" opacity="0.5" />

      {/* Base platform */}
      <rect x="580" y="500" width="280" height="180" fill="#1e3560" opacity="0.95" />
      <rect x="575" y="497" width="290" height="8" fill="#C8A951" opacity="0.8" />
      <rect x="585" y="510" width="268" height="165" fill="#162847" opacity="0.9" />

      {/* Lower arched gallery */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={596 + i * 64} y="510" width="54" height="90" fill="#0e1f38" rx="27" opacity="0.9" />
          <rect x={600 + i * 64} y="514" width="46" height="82" fill="#0a1628" rx="23" opacity="0.8" />
          <path d={`M ${600 + i * 64} 596 Q ${623 + i * 64} 510 ${646 + i * 64} 596`} fill="none" stroke="#C8A951" strokeWidth="1" opacity="0.5" />
        </g>
      ))}

      {/* Upper level */}
      <rect x="600" y="460" width="240" height="55" fill="#1e3560" opacity="0.95" />
      <rect x="595" y="457" width="250" height="8" fill="#C8A951" opacity="0.7" />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={616 + i * 72} y="464" width="52" height="44" fill="#0a1628" rx="26" opacity="0.9" />
          <path d={`M ${616 + i * 72} 508 Q ${642 + i * 72} 460 ${668 + i * 72} 508`} fill="none" stroke="#C8A951" strokeWidth="1" opacity="0.5" />
        </g>
      ))}

      {/* Chattris */}
      {[[600, 435], [730, 435]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y + 15} width="32" height="22" fill="#1e3560" opacity="0.9" rx="2" />
          <ellipse cx={x + 16} cy={y + 14} rx="18" ry="12" fill="#C8A951" opacity="0.85" />
          <ellipse cx={x + 16} cy={y + 10} rx="10" ry="7" fill="#d4b44a" opacity="0.9" />
          <rect x={x + 14} y={y - 5} width="4" height="16" fill="#C8A951" opacity="0.9" />
          <circle cx={x + 16} cy={y - 8} r="4" fill="#C8A951" opacity="0.95" />
        </g>
      ))}

      {/* Main dome */}
      <ellipse cx="720" cy="390" rx="72" ry="50" fill="#C8A951" opacity="0.9" />
      <ellipse cx="720" cy="378" rx="50" ry="38" fill="#d4b44a" opacity="0.9" />
      <ellipse cx="720" cy="368" rx="34" ry="28" fill="#dcbc52" opacity="0.95" />
      <ellipse cx="720" cy="362" rx="20" ry="16" fill="#e6c95a" opacity="1" />
      <ellipse cx="710" cy="355" rx="10" ry="7" fill="white" opacity="0.12" />

      {/* Kalash */}
      <rect x="716" y="330" width="8" height="35" fill="#C8A951" opacity="0.95" />
      <circle cx="720" cy="327" r="8" fill="#C8A951" opacity="0.95" />
      <circle cx="720" cy="320" r="4" fill="#d4b44a" opacity="1" />
      <rect x="719" y="306" width="2" height="15" fill="#d4b44a" opacity="1" />
      <ellipse cx="720" cy="390" rx="85" ry="60" fill="#C8A951" opacity="0.06" filter="url(#blur2)" />

      {/* Side minarets */}
      {[[590, 340], [848, 340]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 10} y={y} width="22" height="160" fill="#1e3560" opacity="0.9" rx="3" />
          <rect x={x - 12} y={y - 5} width="26" height="8" fill="#C8A951" opacity="0.7" />
          <rect x={x - 12} y={y + 50} width="26" height="5" fill="#C8A951" opacity="0.5" />
          <rect x={x - 12} y={y + 100} width="26" height="5" fill="#C8A951" opacity="0.5" />
          <ellipse cx={x + 1} cy={y - 2} rx="14" ry="20" fill="#C8A951" opacity="0.8" />
          <ellipse cx={x + 1} cy={y - 10} rx="8" ry="12" fill="#d4b44a" opacity="0.9" />
          <rect x={x} y={y - 28} width="2" height="20" fill="#C8A951" opacity="0.9" />
          <circle cx={x + 1} cy={y - 30} r="4" fill="#C8A951" opacity="0.95" />
        </g>
      ))}

      {/* Parikrama walls */}
      <rect x="80" y="640" width="510" height="50" fill="#0e1f38" opacity="0.9" />
      <rect x="80" y="638" width="510" height="6" fill="#C8A951" opacity="0.6" />
      <rect x="850" y="640" width="510" height="50" fill="#0e1f38" opacity="0.9" />
      <rect x="850" y="638" width="510" height="6" fill="#C8A951" opacity="0.6" />

      {/* Corner towers */}
      {[[80, 590], [240, 570], [1160, 570], [1320, 590]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 15} y={y} width="36" height="100" fill="#162847" rx="4" opacity="0.9" />
          <ellipse cx={x + 3} cy={y} rx="20" ry="26" fill="#C8A951" opacity="0.75" />
          <ellipse cx={x + 3} cy={y - 10} rx="12" ry="16" fill="#d4b44a" opacity="0.85" />
          <rect x={x + 2} y={y - 32} width="2" height="24" fill="#C8A951" opacity="0.9" />
          <circle cx={x + 3} cy={y - 35} r="4" fill="#C8A951" opacity="1" />
        </g>
      ))}

      {/* Battlements */}
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={100 + i * 24} y="630" width="14" height="14" fill="#1a2f52" rx="1" opacity="0.9" />
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={i} x={860 + i * 24} y="630" width="14" height="14" fill="#1a2f52" rx="1" opacity="0.9" />
      ))}

      {/* Gate arches */}
      {[[180, 595], [540, 595], [890, 595], [1250, 595]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 20} y={y} width="46" height="55" fill="#0a1628" rx="23" opacity="0.8" />
          <path d={`M ${x - 20} ${y + 55} Q ${x + 3} ${y} ${x + 26} ${y + 55}`} fill="#C8A951" opacity="0.4" />
        </g>
      ))}

      {/* Water reflection */}
      <g opacity="0.25" transform="translate(0,1600) scale(1,-1)">
        <ellipse cx="720" cy="390" rx="72" ry="50" fill="#C8A951" />
        <rect x="600" y="460" width="240" height="55" fill="#1e3560" />
        <rect x="580" y="500" width="280" height="80" fill="#1e3560" />
      </g>
      <ellipse cx="720" cy="800" rx="300" ry="50" fill="#C8A951" opacity="0.08" filter="url(#blur2)" />

      {/* Foreground */}
      <rect x="0" y="780" width="1440" height="120" fill="#0a1423" />
      {[800, 820, 840, 860].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1440" y2={y} stroke="#C8A951" strokeOpacity="0.05" strokeWidth="1" />
      ))}

      {/* Pilgrim silhouettes */}
      {[[300, 770], [400, 768], [500, 772], [900, 768], [1050, 771], [1150, 769]].map(([x, y], i) => (
        <g key={i} opacity="0.5">
          <circle cx={x} cy={y - 18} r="5" fill="#0a1628" />
          <rect x={x - 4} y={y - 13} width="8" height="13" fill="#0a1628" rx="1" />
        </g>
      ))}

      {/* Lantern lights */}
      {[160, 280, 400, 520, 900, 1020, 1140, 1260].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={645} r="4" fill="#C8A951" opacity="0.7" />
          <circle cx={x} cy={645} r="10" fill="#C8A951" opacity="0.12" filter="url(#blur1)" />
        </g>
      ))}

      {/* Mist */}
      <rect x="0" y="600" width="1440" height="100" fill="url(#skyGrad)" opacity="0.25" />

      <text x="20" y="890" fill="white" opacity="0.3" fontSize="12" fontFamily="DM Sans, sans-serif">
        Illustration: Harmandir Sahib, Amritsar
      </text>
    </svg>
  )
}
