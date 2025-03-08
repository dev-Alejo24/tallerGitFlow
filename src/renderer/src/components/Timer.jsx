import React, { useState, useEffect } from 'react';
import { FaPause, FaPlay, FaStop, FaRedo } from 'react-icons/fa'; // Importa los íconos
import InputField from './InputField';

export default function Timer() {
  const [isEditing, setIsEditing] = useState(true);
  const [isRunning, setIsRunning] = useState(false); //inicia el contador
  const [isPaused, setIsPaused] = useState(false); //verifica cronometro en pausa
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId = null;

    // Asigna intervalos de tiempo
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, hours]);

  // inicia el contador y oculta el tablero de editar el tiempo
  const handleStart = () => {
    setIsRunning(true);
    setIsEditing(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true); //cambiar color
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(1);
    setSeconds(0);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsPaused(false);
  }

  return (
    <div>
      {isEditing ? (
        <div className='flex justify-center'>
          <div>
            <InputField
              label="Hours"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
            <InputField
              label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
            />
            <InputField
              label="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
            />
            <button
              className="bg-blue-500 text-white px-8 py-2 rounded-xl"
              onClick={handleStart}
            >
              <FaPlay className="text-2xl" />
            </button>
          </div>
        </div>
      ) : (
        /* cambia el color del formato del tiempo */
        <div className={`flex flex-col items-center ${isPaused ? 'text-yellow-500' : (hours === 0 && minutes === 0 && seconds === 0 ? 'text-red-500' : '')}`}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          <div className='mt-2 flex gap-2'>
            <button onClick={handlePause} className="bg-yellow-500 text-white px-8 py-2 rounded">
              <FaPause className="text-2xl" />
            </button>
            <button onClick={handleReset} className="bg-yellow-500 text-white px-8 py-2 rounded">
              <FaRedo className="text-2xl" />
            </button>
            <button onClick={handleStop} className="bg-yellow-500 text-white px-8 py-2 rounded">
              <FaStop className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
