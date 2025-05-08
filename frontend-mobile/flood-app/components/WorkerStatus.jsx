import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import MainButton from './MainButton';

const WorkerStatus = ({ locationName = 'Storgatan 52, Malmö' }) => {
  // Status states
  const STATUS = {
    NOT_STARTED: 'Ej påbörjad',  // detta behövas visas!
    ON_SITE: 'På plats',
    IN_PROGRESS: 'Arbete pågår',
    COMPLETED: 'Klart'
  };

  // State management
  const [status, setStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(60 * 60); // Default 1h - kanske ändra till 30 min?
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const statusFade = useRef(new Animated.Value(0)).current;

  // Handle status changes with animations
  const handleStatusChange = (newStatus) => {
    // Fade out
    Animated.timing(statusFade, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      setStatus(newStatus);
      // Fade in
      Animated.timing(statusFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  // Effect for managing time based on status
  useEffect(() => {
    if (status === STATUS.IN_PROGRESS) {
      // Set start time if not already set
      if (!startTime) {
        setStartTime(new Date());
      }
      setTimeLeft(estimatedTime);
    } else if (status === STATUS.ON_SITE) {
      setTimeLeft(null);
      // Keep start time null until work begins
      setStartTime(null);
    } else if (status === STATUS.COMPLETED) {
      // Stop timer but keep the display
      if (timeLeft > 0) {
        Alert.alert('Arbete avslutat', 'Bra jobbat! Status uppdaterad till Klart'); // Notify user med push notification istället?
      }
    } else {
      // Reset for NOT_STARTED
      setTimeLeft(null);
      setStartTime(null);
    }
  }, [status, estimatedTime]);

  // Timer effect
  useEffect(() => {
    if (status !== STATUS.IN_PROGRESS || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          Alert.alert('Tiden är ute', 'Den beräknade tiden har gått ut'); // Notify user med push notification istället?
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  // Progress bar animation
  useEffect(() => {
    if (timeLeft === null || estimatedTime === 0) return;
    
    const progress = 1 - (timeLeft / estimatedTime);
    
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [timeLeft, estimatedTime]);

  // Time adjustment
  const adjustTime = (minutes) => {
    const additionalSeconds = minutes * 60;
    
    if (status === STATUS.IN_PROGRESS) {
      setTimeLeft(prev => Math.max(0, prev + additionalSeconds));
      setEstimatedTime(prev => Math.max(300, prev + additionalSeconds)); // Min 5 minutes? ändra till 10 min? eller 30 min?
    } else {
      setEstimatedTime(prev => Math.max(300, prev + additionalSeconds)); // Min 5 minutes
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    if (seconds === null) return '';
    
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}h ${minutes}m ${secs < 10 ? '0' : ''}${secs}s kvar`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}m ${secs < 10 ? '0' : ''}${secs}s kvar`;
    }
  };

  // Calculate total elapsed time
  const getElapsedTime = () => {
    if (!startTime) return null;
    
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  // Get button styling based on current status
  const getButtonStyle = (buttonStatus) => {
    return [
      styles.statusButton,
      status === buttonStatus ? styles.activeButton : null
    ];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arbetsstatus</Text>
      <Text style={styles.subtitle}>{locationName}</Text>

      <View style={styles.statusContainer}>
        <TouchableOpacity 
          style={getButtonStyle(STATUS.ON_SITE)}
          onPress={() => handleStatusChange(STATUS.ON_SITE)}
        >
          <Text style={[styles.buttonText, status === STATUS.ON_SITE ? styles.activeButtonText : null]}>
            {STATUS.ON_SITE}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={getButtonStyle(STATUS.IN_PROGRESS)}
          onPress={() => handleStatusChange(STATUS.IN_PROGRESS)}
        >
          <Text style={[styles.buttonText, status === STATUS.IN_PROGRESS ? styles.activeButtonText : null]}>
            {STATUS.IN_PROGRESS}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={getButtonStyle(STATUS.COMPLETED)}
          onPress={() => handleStatusChange(STATUS.COMPLETED)}
        >
          <Text style={[styles.buttonText, status === STATUS.COMPLETED ? styles.activeButtonText : null]}>
            {STATUS.COMPLETED}
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.statusInfoContainer, { opacity: statusFade }]}>
        {status && (
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Aktuell status:</Text>
            <Text style={styles.statusText}>{status}</Text>
            
            {status === STATUS.IN_PROGRESS && (
              <>
                <View style={styles.timelineContainer}>
                  <View style={styles.timeline}>
                    <Animated.View 
                      style={[
                        styles.timelineProgress,
                        { width: progressAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%']
                        })}
                      ]}
                    />
                  </View>
                </View>
                
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                
                <View style={styles.timeControls}>
                  <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime(-5)}>
                    <Text style={styles.timeButtonText}>-5m</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime(5)}>
                    <Text style={styles.timeButtonText}>+5m</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
            {status === STATUS.COMPLETED && (
              <Text style={styles.doneText}>✅ Arbetet är klart!</Text>
            )}
            
            {startTime && (
              <View style={styles.timeStats}>
                <Text style={styles.timeStatsLabel}>
                  Startad: {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
                {status !== STATUS.ON_SITE && (
                  <Text style={styles.timeStatsLabel}>
                    Tid aktiv: {getElapsedTime()}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      </Animated.View>

      {!status && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Välj "På plats" när du anländer till arbetsplatsen.
            Välj "Arbete pågår" för att starta arbetet och tidtagning.
            Välj "Klart" när arbetet är avslutat.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#4D88B8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 24,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  statusButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeButton: {
    backgroundColor: '#4D88B8',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4D88B8',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  statusInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusInfo: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 16,
  },
  timelineContainer: {
    width: '100%',
    marginVertical: 16,
  },
  timeline: {
    height: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    overflow: 'hidden',
  },
  timelineProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#FFD54F', // Yellow
    borderRadius: 5,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D88B8',
    marginBottom: 16,
  },
  timeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  timeButton: {
    backgroundColor: '#e9ecef',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  timeButtonText: {
    color: '#495057',
    fontWeight: '600',
  },
  doneText: {
    fontSize: 18,
    color: '#28a745',
    marginTop: 10,
    fontWeight: '600',
  },
  timeStats: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    width: '100%',
  },
  timeStatsLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  instructionContainer: {
    backgroundColor: '#e7f5ff',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4D88B8',
  },
  instructionText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});

export default WorkerStatus;

// to do: add useTheme hook