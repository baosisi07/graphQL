import React, { Component } from 'react';
import {
  Layout,
  List,
  Avatar,
  Button,
  Skeleton,
  Modal,
  message
} from 'antd'
import './App.css'
import axios from 'axios'
const {
  Header,
  Content,
} = Layout
const count = 3
const Url = 'http://localhost:4000/graphql'
class App extends Component {
  state = {
    initLoading: true,
    data: [],
    list: [],
    modal1Visible: false,
    modal2Visible: false,
    selectedId: '',
    editItem: {},
    modalType: '',
    feild: {

    }
  }

  componentDidMount() {
    this.loadData()
  }
  success = (txt) => {
    message.success(txt);
  };

  error = (txt) => {
    message.error(txt);
  };
  getUid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
  getTime(time) {
    var oDate = new Date(time);
    var vYear = oDate.getFullYear();
    var vMon = oDate.getMonth() + 1;
    var vDay = oDate.getDate();
    vMon = vMon < 10 ? '0' + vMon : vMon;
    vDay = vDay < 10 ? '0' + vDay : vDay;
    var today = vYear + '-' + vMon + '-' + vDay;

    var hour = oDate.getHours();
    var min = oDate.getMinutes();
    var sec = oDate.getSeconds();
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;

    var str = hour + ':' + min + ':' + sec;
    return today + ' ' + str;
  }
  loadData() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.data.lists,
        list: res.data.lists,
      });
    });
  }
  getData = (callback) => {
    let query = `?query=query{
              lists{
                id,
                title,
                desc,
                date,
                checked
              }
            }`
    axios({
        method: 'get',
        url: Url+query,
        timeout: 10000
      })
      .then(res => {
         callback(res.data)
      })
  }
  delData = (callback) => {
    const id = this.state.selectedId
    let data = {
      query: `mutation{
                      delOne(
                        id: "${id}",
                      ){
                        id,
                        success
                      }
                    }`
    }
    axios({
        method: 'post',
        url: Url,
        data,
        timeout: 10000
      })
      .then(res => {
        callback(res.data)
      })
  }
   addData = (callback) => {
     const addItem = this.state.addItem
     let data = {
       query: `mutation{
                      addOne(listObj:{
                        id: "${this.getUid()}",
                        desc: "${addItem.desc}",
                        title: "${addItem.title}",
                        date: "${this.getTime(addItem.date)}",
                        checked: false
                      }){
                        id,
                        success
                      }
                    }`
     }
     axios({
         method: 'post',
         url: Url,
         data,
         timeout: 10000
       })
       .then(res => {
         callback(res.data)
       })
   }
    editData = (callback) => {
      const editItem = this.state.editItem

      let data = {
        query: `mutation{
                    editOne(listObj:{
                      id: "${editItem.id}",
                      desc: "${editItem.desc}",
                      title: "${editItem.title}",
                      date: "${this.getTime(editItem.date)}",
                    }){
                      id,
                      success
                    }
                  }`
      }
      axios({
          method: 'post',
          url: Url,
          data,
          timeout: 10000
        })
        .then(res => {
          callback(res.data)
        })
    }
  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({
        loading: true,
        name: {}
      }))),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.data.lists);
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  showModal2(id) {
    this.setState({
      selectedId: id
    })
    this.setModal2Visible(true)
  }
  setModal2Visible(modal2Visible) {
    this.setState({
      modal2Visible
    });
  }
  showModal1(type, item) {
    this.setState({
      editItem: item,
      modalType: type
    })
    this.setModal1Visible(true)
  }
  setModal1Visible(modal1Visible) {
    console.log(this.state)
    this.setState({
      modal1Visible
    });
  }
  delTask() {
    this.delData((res) => {
      if (res.data.delOne.success) {
        this.success('删除成功！')
        this.setModal2Visible(false)
        this.loadData()
      } else {
        this.error('删除错误，请重试！')
      }   
    })
  }
  addTask() {
    this.addData((res) => {
      if (res.data.addOne.success) {
        this.success('添加成功！')
        this.setModal1Visible(false)
        this.loadData()
      } else {
        this.error('添加失败，请重试！')
      }
    })
  }
  editTask() {
    this.editData((res) => {
      if (res.data.editOne.success) {
        this.success('编辑成功！')
        this.setModal1Visible(false)
        this.loadData()
      } else {
        this.error('编辑错误，请重试！')
      }
    })
  }
  chooseTask() {
    let handlerType = this.state.modalType
    if (handlerType === 'edit') {
      this.editTask()
    } else {
      this.addTask()
    }
  }
  render() {
    const { initLoading, list } = this.state;


    return ( 
      <Layout >
        <Header> <Button type='primary' onClick = {
                      () => this.showModal1('add')
                    }>添加任务</Button> </Header>
        <Content>
            <List style = {
              {
                margin: '20px',
                padding: '30px 15px',
                backgroundColor: '#fff'
              }
            }
            className = "demo-loadmore-list"
            loading = {
              initLoading
            }
            itemLayout = "horizontal"

            dataSource = {
              list
            }
            renderItem = {
              item => ( <List.Item actions = {
                  [ < Button type = "primary"
                    onClick = {
                      () => this.showModal1('edit', item)
                    } > edit < /Button>, <Button onClick={() => this.showModal2(item.id)}>delete</Button >
                  ]
                } >
                <Skeleton avatar title = {
                  false
                }
                loading = {
                  item.loading
                }
                active >
                <List.Item.Meta avatar = { < Avatar src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" / >
                }
                title = { <
                  a href = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" > {
                    item.title
                  } < /a>
                }
                description = {
                  item.desc
                }
                /> 
                <div> 完成时间 {item.date} </div>  
                </Skeleton>  
                </List.Item>
              )
            }
            />
            < Modal
            title = "删除确认"
            centered
            visible = {
              this.state.modal1Visible
            }
            onOk = {
              () => this.chooseTask()
            }
            onCancel = {
                () => this.setModal1Visible(false)
              } >

              </Modal>
            < Modal
            title = "删除确认"
            centered
            visible = {
              this.state.modal2Visible
            }
            onOk = {
              () => this.delTask()
            }
            onCancel = {
                () => this.setModal2Visible(false)
              } >
              <p> 确认删除此任务吗？ < /p>
              </Modal>
          </Content>
        </Layout>
      
      );
    }
  }

export default App;
