
import React, { useState, useEffect } from 'react';
import { FaPause, FaPlay, FaStop, FaRedo } from 'react-icons/fa';
import InputField from './InputField';

export default function Timer() {
  const [isEditing, setIsEditing] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId = null;

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) return prevSeconds - 1;
          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              setSeconds(59);
              return prevMinutes - 1;
            }
            setHours((prevHours) => {
              if (prevHours > 0) {
                setMinutes(59);
                setSeconds(59);
                return prevHours - 1;
              }
              setIsRunning(false);
              return 0;
            });
            return 0;
          });
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsEditing(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(1);
    setSeconds(0);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsEditing(true); // Permite volver a editar el tiempo
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField
              label="Hours"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            />
            <InputField
              label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            />
            <InputField
              label="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
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
        <div
          className={`flex flex-col items-center ${
            isPaused
              ? 'text-yellow-500'
              : hours === 0 && minutes === 0 && seconds === 0
              ? 'text-red-500'
              : ''
          }`}
        >
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
          <div className="mt-2 flex gap-2">
            {!isRunning && (
              <button
                onClick={handleStart}
                className="bg-green-500 text-white px-8 py-2 rounded"
              >
                <FaPlay className="text-2xl" />
              </button>
            )}
            {isRunning && (
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white px-8 py-2 rounded"
              >
                <FaPause className="text-2xl" />
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-blue-500 text-white px-8 py-2 rounded"
            >
              <FaRedo className="text-2xl" />
            </button>
            <button
              onClick={handleStop}
              className="bg-red-500 text-white px-8 py-2 rounded"
            >
              <FaStop className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
