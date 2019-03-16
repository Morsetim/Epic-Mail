import msgData from '../models/messageModel';
import inboxData from '../models/inboxModel';
import messagesData from '../models/messageModel';
import sentModel from '../models/sentModel';

export default class Message{
    static createMsg(req, res){
        const newId = messagesData[messagesData.length - 1].id + 1;
        const {subject, message, status} = req.body;
        const parentMessageId = messagesData[messagesData.length - 1].id + 1;
        const createdOn = new Date();
        // const msgSent = sentMsg.sendMsg();

    const recentMessage = {
      id:newId,
      createdOn,
      subject,
      message,
      parentMessageId,
      status
    }
    if(recentMessage.status == ''){
        messagesData.push(recentMessage);
        res.status(201).json({
            status: 201,
            data : [{
                message: messagesData
            }],
            // message: 'Message Saved to Draft'
        });
    }

    }

    static sentMessage(req, res){
        const newId = messages[messages.length - 1].id + 1;
        const {subject, message, status} = req.body;
        const parentMessageId = messages[messages.length - 1].id + 1;
        const createdOn = new Date();
        // const msgSent = sentMsg.sendMsg();

    const recentMessage = {
      id:newId,
      createdOn,
      subject,
      message,
      parentMessageId,
      status
    }
    if(recentMessage.status == 'sent'){
        sentModel.push(recentMessage);
         res.status(201).json({
            status: 201,
            data : [{
                message: sentModel
            }],
        });
    }

    }

    static inboxMessage(req, res){
        const newId = messages[messages.length - 1].id + 1;
        const {subject, message, status} = req.body;
        const parentMessageId = messages[messages.length - 1].id + 1;
        const createdOn = new Date();
        // const msgSent = sentMsg.sendMsg();

    const recentMessage = {
      id:newId,
      createdOn,
      subject,
      message,
      parentMessageId,
      status
    }
    if(recentMessage.status == 'sent'){
        inboxData.push(recentMessage);
         res.status(201).json({
            status: 201,
            data : [{
                message: inboxData
            }],
        });
    }

    }

    static getMessages(req, res){
        if(msgData.length != 0){
            res.status(200).json({
                status: 200,
                data: [{
                    msgData
                }]

            });
        }
    }

}