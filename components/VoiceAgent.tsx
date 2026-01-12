
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { 
  createBlob, 
  decode, 
  decodeAudioData, 
  SYSTEM_INSTRUCTION 
} from '../geminiService';

const VoiceAgent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(20).fill(5));

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      if (outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close();
      }
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setVisualizerData(new Array(20).fill(5));
  }, []);

  const startSession = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.log('Voice session opened');
            setIsActive(true);
            setIsConnecting(false);

            // Double check context hasn't been closed/nullified during connection
            if (!inputCtx || inputCtx.state === 'closed') return;

            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const level = inputData.reduce((a, b) => a + Math.abs(b), 0) / inputData.length;
              setVisualizerData(prev => [...prev.slice(1), level * 100 + 5]);

              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                if (session) {
                  session.sendRealtimeInput({ media: pcmBlob });
                }
              }).catch(() => {});
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              try {
                const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.onended = () => sourcesRef.current.delete(source);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
              } catch (e) {
                console.error("Error decoding/playing audio", e);
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (err) => {
            console.error('Gemini Live error:', err);
            stopSession();
          },
          onclose: () => {
            console.log('Voice session closed');
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (error) {
      console.error('Failed to start session:', error);
      stopSession();
    }
  };

  const toggleSession = async () => {
    if (isActive) {
      stopSession();
      return;
    }
    startSession();
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl w-full max-w-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
        <h3 className="text-white font-semibold">AB Voice Assistant</h3>
      </div>
      
      <div className="h-16 flex items-end justify-between gap-1 mb-6 px-2">
        {visualizerData.map((val, i) => (
          <div 
            key={i} 
            className="w-full bg-orange-500 rounded-full transition-all duration-75"
            style={{ height: `${isActive ? val : 5}%`, opacity: isActive ? 0.8 : 0.3 }}
          />
        ))}
      </div>

      <button
        onClick={toggleSession}
        disabled={isConnecting}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
          isActive 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        } ${isConnecting ? 'opacity-50 cursor-wait' : ''}`}
      >
        {isConnecting ? (
          'Connecting...'
        ) : isActive ? (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" /></svg>
            Stop Agent
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            Talk to AI Assistant
          </>
        )}
      </button>
      <p className="text-white/60 text-xs mt-3 text-center">
        {isActive ? "I'm listening... How can I help you today?" : "Click to start a voice conversation about shipping."}
      </p>
    </div>
  );
};

export default VoiceAgent;
