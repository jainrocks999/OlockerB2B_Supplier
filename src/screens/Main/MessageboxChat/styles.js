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


    Text1:
    {
       fontWeight: '400',
       color: '#000',
        fontSize: 20
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
        marginBottom: 0,
        //paddingHorizontal: 5,
        paddingVertical: 20,
        borderWidth: 0.2

    },
    card1:
    {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { height: 2, width: 0 },
        elevation: 5,
        borderRadius: 6,
        backgroundColor: '#E5E5E5E6',
        marginBottom: 0,
        paddingHorizontal: 35,
        paddingVertical: 25,
        marginHorizontal: 11,
        marginBottom: 20


    },
    img: {
        height: 25,
        width: 25,
        marginTop: 20
    },
    text: {
        color: 'white',
        fontSize: 25,
        marginTop: 17,
        fontWeight:'700'
    },
    main: {
       // flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical:25,
        backgroundColor:'#ffff'
    },
    main1: {
        borderWidth: 1,
       paddingVertical:35,
     paddingHorizontal:35,
       alignItems:'center',
       justifyContent:'center',
        borderColor: 'grey',
        borderRadius:3
       
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    bottomV: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100, width: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5
    },
    textB: {
        fontSize: 20,
        color: 'black',
        //fontWeight: '500',
        //marginTop: 15
    },
    textC: {
        fontSize: 15,
        color: '#000',
        fontWeight: '200',
        marginTop: 13
    },
    button: {

        backgroundColor: '#e9056b',
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal:5,
    },
    textbt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    },
    rnimg:{
        marginLeft: 2,
        width: 20,
        height: 13,
        marginTop: Platform.OS == 'android' ? 14 : 4,
        //tintColor:'grey'
      },
      Flatlist: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: { height: 1, width: 0 },
        elevation: 5,
        backgroundColor: 'white',
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 10,
        

    }

})

