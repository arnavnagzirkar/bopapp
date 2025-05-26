// components/TinderCards.tsx
import React, { useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  Image,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('screen');
const SWIPE_THRESHOLD = 0.25 * width;

import G1 from '../assets/images/giraffe1.jpg';
import G2 from '../assets/images/giraffe2.jpg';

function TinderCards() {
  const [data, setData] = useState<Profile[]>([
    { image: G1, id: 1, name: "Bobo", animal: 'Cat' },
    { image: G2, id: 2, name: "Dolly", animal: 'Dog' },
  ]);

  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const currentItemRef = useRef<Profile>(data[0]);
  
  useEffect(() => {
    scale.setValue(0.9);
    opacity.setValue(1);
    animation.setValue({ x: 0, y: 0 });
    currentItemRef.current = data[0];
  }, [data]);

  const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setData((data) => {
        return data.slice(1)
      });
    });
 };

 interface Profile {
  image: any;
  id: number;
  name: string;
  animal: string;
}

  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [dislikedProfiles, setDislikedProfiles] = useState<Profile[]>([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: animation.x, dy: animation.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, { dx, vy }) => {
        const absDx = Math.abs(dx);
        const direction = dx / absDx; // 1 for right, -1 for left
        const velocity = direction * Math.min(5, Math.max(4, Math.abs(vy)));
      
        if (absDx > SWIPE_THRESHOLD) {
          Animated.decay(animation, {
            velocity: { x: velocity, y: 0 },
            deceleration: 0.98,
            useNativeDriver: true,
          }).start(() => {
            const currentItem = currentItemRef.current; // Use the ref here
            if (direction === 1) { // Swiped right
              setLikedProfiles(prevLiked => [...prevLiked, currentItem]);
              console.log('Liked:', currentItem.name); // Log liked profile
            } else { // Swiped left
              setDislikedProfiles(prevDisliked => [...prevDisliked, currentItem]);
              console.log('Disliked:', currentItem.name); // Log disliked profile
            }
            setData(prevData => prevData.slice(1));
            animation.setValue({ x: 0, y: 0 }); // Reset position after swipe
          });
        } else {
          Animated.spring(animation, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
   })
  ).current;  

  return (
    <View style={styles.container}>
      {data.slice(0, 2).reverse().map((item, index, items) => {
        // Check if it's the top card
        const isLastItem = index === items.length - 1;
        // Apply panHandlers if it's the top card
        const panHandlers = isLastItem ? { ...panResponder.panHandlers } : {};
        // Check if it's the second-to-last card
        const isSecondToLast = index === items.length - 2;
  
        // Rotate animation
        const rotate = animation.x.interpolate({
          inputRange: [-200, 0, 200],
          outputRange: ["-30deg", "0deg", "30deg"],
          extrapolate: "clamp", // Prevent excessive rotation
        });
  
        // Apply styles for top card
        const animatedCardStyles = isLastItem
          ? { transform: [{ rotate }, ...animation.getTranslateTransform()], opacity }
          : {};
        // Apply styles for next card
        const nextStyle = isSecondToLast
          ? { transform: [{ scale: scale }], borderRadius: 10 }
          : {};
  
        return (
          <Animated.View
            {...panHandlers}
            style={[styles.card, animatedCardStyles, nextStyle]} // Apply styles correctly
            key={item.id}
          >
            <Image resizeMode="cover" source={item.image} style={styles.image} />
            {/*<View style={styles.textContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.animalText}>{item.animal}</Text>
            </View>*/}
          </Animated.View>
        );
      })}
    </View>
  );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: "100%", // Ensure full width on web
    height: "100%", // Ensure full height on web
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    ...Platform.select({
      android: { elevation: 1 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  imageContainer: {
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 10,
    alignItems: "center", // Center text for better appearance
  },
  nameText: {
    fontSize: 16,
  },
  animalText: {
    fontSize: 14,
    color: '#757575',
    paddingTop: 5
  }
});

export default TinderCards;
