import React, { Component } from 'react';
import {
    Form, 
    Button,
    DatePicker,
    Input
  } from 'antd';
  import moment from 'moment';
  const { TextArea } = Input;
  class TaskForm extends Component {
      constructor(props) {
          super(props)
      }
    handleSubmit = (e) => {
      e.preventDefault();
    
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
  
        const values = {
          'date': fieldsValue['date'].format('YYYY-MM-DD HH:mm:ss'),
          'title': fieldsValue['title'],
          'desc': fieldsValue['desc']
        };
        
        this.props.onChangeTask(values);
        this.props.form.resetFields();
        console.log('Received values of form: ', values);
      });
    }
    
    render() {
      const { getFieldDecorator } = this.props.form;
      
      let editData = {}
      if(this.props.edit) {
        editData =this.props.edit
    }

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const config = {
        initialValue: moment(editData.date) || '',
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
      const nameConfig = {
        initialValue: editData.title || '',
        rules: [{required: true, message: 'Please input task name!' }],
      };
      const descConfig = {
        initialValue: editData.desc || '',
        rules: [{required: true, message: 'Please input task desc!' }],
      };
      return (
        <Form onSubmit={this.handleSubmit} autoComplete='off'>
              
        <Form.Item
          {...formItemLayout}
          label="完成时间"
        >
          {getFieldDecorator('date', config)(
              
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="任务标题">
          {getFieldDecorator('title', nameConfig)(
            <Input placeholder="Please input your task name" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="任务描述">
          {getFieldDecorator('desc', descConfig)(
            <TextArea rows={4} />
          )}
        </Form.Item>
        
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
      );
    }
  }
  
  const WrappedTaskForm = Form.create({ name: 'taskForm' })(TaskForm);
  
  export default WrappedTaskForm
