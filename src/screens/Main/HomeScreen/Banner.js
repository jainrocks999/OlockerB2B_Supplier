import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'
import FastImage from "react-native-fast-image";
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
const { width } = Dimensions.get('window')

const SliderBanner = ({ data ,bottom,height,width,borderRadius}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
        const flatListRef = useRef();
    useEffect(() => {
        // Set up the interval for automatic sliding
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                return nextIndex < data?.length ? nextIndex : 0;
            });
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clear the interval when the component is unmounted
    }, [data?.length]);
    useEffect(() => {
        // Automatically scroll to the new index when it changes
        flatListRef.current?.scrollToIndex({
            animated: true,
            index: currentIndex,
            viewPosition: 0.5,
        });
    }, [currentIndex]);

    return (
        
        <View>
            {data?.length > 0 && (
            <FlatList
                ref={flatListRef}
                data={data??[]}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center',}}>
                        <TouchableOpacity>
                            <View 
                            style={{height:hp(25),width:wp(87),marginHorizontal:wp(2.5),borderRadius:wp(6),overflow:'hidden'}}
                            >
                                <Image
                                    resizeMode="stretch"
                                    style={{ height: '100%', width: '100%', }}
                                    source={{ uri: `https://olocker.co${item.ImageUrl}${item.ImageName}` }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                onScrollToIndexFailed={info => {
                    // Handle the case where the scrollToIndex call fails
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
            />
            )}
            {data?.length > 0 && (
            <View style={{ position: 'absolute', alignSelf: 'center', bottom:bottom }}>
                <FlatList
                    horizontal

                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ elevation:5,height:height, width: width, borderWidth: 1, marginHorizontal: 2, borderRadius:borderRadius,backgroundColor: currentIndex == index ? 'red' : 'grey', borderColor: currentIndex == index ? 'red' : 'grey' }} ></View>
                        )
                    }}
                    // onScrollToIndexFailed={info => {
                    //     // Handle the case where the scrollToIndex call fails
                    //     const wait = new Promise(resolve => setTimeout(resolve, 500));
                    //     wait.then(() => {
                    //         flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    //     });
                    // }}
                />

            </View>
            )}
            
        </View>
    )
}
export default SliderBanner