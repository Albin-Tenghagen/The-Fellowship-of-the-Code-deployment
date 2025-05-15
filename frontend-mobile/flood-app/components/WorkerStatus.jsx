import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';


const WorkerStatus = ({ locationName = 'Nånstans i Sverige' }) => {

  const STATUS = {
    NOT_STARTED: 'Ej påbörjad',
    ON_SITE: 'På plats',
    IN_PROGRESS: 'Arbete pågår',
    COMPLETED: 'Klart'
  };

  const STATUS_ORDER = [STATUS.NOT_STARTED, STATUS.ON_SITE, STATUS.IN_PROGRESS, STATUS.COMPLETED];

  const [status, setStatus] = useState(STATUS.NOT_STARTED);
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(60 * 60); // Default 1h
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const statusFade = useRef(new Animated.Value(1)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  const handleStatusChange = () => {
    const currentIndex = STATUS_ORDER.indexOf(status);
    const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
    const newStatus = STATUS_ORDER[nextIndex];

    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();

    Animated.timing(statusFade, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      setStatus(newStatus);
      Animated.timing(statusFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  useEffect(() => {
    if (status === STATUS.IN_PROGRESS) {
      if (!startTime) {
        setStartTime(new Date());
      }
      setTimeLeft(estimatedTime);
    } else if (status === STATUS.ON_SITE) {
      setTimeLeft(null);
      setStartTime(null);
    } else if (status === STATUS.COMPLETED) {
      if (timeLeft > 0) {
      }
    } else {
      setTimeLeft(null);
      setStartTime(null);
    }
  }, [status, estimatedTime]);

  useEffect(() => {
    if (status !== STATUS.IN_PROGRESS || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  useEffect(() => {
    if (timeLeft === null || estimatedTime === 0) return;
    
    const progress = 1 - (timeLeft / estimatedTime);
    
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [timeLeft, estimatedTime]);

  const adjustTime = (minutes) => {
    const additionalSeconds = minutes * 60;
    
    if (status === STATUS.IN_PROGRESS) {
      setTimeLeft(prev => Math.max(0, prev + additionalSeconds));
      setEstimatedTime(prev => Math.max(300, prev + additionalSeconds));
    } else {
      setEstimatedTime(prev => Math.max(300, prev + additionalSeconds));
    }
  };

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

  const getElapsedTime = () => {
    if (!startTime) return null;
    
    const now = new Date();
    const elapsed = Math.floor((now - startTime) / 1000);
    
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  const getStatusColor = () => {
    switch (status) {
      case STATUS.NOT_STARTED:
        return '#6c757d';
      case STATUS.ON_SITE:
        return '#4D88B8';
      case STATUS.IN_PROGRESS:
        return '#FFD54F';
      case STATUS.COMPLETED:
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case STATUS.NOT_STARTED:
        return <AntDesign name="clockcircle" size={30} color="black" />;
      case STATUS.ON_SITE:
        return <MaterialIcons name="place" size={30} color="black" />;
      case STATUS.IN_PROGRESS:
        return <Entypo name="progress-two" size={30} color="black" />;
      case STATUS.COMPLETED:
        return <MaterialIcons name="done" size={30} color="black" />;
      default:
        return <MaterialCommunityIcons name="timer-sand-full" size={30} color="black" />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arbetsstatus</Text>
      <Text style={styles.subtitle}>{locationName}</Text>

      <Animated.View 
        style={[
          styles.statusCard, 
          { 
            transform: [{ scale: cardScale }],
            borderColor: getStatusColor()
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.cardTouchable}
          onPress={handleStatusChange}
          activeOpacity={0.9}
        >
          <Animated.View style={[styles.cardContent, { opacity: statusFade }]}>
            <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
            <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
              {status}
            </Text>
            <Text style={styles.tapInstruction}>Tryck för att ändra status</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {status === STATUS.IN_PROGRESS && (
        <View style={styles.progressContainer}>
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
            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime(-30)}>
              <Text style={styles.timeButtonText}>-30m</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime(30)}>
              <Text style={styles.timeButtonText}>+30m</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timeControls}>
            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime(-60)}>
              <Text style={styles.timeButtonText}>-60m</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeButton} onPress={() => adjustTime(60)}>
              <Text style={styles.timeButtonText}>+60m</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {status === STATUS.COMPLETED && (
        <View style={styles.completedContainer}>
          <Text style={styles.doneText}>🎉 Arbetet är klart!</Text>
        </View>
      )}
      
      {startTime && status !== STATUS.NOT_STARTED && (
        <View style={styles.timeStats}>
          <Text style={styles.timeStatsLabel}>
            Startad: {startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </Text>
          {status !== STATUS.ON_SITE && getElapsedTime() && (
            <Text style={styles.timeStatsLabel}>
              Tid aktiv: {getElapsedTime()}
            </Text>
          )}
        </View>
      )}

      {status === STATUS.NOT_STARTED && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Tryck på kortet för att börja med "På plats" när du anländer till arbetsplatsen.
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
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 3,
    minHeight: 160,
  },
  cardTouchable: {
    flex: 1,
    borderRadius: 13,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  statusIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  tapInstruction: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineContainer: {
    width: '100%',
    marginBottom: 16,
  },
  timeline: {
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    overflow: 'hidden',
  },
  timelineProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#FFD54F',
    borderRadius: 6,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4D88B8',
    marginBottom: 16,
    textAlign: 'center',
  },
  timeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  timeButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  timeButtonText: {
    color: '#495057',
    fontWeight: '600',
    fontSize: 16,
  },
  completedContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  doneText: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: '600',
  },
  timeStats: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4D88B8',
  },
  timeStatsLabel: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    fontWeight: '500',
  },
  instructionContainer: {
    backgroundColor: '#e7f5ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4D88B8',
  },
  instructionText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default WorkerStatus;