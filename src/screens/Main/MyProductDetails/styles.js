import { Platform, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0eeef' },
    main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 20,
    },
    text: {
        fontFamily: 'Acephimere',
        fontSize: 14
    },
    card: {
        marginTop: 10,
        paddingHorizontal: 5,
    },
    cardview: {
        height:hp('25%'),
       // height:Platform.OS=="android"?210:210,
        backgroundColor: '#fff',
        // flex:1,
        margin: 6,
        borderRadius: 10,
        elevation: 3,
        width: '46.5%',
    },
    cardview1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardview2: {
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#24a31e',
        paddingVertical: 2,
        alignSelf: 'flex-start'
    },
    cardview2text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        color: '#fff',
        width:'90%',
        marginLeft:13
    },
    cardview3: {
        width: '100%',
        alignItems: 'center',
        marginTop: -40
    },
    cardview3img: {
        height: 120,
        width: 120,
        marginLeft: 30
    },
    cardbottom: {
        justifyContent: 'center',
        bottom: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 20
    },
    cardbottomtext: {
        color: '#050505',
        fontFamily: 'Acephimere',
        fontSize: 13
    },
    cardbottom1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -5,
        marginTop:0
    },
    cardbottom1text: {
        color: '#050505',
        fontFamily: 'Roboto-Medium'
    },

})