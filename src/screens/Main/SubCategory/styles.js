import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#032e63'
    },
    main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 5,
        flex: 1
    },
    img: {
        width: 26,
        height: 18,
        marginTop: 10,
        tintColor: 'white'
    },
    view: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    img1: {
        tintColor: '#fff',
        width: 22,
        height: 22,
        marginTop: 12
    },
    text: {
        color: '#fff',
        fontFamily: 'Acephimere',
        marginLeft: 2,
        marginTop: 12,
        fontSize: 20,
        fontWeight: '700'
    },
    text1: {
        color: '#fff',
        fontFamily: 'Acephimere',
        marginLeft: 6,
        marginTop: 16,
        fontSize: 14,
        fontWeight: '600'
    },
    main1: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { height: 2, width: 0 },
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingVertical: 20,
        width: '100%',
        paddingHorizontal: 10
    },
    main1view: {
        //alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    main1view1: {
        alignItems: 'center',
        width: '80%'
    },
    main1view1text: {
        fontSize: 15,
        color: '#052a47',
        fontFamily: 'Acephimere',
        marginLeft: 25,
        fontWeight: '700'
    },
    cardtext: {
        color: '#052a47',
        marginTop: 0,
        fontFamily: 'Acephimere',
        fontSize: 15,
        fontWeight: '700'
    },
})