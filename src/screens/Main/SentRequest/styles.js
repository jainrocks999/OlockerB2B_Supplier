import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f0eeef' 
    },
    main: { 
        flexDirection: 'row', 
        padding: 13, 
        justifyContent: 'space-between' 
    },
    touch: {
        paddingVertical: 8,
        borderRadius: 15,
        borderWidth: 1,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    touchtext: { 
        fontSize: 11, 
        fontFamily: 'Acephimere' 
    },
    tlength: { 
        fontFamily: 'Acephimere', 
        fontSize: 13, 
        color: '#565656', 
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 10,
        elevation: 5,
        borderRadius: 10,
        marginBottom: 10
    },
    cardv: { 
        flexDirection: 'row', 
        paddingVertical: 15, 
        justifyContent: 'space-between', 
        paddingHorizontal: 15,
        // borderWidth:1
    },
    cardv1: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    cardv2: {
         width: 100, 
         borderWidth: 0, 
         height: 80 
    },
    cardv2img: { 
        height: 80, 
        width: 100, 
        marginLeft: 30 
    },
    text: { 
        color: '#032e63', 
        fontFamily: 'Acephimere', 
        fontSize: 17, 
        fontWeight: '600' 
    },
    text1: { 
        fontFamily: 'Acephimere', 
        fontSize: 13, 
        color: '#000', 
        marginLeft: 1, 
        marginTop: 3 
    },
    text2: { 
        fontSize: 11, 
        marginTop: 10, 
        fontFamily: 'Acephimere', 
        color: '#656565' 
    },
    BTouch: { 
        backgroundColor: 'grey', 
        paddingHorizontal: 5, 
        paddingVertical: 2, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    BTouchtext: { 
        color: '#fff', 
        fontFamily: 'Acephimere', 
        fontSize: 12 
    },
})