import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useAuth } from '../contexts/AuthContext';

function MoodTree({ mood }) {
  const treeRef = useRef(null);

  // Tree animation based on mood
  const getMoodColor = () => {
    switch (mood) {
      case 'happy':
        return [0.2, 0.8, 0.2]; // Bright green
      case 'sad':
        return [0.2, 0.2, 0.8]; // Blue
      case 'productive':
        return [0.8, 0.6, 0.2]; // Orange
      case 'neutral':
      default:
        return [0.5, 0.5, 0.5]; // Gray
    }
  };

  return (
    <mesh ref={treeRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={new THREE.Color(...getMoodColor())} />
    </mesh>
  );
}

export function MoodMeter() {
  useAuth();
  const [currentMood, setCurrentMood] = React.useState('neutral');

  const handleMoodChange = async (mood) => {
    setCurrentMood(mood);
    // Update mood in database
  };

  return (
    <div className='relative h-64 w-full rounded-xl overflow-hidden'>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MoodTree mood={currentMood} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent'>
        <div className='flex justify-center gap-4'>
          <button
            onClick={() => handleMoodChange('happy')}
            className={`p-3 rounded-full transition-transform hover:scale-110 ${
              currentMood === 'happy' ? 'bg-yellow-400' : 'bg-yellow-100'
            }`}
          >
            😊
          </button>
          <button
            onClick={() => handleMoodChange('sad')}
            className={`p-3 rounded-full transition-transform hover:scale-110 ${
              currentMood === 'sad' ? 'bg-blue-400' : 'bg-blue-100'
            }`}
          >
            😔
          </button>
          <button
            onClick={() => handleMoodChange('productive')}
            className={`p-3 rounded-full transition-transform hover:scale-110 ${
              currentMood === 'productive' ? 'bg-green-400' : 'bg-green-100'
            }`}
          >
            💪
          </button>
          <button
            onClick={() => handleMoodChange('neutral')}
            className={`p-3 rounded-full transition-transform hover:scale-110 ${
              currentMood === 'neutral' ? 'bg-gray-400' : 'bg-gray-100'
            }`}
          >
            😐
          </button>
        </div>
      </div>
    </div>
  );
}
