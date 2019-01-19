import React, { Component } from 'react';
import {
  Layout,
  List,
  Avatar,
  Button,
  Skeleton,
  Modal,
  message,
  Checkbox
} from 'antd'
import moment from 'moment';
import './App.css'
import axios from 'axios'
import TaskForm from './form'
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
    modalType: ''
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
   addData = (arg, callback) => {
     const addItem = arg
     let data = {
       query: `mutation{
                      addOne(listObj:{
                        id: "${this.getUid()}",
                        desc: "${addItem.desc}",
                        title: "${addItem.title}",
                        date: "${addItem.date}",
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
    editData = (arg, callback) => {
      const editItem = arg
      editItem.id = this.state.editItem.id
      let data = {
        query: `mutation{
                    editOne(listObj:{
                      id: "${editItem.id}",
                      desc: "${editItem.desc}",
                      title: "${editItem.title}",
                      date: "${editItem.date}",
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
    tickData = (arg, callback) => {
      const editItem = arg
      let data = {
        query: `mutation{
          tickOne(
            id:"${editItem.id}",
            checked:${!editItem.checked}
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
      modalType: type,
      editItem: item
    })
   

    this.setModal1Visible(true)
  }
  setModal1Visible(modal1Visible) {
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
  addTask(arg) {
    this.addData(arg, (res) => {
      if (res.data.addOne.success) {
        this.success('添加成功！')
        this.setModal1Visible(false)
        this.loadData()
      } else {
        this.error('添加失败，请重试！')
      }
    })
  }
  editTask(arg) {
    this.editData(arg, (res) => {
      if (res.data.editOne.success) {
        this.success('编辑成功！')
        this.setModal1Visible(false)
        this.loadData()
      } else {
        this.error('编辑错误，请重试！')
      }
    })
  }
  tickTask(arg) {
    this.tickData(arg, (res) => {
      if (res.data.tickOne.success) {
        this.success('又完成一件，哈哈哈哈！')
        this.loadData()
      } else {
        this.error('编辑错误，请重试！')
      }
    })
  }
  chooseTask(arg) {
    let handlerType = this.state.modalType
    if (handlerType === 'edit') {

      this.editTask(arg)
    } else {
      this.addTask(arg)
    }
  }
  onChange(arg) {
    console.log(arg)
    this.tickTask(arg)
    // console.log(`checked = ${e.target.checked}`)
  }
  render() {
    const { initLoading, list } = this.state;
    const modalType = this.state.modalType

    return ( 
      <Layout >
        <Header><div style={{float: 'left', color: '#eee', marginRight: '30px', fontSize: '18px'}}>TODO LIST</div> <Button type='primary' onClick = {
                      () => this.showModal1('add',{})
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
                {item.checked ? null : <Checkbox checked={item.checked} onChange={() => this.onChange(item)}></Checkbox>}
                
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
                <div> {item.checked ? <span style={{color: '#52c41a'}}>已完成</span> : <span style={{color: '#1890ff'}}>计划完成时间 {item.date}</span>}  </div>  
                </Skeleton>  
                </List.Item>
              )
            }
            />
            < Modal
            title = {modalType==='edit'?'编辑任务':'添加任务'}
            centered
            footer={null}
            visible = {
              this.state.modal1Visible
            }
            onCancel = {
                () => this.setModal1Visible(false)
              } >
              <TaskForm edit={this.state.editItem} onChangeTask={(value) => this.chooseTask(value)}></TaskForm>
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

export default App
