import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#032e63',
        //alignItems:'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 20,
    },
    container1: {
        flex: 1,
        backgroundColor: '#f0eeee'
    },

    blog: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 0.5,
        marginVertical: 10,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        height:45
    },
    img1: {
        width: 25,
        height: 24,
        marginLeft: 10
    },
    text: {
        color: 'white',
        fontSize: 25,
        marginTop: 17,
        fontWeight: '600'
    },
    card:
    {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { height: 2, width: 0 },
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 20,
    },
    img: {
        height: 25,
        width: 25,
        marginTop: 20
    },
    
    Flatlist: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { height: 1, width: 0 },
        elevation: 5,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 5,
        marginTop: 10
    }


})

