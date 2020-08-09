import React, { Component } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    SectionList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native'
import { handleModifiedData } from './helpers'


export default class DetailScreen extends Component {
    constructor() {
        super();
        this.state = {
            listData: [],
            loading: false,
            search: ''
        };
        this.arrayholder = [];
    }
    componentDidMount() {
        const url = `https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e`;
        this.setState({ loading: true });
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log('res--------', res)
                const modifyData = handleModifiedData(res)
                this.setState({
                    listData: modifyData,
                    loading: false,
                });
                this.arrayholder = modifyData, categories.category.subcategories;
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }


    SearchFilterFunction(text) {
        console.log('text data ', text, "=========", this.arrayholder.categories)
        // const newData = this.arrayholder.categories.map(item => {
        // const data= item.category.subcategories.filter(item =>{
        //        return item.data.includes(text);
            
        //      })
        //      return newData=data

        // });
        var filteredArray = this.arrayholder.categories
            .filter(element => element.category.subcategories
                .some(subElement =>
                    {console.log('subElement data ', subElement)
                    subElement.data == text})
            )
            .map(element => {
                let n = Object.assign({}, element, {
                    'subElement': element.subcategories.filter(
                        subElement => {
                            console.log('subElemendatat data ', subElement)
                            subElement.data == text}
                    )
                })
                return n;
            })
    
          
        console.log('arrray data ', filteredArray)

        this.setState({ listData: filteredArray });
    };

    selectItem = data => {
        data.isExpended = !data.isExpended;
        const index = this.state.listData.categories.findIndex(
            item => data.isExpended === item.category.isExpended
        );
        this.state.listData[index] = data.item;
        this.setState({
            listData: this.state.listData,
        });
    };


    renderItemdata = ({ item, index }) => {

        return (
            <View style={styles.itemView}>
                <View style={styles.itemTopView}>
                    <View style={[styles.itemIcon, {
                        height: 50, width: 50, justifyContent: "center", alignItems: "center",
                        backgroundColor: item.category.colorCode
                    }]}>
                        <Image
                            source={require('./images/food.png')}
                            style={styles.itemIcon}
                        />
                    </View>
                    <Text style={[styles.categoryNameText, {
                        color: item.category.colorCode
                    }]}>
                        {item.category.categoryName}
                        {item.category.servingSize &&
                            <Text style={{ color: '#000' }}>
                                {` (${item.category.servingSize})`}
                            </Text>}
                    </Text>
                    <TouchableOpacity onPress={() => this.selectItem(item)}>
                        {item.isExpended == false ? <Image
                            source={require('./images/down.png')}
                            style={styles.arrowIcon}
                        /> : <Image
                                source={require('./images/up.png')}
                                style={styles.arrowIcon}
                            />
                        }
                    </TouchableOpacity>

                </View>
                {item.isExpended == true &&
                    <SectionList
                        horizontal={false}
                        sections={item.category.subcategories}
                        keyExtractor={(item, index) => index.toString()}
                        listKey={(item, index) => 'D' + index.toString()}
                        renderItem={this.renderSubcategorydata}
                        renderSectionHeader={({ section: { subCategoryname } }) => (
                            <Text style={[styles.subCategoryHeader, {
                                color: item.category.colorCode
                            }]}>{subCategoryname}</Text>
                        )}
                    />
                }
            </View>
        )
    }
    renderSubcategorydata = ({ item, index }) => {
        return (
            <View style={styles.sectionItemView}>
                <Text>
                    {item}
                </Text>
            </View>
        )
    }

    render() {
        const { listData, search } = this.state
        console.log('renderdata---------', listData)
        return (
            <View style={styles.container}>
                <Text style={styles.topHeading}>Approved Food List</Text>
                <TextInput
                            style={styles.textInputStyle}
                            onChangeText={text => this.SearchFilterFunction(text)}
                            value={this.state.text}
                            underlineColorAndroid="transparent"
                            placeholder="Try Searching fats,saauces,names...."
                        />
                {listData && listData.length === 0 ? <View style={styles.loadingView}><Text>Loading ......</Text></View> :
                   
                       
                        <FlatList
                            data={listData.categories}
                            keyExtractor={(item, index) => { item + index }}
                            listKey={(item, index) => 'D' + index.toString()}
                            renderItem={this.renderItemdata}
                        />
                  
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'grey'
    },
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#F5FCFF',
    },
    scrollStyle: {
        marginVertical: 20
    },
    topHeading: {
        fontWeight: "bold",
        fontSize: 20,
        margin: 20
    },
    loadingView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    itemView: {
        backgroundColor: '#fff',
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 5,

    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
        marginHorizontal:10
      },
    itemTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    itemIcon: {
        height: 30,
        width: 30,
        borderRadius: 5,
        marginRight: '3%'
    },
    arrowIcon: {
        height: 15,
        width: 15,
        marginRight: '3%'
    },
    categoryNameText: {
        fontSize: 15
    },
    subCategoryHeader: {
        fontSize: 18,
        paddingTop: '6%'
    },
    sectionItemView: {
        borderBottomColor: 'grey',
        borderBottomWidth: .5,
        paddingVertical: '4%'
    }
})
